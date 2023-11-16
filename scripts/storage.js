/*
*	Getters
*/

/*
*	Gets a stored string from the session
*
*	Returns the found string or an empty string on failure
*/
function getStoredString(keyName)
{
	const value = sessionStorage.getItem(keyName)

	if (!value)
		return ""
	else
		return value
}

/*
*	Gets a stored integer from the session
*
*	Returns the found integer or -1 on failure
*/
function getStoredInteger(keyName)
{
	const value = getStoredString(keyName)
	const iValue = parseInt(value)

	if (Number.isNaN(iValue))
		return -1
	else
		return iValue
}

/*
*	Gets a stored unsigned integer from the session
*
*	Returns the found unsigned integer or 0 on failure/invalid
*/
function getStoredUnsignedInteger(keyName)
{
	const value = getStoredString(keyName)
	const uiValue = parseInt(value)

	if (Number.isNaN(uiValue) || uiValue < 0)
		return 0
	else
		return uiValue
}

/*
*	Gets a stored float from the session
*	Optional decimal parameter to round the float to x amount of decimal places
*
*	Returns the found float or -1 on failure
*/
function getStoredFloat(keyName, decimals = 15)
{
	const value = getStoredString(keyName)
	const flValue = parseFloat(value)

	if (Number.isNaN(flValue))
		return -1
	else
		return flValue.toFixed(decimals)
}

/*
*	Gets a stored unsigned float from the session
*	Optional decimal parameter to round the float to x amount of decimal places
*
*	Returns the found unsigned float or 0 on failure/invalid
*/
function getStoredUnsignedFloat(keyName, decimals = 15)
{
	const value = getStoredString(keyName)
	const flValue = parseFloat(value)

	if (Number.isNaN(flValue) || flValue < 0)
		return 0
	else
		return flValue.toFixed(decimals)
}

/*
*	Setters
*/

/*
*	Stores a value into the session
*
*	Will automatically convert the data type to a string if necessary
*/
function setStoredValue(keyName, value)
{
	if (!keyName)
		throw new Error(`Invalid keyName '${keyName}' provided`)

	if (!isString(keyName))
		keyName = String(keyName)

	if (isString(value))
		sessionStorage.setItem(keyName, value)
	else
		sessionStorage.setItem(keyName, String(value))
}