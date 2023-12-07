const Order = new Map()

Order.PAYMENT_TYPE_CASH = 1
Order.PAYMENT_TYPE_CARD = 2
Order.PAYMENT_TYPE_PAYPAL = 3
Order.PAYMENT_TYPE_APPLE = 4
Order.PAYMENT_TYPE_SAMSUNG = 5
Order.PAYMENT_TYPE_GOOGLE = 6

/*
*	Sets up a payment page
*/
Order.createPaymentPage = (paymentType) =>
{
	const paymentContainer =  document.createElement("div")

	const paymentHeading = document.createElement("h1")
	paymentHeading.innerHTML = "Payment"

	const paymentContent = document.createElement("div")

	//name for order
	// const name = document.createElement("input")
	// name.id = "customer_name"
	// name.setAttribute("type", "text")
	// name.setAttribute("min", "1")
	// name.setAttribute("max", "25")
	// name.setAttribute("placeholder", "Enter your name")
	// name.required = true

	// const phone = document.createElement("input")
	// phone.id = "customer_phone"
	// phone.setAttribute("type", "number")
	// phone.setAttribute("min", "")
	// phone.setAttribute("max", "")
	// phone.setAttribute("placeholder", "Enter you phone number")
	// phone.required = true

	// const email = document.createElement("input")
	// email.id = "customer_email"
	// email.setAttribute("type", "text")
	// email.setAttribute("min", "")
	// email.setAttribute("max", "50")
	// email.setAttribute("placeholder", "Enter your email")
	// email.required = true

	paymentContainer.appendChild(paymentHeading)
	paymentContainer.appendChild(paymentContent)
	// paymentContainer.appendChild(name)
	// paymentContainer.appendChild(phone)
	// paymentContainer.appendChild(email)

	if(paymentType == Order.PAYMENT_TYPE_CARD)
	{
		const cardContainer = document.createElement("div")


		const number = document.createElement("input")
		number.id = "card_number"
		number.setAttribute("type", "text")
		number.setAttribute("minlength", "10")
		number.setAttribute("maxlength", "20")
		number.setAttribute("placeholder", "Card Number")
		number.required = true

		const expiration = document.createElement("input")
		expiration.id = "card_expiration"
		expiration.setAttribute("type", "text")
		expiration.setAttribute("minlength", "5")
		expiration.setAttribute("maxlength", "5")
		expiration.setAttribute("placeholder", "MM/YY")
		expiration.required = true

		cardContainer.appendChild(number)
		cardContainer.appendChild(expiration)

		paymentContainer.appendChild(cardContainer)
	}

	const placeOrderBtn = document.createElement("button")
	placeOrderBtn.innerHTML = "Place Order"
	placeOrderBtn.onclick = () =>
	{
		const accountData = AccountManager.g_AccountData

		console.log(accountData.email)


		alert("Thank you for your purchase")

		paymentContainer.remove()

		//create receipt
		Order.createReceipt(paymentType)


		//clear cart array
	}

	paymentContainer.appendChild(placeOrderBtn)

	document.body.appendChild(paymentContainer)
}

/*
*	Creates the receipt for the order
*/
Order.createReceipt = (paymentType) =>
{
	const receiptContainer = document.createElement("div")
	receiptContainer.id = "receipt_container"

	const orderID = Helper.randomString(12)
	// StorageManager.setStoredValue(orderID, "orderInfoToBeCreated") //stores what's on receipt (customer info, cart)


	// Order.createCustomerInfo(customerName, customerPhone, customerEmail, receiptContainer)


	document.body.appendChild(receiptContainer)
}

/*
*	Creates the basic customer info section of the order for the receipt
*/
Order.createCustomerInfo = (name, phone, email, receiptContainer) =>
{
	const customerInfoContainer = document.createElement("div")
	customerInfoContainer.id = "customer_info_container"

	//creating the name section
	const nameContainer = document.createElement("div")
	nameContainer.id = "customer_info_name_container"
	nameContainer.classList.add("flexbox")

	const nameLabel = document.createElement("h3")
	nameLabel.id = "customer_info_name_label"
	nameLabel.innerHTML = "Name:"

	const nameValue = document.createElement("p")
	nameValue.id = "customer_info_name_value"
	nameValue.innerHTML = name

	nameContainer.appendChild(nameLabel)
	nameContainer.appendChild(nameValue)
	customerInfoContainer.appendChild(nameContainer)


	//creating the phone section
	const phoneContainer = document.createElement("div")
	phoneContainer.id = "customer_info_phone_container"
	phoneContainer.classList.add("flexbox")

	const phoneLabel = document.createElement("h3")
	phoneLabel.id = "customer_info_phone_label"
	phoneLabel.innerHTML = "Phone:"

	const phoneValue = document.createElement("p")
	phoneValue.id = "customer_info_phone_value"
	phoneValue.innerHTML = phone

	phoneContainer.appendChild(phoneLabel)
	phoneContainer.appendChild(phoneValue)
	customerInfoContainer.appendChild(phoneContainer)


	//creating the email section
	const emailContainer = document.createElement("div")
	emailContainer.id = "customer_info_email_container"
	emailContainer.classList.add("flexbox")

	const emailLabel = document.createElement("h3")
	emailLabel.id = "customer_info_email_label"
	emailLabel.innerHTML = "Email:"

	const emailValue = document.createElement("p")
	emailValue.id = "customer_info_email_value"
	emailValue.innerHTML = email

	emailContainer.appendChild(emailLabel)
	emailContainer.appendChild(emailValue)
	customerInfoContainer.appendChild(emailContainer)

	receiptContainer.appendChild(customerInfoContainer)
}

///////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
	if (!Helper.isOnPage("order.html")) return

	Order.createPaymentPage(Order.PAYMENT_TYPE_CARD)
})
