let AccountManager = new Map()

/*
*	Returns a map of accounts that exist or an empty map on failure
*/
AccountManager.getAccountList = () =>
{
	const accountList = StorageManager.getStoredString("accountList")
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
AccountManager.storeAccountList = (accountMap) =>
{
	if (!(accountMap instanceof Map))
		return false

	const accountList = JSON.stringify(Object.fromEntries(accountMap))
	StorageManager.setStoredValue("accountList", accountList)

	return true
}

/*
*	Returns true if an account exists and the provided information is correct, false otherwise
*/
AccountManager.validateAccount = (email, password, uid) =>
{
	const accountMap = AccountManager.getAccountList()

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
AccountManager.lookupAccount = (email, accountMap = null) =>
{
	if (!accountMap)
		accountMap = AccountManager.getAccountList()

	let index = 1
	while (accountMap[index])
	{
		const currentAccount = accountMap[index]
		if (!currentAccount) break

		if (currentAccount[0] === email)
			return currentAccount

		index++
	}

	return null
}

/*
*	Attempts to set the current account
*
*	Returns true on success, false otherwise
*/
AccountManager.login = (email, password) =>
{
	const hashedPassword = Helper.hash(password)
	password = ""

	const accountInformation = AccountManager.lookupAccount(email)
	if (!accountInformation) return false

	if (accountInformation[0] !== email) return false
	if (accountInformation[1] !== hashedPassword) return false

	StorageManager.setStoredValue("email", accountInformation[0])
	StorageManager.setStoredValue("password", accountInformation[1])
	StorageManager.setStoredValue("uid", accountInformation[2])

	return true
}

/*
*	Logs the user out of the current account
*/
AccountManager.logout = () =>
{
	StorageManager.setStoredValue("email", "")
	StorageManager.setStoredValue("password", "")
	StorageManager.setStoredValue("uid", 0)
}

/*
*	Attempts to create an account with the provided email and hashed password
*
*	Returns true on success, false on failure
*/
AccountManager.signUp = (email, password) =>
{
	const hashedPassword = Helper.hash(password)
	password = ""

	const accountMap = AccountManager.getAccountList()
	if (AccountManager.lookupAccount(email, accountMap)) return false

	const uid = Object.keys(accountMap).length + 1
	if (!Number.isSafeInteger(uid)) return false

	let newAccount = []

	newAccount[0] = email
	newAccount[1] = hashedPassword
	newAccount[2] = uid

	return true
}

///////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", () =>
{
	const email = StorageManager.getStoredString("email")
	const password = StorageManager.getStoredString("password")
	const uid = StorageManager.getStoredInteger("uid")

	if (uid != 0 && !AccountManager.validateAccount(email, password, uid))
		return AccountManager.logout()

	AccountManager.login(email, password, true)
})