/*
*
*	Some classes
*
*/

class EEHMenuItem
{
	constructor(itemData)
	{

	}
}

class EEHOrder
{
	constructor(orderData)
	{
		this.m_iDate = Helper.getNumber(orderData.date)
		this.m_arrItems = orderData.items
		this.m_flPrice = Helper.priceify(Helper.getNumber(orderData.price, true, 0))
	}


}

class EEHAccount
{
	constructor(accountData)
	{
		this.m_strEmail = Helper.getString(accountData[0])

		this.m_strPassword = Helper.getString(accountData[1])
		this.m_hPassword = new EEHHashedString(this.m_strPassword)

		this.m_iUserID = Helper.getNumber(accountData[2], false, -1)
		if (this.m_iUserID < 0) throw new Error("Invalid account User ID")

		this.m_iAccountType = Helper.getNumber(accountData[3], false, -1)
		if (this.m_iAccountType < 0) throw new Error("Invalid account Type")

		this.m_arrOrderHistory = accountData[4]
		this.m_arrPaymentMethods = accountData[5]
		this.m_arrNotifications = accountData[6]
	}

	/*
	*	Getters
	*/
	static getEmail()
	{
		return this.m_strEmail
	}

	static getPassword()
	{
		return this.m_hPassword
	}

	static getUserID()
	{
		return this.m_iUserID
	}

	static getAccountType()
	{
		return this.m_iAccountType
	}

	static getOrderHistory()
	{
		return Helper.copyArray(this.m_arrOrderHistory)
	}

	static getPaymentMethods()
	{
		return Helper.copyArray(this.m_arrPaymentMethods)
	}

	static getNotifications()
	{
		return Helper.copyArray(this.m_arrNotifications)
	}

	/*
	*	Setters
	*/
	static setPassword(newPassword)
	{
		this.m_strPassword = Helper.getString(newPassword)
		this.m_hPassword = new EEHHashedString(this.m_strPassword)
	}

	static addOrder(orderData)
	{

	}

	static addPaymentMethod()
	{

	}

	static addNotification()
	{

	}
}