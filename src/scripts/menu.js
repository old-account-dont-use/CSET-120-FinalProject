const Menu = {}

Menu.toppings = new Map()
Menu.items = new Map()

Menu.cart = []

/*
*	Adds a new topping to the menu
*/
Menu.addTopping = (name, price) =>
{
	const newTopping =
	{
		"name": name,
		"price": Helper.priceifyNumber(price),
		"availability": true
	}

	Menu.toppings.set(name, newTopping)
}

/*
*	Adds a new item to the menu
*/
Menu.addItem = (name, price, description, toppingList, image) =>
{
	const newItem =
	{
		"name": name,
		"price": Helper.priceifyNumber(price),
		"description": description,
		"toppings": toppingList,
		"image": image,
		"availability": true
	}

	Menu.items.set(name.toLowerCase(), newItem)
}
// /*
// *	Creates the display of the item and topping
// */
// Menu.createMenuDisplay = (itemName, item, menuContainer) =>
// {
// 	Menu.createItemsDisplay(itemName, item, menuContainer)
// }

// Menu.createItemsDisplay = (itemName, item, menuContainer) =>
// {
// 	//creates a container for the item
// 	const section = document.createElement("div")
// 	section.classList.add("menu_item_section")
// 	section.classList.add("glass_morphism_weak")
// 	section.setAttribute("isAvailable", true)

// 	////////////////////////////////////////////////////////////////

// 	//creates the image of the item
// 	const image = document.createElement("img")
// 	image.classList.add("menu_item_image")
// 	image.src = item.image


// 	//creates the item name
// 	const name = document.createElement("h3")
// 	name.classList.add("menu_item_name")
// 	name.innerHTML = itemName


// 	//creates the item price tag
// 	const price = document.createElement("h3")
// 	price.classList.add("menu_item_price")
// 	price.innerHTML = Helper.priceify(item.price)


// 	//creates the item description
// 	const description = document.createElement("p")
// 	description.classList.add("menu_item_description")
// 	description.innerHTML = item.description

// 	section.appendChild(image)
// 	section.appendChild(name)
// 	section.appendChild(price)
// 	section.appendChild(description)

// 	////////////////////////////////////////////////////////////////

// 	/*
// 	* creates the display of the list of toppings
// 	* hidden on default
// 	*/
// 	const toppingList = document.createElement("div")
// 	toppingList.classList.add("menu_item_topping_list")
// 	toppingList.classList.add("glass_morphism")
// 	toppingList.setAttribute("isShown", false)

// 	const toppingCloseBtn = document.createElement("button")
// 	toppingCloseBtn.classList.add("menu_topping_close_btn")
// 	toppingCloseBtn.classList.add("close_btn")
// 	toppingCloseBtn.classList.add("float_right")
// 	toppingCloseBtn.innerHTML = "x"

// 	toppingCloseBtn.onclick = () => {
// 		const isShown = Helper.getBool(toppingList.getAttribute("isShown"))

// 		toppingList.setAttribute("isShown", !isShown)
// 	}


// 	////////////////////////////////////////////////////////////////

// 	//creates the item name on the display of list of toppings
// 	const toppingListItemLabel = document.createElement("h3")
// 	toppingListItemLabel.classList.add("item_menu_topping_list_item_label")
// 	toppingListItemLabel.innerHTML = itemName

// 	toppingList.appendChild(toppingCloseBtn)
// 	toppingList.appendChild(toppingListItemLabel)


// 	const itemToppings = item.toppings //object form of the toppings for the item
// 	const itemToppingsArray = Object.getOwnPropertyNames(itemToppings) //string array form of the toppings name

// 	//setting up checkboxes and topping labels for the list of toppings of the item
// 	for (const topping of itemToppingsArray) {
// 		const toppingData = Menu.toppings.get(topping.toLowerCase()) //object form of the topping

// 		//checks for whether the item topping exists in the list of possible toppings
// 		if (!toppingData) {
// 			console.error(`Item ${itemName} has invalid topping ${topping}`)
// 			continue
// 		}

// 		/*
// 		* creates the checkbox for the topping
// 		* checkbox checking based on whether topping is on item by default
// 		*/
// 		const toppingCheckbox = document.createElement("input")
// 		toppingCheckbox.type = "checkbox"
// 		toppingCheckbox.classList.add("menu_item_topping_checkbox")
// 		toppingCheckbox.id = `topping_checkbox_${topping}`
// 		toppingCheckbox.checked = itemToppings[topping]

// 		//creates the label/name of the topping
// 		const toppingLabel = document.createElement("label")
// 		toppingLabel.classList.add("menu_item_topping_label")
// 		toppingLabel.innerHTML = `${topping} ${Helper.priceify(toppingData.price)}`
// 		toppingLabel.setAttribute("for", `topping_checkbox_${topping}`)

// 		//creates a line break for after each topping
// 		const lineBreak = document.createElement("br")

// 		//adding topping close button, checkbox, name, and line break to the display of list of toppings
// 		toppingList.appendChild(toppingCheckbox)
// 		toppingList.appendChild(toppingLabel)
// 		toppingList.appendChild(lineBreak)

// 		Menu.handleToppingAvailability(toppingCheckbox, topping)
// 	}

// 	//adding topping list display to menu container
// 	menuContainer.appendChild(toppingList)

// 	//adding item display to menu container
// 	menuContainer.appendChild(section)

// 	////////////////////////////////////////////////////////////////

// 	//creates a button for viewing display of list of toppings
// 	const viewToppingsButton = document.createElement("button")
// 	viewToppingsButton.classList.add("menu_item_toppings_view_button")
// 	viewToppingsButton.innerHTML = "Select Toppings"
// 	viewToppingsButton.m_ToppingList = toppingList //stores div for displaying list of toppings

// 	//toggling display for list of toppings
// 	viewToppingsButton.onclick = (event) =>
// 	{
// 		const toppingList = event.target.m_ToppingList

// 		const isShown = Helper.getBool(toppingList.getAttribute("isShown")) //converts string to boolean form

// 		const toppingLists = document.querySelectorAll(".menu_item_topping_list") //gets all the divs containing list of toppings

// 		//hides the already displayed list of toppings if applicable so that only one list displays at a time
// 		for (const list of toppingLists) {
// 			if (isShown) {
// 				list.setAttribute("isShown", false)
// 				break
// 			}
// 		}

// 		//toggles visibility of the display of list of toppings when "Select Toppings" button is clicked
// 		toppingList.setAttribute("isShown", !isShown)
// 	}
// 	section.appendChild(viewToppingsButton)

// 	////////////////////////////////////////////////////////////////

// 	//creates the button for adding item to the cart
// 	const addToCartButton = document.createElement("button")
// 	section.appendChild(addToCartButton)
// 	addToCartButton.classList.add("menu_item_cart_button")
// 	addToCartButton.innerHTML = "Add to cart"
// 	console.log(addToCartButton)
// 	addToCartButton.onclick = Menu.addToCartDisplay()

// 	////////////////////////////////////////////////////////////////



// 	////////////////////////////////////////////////////////////////
// }

// Menu.addToCartDisplay = (menuItem, menuContainer) =>
// {
// 	// const name = menuItem.name

// 	if (true) return

// 	// //array form of the toppings that are selected
// 	// const listOfWantedToppingsCheckboxes = Array.from(toppingList.childNodes).filter((element) => {
// 	// 	return element.checked
// 	// })

// 	// //getting name of toppings into array
// 	// let listOfWantedToppingsName = []
// 	// for (const topping of listOfWantedToppingsCheckboxes) {
// 	// 	const toppingLabelText = topping.nextSibling.innerHTML

// 	// 	const separationIndex = toppingLabelText.indexOf("$") //index that separates name and price of topping

