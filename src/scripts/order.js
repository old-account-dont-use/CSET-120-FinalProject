const Order = {}

Order.PAYMENT_TYPE_CASH = 1
Order.PAYMENT_TYPE_CARD = 2
Order.PAYMENT_TYPE_PAYPAL = 3
Order.PAYMENT_TYPE_APPLE = 4
Order.PAYMENT_TYPE_SAMSUNG = 5
Order.PAYMENT_TYPE_GOOGLE = 6

Order.totalQuantity = 0
Order.subTotal = 0

/*
*	Translate an order type to string
*/
Order.translateType = (type) =>
{
	switch (type)
	{
		default:
			return "UNKNOWN"

		case Order.PAYMENT_TYPE_CASH:
			return "Cash"

		case Order.PAYMENT_TYPE_CARD:
			return "Card"

		case Order.PAYMENT_TYPE_PAYPAL:
			return "PayPal"

		case Order.PAYMENT_TYPE_APPLE:
			return "ApplePay"

		case Order.PAYMENT_TYPE_SAMSUNG:
			return "SamsungPay"

		case Order.PAYMENT_TYPE_GOOGLE:
			return "GooglePay"
	}
}

/*
*	Sets up a payment page
*/
Order.createPaymentPage = (paymentType) =>
{
	//payment container
		const paymentContainer =  document.createElement("div")
		paymentContainer.id = "payment_container"
		paymentContainer.classList.add("flexbox_column")

	//payment heading
		const paymentHeading = document.createElement("h1")
		paymentHeading.id = "payment_heading"
		paymentHeading.innerHTML = "Payment"
		paymentHeading.classList.add("center_text")
		// paymentHeading.classList.add("glass_morphism")

	//payment content container
		const paymentContentForm = document.createElement("form")
		paymentContentForm.id = "payment_content_form"
		paymentContentForm.classList.add("flexbox_column")
		paymentContentForm.classList.add("glass_morphism")

	//form sub containers
		const infoContainer = document.createElement("div")
		infoContainer.classList.add("payment_form_sub_container")
		// infoContainer.classList.add("glass_morphism")

		const submitContainer = document.createElement("div")
		submitContainer.id = "payment_form_submit_container"
		submitContainer.classList.add("payment_form_sub_container")
		// submitContainer.classList.add("glass_morphism")

	//name for order
		const name = document.createElement("input")
		name.classList.add("glass_morphism")
		name.id = "customer_name"
		name.setAttribute("type", "text")
		name.setAttribute("min", "1")
		name.setAttribute("max", "25")
		name.setAttribute("placeholder", "Enter your name")
		name.required = true

		infoContainer.appendChild(name)

	paymentContentForm.appendChild(infoContainer)

	paymentContainer.appendChild(paymentHeading)
	paymentContainer.appendChild(paymentContentForm)

	document.body.appendChild(paymentContainer)

	//card payment section
		if(paymentType === Order.PAYMENT_TYPE_CARD)
		{
			//card number input
			const number = document.createElement("input")
			number.id = "card_number"
			number.classList.add("glass_morphism")
			number.setAttribute("type", "text")
			number.setAttribute("minlength", "10")
			number.setAttribute("maxlength", "20")
			number.setAttribute("placeholder", "Card Number")
			number.required = true

			//card expiration input
			const expiration = document.createElement("input")
			expiration.classList.add("glass_morphism")
			expiration.id = "card_expiration"
			expiration.setAttribute("type", "text")
			expiration.setAttribute("minlength", "4")
			expiration.setAttribute("maxlength", "4")
			expiration.setAttribute("placeholder", "MMYY")
			expiration.required = true

			infoContainer.appendChild(number)
			infoContainer.appendChild(expiration)

		}

	//setting up the receipt after form is submitted
		paymentContentForm.onsubmit = () => {
			const number = document.querySelector("#card_number")

			//validating card number
			if (paymentType === Order.PAYMENT_TYPE_CARD && !Helper.validateCardNumber(number.value))
			{
				alert("Please enter a valid card number")
				return false
			}

			StorageManager.setStoredValue("name", name.value) //stores the name

			const accountData = AccountManager.g_AccountData

			//ensures that the user is logged in so the email could be retrieved
			if (!accountData) {
				alert("Please log in")
				return
			}

			alert("Thank you for your purchase")
			paymentContainer.remove()

			//brings to the receipt page
			window.open("../pages/receipt.html", "_blank")
			return false
		}

	//button for placing order
		const placeOrderBtn = document.createElement("input")
		placeOrderBtn.classList.add("glass_morphism")
		placeOrderBtn.setAttribute("type", "submit")
		placeOrderBtn.id = "place_order_btn"
		placeOrderBtn.innerHTML = "Place Order"

		submitContainer.appendChild(placeOrderBtn)
		paymentContentForm.appendChild(submitContainer)
}

