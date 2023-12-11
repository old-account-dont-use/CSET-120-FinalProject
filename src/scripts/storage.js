const StorageManager = {}

/*
*	Getters
*/

/*
*	Gets a stored string from the session
*
*	Returns the found string or an empty string on failure
*/
StorageManager.getStoredString = (keyName) =>
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
StorageManager.getStoredInteger = (keyName) =>
{
	const value = StorageManager.getStoredString(keyName)
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
StorageManager.getStoredUnsignedInteger = (keyName) =>
{
	const value = StorageManager.getStoredString(keyName)
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
StorageManager.getStoredFloat = (keyName, decimals = 15) =>
{
	const value = StorageManager.getStoredString(keyName)
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
StorageManager.getStoredUnsignedFloat = (keyName, decimals = 15) =>
{
	const value = StorageManager.getStoredString(keyName)
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
StorageManager.setStoredValue = (keyName, value) =>
{
	if (!keyName)
		throw new Error(`Invalid keyName '${keyName}' provided`)

	if (!Helper.isString(keyName))
		keyName = String(keyName)

	if (Helper.isString(value))
		sessionStorage.setItem(keyName, value)
	else
		sessionStorage.setItem(keyName, String(value))
}

/*
*	Removes a key from the session
*/
StorageManager.removeStoredValue = (keyName) =>
{
	if (!keyName)
	throw new Error(`Invalid keyName '${keyName}' provided`)

	if (!Helper.isString(keyName))
		keyName = String(keyName)

	sessionStorage.removeItem(keyName)
}