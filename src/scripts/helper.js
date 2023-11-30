let Helper = new Map()

/*
*	Returns true if the passed in value is a string
*/
Helper.isString = (value) =>
{
	return (value instanceof String) || typeof(value) == "string"
}

/*
*	Returns true if the passed in value is a number
*/
Helper.isNumber = (value) =>
{
	if (Number.isNaN(value)) return false
	if (typeof(value) != "number") return false

	if (value > Number.MAX_SAFE_INTEGER) return false
	if (value < Number.MIN_SAFE_INTEGER) return false

	return true
}

/*
*	Returns true if the passed in value is a boolean
*/
Helper.isBool = (value) =>
{
	if (value === true || value === false) return true
	if ((value instanceof Boolean) || typeof(value) == "boolean") return true

	return false
}

/*
*	Hashes a string
*
*	https://gist.github.com/iperelivskiy/4110988
*/

/*
*	Class to help tell if a string is hashed or not
*/
Helper.hash = (string) =>
{
	if (!Helper.isString(string))
		string = String(string)

	for (var i = 0, h = 0xDEADBEEF; i < string.length; i++)
		h = Math.imul(h ^ string.charCodeAt(i), 0x9E3779B1) // 0x9E3779B1 (2654435761) is the closest prime number to (2 ^ 32) * GOLDEN_RATIO

	return new EEHHashedString((h ^ h >>> 16) >>> 0)
}

/*
*	Safely access a string when it's unknown if it's hashed or not
*/
Helper.getString = (data) =>
{
	if (data instanceof EEHHashedString)
		return data.getVaue()

	if (!Helper.isString(data))
		return String(data)

	return data
}

/*
*	Safely access a number
*/
Helper.getNumber = (number, isFloat, fallback = 0) =>
{
	if (!Helper.isNumber(number))
	{
		if (isFloat)
			number = parseFloat(number)
		else
			number = parseInt(number)

		if (!Helper.isNumber(number))
			return fallback
	}

	return number
}

/*
*	Safely access a boolean
*/
Helper.getBool = (bool, fallback = false) =>
{
	if (Helper.isBool(bool)) return bool

	if (Helper.isString(bool))
	{
		if ((/true/).test(bool)) return true
		if ((/false/).test(bool)) return false
	}

	return fallback
}

/*
*	Converts a string or number to a price, throws an error if parsing failed
*/
Helper.priceify = (data) =>
{
	if (Helper.isString(data))
	{
		data = parseFloat(data)
		if (!Helper.isNumber(data))
			throw new Error("Invalid data passed to priceify")
	}
	else if (typeof(data) !== "number")
		throw new Error("Invalid data passed to priceify")

	return data.toFixed(2)
}

/*
*	Copies an array
*/
Helper.copyArray = (array) =>
{
	const newArray = []
	for (const entry of array)
		newArray.push(entry)

	return newArray
}

/*
*	Registers a function to be ran on an event
*/
Helper.g_Events = new Map()

Helper.executeEvent = (event) =>
{
	let array = Helper.g_Events.get(event.type)
	if (!array) return

	const permanents = array.m_iPermanentCallbacks

	array = array.filter((callback) =>
	{
		if (callback.m_bPermanent)
		{
			callback(event)
			return true
		}
		else
		{
			if (callback(event) === false)
				return true
			else
				return false
		}
	})

	array.m_iPermanentCallbacks = permanents // Restore
	Helper.g_Events.set(event.type, array)

	if (array.length > array.m_iPermanentCallbacks)
		setTimeout(Helper.executeEvent, 100, event)
}

Helper.hookEvent = (listener, name, permanent, callback) =>
{
	if (typeof(listener.addEventListener) !== "function")
		throw new Error(`Listener '${listener}' does not have method 'addEventListener'`)

	let array = Helper.g_Events.get(name)

	if (!array)
	{
		array = []
		listener.addEventListener(name, Helper.executeEvent)
	}

	if (!array.m_iPermanentCallbacks)
		array.m_iPermanentCallbacks = 0

	if (permanent)
	{
		array.m_iPermanentCallbacks++
		callback.m_bPermanent = true
	}

	array.push(callback)
	Helper.g_Events.set(name, array)
}