/*
*	Creates the receipt for the order
*/
// Order.createReceipt = (paymentType, accountData) =>
Order.createReceipt = () =>
{
	const accountData = AccountManager.g_AccountData

	//receipt container
		const receiptContainer = document.createElement("div")
		receiptContainer.id = "receipt_container"

	//info section container
		const infoContainer = document.createElement("div")
		infoContainer.id = "receipt_info_container"
		receiptContainer.appendChild(infoContainer)

	//creating the customer info section
		Order.createCustomerInfo(StorageManager.getStoredString("name"), accountData.email, infoContainer)

	//orderID section
		const orderID = Helper.randomString()
		// StorageManager.setStoredValue(orderID, "orderInfoToBeCreated") //stores what's on receipt (customer info, cart)

		//container for orderID
		const orderIDContainer = document.createElement("div")
		orderIDContainer.id = "receipt_orderID_container"
		orderIDContainer.classList.add("flexbox")

		//label for orderID
		const orderIDLabel = document.createElement("h3")
		orderIDLabel.id = "receipt_order_ID_label"
		orderIDLabel.innerHTML = "Order ID:"

		//actual orderID value display
		const orderIDValue = document.createElement("p")
		orderIDValue.id = "receipt_order_ID_label"
		orderIDValue.innerHTML = orderID

		orderIDContainer.appendChild(orderIDLabel)
		orderIDContainer.appendChild(orderIDValue)
		infoContainer.appendChild(orderIDContainer)


	//creating the dates and times section
		Order.createDateSection(infoContainer)


	document.body.appendChild(receiptContainer)


	//creating the ordered items section
		Order.createOrderedItemsSection(receiptContainer)

	//creating the totals section
		Order.createTotalsSection(infoContainer)
}

Order.createOrderedItemsSection = (receiptContainer) =>
{
	//getting the cartItems that was stored and converting from string to array
	const cartItemsString = StorageManager.getStoredString("storedCart")
	const cartItemsArray = []

	for (const [ key, value ] of Menu.m_Cart)
	{
		const toppings = key.getToppings()
		const toppingArray = []

		for (const [ topping, active ] of toppings.entries())
		{
			if (!active) continue
			toppingArray.push(topping)
		}

		cartItemsArray.push({
			name: key.getName(),

			toppings: toppingArray,

			quantity: value,

			unitPrice: key.getPrice()
		})
	}

	//setting up the table for the ordered items

		const table = document.createElement("table")
		table.id = "receipt_items_table"

		const thRow = document.createElement("tr")

		const thItem = document.createElement("th")
		thItem.innerHTML = "Item"
		thItem.classList.add("receipt_table_header")
		thRow.appendChild(thItem)

		const thQuantity = document.createElement("th")
		thQuantity.innerHTML = "Quantity"
		thRow.appendChild(thQuantity)
		thQuantity.classList.add("receipt_table_header")

		const thUnitPrice = document.createElement("th")
		thUnitPrice.innerHTML = "Unit Price"
		thUnitPrice.classList.add("receipt_table_header")
		thRow.appendChild(thUnitPrice)

		const thPrice = document.createElement("th")
		thPrice.innerHTML = "Price"
		thRow.appendChild(thPrice)
		thPrice.classList.add("receipt_table_header")

		table.appendChild(thRow)
		receiptContainer.appendChild(table)


	//creating table content
		for (const item of cartItemsArray)
			Order.createTableRow(item, table)
}

