/*
*
*	Some classes
*
*/

class EEHMenuTopping
{
	constructor(toppingData)
	{
		this.m_strName = Helper.getString(toppingData.name)
		this.m_bAvailable = Helper.getBool(toppingData.available)
		this.m_flPrice = Helper.priceify(Helper.getNumber(toppingData.price, true, 0))
	}

	/*
	*	Getters
	*/
	static getName()
	{
		return this.m_strName
	}

	static getAvailable()
	{
		return this.m_bAvailable
	}

	static getPrice()
	{
		return this.m_flPrice
	}

	/*
	*	Setters
	*/
	static setAvailable(available)
	{
		this.m_bAvailable = Helper.getBool(available)
	}

	static setPrice(price)
	{
		this.m_flPrice = Helper.priceify(Helper.getNumber(price, true, 0))
	}
}

class EEHMenuItem
{
	constructor(itemData)
	{
		this.m_strName = Helper.getString(itemData.name)
		this.m_strDescription = Helper.getString(itemData.description)
		this.m_strImage = Helper.getString(itemData.image)
		this.m_bAvailable = Helper.getBool(itemData.available)
		this.m_arrToppings = itemData.m_arrToppings
		this.m_flPrice = Helper.getnumber(itemData.price, true, 0)
	}

	/*
	*	Getters
	*/
	static getName()
	{
		return this.m_strName
	}

	static getDescription()
	{
		return this.m_strDescription
	}

	static getImage()
	{
		return this.m_strImage
	}

	static getAvailable()
	{
		return this.m_bAvailable
	}

	static getToppings()
	{
		return Helper.copyArray(this.m_arrToppings)
	}

	static getPrice()
	{
		return this.m_flPrice
	}

	/*
	*	Setters
	*/
	static setAvailable(available)
	{
		this.m_bAvailable = Helper.getBool(available)
	}

	static setPrice(price)
	{
		this.m_flPrice = Helper.priceify(Helper.getNumber(price, true, 0))
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