// 	// 	const name = toppingLabelText.substring(0, separationIndex - 1)

// 	// 	listOfWantedToppingsName.push(name)
// 	// }

// 	// //handling duplicate items
// 	// const index = Menu.findDuplicateItem(name, listOfWantedToppingsName)
// 	// Menu.handleAddingDuplicateItems(index)

// 	// ////////////////////////////////////////////////////////////////
// 	// //If not a duplicate item


// 	// Menu.createCartItem(name, menuContainer)
// }

// Menu.createCartItem = (name, menuContainer) =>
// {
// 	const cartTable = menuContainer.querySelector("#cart_table")


// 	const cartTableRow = document.createElement("tr")
// 	cartTableRow.classList.add("cart_table_row")

// 	cartTable.appendChild(cartTableRow)

// 	////////////////////////////////////////////////////////////////

// 	Menu.createCartItemSection(cartTableRow, name) //creating the cart item section of item
// 	/Menu.createCartQuantitySection(cartTableRow, name) //creating the cart quantity section of item
// 	Menu.createCartPriceSection(cartTableRow, name)	//creating the cart price section of item


// 	//creating section for the toppings
// 	const cartItemToppingsSection = document.createElement("p")
// 	cartItemToppingsSection.classList.add("cart_item_toppings_section")
// 	cartItemToppingsSection.classList.add("flexbox_column")

// }

// Menu.createCartItemSection = (cartTableRow, name) =>
// {
// 	//creating the item name
// 	const cartItemSection = document.createElement("td")
// 	cartItemSection.classList.add("cart_item_name")

// 	cartTableRow.appendChild(cartItemSection)

// 	Menu.createCartItemSectionItem(cartItemSection, name)
// }

// Menu.createCartQuantitySection = (cartTableRow) =>
// {

// }

// Menu.createCartPriceSection = (cartTableRow) => {

// }


// Menu.createCartItemSectionItem = (cartItemSection, name) =>
// {
// 	//creating the actual item name on cart
// 	const cartItemItemName = document.createElement("h1")
// 	cartItemItemName.classList.add("cart_item_item_name")

// 	cartItemItemName.innerHTML = `${name}`

// 	cartItemSection.appendChild(cartItemItemName)
// }

// /*
// *	Updates quantity of item if item is already on the cart
// */
// Menu.handleAddingDuplicateItems = (index) =>
// {
// 	if (index != -1) {
// 		const cartItem = Menu.cart[index]
// 		cartItem.quantity = Helper.clamp(cartItem.quantity + 1, 0, 10)

// 		const tableRows = Array.from(document.querySelectorAll(".cart_table_row"))
// 		const row = tableRows[index]

// 		const quantityInput = row.querySelector(".cart_quantity_input")

// 		quantityInput.value = cartItem.quantity
// 		quantityInput.updateValue()
// 		quantityInput.onchange({ target: quantityInput })

