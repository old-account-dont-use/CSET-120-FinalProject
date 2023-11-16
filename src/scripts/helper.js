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

    for(var i = 0, h = 0xDEADBEEF; i < string.length; i++)
        h = Math.imul(h ^ string.charCodeAt(i), 2654435761)

    return (h ^ h >>> 16) >>> 0
};

/*
*	Registers a function to be ran on page load
*/
Helper.g_LoadEvents = []
Helper.addLoadEvent = (event) =>
{
	if (Helper.g_LoadEvents.includes(event))
		return

	Helper.g_LoadEvents.push(event)
}

///////////////////////////////////////////////////////////////////////////////
Helper.g_LoadEventManager = () =>
{
	Helper.g_LoadEvents = Helper.g_LoadEvents.filter((event) =>
	{
		if (event() === false)
			return true
		else
			return false
	})

	if (Helper.g_LoadEvents.length > 0)
		setTimeout(Helper.g_LoadEventManager, 100)
}

window.addEventListener("load", Helper.g_LoadEventManager)