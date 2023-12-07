const Order = new Map()

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

Order.createPaymentPage = (paymentType) =>
{
	const paymentContainer =  document.createElement("div")

	const paymentHeading = document.createElement("h1")
	paymentHeading.innerHTML = "Payment"

	const paymentContent = document.createElement("div")

	//name for order
	const name = document.createElement("input")
	name.id = "customer_name"
	name.setAttribute("type", "text")
	name.setAttribute("min", "1")
	name.setAttribute("max", "25")
	name.setAttribute("placeholder", "Enter your name")
	name.required = true

	const phone = document.createElement("input")
	phone.id = "customer_phone"
	phone.setAttribute("type", "number")
	phone.setAttribute("min", "")
	phone.setAttribute("max", "")
	phone.setAttribute("placeholder", "Enter you phone number")
	phone.required = true

	const email = document.createElement("input")
	email.id = "customer_email"
	email.setAttribute("type", "text")
	email.setAttribute("min", "")
	email.setAttribute("max", "50")
	email.setAttribute("placeholder", "Enter your email")
	email.required = true

	paymentContainer.appendChild(paymentHeading)
	paymentContainer.appendChild(paymentContent)
	paymentContainer.appendChild(name)
	paymentContainer.appendChild(phone)
	paymentContainer.appendChild(email)

	if(paymentType === "card")
	{
		const cardContainer = document.createElement("div")


		const number = document.createElement("input")
		number.id = "card_number"
		number.setAttribute("type", "number")
		number.setAttribute("min", "15")
		number.setAttribute("max", "16")
		number.setAttribute("placeholder", "#############")
		number.required = true

		const expiration = document.createElement("input")
		expiration.id = "card_expiration"
		expiration.setAttribute("type", "number")
		expiration.setAttribute("min", "4")
		expiration.setAttribute("max", "4")
		expiration.setAttribute("placeholder", "MMYY")
		expiration.required = true

		cardContainer.appendChild(number)
		cardContainer.appendChild(expiration)

		paymentContainer.appendChild(cardContainer)
	}

	const placeOrderBtn = document.createElement("button")
	placeOrderBtn.innerHTML = "Place Order"
	placeOrderBtn.onclick = () =>
	{
		const customerName = document.querySelector("#customer_name")
		const customerPhone = document.querySelector("#customer_phone")
		const customerEmail = document.querySelector("#customer_email")
		const cardNumber = document.querySelector("#card_number")
		const cardExpiration = document.querySelector("#card_expiration")


		StorageManager.setStoredValue("customerName", customerName.value)
		StorageManager.setStoredValue("customerPhone", customerPhone.value)
		StorageManager.setStoredValue("customerEmail", customerEmail.value)
		StorageManager.setStoredValue("cardNumber", cardNumber.value)
		StorageManager.setStoredValue("cardExpiration", cardExpiration.value)

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
*	Generates a random order ID
*/
Order.setOrderID = () =>
{
	let id = ""

	for (let i = 0; i < 4; i++)
		id+=letters[rng(0, letters.length-1)]

	for (let i = 0; i < 4; i++)
		id += numbers[rng(0, numbers.length - 1)]

	return id
}

/*
*	Creates the receipt for the order
*/
Order.createReceipt = (paymentType) =>
{
	const receiptContainer = document.createElement("div")
	receiptContainer.id = "receipt_container"

	const orderID = Order.setOrderID()
	// StorageManager.setStoredValue(orderID, "orderInfoToBeCreated") //stores what's on receipt (customer info, cart)

	const customerName = StorageManager.getStoredString("customerName")
	console.log(customerName)

	const customerPhone = StorageManager.getStoredString("customerPhone")

	const customerEmail = StorageManager.getStoredString("customerEmail")

	Order.createCustomerInfo(customerName, customerPhone, customerEmail, receiptContainer)


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

/*
*	Returns a random integer between low and high
*/
function rng(low, high)
{
	return Math.floor((high - low + 1) * Math.random() + low)
}

///////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
	if (location.href.substring(location.href.lastIndexOf('/') + 1) != "order.html") return
	Order.createPaymentPage("card")
})