// 		return
// 	}
// }
//================================================Old section=======================================================================
/*
*	Creates the display of the item and topping
*/
Menu.createItemDisplay = (itemName, item, menuContainer) =>
{
	//creates a container for the item
	const section = document.createElement("div")
	section.classList.add("menu_item_section")
	section.classList.add("glass_morphism_weak")
	section.setAttribute("isAvailable", true)

	//creates the image of the item
	const image = document.createElement("img")
	image.classList.add("menu_item_image")
	image.src = item.image

	//creates the item name
	const name = document.createElement("h3")
	name.classList.add("menu_item_name")
	name.innerHTML = itemName

	//creates the item price tag
	const price = document.createElement("h3")
	price.classList.add("menu_item_price")
	price.innerHTML = Helper.priceify(item.price)

	//creates the item description
	const description = document.createElement("p")
	description.classList.add("menu_item_description")
	description.innerHTML = item.description

	const itemToppings = item.toppings //object form of the toppings for the item
	const itemToppingsArray = Object.getOwnPropertyNames(itemToppings) //string array form of the toppings name

	/*
	* creates the display of the list of toppings
	* hidden on default
	*/
	const toppingList = document.createElement("div")
	toppingList.classList.add("menu_item_topping_list")
	toppingList.classList.add("glass_morphism")
	toppingList.setAttribute("isShown", false)

	const toppingCloseBtn = document.createElement("button")
	toppingCloseBtn.classList.add("menu_topping_close_btn")
	toppingCloseBtn.classList.add("close_btn")
	toppingCloseBtn.classList.add("float_right")

	toppingCloseBtn.innerHTML = "x"
	toppingCloseBtn.onclick = () =>
	{
		const isShown = (/true/).test(toppingList.getAttribute("isShown"))

		toppingList.setAttribute("isShown", !isShown)
	}

	//creates the item name on the display of list of toppings
	const toppingListItemLabel = document.createElement("h3")
	toppingListItemLabel.classList.add("item_menu_topping_list_item_label")
	toppingListItemLabel.innerHTML = itemName

	toppingList.appendChild(toppingCloseBtn)
	toppingList.appendChild(toppingListItemLabel)

	for (const topping of itemToppingsArray)
	{
		const toppingData = Menu.toppings.get(topping.toLowerCase()) //object form of the topping

		//checks for whether the item topping exists in the list of possible toppings
		if (!toppingData)
		{
			console.error(`Item ${itemName} has invalid topping ${topping}`)
			continue
		}

		/*
		* creates the checkbox for the topping
		* checkbox checking based on whether topping is on item by default
		*/
		const toppingCheckbox = document.createElement("input")
		toppingCheckbox.type = "checkbox"
		toppingCheckbox.classList.add("menu_item_topping_checkbox")
		toppingCheckbox.id = `topping_checkbox_${topping}`
		toppingCheckbox.checked = itemToppings[topping]

		//creates the label/name of the topping
		const toppingLabel = document.createElement("label")
		toppingLabel.classList.add("menu_item_topping_label")
		toppingLabel.innerHTML = `${topping} ${Helper.priceify(toppingData.price)}`
		toppingLabel.setAttribute("for", `topping_checkbox_${topping}`)

		//creates a line break for after each topping
		const lineBreak = document.createElement("br")

		//adding topping close button, checkbox, name, and line break to the display of list of toppings
		toppingList.appendChild(toppingCheckbox)
		toppingList.appendChild(toppingLabel)
		toppingList.appendChild(lineBreak)

		Menu.handleToppingAvailability(toppingCheckbox, topping)
	}

	//creates a button for viewing display of list of toppings
	const viewToppingsButton = document.createElement("button")
	viewToppingsButton.classList.add("menu_item_toppings_view_button")
	viewToppingsButton.innerHTML = "Select Toppings"
	viewToppingsButton.m_ToppingList = toppingList //stores div for displaying list of toppings


	viewToppingsButton.onclick = (event) =>
	{
		const toppingList = event.target.m_ToppingList

		const isShown = (/true/).test(toppingList.getAttribute("isShown")) //converts string to boolean form

		const toppingLists = document.querySelectorAll(".menu_item_topping_list") //gets all the divs containing list of toppings

		//hides the already displayed list of toppings if applicable so that only one list displays at a time
		for(const list of toppingLists)
		{
			if ((/true/).test(list.getAttribute("isShown")))
			{
				list.setAttribute("isShown", false)
				break
			}
		}

		//toggles visibility of the display of list of toppings when "Select Toppings" button is clicked
		toppingList.setAttribute("isShown", !isShown)
	}

	//creates the button for adding item to the cart
	const addToCartButton = document.createElement("button")
	addToCartButton.classList.add("menu_item_cart_button")
	addToCartButton.innerHTML = "Add to cart"

	//add item to cart along with selected toppings
	addToCartButton.onclick = (event) =>
	{
		const name = addToCartButton.parentNode.childNodes[1].innerHTML //name of item to be added to cart

		//array form of the toppings that are selected
		const listOfWantedToppingsCheckboxes = Array.from(toppingList.childNodes).filter((element) =>
		{
			return element.checked
		})

		//getting name of toppings into array
		let listOfWantedToppingsName = []
		for (const topping of listOfWantedToppingsCheckboxes)
		{
			const toppingLabelText = topping.nextSibling.innerHTML

			const separationIndex = toppingLabelText.indexOf("$") //index that separates name and price of topping

			const name = toppingLabelText.substring(0, separationIndex - 1)

			listOfWantedToppingsName.push(name)
		}

		const index = Menu.findDuplicateItem(name, listOfWantedToppingsName)


		//handling duplicate items
		if (index != -1)
		{
			const cartItem = Menu.cart[index]
			cartItem.quantity = Helper.clamp(cartItem.quantity + 1, 0, 10)

			const tableRows = Array.from(document.querySelectorAll(".cart_table_row"))
			const row = tableRows[index]

			const quantityInput = row.querySelector(".cart_quantity_input")

			quantityInput.value = cartItem.quantity
			quantityInput.updateValue()
			quantityInput.onchange({ target: quantityInput })
			Menu.storeCartInfo()

			return
		}

		//stores the total price of the selected toppings
		let totalToppingsPrice = 0

		const cartTable = document.querySelector("#cart_table")

		const cartTableRow = document.createElement("tr")
		cartTableRow.classList.add("cart_table_row")

		//creating the item name
		const cartItemName = document.createElement("td")

		cartItemName.classList.add("cart_item_name")

		//creating the actual item name on cart
		const cartItemItemName = document.createElement("h1")
		cartItemItemName.innerHTML = `${name}`
		cartItemItemName.classList.add("cart_item_item_name")

		//creating section for the toppings
		const cartItemToppingsSection = document.createElement("p")
		cartItemToppingsSection.classList.add("cart_item_toppings_section")
		cartItemToppingsSection.classList.add("flexbox_column")



		let count = 0;
		//adding toppings to the table
		for (const topping of listOfWantedToppingsCheckboxes)
		{
			//creating container for the topping
			const toppingContainer = document.createElement("div")
			toppingContainer.classList.add("flexbox")
			toppingContainer.classList.add("cart_item_topping_container")

			// const toppingLabelText = topping.nextSibling.innerHTML

			// const separationIndex = toppingLabelText.indexOf("$") //index that separates name and price of topping

			//creating the name of the topping
			const toppingName = document.createElement("h4")

			// const name = toppingLabelText.substring(0, separationIndex - 1)
			const name = listOfWantedToppingsName[count]
			count++
			toppingName.innerHTML = name
			toppingName.classList.add("cart_topping_name")


			//creating the price of the topping
			const price = Menu.toppings.get(name).price
			totalToppingsPrice += price

			const toppingPrice = document.createElement("p")
			toppingPrice.innerHTML = Helper.priceify(price)
			toppingPrice.classList.add("cart_topping_price")

			toppingContainer.appendChild(toppingName)
			toppingContainer.appendChild(toppingPrice)

			cartItemToppingsSection.appendChild(toppingContainer)
		}

		Menu.storeCartInfo()

		cartItemName.appendChild(cartItemItemName)
		cartItemName.appendChild(cartItemToppingsSection)


		//creating the input for the item quantity
		const cartItemQuantitySection = document.createElement("td")
		cartItemQuantitySection.classList.add("cart_item_quantity_section")

		const cartItemQuantityContainer = document.createElement("div")
		cartItemQuantityContainer.classList.add("cart_item_quantity_container")
		cartItemQuantityContainer.classList.add("flexbox")

		const cartItemQuantityInput = document.createElement("input")
		{
			cartItemQuantityInput.setAttribute("type", "number")
			cartItemQuantityInput.value = "1"
			cartItemQuantityInput.onwheel = () => {
				return false
			}

			cartItemQuantityInput.setAttribute("min", "1")
			cartItemQuantityInput.setAttribute("max", "10")
			cartItemQuantityInput.classList.add("cart_quantity_input")
			cartItemQuantityInput.classList.add("center_text")

			cartItemQuantityInput.updateValue = () =>
			{
				const min = Helper.getNumber(cartItemQuantityInput.getAttribute("min"), false, 0)
				const max = Helper.getNumber(cartItemQuantityInput.getAttribute("max"), false, 10)

				const amount = Helper.clamp(Helper.getNumber(cartItemQuantityInput.value), min, max)
				cartItemQuantityInput.value = Helper.getString(amount)
			}

			cartItemQuantityInput.onkeyup = (event) =>
			{
				event.preventDefault()

				if (Helper.isNumber(event.keyCode) && event.keyCode != 13) return
				if (Helper.isString(event.key) && event.key.toLowerCase() !== "enter") return
				if (Helper.isString(event.code) && event.code.toLowerCase() !== "enter") return

				cartItemQuantityInput.updateValue()

				cartItemQuantityInput.blur() //removes focus from the input
			}

			cartItemQuantityContainer.appendChild(cartItemQuantityInput)
			cartItemQuantitySection.appendChild(cartItemQuantityContainer)
		}

		//creating the button for removing the item from the cart
		const removeItemButton = document.createElement("button")
		removeItemButton.innerHTML = "Remove"
		removeItemButton.classList.add("cart_remove_item_button")
		removeItemButton.onclick = (event) => {

			//get the itemName and toppingList of the cart and check for duplicate in Menu.cart
			const tableRow = event.target.parentNode.parentNode.parentNode

			const itemName = tableRow.querySelector(".cart_item_item_name")

			const itemToppings = Array.from(tableRow.querySelector(".cart_topping_name"))

			const index = Menu.findDuplicateItem(itemName, itemToppings)

			Menu.cart.splice(index, 1)

			Menu.storeCartInfo()

			tableRow.remove()

			Menu.updateTotals()
		}

		cartItemQuantityContainer.appendChild(removeItemButton)

		cartTableRow.appendChild(cartItemName)
		cartTableRow.appendChild(cartItemQuantitySection)

		//creating the price section
		const cartItemPrice = document.createElement("td")
		cartItemPrice.classList.add("cart_item_price")
		cartItemPrice.classList.add("center_text")

		cartTableRow.appendChild(cartItemPrice)

		const itemName = cartItemPrice.parentNode.childNodes[0].childNodes[0].innerHTML
		const itemPrice = Menu.items.get(itemName).price

		const unitPrice = itemPrice + totalToppingsPrice

		cartItemPrice.innerHTML = Helper.priceify(unitPrice) //total price of the item

		//updates price of item when the quantity is changed
		cartItemQuantityInput.onchange = (event) => {
			cartItemQuantityInput.updateValue()

			const priceSection = event.target.parentNode.parentNode.nextSibling
			const price = unitPrice * cartItemQuantityInput.value
			priceSection.innerHTML = `$${price.toFixed(2)}`

			Menu.updateTotals()
		}
		cartTable.appendChild(cartTableRow)


		const newItem = Menu.addToCartArray(cartItemItemName.innerHTML, listOfWantedToppingsName, 1)
		newItem.unitPrice = unitPrice
		Menu.storeCartInfo()

		//reset toppings list page to default selections
		const toppingsPage = event.target.parentNode.previousSibling

		const toppingsCheckboxesArray = Array.from(toppingsPage.querySelectorAll(".menu_item_topping_checkbox"))

		for (let i = 0; i < itemToppingsArray.length; i++)
		{
			const topping = itemToppingsArray[i]
			toppingsCheckboxesArray[i].checked = itemToppings[topping]
		}
	}

	section.appendChild(image)
	section.appendChild(name)
	section.appendChild(price)
	section.appendChild(description)
	section.appendChild(viewToppingsButton)
	section.appendChild(addToCartButton)

	Menu.handleItemAvailability(section, item)

	menuContainer.appendChild(toppingList)
	menuContainer.appendChild(section)
}