Order.createTotalsSection = (container) =>
{
	//setting up quantity section
		const quantityContainer = document.createElement("div")
		quantityContainer.classList.add("flexbox")

		const quantityLabel = document.createElement("h3")
		quantityLabel.classList.add("receipt_totals_quantity")
		quantityLabel.innerHTML = "Number of Items:"
		quantityContainer.appendChild(quantityLabel)

		const quantityValue = document.createElement("p")
		quantityValue.innerHTML = Order.totalQuantity
		quantityContainer.appendChild(quantityValue)

		container.appendChild(quantityContainer)


	//setting up subtotal section
		const subtotalContainer = document.createElement("div")
		subtotalContainer.classList.add("flexbox")

		const subtotaLabel = document.createElement("h3")
		subtotaLabel.classList.add("receipt_totals_quantity")
		subtotaLabel.innerHTML = "Subtotal:"
		subtotalContainer.appendChild(subtotaLabel)

		const subtotalValue = document.createElement("p")
		subtotalValue.innerHTML = Helper.priceify(Order.subTotal)
		subtotalContainer.appendChild(subtotalValue)

		container.appendChild(subtotalContainer)

	//setting up tax section
		const taxContainer = document.createElement("div")
		taxContainer.classList.add("flexbox")

		const taxLabel = document.createElement("h3")
		taxLabel.classList.add("receipt_totals_quantity")
		taxLabel.innerHTML = "Taxes:"
		taxContainer.appendChild(taxLabel)

		const taxValue = document.createElement("p")
		taxValue.innerHTML = Helper.priceify(Order.subTotal * 0.06)
		taxContainer.appendChild(taxValue)

		container.appendChild(taxContainer)

	//setting up totals section
		const totalContainer = document.createElement("div")
		totalContainer.classList.add("flexbox")

		const totalLabel = document.createElement("h3")
		totalLabel.classList.add("receipt_totals_quantity")
		totalLabel.innerHTML = "Total:"
		totalContainer.appendChild(totalLabel)

		const totalValue = document.createElement("p")
		totalValue.innerHTML = Helper.priceify(Order.subTotal * 1.06)
		totalContainer.appendChild(totalValue)

		container.appendChild(totalContainer)
}

Order.createTableRow = (itemObj, table) =>
{
	const row = document.createElement("tr")

	const name  = itemObj.name

	const toppingsArray = itemObj.toppings

	const quantity = itemObj.quantity

	let unitPrice = itemObj.unitPrice

	//updating stats
	Order.totalQuantity += quantity
	Order.subTotal += quantity * unitPrice

	//creating item section
		const itemSection = document.createElement("td")
		itemSection.classList.add("receipt_td_item")

		const nameContainer = document.createElement("div")
		nameContainer.classList.add("flexbox")
		nameContainer.classList.add("receipt_item_name_container")

		const nameLabel = document.createElement("h3")
		nameLabel.classList.add("receipt_item_name")
		nameLabel.innerHTML = name
		nameContainer.appendChild(nameLabel)

		const namePrice = document.createElement("h3")
		namePrice.classList.add("receipt_item_name")
		namePrice.innerHTML = Helper.priceify(Menu.findItem(name)[0].getPrice())
		nameContainer.appendChild(namePrice)

		itemSection.appendChild(nameContainer)

		const toppingsLabel = document.createElement("div")

		for(const topping of toppingsArray)
		{
			const container = document.createElement("div")
			container.classList.add("receipt_toppings_container")
			container.classList.add("flexbox")


			const toppingName = document.createElement("p")
			toppingName.classList.add("receipt_topping_name")
			toppingName.innerHTML = topping.getName()

			const toppingPrice = document.createElement("p")
			toppingPrice.classList.add("receipt_topping_price")
			toppingPrice.innerHTML = Helper.priceify(topping.getPrice())

			Order.subTotal += topping.getPrice() * quantity

			unitPrice += topping.getPrice() * quantity

			container.appendChild(toppingName)
			container.appendChild(toppingPrice)
			toppingsLabel.appendChild(container)
		}
		itemSection.appendChild(toppingsLabel)
		row.appendChild(itemSection)


	//creating quantity section
		const quantitySection = document.createElement("td")
		quantitySection.classList.add("receipt_td_quantity")
		quantitySection.classList.add("center_text")
		quantitySection.innerHTML = quantity
		row.appendChild(quantitySection)


	//creating unit price section
		const unitPriceSection = document.createElement("td")
		unitPriceSection.classList.add("receipt_td_unitPrice")
		unitPriceSection.classList.add("center_text")
		unitPriceSection.innerHTML = Helper.priceify(unitPrice)
		row.appendChild(unitPriceSection)


	//creating price section
		const priceSection = document.createElement("td")
		priceSection.classList.add("receipt_td_price")
		priceSection.classList.add("center_text")
		priceSection.innerHTML = Helper.priceify(unitPrice * quantity)
		row.appendChild(priceSection)


	table.appendChild(row)
}

