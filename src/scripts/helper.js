let Helper = new Map()

/*
*	Returns true if the passed in value is a string
*/
Helper.isString = (value) =>
{
	return (value instanceof String) || typeof(value) == "string"
}

/*
*	Hashes a string
*/
Helper.hash = (string) =>
{
	if (!Helper.isString(string))
		string = String(string)

    for (var i = 0, h = 0xDEADBEEF; i < string.length; i++)
        h = Math.imul(h ^ string.charCodeAt(i), 2654435761)

    return (h ^ h >>> 16) >>> 0
};

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