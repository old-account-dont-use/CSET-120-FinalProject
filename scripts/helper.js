/*
*	Returns true if the passed in value is a string
*/
function isString(value)
{
	return (value instanceof String) || typeof(value) == "string"
}

/*
*	Hashes a string
*/
function hash(string)
{
    for(var i = 0, h = 0xDEADBEEF; i < string.length; i++)
        h = Math.imul(h ^ string.charCodeAt(i), 2654435761)

    return (h ^ h >>> 16) >>> 0
};