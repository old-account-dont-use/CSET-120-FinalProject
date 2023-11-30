/*
*
*	Some classes
*
*/

class EEHHashedString
{
	constructor(value)
	{
		this.m_strValue = Helper.getString(value)
	}

	static getValue()
	{
		return this.m_strValue
	}
}

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
		for (const topping of itemData.toppings)
		{
			if ((!topping instanceof EEHMenuTopping))
				throw new Error("Invalid topping")
		}

		this.m_strName = Helper.getString(itemData.name)
		this.m_strDescription = Helper.getString(itemData.description)
		this.m_strImage = Helper.getString(itemData.image)
		this.m_bAvailable = Helper.getBool(itemData.available)
		this.m_arrToppings = Helper.copyArray(itemData.toppings)
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
		for (const item of orderData.items)
		{
			if ((!item instanceof EEHMenuItem))
				throw new Error("Invalid MenuItem")
		}

		this.m_iDate = Helper.getNumber(orderData.date)
		this.m_arrItems = Helper.copyArray(orderData.items)

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
		return new Date(this.m_iDate * 1000)
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
		this.m_strEmail = Helper.getString(accountData[0])

		this.m_strPassword = Helper.getString(accountData[1])
		this.m_hPassword = new EEHHashedString(this.m_strPassword)

		this.m_iUserID = Helper.getNumber(accountData[2], false, -1)
		if (this.m_iUserID < 0) throw new Error("Invalid account User ID")

		this.m_iAccountType = Helper.getNumber(accountData[3], false, -1)
		if (this.m_iAccountType < 0) throw new Error("Invalid account Type")

		for (const order of accountData[4])
		{
			if (!(order instanceof EEHOrder))
				throw new Error("Invalid Order")
		}

		for (const paymentMethod of accountData[5])
		{

		}

		for (const notification of accountData[6])
		{

		}

		this.m_arrOrderHistory = Helper.copyArray(accountData[4])
		this.m_arrPaymentMethods = Helper.copyArray(accountData[5])
		this.m_arrNotifications = Helper.copyArray(accountData[6])
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