Menu.storeCartInfo = () =>
{
	StorageManager.setStoredValue("cartItems", Helper.json(Menu.cart))
}



Menu.handleItemAvailability = (section, item) =>
{
	const isAvailable = item.availability

	//setting section availability for styling
	section.setAttribute("isAvailable", isAvailable)

	//"Select Toppings" button enabling/disabling
	const selectToppingsBtn = section.querySelector(".menu_item_toppings_view_button")
	selectToppingsBtn.disabled = !isAvailable

	//"Add to Cart" button enabling/disabling
	const addToCartBtn = section.querySelector(".menu_item_cart_button")
	addToCartBtn.disabled = !isAvailable
}

Menu.handleToppingAvailability = (toppingCheckbox, topping) =>
{
	const isAvailable = Menu.toppings.get(topping).availability

	toppingCheckbox.disabled = !isAvailable
}

Menu.updateTotals = () =>
{
	const tableRows = Array.from(document.querySelectorAll(".cart_table_row"))

	//calculating subtotal
	let subtotal = 0
	for(const row of tableRows)
	{
		const rowPrice = Helper.getNumber(row.querySelector(".cart_item_price").innerHTML.substring(1), true)
		subtotal+= rowPrice
	}

	//creating subtotal value
	const subTotalValue = document.querySelector("#cart_total_subTotal_value")
	subTotalValue.innerHTML = Helper.priceify(subtotal)

	//creating tax value
	const taxValue = document.querySelector("#cart_total_tax_value")
	taxValue.innerHTML = Helper.priceify(subtotal * 0.06)

	//getting amount of tips
	const tipValue = document.querySelector("#cart_total_tip_value")
	let tipAmount = 0

	//ensures that tip amount is within the min and max range of possible tip amount
	if(tipValue.value)
	{
		const min = Helper.getNumber(tipValue.getAttribute("min"), true, 0)
		const max = Helper.getNumber(tipValue.getAttribute("max"), true, 100)

		tipAmount = Helper.clamp(Helper.getNumber(tipValue.value), min, max)
	}
	tipValue.value = tipAmount

	//creating total value
	const totalValue = document.querySelector("#cart_total_total_value")
	totalValue.innerHTML = Helper.priceify(subtotal + subtotal * 0.06 + tipAmount)
}

Menu.findDuplicateItem = (itemName, toppingList) =>
{
	const cartItems = Menu.cart

	outer: for (let i = 0; i < cartItems.length; i++)
	{
		const item = cartItems[i]
		if (item.name != itemName) continue

		if (item.toppings.length != toppingList.length) continue

		for (let t = 0; t < item.toppings.length; t++)
		{
			if (item.toppings[i] != toppingList[i]) continue outer
		}

		return i
	}

	return -1
}

Menu.createCartDisplay = (menuContainer) =>
{
	//cart container
	const cartContainer = document.createElement("div")
	cartContainer.id = "cart_container"
	cartContainer.setAttribute("isShown", false)

	//close button
	const cartCloseBtn = document.createElement("button")
	cartCloseBtn.id = "cart_close_btn"
	cartCloseBtn.classList.add("close_btn")
	cartCloseBtn.classList.add("float_right")
	cartCloseBtn.innerHTML = "x"
	cartCloseBtn.onclick = () =>
	{
		const isShown = Helper.getBool(cartContainer.getAttribute("isShown"))

		cartContainer.setAttribute("isShown", !isShown)
	}

	//cart header
	const cartHeader = document.createElement("h2")
	cartHeader.id = "cart_header"
	cartHeader.classList.add("center_text")
	cartHeader.innerHTML = "Cart"

	const hr = document.createElement("hr")
	hr.id = "cart_hr"

	//container for table for cart
	const cartTableContainer = document.createElement("div")
	cartTableContainer.id = "cart_table_container"

	//setting up table and headers for the cart
	const cartTable = document.createElement("table")
	cartTable.id = "cart_table"

	const cartTableRow = document.createElement("tr")

	//creating table header for item name
	const headerItemName = document.createElement("th")
	headerItemName.id = "cart_th_item_name"
	headerItemName.innerHTML = "Item"

	//creating table header for item quantity
	const headerItemQuantity = document.createElement("th")
	headerItemQuantity.id = "cart_th_item_quantity"
	headerItemQuantity.innerHTML = "Quantity"

	//creating table header for item price
	const headerItemPrice = document.createElement("th")
	headerItemPrice.innerHTML = "Price"
	headerItemPrice.id = "cart_th_item_price"


	//totals section
	const totalSection = document.createElement("div")
	totalSection.id = "cart_total_section"
	totalSection.classList.add("flexbox_column")

	//subtotal section
	const subTotalContainer = document.createElement("div")
	subTotalContainer.classList.add("cart_total_container")
	subTotalContainer.classList.add("flexbox")

	const subtotalLabel = document.createElement("h3")
	subtotalLabel.id = "cart_total_subTotal_label"
	subtotalLabel.classList.add("cart_total_label")
	subtotalLabel.innerHTML = "Subtotal:"

	const subTotalValue = document.createElement("p")
	subTotalValue.id = "cart_total_subTotal_value"
	subTotalValue.classList.add("cart_total_value")

	//tax section
	const taxContainer = document.createElement("div")
	taxContainer.classList.add("cart_total_container")
	taxContainer.classList.add("flexbox")

	const taxLabel = document.createElement("h3")
	taxLabel.classList.add("cart_total_label")
	taxLabel.id = "cart_total_tax_label"
	taxLabel.innerHTML = "Taxes:"

	const taxValue = document.createElement("p")
	taxValue.id = "cart_total_tax_value"
	taxValue.classList.add("cart_total_value")

	//tip section
	const tipContainer = document.createElement("div")
	tipContainer.classList.add("cart_total_container")
	tipContainer.classList.add("flexbox")

	const tipLabel = document.createElement("h3")
	tipLabel.classList.add("cart_total_label")
	tipLabel.id = "cart_total_tip_label"
	tipLabel.innerHTML = "Tips:"

	const tipValue = document.createElement("input")
	tipValue.setAttribute("type", "number")
	tipValue.id = "cart_total_tip_value"
	tipValue.classList.add("cart_total_value")
	tipValue.setAttribute("min", "0")
	tipValue.setAttribute("max", "100")
	tipValue.onkeyup = (event) =>
	{
		event.preventDefault()

		if (Helper.isNumber(event.keyCode) && event.keyCode != 13) return
		if (Helper.isString(event.key) && event.key.toLowerCase() !== "enter") return
		if (Helper.isString(event.code) && event.code.toLowerCase() !== "enter") return

		tipValue.blur()
	}
	tipValue.onchange = () =>
	{
		Menu.updateTotals()
	}

	//total section
	const totalContainer = document.createElement("div")
	totalContainer.classList.add("cart_total_container")
	totalContainer.classList.add("flexbox")

	const totalLabel = document.createElement("h3")
	totalLabel.classList.add("cart_total_label")
	totalLabel.id = "cart_total_total_label"
	totalLabel.innerHTML = "Total:"

	const totalValue = document.createElement("p")
	totalValue.id = "cart_total_total_value"
	totalValue.classList.add("cart_total_value")


	//setting up payment section
	const paymentSection = document.createElement("div")
	paymentSection.id = "cart_payment_section_container"

	const cashButton = document.createElement("button")
	{
		cashButton.classList.add("cart_payment_button")
		cashButton.innerHTML = "Cash"

		//bring to payment page
		cashButton.onclick = () =>
		{
			StorageManager.setStoredValue("payment", "Cash")
			window.location.assign("../pages/order.html?type=cash")
		}
	}

	const cardPayment = document.createElement("button")
	{
		cardPayment.classList.add("cart_payment_button")
		cardPayment.innerHTML = "Card"

		//bring to payment page
		cardPayment.onclick = () => {
			StorageManager.setStoredValue("payment", "Card")
			window.location.assign("../pages/order.html?type=card")
		}
	}

	const payPalButton = document.createElement("button")
	{
		payPalButton.classList.add("cart_payment_button")
		payPalButton.innerHTML = "PayPal"

		//bring to payment page
		payPalButton.onclick = () => {
			StorageManager.setStoredValue("payment", "PayPal")
			window.location.assign("../pages/order.html?type=paypal")
		}
	}

	const applePayButton = document.createElement("button")
	{
		applePayButton.classList.add("cart_payment_button")
		applePayButton.innerHTML = "Apple Pay"

		//bring to payment page
		applePayButton.onclick = () => {
			StorageManager.setStoredValue("payment", "Apple Pay")
			window.location.assign("../pages/order.html?type=applepay")
		}
	}

	const samsungPayButton = document.createElement("button")
	{
		samsungPayButton.classList.add("cart_payment_button")
		samsungPayButton.innerHTML = "Samsung Pay"

		//bring to payment page
		samsungPayButton.onclick = () => {
			StorageManager.setStoredValue("payment", "Samsung Pay")
			window.location.assign("../pages/order.html?type=samsungpay")
		}
	}

	const googlePayButton = document.createElement("button")
	{
		googlePayButton.classList.add("cart_payment_button")
		googlePayButton.innerHTML = "Google Pay"

		//bring to payment page
		googlePayButton.onclick = () => {
			StorageManager.setStoredValue("payment", "Google Pay")
			window.location.assign("../pages/order.html?type=googlepay")
		}
	}


	cartTableRow.appendChild(headerItemName)
	cartTableRow.appendChild(headerItemQuantity)
	cartTableRow.appendChild(headerItemPrice)

	cartTable.appendChild(cartTableRow)

	cartTableContainer.appendChild(cartTable)

	paymentSection.appendChild(cashButton)
	paymentSection.appendChild(cardPayment)
	paymentSection.appendChild(payPalButton)
	paymentSection.appendChild(applePayButton)
	paymentSection.appendChild(samsungPayButton)
	paymentSection.appendChild(googlePayButton)

	subTotalContainer.appendChild(subtotalLabel)
	subTotalContainer.appendChild(subTotalValue)
	taxContainer.appendChild(taxLabel)
	taxContainer.appendChild(taxValue)
	tipContainer.appendChild(tipLabel)
	tipContainer.appendChild(tipValue)
	totalContainer.appendChild(totalLabel)
	totalContainer.appendChild(totalValue)

	totalSection.appendChild(subTotalContainer)
	totalSection.appendChild(taxContainer)
	totalSection.appendChild(tipContainer)
	totalSection.appendChild(totalContainer)

	cartContainer.appendChild(cartCloseBtn)
	cartContainer.appendChild(cartHeader)
	cartContainer.appendChild(hr)
	cartContainer.appendChild(cartTableContainer)
	cartContainer.appendChild(totalSection)
	cartContainer.appendChild(paymentSection)

	menuContainer.appendChild(cartContainer)
}

