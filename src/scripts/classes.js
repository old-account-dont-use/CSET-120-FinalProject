/*
*
*	Some classes
*
*/

class EEHMenuTopping
{
	constructor(toppingData)
	{
		this.m_strName = Helper.getString(toppingData.m_strName)
		this.m_bAvailable = Helper.getBool(toppingData.m_bAvailable)
		this.m_flPrice = Helper.priceify(Helper.getNumber(toppingData.m_flPrice, true, 0))
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
		for (const topping of itemData.m_arrToppings)
		{
			if ((!topping instanceof EEHMenuTopping))
				throw new Error("Invalid topping")
		}

		this.m_strName = Helper.getString(itemData.m_strName)
		this.m_strDescription = Helper.getString(itemData.m_strDescription)
		this.m_strImage = Helper.getString(itemData.m_strImage)
		this.m_bAvailable = Helper.getBool(itemData.m_bAvailable)
		this.m_arrToppings = Helper.copyArray(itemData.m_arrToppings)
		this.m_flPrice = Helper.getnumber(itemData.m_flPrice, true, 0)
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
		for (const item of orderData.m_arrItems)
		{
			if ((!item instanceof EEHMenuItem))
				throw new Error("Invalid MenuItem")
		}

		this.m_iDate = Helper.getNumber(orderData.m_iDate)
		this.m_arrItems = Helper.copyArray(orderData.m_arrItems)

		this.updatePrice()
	}

	static updatePrice()
	{
		let price = 0

		for (const item of this.m_arrItems)
			price += item.getPrice()

		this.m_flPrice = Helper.priceify(price)
	}

	/*
	*	Getters
	*/
	static getDate()
	{
		return new Date(this.m_iDate)
	}

	static getItems()
	{
		return Helper.copyArray(this.m_arrItems)
	}

	static getPrice()
	{
		return this.m_flPrice
	}

	/*
	*	Setters
	*/
	static addItem(menuItem)
	{
		if (!(menuItem instanceof EEHMenuItem))
			throw new Error("Invalid MenuItem")

		this.m_arrItems.push(menuItem)
		this.updatePrice()
	}
}

class EEHAccount
{
	constructor(accountData)
	{
		this.m_strEmail = Helper.getString(accountData.m_strEmail)

		this.m_strPassword = Helper.getString(accountData.m_strPassword)
		this.m_hPassword = new EEHHashedString(this.m_strPassword)

		this.m_iUserID = Helper.getNumber(accountData.m_iUserID, false, -1)
		if (this.m_iUserID < 0) throw new Error("Invalid account User ID")

		this.m_iAccountType = Helper.getNumber(accountData.m_iAccountType, false, -1)
		if (this.m_iAccountType < 0) throw new Error("Invalid account Type")

		for (const order of accountData.m_arrOrderHistory)
		{
			if (!(order instanceof EEHOrder))
				throw new Error("Invalid Order")
		}

		for (const paymentMethod of accountData.m_arrPaymentMethods)
		{

		}

		for (const notification of accountData.m_arrNotifications)
		{

		}

		this.m_arrOrderHistory = Helper.copyArray(accountData.m_arrOrderHistory)
		this.m_arrPaymentMethods = Helper.copyArray(accountData.m_arrPaymentMethods)
		this.m_arrNotifications = Helper.copyArray(accountData.m_arrNotifications)
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
		return AccountManager.stringifyAccountType(this.m_iAccountType)
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

	static addOrder(order)
	{
		if (!(order instanceof EEHOrder))
			throw new Error("Invalid Order")

		this.m_arrOrderHistory.push(order)
	}

	static addPaymentMethod(paymentMethod)
	{
		throw new Error("Not implemented")
	}

	static addNotification(notification)
	{
		throw new Error("Not implemented")
	}
}