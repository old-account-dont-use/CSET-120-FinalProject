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