/*
* Adds items on the cart to an array
*/
Menu.addToCartArray = (itemName, itemTopping, quantity) =>
{
	const item =
	{
		"name": itemName,
		"toppings": itemTopping,
		"quantity": quantity
	}

	Menu.cart.push(item)
	Menu.updateTotals()

	return item
}

/*
*	Sets up the menu items and toppings
*/
Menu.setup = () =>
{
	// Add toppings
	// Vegetable options
	Menu.addTopping("tomatoes", 0.10)
	Menu.addTopping("lettuce", 0.10)
	Menu.addTopping("green cabbage", 0.10)
	Menu.addTopping("red cabbage", 0.10)
	Menu.addTopping("red onion", 0.10)
	Menu.addTopping("onion", 0.10)
	Menu.addTopping("asparagus", 0.10)
	Menu.addTopping("hummus", 0.10)
	Menu.addTopping("red pepper", 0.10)
	Menu.addTopping("green pepper", 0.10)
	Menu.addTopping("orange pepper", 0.10)
	Menu.addTopping("yellow pepper", 0.10)
	Menu.addTopping("zucchini", 0.10)
	Menu.addTopping("cucumber", 0.10)
	Menu.addTopping("egg plant", 0.10)
	Menu.addTopping("chickpeas", 0.10)
	Menu.addTopping("spinach", 0.10)
	Menu.addTopping("celery", 0.10)
	Menu.addTopping("carrots", 0.10)
	Menu.addTopping("pickle", 0.10)
	Menu.addTopping("cauliflower", 0.10)
	Menu.addTopping("broccoli", 0.05)

	// Seed options
	Menu.addTopping("pomegranate seeds", 0.10)
	Menu.addTopping("pumpkin seeds", 0.10)
	Menu.addTopping("white sesame seeds", 0.10)
	Menu.addTopping("quinoa seeds", 0.10)
	Menu.addTopping("chia seeds", 0.10)

	// Condiments
	Menu.addTopping("lemon juice", 0.05)
	Menu.addTopping("lemon zest", 0.05)
	Menu.addTopping("orange zest", 0.05)
	Menu.addTopping("ginger juice", 0.05)
	Menu.addTopping("ginger puree", 0.10)
	Menu.addTopping("white wine vinegar", 0.05)
	Menu.addTopping("cider vinegar", 0.05)
	Menu.addTopping("extra virgin olive oil", 0.05)
	Menu.addTopping("vegetable oil", 0.05)
	Menu.addTopping("truffle oil", 0.10)
	Menu.addTopping("canola oil", 0.10)
	Menu.addTopping("coconut oil", 0.10)
	Menu.addTopping("dijon mustard", 0.05)
	Menu.addTopping("honey", 0.05)
	Menu.addTopping("minced garlic", 0.10)
	Menu.addTopping("thyme", 0.10)
	Menu.addTopping("salt", 0.05)
	Menu.addTopping("white pepper", 0.05)
	Menu.addTopping("black pepper", 0.05)
	Menu.addTopping("tomato salsa", 0.10)
	Menu.addTopping("chocolate ", 0.10)
	Menu.addTopping("vanilla", 0.10)
	Menu.addTopping("chicken stock", 0.30)
	Menu.addTopping("vegetable stock", 0.20)
	Menu.addTopping("parsely leaves", 0.10)
	Menu.addTopping("hibiscus flowers", 0.10)
	Menu.addTopping("mint leaves", 0.10)
	Menu.addTopping("basil leaves", 0.10)
	Menu.addTopping("mayonnaise", 0.05)
	Menu.addTopping("red wine", 1.00)
	Menu.addTopping("white wine", 1.00)
	Menu.addTopping("chives", 0.10)
	Menu.addTopping("cilantro", 0.10)
	Menu.addTopping("worcestershire sauce", 0.05)
	Menu.addTopping("paprika", 0.05)
	Menu.addTopping("cumin", 0.05)
	Menu.addTopping("onion powder", 0.05)
	Menu.addTopping("garlic powder", 0.05)
	Menu.addTopping("lime juice", 0.0567890)
	Menu.addTopping("chiles", 0.10)
	Menu.addTopping("chili powder", 0.10)
	Menu.addTopping("jalapeño", 0.20)
	Menu.addTopping("brown sugar", 0.10)
	Menu.addTopping("white sugar", 0.10)
	Menu.addTopping("cane sugar", 0.10)
	Menu.addTopping("confectioners’ sugar", 0.10)
	Menu.addTopping("powdered sugar", 0.15)
	Menu.addTopping("icing sugar", 0.15)
	Menu.addTopping("sweetener", 0.10)
	Menu.addTopping("beans", 0.30)
	Menu.addTopping("ketchup", 0.10)
	Menu.addTopping("mustard", 0.10)
	Menu.addTopping("cajun seasoning", 0.10)
	Menu.addTopping("pizza sauce", 0.30)
	Menu.addTopping("soy sauce", 0.05)

	// Protein options
	Menu.addTopping("salmon", 8.50)
	Menu.addTopping("chicken", 4.00)
	Menu.addTopping("shrimp", 5.50)
	Menu.addTopping("beef", 5.50)
	Menu.addTopping("pork", 3.50)
	Menu.addTopping("eggs", 1.50)
	Menu.addTopping("tuna", 2.50)
	Menu.addTopping("white fish", 6.50)
	Menu.addTopping("bacon", 1.00)

	// Fruit options
	Menu.addTopping("ruby red grapefruit", 0.30)
	Menu.addTopping("blood oranges", 0.30)
	Menu.addTopping("orange", 0.30)
	Menu.addTopping("quinoa", 0.30)
	Menu.addTopping("apple", 0.30)
	Menu.addTopping("banana", 0.30)
	Menu.addTopping("mango", 0.30)
	Menu.addTopping("avocado", 0.30)
	Menu.addTopping("raspberries", 0.10)
	Menu.addTopping("black berries", 0.10)
	Menu.addTopping("blue berries", 0.10)
	Menu.addTopping("strawberries", 0.10)

	// Dairy options
	Menu.addTopping("blue cheese crumbles", 0.15)
	Menu.addTopping("american cheese", 0.15)
	Menu.addTopping("cheddar cheese", 0.15)
	Menu.addTopping("colby jack cheese", 0.15)
	Menu.addTopping("provolone cheese", 0.15)
	Menu.addTopping("cream cheese", 0.15)
	Menu.addTopping("parmesan cheese", 0.15)
	Menu.addTopping("mozzarella cheese", 0.15)
	Menu.addTopping("sour cream", 0.15)
	Menu.addTopping("coconut milk", 0.20)
	Menu.addTopping("pistachio milk", 0.20)
	Menu.addTopping("whole milk", 0.20)
	Menu.addTopping("almond milk", 0.20)
	Menu.addTopping("tofu", 0.20)
	Menu.addTopping("yogurt", 0.20)
	Menu.addTopping("unsalted butter", 0.10)
	Menu.addTopping("salted butter", 0.10)

	// Other
	Menu.addTopping("sourdough bread", 0.40)
	Menu.addTopping("raisin bread", 0.40)
	Menu.addTopping("french bread", 0.40)
	Menu.addTopping("tortilla", 0.30)
	Menu.addTopping("fig jam", 0.20)
	Menu.addTopping("foie gras", 0.20)
	Menu.addTopping("arborio rice", 0.50)
	Menu.addTopping("white rice", 0.50)
	Menu.addTopping("brown rice", 0.50)
	Menu.addTopping("vegetable broth", 0.50)
	Menu.addTopping("chicken broth", 0.50)
	Menu.addTopping("shallot", 0.10)
	Menu.addTopping("hamburger bun", 0.40)
	Menu.addTopping("pine nuts", 0.30)
	Menu.addTopping("cashew nuts", 0.30)
	Menu.addTopping("peanuts", 0.30)
	Menu.addTopping("pecans", 0.30)
	Menu.addTopping("almond flour", 0.20)
	Menu.addTopping("corn flour", 0.20)
	Menu.addTopping("cornstarch", 0.10)
	Menu.addTopping("red curry paste", 0.50)
	Menu.addTopping("yellow curry paste", 0.50)
	Menu.addTopping("sriracha", 0.10)
	Menu.addTopping("honey", 0.20)
	Menu.addTopping("vanilla extract", 0.10)
	Menu.addTopping("whipped cream", 0.30)
	Menu.addTopping("ice cream", 0.50)
	Menu.addTopping("vanilla ice cream", 0.50)
	Menu.addTopping("white chocolate", 0.50)
	Menu.addTopping("dark chocolate", 0.50)
	Menu.addTopping("milk chocolate", 0.50)
	Menu.addTopping("pistachio paste", 0.20)
	Menu.addTopping("vanilla bean", 0.20)
	Menu.addTopping("ice", 0.10)
	Menu.addTopping("maple syrup", 0.10)
	Menu.addTopping("torani sugar-free coconut syrup", 0.10)
	Menu.addTopping("carbonated water", 0.40)
	Menu.addTopping("matcha powder", 0.20)
	Menu.addTopping("toasted", 0.20)
	Menu.addTopping("rum", 0.05)

	// Drink options
	Menu.addTopping("coke", 0.00)
	Menu.addTopping("cherry coke", 0.00)
	Menu.addTopping("pepsi", 0.00)
	Menu.addTopping("root beer", 0.00)
	Menu.addTopping("hi c", 0.00)
	Menu.addTopping("sprite", 0.00)
	Menu.addTopping("ginger ale", 0.00)
	Menu.addTopping("grape fanta", 0.00)
	Menu.addTopping("orange fanta", 0.00)
	Menu.addTopping("powerade", 0.00)
	Menu.addTopping("lemonade brisk", 0.00)
	Menu.addTopping("7up", 0.00)
	Menu.addTopping("dr pepper", 0.00)
	Menu.addTopping("minute maid lemonade", 0.00)
	Menu.addTopping("chocolate milk", 0.00)
	Menu.addTopping("white milk", 0.00)

	////////////////////////////////////////////////////////////////

	// Add items

	// Healthy Haven
	Menu.addItem("Salmon Salad", 12.00, "Grilled Salmon Salad with Citrus Vinaigrette", {
		"lettuce": true,
		"red onion": true,
		"asparagus": true,
		"red pepper": true,
		"green pepper": true,
		"orange pepper": true,
		"yellow pepper": true,
		"zucchini": true,
		"cucumber": false,
		"pomegranate seeds": true,
		"pumpkin seeds": false,
		"white sesame seeds": false,
		"quinoa seeds": false,
		"salmon": true,
		"lemon juice": true,
		"lemon zest": true,
		"white wine vinegar": true,
		"extra virgin olive oil": true,
		"dijon mustard": true,
		"honey": true,
		"minced garlic": true,
		"thyme": true,
		"salt": true,
		"white pepper": true,
		"black pepper": false,
		"ruby red grapefruit": true,
		"blood oranges": true,
		"orange": false
	}, "../assets/menu/food/Grilled_Salmon_Salad_with_Citrus_Vinaigrette.jpg")

	Menu.addItem("Bell Peppers", 4.00, "Quinoa and Vegetable Stuffed Bell Peppers", {
		"quinoa": true,
		"chicken stock": true,
		"vegetable stock": false,
		"red pepper": true,
		"orange pepper": false,
		"yellow pepper": false,
		"black pepper": true,
		"minced garlic": true,
		"egg plant": true,
		"zucchini": true,
		"red onion": true,
		"parsely leaves": true,
		"mint leaves": true,
		"tomatoes": true
	}, "../assets/menu/food/Quinoa_and_Vegetable_Stuffed_Bell_Peppers.jpg")

	Menu.addItem("Avocado Toast Trio", 4.00, "Avocado Toast Trio with Tomato Salsa", {
		"toasted": true,
		"tomatoes": true,
		"lettuce": true,
		"red onion": true,
		"asparagus": true,
		"red pepper": true,
		"green pepper": false,
		"orange pepper": false,
		"yellow pepper": false,
		"zucchini": true,
		"cucumber": false,
		"cream cheese": true,
		"eggs": true,
		"tuna": true,
		"mayonnaise": true,
		"salt": true,
		"white pepper": true,
		"black pepper": false,
		"tomato salsa": true
	}, "../assets/menu/food/Avocado_Toast_Trio_with_Tomato_Salsa.jpg")

	Menu.addItem("Mediterranean Power Bowl", 4.00, "Mediterranean Power Bowl with Hummus", {
		"hummus": true,
		"chickpeas": true,
		"chicken": true,
		"beef": false,
		"shrimp": false,
		"pork": false,
		"quinoa": true,
		"tomatoes": true,
		"cucumber": true,
		"red onion": true,
		"spinach": true,
		"green pepper": false,
		"orange pepper": true,
		"red pepper": true,
		"yellow pepper": true,
		"salt": true,
		"white pepper": true,
		"black pepper": false,
		"american cheese": false,
		"cheddar cheese": true,
		"provolone cheese": false
	}, "../assets/menu/food/Mediterranean_Power_Bowl_with_Hummus.jpg")

	// Indulgence Oasis
	Menu.addItem("Lobster", 15.00, "Truffle-infused Lobster Mac and Cheese", {
		"salt": true,
		"white pepper": false,
		"black pepper": true,
		"extra virgin olive oil": true,
		"onion": false,
		"red onion": false,
		"minced garlic": true,
		"carrots": false,
		"celery": false,
		"provolone cheese": false,
		"american cheese": false,
		"cheddar cheese": true
	}, "../assets/menu/food/Truffle-infused_Lobster_Mac_and_Cheese.jpg")

	Menu.addItem("Filet Mignon", 8.00, "Filet Mignon with Red Wine Reduction", {
		"beef": true,
		"extra virgin olive oil": true,
		"black pepper": true,
		"white pepper": false,
		"red wine": true
	}, "../assets/menu/food/Filet_Mignon_with_Red_Wine_Reduction.jpg")

	Menu.addItem("Foie Gras Crostini", 5.00, "Foie Gras Crostini with Fig Jam", {
		"orange zest": true,
		"extra virgin olive oil": true,
		"canola oil": false,
		"vegetable oil": false,
		"chives": true,
		"salt": true,
		"white pepper": false,
		"black pepper": true,
		"sourdough bread": true,
		"raisin bread": false,
		"fig jam": true,
		"foie gras": true
	}, "../assets/menu/food/Foie_Gras_Crostini_with_Fig_Jam.jpg")

	Menu.addItem("Risotto", 5.00, "Black Truffle Risotto with Parmesan Crisps", {
		"arborio rice": true,
		"white rice": false,
		"brown rice": false,
		"minced garlic": true,
		"vegetable broth": true,
		"chicken broth": false,
		"extra virgin olive oil": true,
		"canola oil": true,
		"truffle oil": true,
		"white wine": true,
		"red wine": false,
		"parmesan cheese": true,
		"cheddar cheese": false,
		"provolone cheese": false,
		"colby jack cheese": false,
		"american cheese": false,
		"salt": true,
		"white pepper": true,
		"black pepper": false,
		"chives": true
	}, "../assets/menu/food/Black_Truffle_Risotto_with_Parmesan_Crisps.jpg")

	// Fast Fusion Corner
	Menu.addItem("Burger", 6.00, "Gourmet Beef Burger with Chipotle Aioli", {
		"cilantro": true,
		"minced garlic": true,
		"worcestershire sauce": true,
		"eggs": false,
		"paprika": true,
		"cumin": true,
		"onion powder": true,
		"garlic powder": false,
		"salt": true,
		"white pepper": false,
		"black pepper": true,
		"beef": true,
		"chicken": false,
		"pork": false,
		"mayonnaise": false,
		"lime juice": false,
		"lemon juice": false,
		"chiles": false,
		"hamburger bun": true,
		"colby jack cheese": false,
		"american cheese": true,
		"cheddar cheese": false,
		"provolone cheese": false,
		"red onion": false,
		"jalapeño": false,
		"pickle": false,
		"lettuce": true,
		"tomatoes": true
	}, "../assets/menu/food/Gourmet_Beef_Burger_with_Chipotle_Aioli.jpg")

	Menu.addItem("Pesto Chicken Panini", 6.00, "Pesto Chicken Panini with Sundried Tomatoes", {
		"basil leaves": true,
		"pine nuts": true,
		"cashew nuts": false,
		"peanuts": false,
		"parmesan cheese": true,
		"extra virgin olive oil": true,
		"minced garlic": true,
		"salt": true,
		"white pepper": false,
		"black pepper": true,
		"chicken": true,
		"beef": false,
		"pork": false,
		"mozzarella cheese": true,
		"tomatoes": true,
		"sourdough bread": true,
		"raisin bread": false,
		"french bread": false
	}, "../assets/menu/food/Pesto_Chicken_Panini_with_Sundried_Tomatoes.jpg")

	Menu.addItem("Tacos", 3.00, "Street-Style Tacos with Mango Salsa", {
		"mango": true,
		"lime juice": true,
		"red pepper": true,
		"yellow pepper": true,
		"orange pepper": false,
		"green pepper": true,
		"red onion": true,
		"jalapeño": false,
		"cilantro": true,
		"avocado": true,
		"sour cream": false,
		"garlic powder": true,
		"salt": true,
		"brown sugar": true,
		"white sugar": false,
		"cane sugar": false,
		"white fish": false,
		"pork": true,
		"beef": false,
		"chili powder": false,
		"beans": false,
		"tortilla": true,
		"sourdough bread": false
	}, "../assets/menu/food/Street-Style_Tacos_with_Mango_Salsa.jpg")

	Menu.addItem("BBQ Pulled Pork Sliders", 8.00, "BBQ Pulled Pork Sliders with Coleslaw", {
		"ketchup": false,
		"mustard": false,
		"mayonnaise": false,
		"brown sugar": true,
		"white sugar": false,
		"cane sugar": false,
		"salt": true,
		"black pepper": true,
		"white pepper": false,
		"minced garlic": true,
		"white wine vinegar": true,
		"cider vinegar": true,
		"worcestershire sauce": true,
		"cajun seasoning": false,
		"red onion": true,
		"onion": false,
		"chicken stock": true,
		"red cabbage": false,
		"green cabbage": true,
		"carrots": false,
		"hamburger bun": true,
		"sourdough bread": false,
		"french bread": false
	}, "../assets/menu/food/BBQ_Pulled_Pork_Sliders_with_Coleslaw.jpg")

	// Guilt-Free Delights
	Menu.addItem("Pizza", 5.00, "Cauliflower Crust Margherita Pizza", {
		"cauliflower": true,
		"parmesan cheese": true,
		"mozzarella cheese": false,
		"provolone cheese": false,
		"cheddar cheese": false,
		"american cheese": false,
		"almond flour": true,
		"corn flour": false,
		"eggs": true,
		"garlic powder": true,
		"pizza sauce": true,
		"tomatoes": true,
		"basil leaves": true
	}, "../assets/menu/food/Cauliflower_Crust_Margherita_Pizza.jpg")

	Menu.addItem("Zucchini Noodles", 2.00, "Zucchini Noodles with Basil Pesto", {
		"zucchini": true,
		"basil leaves": true,
		"minced garlic": true,
		"extra virgin olive oil": true,
		"lemon juice": true,
		"parmesan cheese": true,
		"american cheese": false,
		"cheddar cheese": false,
		"provolone cheese": false,
		"colby jack cheese": false,
		"mozzarella cheese": false,
		"black pepper": true,
		"white pepper": false,
		"tomatoes": false
	}, "../assets/menu/food/Zucchini_Noodles_with_Basil_Pesto.jpg")

	Menu.addItem("Vegan Thai Coconut Curry", 5.00, "Vegan Thai Coconut Curry with Tofu", {
		"tofu": true,
		"coconut milk": true,
		"red curry paste": true,
		"salt": true,
		"white pepper": true,
		"black pepper": false,
		"cornstarch": true,
		"coconut oil": true,
		"red onion": false,
		"onion": false,
		"minced garlic": true,
		"broccoli": true,
		"red pepper": true,
		"green pepper": true,
		"yellow pepper": true,
		"orange pepper": true,
		"carrots": true,
		"white sugar": true,
		"brown sugar": false,
		"soy sauce": true,
		"lime juice": true,
		"basil leaves": true,
		"sriracha": true
	}, "../assets/menu/food/Vegan_Thai_Coconut_Curry_with_Tofu.jpg")

	Menu.addItem("Pudding Parfait", 4.00, "Chia Seed Pudding Parfait with Mixed Berries", {
		"yogurt": true,
		"chia seeds": true,
		"honey": true,
		"vanilla extract": true,
		"strawberries": true,
		"raspberries": true,
		"black berries": true,
		"blue berries": true
	}, "../assets/menu/food/Chia_Seed_Pudding_Parfait_with_Mixed_Berries.jpg")

	// Decadent Dessert Haven
	Menu.addItem("Lava Cake", 3.00, "Molten Chocolate/Vanilla Lava Cake", {
		"milk chocolate": true,
		"vanilla": false,
		"unsalted butter": true,
		"salted butter": false,
		"salt": true,
		"vanilla extract": true,
		"eggs": true,
		"confectioners’ sugar": true,
		"brown sugar": false,
		"white sugar": false,
		"cane sugar": false,
		"whipped cream": true,
		"ice cream": true,
		"raspberries": true,
		"blue berries": false,
		"strawberries": false,
		"black berries": false
	}, "../assets/menu/food/Molten_Chocolate_Lava_Cake_with_Raspberry_Coulis.jpg")

	Menu.addItem("Sundae", 3.00, "Sundae Caramelized Banana Foster", {
		"salted butter": false,
		"unsalted butter": true,
		"brown sugar": true,
		"white sugar": false,
		"cane sugar": false,
		"banana": true,
		"rum": true,
		"vanilla ice cream": true,
		"whipped cream": true,
		"pecans": true,
		"cashew nuts": false,
		"peanuts": false
	}, "../assets/menu/food/Sundae_Caramelized_Banana_Foster.jpg")

	Menu.addItem("Mousse", 3.00, "Pistachio White Chocolate Mousse", {
		"white chocolate": true,
		"dark chocolate": false,
		"milk chocolate": false,
		"pistachio milk": true,
		"whipped cream": true,
		"cream cheese": true,
		"powdered sugar": true,
		"white sugar": false,
		"brown sugar": false,
		"cane sugar": false,
		"confectioners’ sugar": false,
		"pistachio paste": true
	}, "../assets/menu/food/Pistachio_White_Chocolate_Mousse.jpg")

	Menu.addItem("Tart", 3.00, "Raspberry Almond Tart with Vanilla Bean Cream", {
		"white sugar": true,
		"brown sugar": false,
		"cane sugar": false,
		"confectioners’ sugar": false,
		"powdered sugar": false,
		"salt": true,
		"unsalted butter": true,
		"salted butter": false,
		"eggs": true,
		"cornstarch": true,
		"whole milk": true,
		"coconut milk": false,
		"almond milk": false,
		"pistachio milk": false,
		"vanilla bean": true,
		"vanilla": true,
		"raspberries": true,
		"blue berries": false,
		"strawberries": false,
		"black berries": false,
		"icing sugar": true
	}, "../assets/menu/food/Raspberry_Almond_Tart_with_Vanilla_Bean_Cream.jpg")

	// Exotic Elixirs Bar
	Menu.addItem("Detox Water", 1.00, "Hibiscus Infused Detox Water", {
		"hibiscus flowers": true,
		"sweetener": true,
		"ice": true
	}, "../assets/menu/drinks/Hibiscus_Infused_Detox_Water.jpg")

	Menu.addItem("Smoothie", 2.00, "Mango Tango Smoothie with Chia Seeds", {
		"banana": true,
		"mango": true,
		"spinach": true,
		"ginger juice": true,
		"ginger puree": true,
		"chia seeds": true,
		"ice": true
	}, "../assets/menu/drinks/Mango_Tango_Smoothie_with_Chia_Seeds.jpg")

	Menu.addItem("Sparkler", 1.00, "Basil Lemonade Sparkler", {
		"lemon juice": true,
		"basil leaves": true,
		"carbonated water": true,
		"maple syrup": false,
		"ice": true
	}, "../assets/menu/drinks/Basil_Lemonade_Sparkler.jpg")

	Menu.addItem("Matcha Latte", 2.00, "Matcha Latte with Almond Milk", {
		"matcha powder": true,
		"almond milk": true,
		"coconut milk": false,
		"torani sugar-free coconut syrup": true
	}, "../assets/menu/drinks/Matcha_Latte_with_Almond_Milk.jpg")

	// Drinks
	Menu.addItem("Water", 0.50, "Water", {}, "../assets/menu/drinks/Water.jpg")

	Menu.addItem("Milk", 0.50, "Milk", {
		"chocolate milk": false,
		"white milk": true,
		"whole milk": false,
		"coconut milk": false,
		"almond milk": false,
		"pistachio milk": false
	}, "../assets/menu/drinks/Milk.jpg")

	Menu.addItem("Fountain Drink", 0.50, "Coke/Pepsi product", {
		"coke": true,
		"cherry coke": false,
		"pepsi": false,
		"root beer": false,
		"hi c": false,
		"sprite": false,
		"ginger ale": false,
		"grape fanta": false,
		"orange fanta": false,
		"powerade": false,
		"lemonade brisk": false,
		"7up": false,
		"dr pepper": false,
		"minute maid lemonade": false
	}, "../assets/menu/drinks/Fountain_Drink.jpg")
}