Order.createDateSection = (infoContainer) =>
{
	const dateObj = new Date()
	const currentDate = dateObj.toDateString()
	const currentTime = dateObj.toLocaleTimeString()
	const dMinutes = 20
	const estimatedTime = dateObj.toLocaleTimeString(dateObj.setMinutes(dateObj.getMinutes() + dMinutes))


	const dateSection = document.createElement("div")
	//current date
	{
		//container
		const currentDateContainer = document.createElement("div")
		currentDateContainer.id = "receipt_current_date_container"
		currentDateContainer.classList.add("flexbox")

		//date label
		const dateLabel = document.createElement("h3")
		dateLabel.innerHTML = "Placed Order:"

		//date value
		const dateValue = document.createElement("p")

		dateValue.innerHTML = `${currentDate} at ${currentTime}`

		currentDateContainer.appendChild(dateLabel)
		currentDateContainer.appendChild(dateValue)
		dateSection.appendChild(currentDateContainer)
		infoContainer.appendChild(dateSection)
	}

	//finished date
	{
		//container
		const finishDateContainer = document.createElement("div")
		finishDateContainer.id = "receipt_finish_date_container"
		finishDateContainer.classList.add("flexbox")

		//date label
		const dateLabel = document.createElement("h3")
		dateLabel.innerHTML = "Estimated Completion:"

		//date value
		const dateValue = document.createElement("p")
		dateValue.innerHTML = `${currentDate} at ${estimatedTime}`

		finishDateContainer.appendChild(dateLabel)
		finishDateContainer.appendChild(dateValue)
		dateSection.appendChild(finishDateContainer)
		infoContainer.appendChild(dateSection)
	}
}

/*
*	Creates the basic customer info section of the order for the receipt
*/
Order.createCustomerInfo = (name, email, infoContainer) =>
{

	//creating the name section
		const nameContainer = document.createElement("div")
		nameContainer.id = "receipt_customer_info_name_container"
		nameContainer.classList.add("flexbox")

		const nameLabel = document.createElement("h3")
		nameLabel.id = "receipt_customer_info_name_label"
		nameLabel.innerHTML = "Name:"

		const nameValue = document.createElement("p")
		nameValue.id = "receipt_customer_info_name_value"
		nameValue.innerHTML = name

		nameContainer.appendChild(nameLabel)
		nameContainer.appendChild(nameValue)
		infoContainer.appendChild(nameContainer)


	//creating the email section
		const emailContainer = document.createElement("div")
		emailContainer.id = "receipt_customer_info_email_container"
		emailContainer.classList.add("flexbox")

		const emailLabel = document.createElement("h3")
		emailLabel.id = "receipt_customer_info_email_label"
		emailLabel.innerHTML = "Email:"

		const emailValue = document.createElement("p")
		emailValue.id = "receipt_customer_info_email_value"
		emailValue.innerHTML = email

		emailContainer.appendChild(emailLabel)
		emailContainer.appendChild(emailValue)
		infoContainer.appendChild(emailContainer)
}

///////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
	if (Helper.isOnPage("receipt"))
	{
		Order.createReceipt()
		return
	}
	if (!Helper.isOnPage("order")) return
	if (!Menu.m_bReady) return false

	const searchParemeters = Helper.getSearchParameters()
	const searchType = Helper.getString(searchParemeters.get("type")).toLowerCase()

	let type = Order.PAYMENT_TYPE_CASH

	switch (searchType)
	{
		default:
		case "cash":
		{
			type = Order.PAYMENT_TYPE_CASH
			break
		}

		case "card":
		{
			type = Order.PAYMENT_TYPE_CARD
			break
		}

		case "paypal":
		{
			type = Order.PAYMENT_TYPE_PAYPAL
			break
		}

		case "applepay":
		{
			type = Order.PAYMENT_TYPE_APPLE
			break
		}

		case "samsungpay":
		{
			type = Order.PAYMENT_TYPE_SAMSUNG
			break
		}

		case "googlepay":
		{
			type = Order.PAYMENT_TYPE_GOOGLE
			break
		}
	}

	Order.createPaymentPage(type)
})
//card tester
// 4032035268344108
// 0124
// 820
