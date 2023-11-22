let AccountManager = new Map()

AccountManager.ACCOUNT_TYPE_USER = 1
AccountManager.ACCOUNT_TYPE_MANAGER = 2

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
AccountManager.validateAccount = (email, password, uid, accountType) =>
{
	const accountData = AccountManager.lookupAccount(email)
	if (!accountData) return false

	if (accountData[0] !== email) return false
	if (accountData[1] !== password) return false
	if (accountData[2] !== uid) return false
	if (accountData[3] !== accountType) return false

	return true
}

/*
*	Returns the account found with the provided email, null if not found
*
*	Optional argument to provide an account map so a new one doesn't have to be generated
*/
AccountManager.lookupAccount = (email, accountMap = null) =>
{
	if (!accountMap)
		accountMap = AccountManager.getAccountList()

	const keys = Array.from(accountMap.keys())

	for (const index of keys)
	{
		const currentAccount = accountMap.get(index)
		if (!currentAccount) continue

		if (currentAccount[0] === email)
			return currentAccount
	}

	return null
}

/*
*	Attempts to set the current account with a hashed password
*
*	Returns true on success, false otherwise
*/
AccountManager.loginHashed = (email, hashedPassword) =>
{
	AccountManager.g_bLoggedIn = false
	AccountManager.g_AccountData = null

	const accountInformation = AccountManager.lookupAccount(email)
	if (!accountInformation) return false

	if (accountInformation[0] !== email) return false
	if (accountInformation[1] !== hashedPassword) return false

	StorageManager.setStoredValue("email", accountInformation[0])
	StorageManager.setStoredValue("password", accountInformation[1])
	StorageManager.setStoredValue("uid", accountInformation[2])
	StorageManager.setStoredValue("accountType", accountInformation[3])

	AccountManager.g_bLoggedIn = true
	AccountManager.g_AccountData = [accountInformation[0], accountInformation[3] ]
	return true
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

	return AccountManager.loginHashed(email, hashedPassword)
}

/*
*	Logs the user out of the current account
*/
AccountManager.logout = () =>
{
	StorageManager.setStoredValue("email", "")
	StorageManager.setStoredValue("password", "")
	StorageManager.setStoredValue("uid", 0)
	StorageManager.setStoredValue("accountType", 0)

	AccountManager.g_bLoggedIn = false
	AccountManager.g_AccountData = null
}

/*
*	Updates the provided account
*	This function would usually have a lot of security. But, seeing as this is not a serious account, it's no big deal
*
*	Returns true on success, false otherwise
*/
AccountManager.updateAccount = (email, accountData) =>
{
	const currentAccountData = AccountManager.lookupAccount(email)
	if (!currentAccountData) return false

	const accountMap = AccountManager.getAccountList()

	const keys = Array.from(accountMap.keys())
	for (const index of keys)
	{
		const currentAccount = accountMap.get(index)
		if (!currentAccount) continue

		if (currentAccount[0] === email)
		{
			accountMap.set(index, accountData)
			AccountManager.storeAccountList(accountMap)

			return true
		}
	}

	// HOW is it not found when lookupAccount returns the data???
	return false
}

/*
*	Signs up with a hashed password
*/
AccountManager.signUpHashed = (email, hashedPassword, accountType = AccountManager.ACCOUNT_TYPE_USER) =>
{
	const accountMap = AccountManager.getAccountList()
	if (AccountManager.lookupAccount(email, accountMap)) return false

	const uid = Array.from(accountMap.keys()).length + 1
	if (!Number.isSafeInteger(uid)) return false

	let newAccount = []

	newAccount[0] = email
	newAccount[1] = hashedPassword
	newAccount[2] = uid
	newAccount[3] = accountType

	accountMap.set(uid, newAccount)

	return AccountManager.storeAccountList(accountMap)
}

/*
*	Attempts to create an account with the provided email and hashed password
*
*	Returns true on success, false on failure
*/
AccountManager.signUp = (email, password, accountType = AccountManager.ACCOUNT_TYPE_USER) =>
{
	const hashedPassword = Helper.hash(password)
	password = ""

	return AccountManager.signUpHashed(email, hashedPassword)
}

/*
*	Create default manager account
*/
Helper.hookEvent(window, "load", false, () =>
{
	AccountManager.signUpHashed("manager@eeh.com", 1562414320, AccountManager.ACCOUNT_TYPE_MANAGER)
})

/*
*	Ensure valid logon state
*/
Helper.hookEvent(window, "load", false, () =>
{
	const email = StorageManager.getStoredString("email")
	const password = StorageManager.getStoredString("password")
	const uid = StorageManager.getStoredInteger("uid")
	const accountType = StorageManager.getStoredInteger("accountType")

	if (uid != 0 && !AccountManager.validateAccount(email, password, uid, accountType))
	{
		AccountManager.logout()

		if (email.length > 0 || password.length > 0 || uid > 0 || accountType > 0)
			location.reload()

		return
	}

	AccountManager.loginHashed(email, password)
})