///////////////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
	Menu.setup() //setting up the menu items and toppings

	////////////////////////////////////////////////////////////////

	if (!Helper.isOnPage("menu.html")) return

	const storedCart = StorageManager.getStoredString("cartItems")
	if (storedCart.length > 0)
	{
		Menu.cart = Helper.parse(storedCart)
	}

	const menuContainer = document.createElement("div")
	menuContainer.id = "menu_container"

	////////////////////////////////////////////////////////////////

	Menu.createCartDisplay(menuContainer) //creating the cart display

	// const cartTable = menuContainer.querySelector("#cart_table")
	// console.log(cartTable)

	////////////////////////////////////////////////////////////////
	//creating button for viewing cart
	const viewCartButton = document.createElement("button")
	viewCartButton.id = "view_cart_button"
	viewCartButton.innerHTML = "Cart"
	viewCartButton.onclick = () => {
		const cartContainer = document.querySelector("#cart_container")

		const isShown = Helper.getBool(cartContainer.getAttribute("isShown"))

		cartContainer.setAttribute("isShown", !isShown )
	}

	////////////////////////////////////////////////////////////////

	const menuArray = Array.from(Menu.items.keys()) //converts the map of items into array form

	for(const itemName of menuArray)
		Menu.createItemDisplay(itemName, Menu.items.get(itemName), menuContainer)

	////////////////////////////////////////////////////////////////

	document.body.appendChild(viewCartButton)
	document.body.appendChild(menuContainer)
})