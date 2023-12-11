const AccountManager = {}

AccountManager.ACCOUNT_TYPE_INVALID = 0
AccountManager.ACCOUNT_TYPE_USER = 1
AccountManager.ACCOUNT_TYPE_MANAGER = 2

/*
*	Returns the string representation of an account type
*/
AccountManager.stringifyAccountType = (type) =>
{
	switch (type)
	{
		default:
		case AccountManager.ACCOUNT_TYPE_INVALID:
			return "INVALID"

		case AccountManager.ACCOUNT_TYPE_USER:
			return "User"

		case AccountManager.ACCOUNT_TYPE_MANAGER:
			return "Manager"
	}
}

/*
*	Returns a map of accounts that exist or an empty map on failure
*/
AccountManager.getAccountList = () =>
{
	const accountList = StorageManager.getStoredString("accountList")
	if (accountList.length < 1)
		return new Map()

	const accountMap = Helper.parse(accountList)
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

	const accountList = Helper.json(accountMap)
	StorageManager.setStoredValue("accountList", accountList)

	return true
}

/*
*	Sets the current active account
*/
AccountManager.setActiveAccount = (accountData) =>
{
	if (!accountData)
		StorageManager.removeStoredValue("activeAccount")
	else
		StorageManager.setStoredValue("activeAccount", Helper.json(accountData))

	AccountManager.g_bLoggedIn = accountData != null
	AccountManager.g_AccountData = AccountManager.g_bLoggedIn ? accountData : null
}

/*
*	Returns true if an account exists and the provided information is correct, false otherwise
*/
AccountManager.validateAccount = (email, password, uid, accountType) =>
{
	const accountData = AccountManager.lookupAccount(email)
	if (!accountData) return false

	if (accountData.email !== email) return false
	if (accountData.password !== password) return false
	if (accountData.userID !== uid) return false
	if (accountData.type !== accountType) return false

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

		if (currentAccount.email === email)
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

	if (accountInformation.email !== email) return false
	if (accountInformation.password !== hashedPassword) return false

	AccountManager.setActiveAccount(accountInformation)

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
AccountManager.logout = (refresh) =>
{
	AccountManager.setActiveAccount(null)

	if (refresh)
		location.reload()
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

		if (currentAccount.email === email)
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
*	Resets the password on an account
*/
AccountManager.resetAccountPassword = (email) =>
{
	const currentAccountData = AccountManager.lookupAccount(email)
	if (!currentAccountData) return false

	currentAccountData.password = Helper.hash("12345678")
	return AccountManager.updateAccount(email, currentAccountData)
}

/*
*	Resets the password on an account with a prompt
*/
AccountManager.resetAccountPasswordPrompt = (email) =>
{
	const currentAccountData = AccountManager.lookupAccount(email)
	if (!currentAccountData) return false

	let response = ""
	while (response.length < 8)
		response = prompt("Enter your new password (Minimum of 8 characters)")

	currentAccountData.password = Helper.hash(response)
	if (AccountManager.updateAccount(email, currentAccountData))
	{
		alert("Password changed. Please login again")
		return true
	}
	else
	{
		alert("Failed to change password")
		return false
	}
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

	let newAccount = {}

	newAccount.email = email
	newAccount.password = hashedPassword
	newAccount.userID = uid
	newAccount.type = accountType
	newAccount.orderHistory = []
	newAccount.paymentMethods = []
	newAccount.notifications = []

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
*
*	Default manager password is 'abcd1234' (Hashes to '2416706371')
*/
Helper.hookEvent(window, "load", false, () =>
{
	AccountManager.signUpHashed("manager@eeh.com", "2416706371", AccountManager.ACCOUNT_TYPE_MANAGER)
})

/*
*	Ensure valid logon state
*/
Helper.hookEvent(window, "load", false, () =>
{
	const storedAccountData = StorageManager.getStoredString("activeAccount")
	if (storedAccountData.length < 1)
	{
		AccountManager.g_bLoggedIn = false
		return
	}

	const storedAccount = Helper.parse(storedAccountData)

	const wasLoggedIn = storedAccount.email.length > 0 || storedAccount.password.length > 0

	if (storedAccount.userID != 0 && !AccountManager.validateAccount(storedAccount.email, storedAccount.password, storedAccount.userID, storedAccount.type))
	{
		AccountManager.logout(false)

		if (wasLoggedIn)
			location.reload()

		return
	}

	AccountManager.loginHashed(storedAccount.email, storedAccount.password)
})