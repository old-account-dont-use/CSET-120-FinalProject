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

	return String((h ^ h >>> 16) >>> 0)
}

/*
*	Converts something to a JSON string
*	Same as JSON.stringify, but with Map support
*/
Helper.json = (data) =>
{
	if (data instanceof Map)
	{
		data = Object.fromEntries(data)
		data.m_bWasMap = true
	}

	return JSON.stringify(data)
}

/*
*	Converts JSON to an object
*	Same as JSON.parse, but with Map support
*/
Helper.parse = (data) =>
{
	data = Helper.getString(data)

	let converted = JSON.parse(data)

	if (converted.m_bWasMap)
	{
		delete converted.m_bWasMap
		converted = new Map(Object.entries(converted))
	}

	return converted
}

/*
*	Safely access a string
*/
Helper.getString = (data) =>
{
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
*	Clamp
*/
Helper.clamp = (x, y, z) =>
{
	if (x < y) return y
	if (x > z) return z
	return x
}

/*
*	Converts a string or number to a price, throws an error if parsing failed
*
*	Example: Helper.priceify(12.567) -> "$12.57"
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

	return `$${data.toFixed(2)}`
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
*	Copies an object
*/
Helper.copyObject = (object) =>
{
	const newObject = {}

	for (const property of Object.getOwnPropertyNames(object))
	{
		let data = object[property]

		if (data instanceof Array)
			data = Helper.copyArray(data)
		else if (data instanceof Object)
			data = Helper.copyObject(data)

		newObject[property] = data
	}

	return newObject
}

/*
*	Compares two arrays
*	Returns true if they are the same, false otherwise
*/
Helper.compareArrays = (array1, array2) =>
{
	if (array1 === array2) return true
	if (array1.length != array2.length) return false

	for (let i = 0; i < array1.length; i++)
		if (array1[i] !== array2[i]) return false

	return true
}

/*
*	Compares two objects
*	Returns true if they are the same, false otherwise
*/
Helper.compareObjects = (object1, object2) =>
{
	if (object1 === object2) return true

	const firstSet = Object.getOwnPropertyNames(object1)
	const secondSet = Object.getOwnPropertyNames(object2)

	if (firstSet.length != secondSet.length) return false

	for (const key of firstSet)
	{
		const first = object1[key]
		const second = object2[key]

		const firstIsArray = first instanceof Array
		const secondIsArray = second instanceof Array
		if (firstIsArray != secondIsArray) return false
		if (firstIsArray && secondIsArray)
		{
			if (!Helper.compareArrays(first, second))
				return false

			continue
		}

		const firstIsObject = first instanceof Object
		const secondIsObject = second instanceof Object
		if (firstIsObject != secondIsObject) return false
		if (firstIsObject && secondIsObject)
		{
			if (!Helper.compareObjects(first, second))
				return false

			continue
		}

		if (first !== second) return false
	}

	return true
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