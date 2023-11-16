/*
*	Returns a map of accounts that exist or an empty map on failure
*/
function getAccountList()
{
	const accountList = getStoredString("accountList")
	if (accountList.length < 1)
		return new Map()

	const accountMap = new Map(Object.entries(JSON.parse(accountList)))
	return accountMap
}

/*
*	Sets the stored account list to the provided map
*
*	Returns true on success, false on failure
*/
function storeAccountList(accountMap)
{
	if (!(accountMap instanceof Map))
		return false

	const accountList = JSON.stringify(Object.fromEntries(accountMap))
	setStoredValue("accountList", accountList)

	return true
}

/*
*	Returns true if an account exists and the provided information is correct, false otherwise
*/
function validateAccount(email, password, uid)
{
	const accountMap = getAccountList()

	const uidInfomration = accountMap[uid]
	if (!uidInfomration || !(uidInfomration instanceof Array)) return false

	if (uidInfomration[0] !== email) return false
	if (uidInfomration[1] !== password) return false
	if (uidInfomration[2] !== uid) return false

	return true
}

/*
*	Returns the account found with the provided email, null if not found
*/
function lookupAccount(email)
{
	const accountMap = getAccountList()

	let index = 1
	while (accountMap[index])
	{
		const currentAccount = accountMap[index]
		if (!currentAccount) break

		if (currentAccount[0] == email)
			return currentAccount

		index++
	}

	return null
}

/*
*	Attempts to set the current account
*/
function login(email, password)
{
	const hashedPassword = hash(password)
	password = ""


}

/*
*	Logs the user out of the current account
*/
function logout()
{
	setStoredValue("uid", 0)
	setStoredValue("email", "")
	setStoredValue("password", "")

	location.reload()
}

/*
*	Attempts to create an account with the provided email and hashed password
*
*	Returns true on success, false on failure
*/
function signUp(email, password)
{
	const hashedPassword = hash(password)
	password = ""
}

window.addEventListener("load", () =>
{
	const email = getStoredString("email")
	const password = getStoredString("password")
	const uid = getStoredInteger("uid")

	if (uid != 0 && !validateAccount(email, password, uid))
		return logout()

	login(email, password)
})