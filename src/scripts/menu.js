let Menu = new Map()

Menu.toppings = new Map()
Menu.items = new Map()

/*
*	Adds a new topping to the menu
*/
Menu.addTopping = (name, price) =>
{
	const newTopping =
	{
		"name": name,
		"price": Helper.priceify(price),
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
		"price": Helper.priceify(price),
		"description": description,
		"toppings": toppingList,
		"image": image,
		"availibility": true
	}

	Menu.items.set(name.toLowerCase(), newItem)
}

/*
*	Creates the display of the item and topping
*/
Menu.createItemDisplay = (itemName, item, menuContainer) =>
{
	//creates a container for the item
	const section = document.createElement("div")
	section.classList.add("menu_item_section")
	section.classList.add("glass_morphism_weak")

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
	price.innerHTML = `$${Helper.priceify(item.price)}`

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

	//creates the item name on the display of list of toppings
	const toppingListItemLabel = document.createElement("h3")
	toppingListItemLabel.classList.add("item_menu_topping_list_item_label")
	toppingListItemLabel.innerHTML = itemName

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
		toppingLabel.innerHTML = `${topping} $${toppingData.price}`
		toppingLabel.setAttribute("for", `topping_checkbox_${topping}`)

		//creates a line break for after each topping
		const lineBreak = document.createElement("br")

		//adding topping checkbox, name, and line break to the display of list of toppings
		toppingList.appendChild(toppingCheckbox)
		toppingList.appendChild(toppingLabel)
		toppingList.appendChild(lineBreak)
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
		//stores the total price of the selected toppings
		let totalToppingsPrice = 0

		const cartTable = document.querySelector("#cart_table")

		const cartTableRow = document.createElement("tr")
		cartTableRow.classList.add("cart_table_row")

		//creating the item name
		const cartItemName = document.createElement("td")
		{
			const name = addToCartButton.parentNode.childNodes[1].innerHTML //name of item

			//array form of the toppings that are selected
			const listOfWantedToppingsCheckboxes = Array.from(toppingList.childNodes).filter((element) =>
			{
				return element.checked
			})

			cartItemName.classList.add("cart_item_name")

			//creating the actual item name on cart
			const cartItemItemName = document.createElement("h1")
			cartItemItemName.innerHTML = `${name}`
			cartItemItemName.classList.add("cart_item_item_name")

			//creating section for the toppings
			const cartItemToppingsSection = document.createElement("p")
			cartItemToppingsSection.classList.add("cart_item_toppings_section")
			cartItemToppingsSection.classList.add("flexbox_column")
			cartItemToppingsSection.classList.add("glass_morphism_weak")

			//adding toppings to the table
			for (const topping of listOfWantedToppingsCheckboxes)
			{
				//creating container for the topping
				const toppingContainer = document.createElement("div")
				toppingContainer.classList.add("flexbox")
				toppingContainer.classList.add("cart_item_topping_container")

				const toppingLabelText = topping.nextSibling.innerHTML

				const separationIndex = toppingLabelText.indexOf("$") //index that separates name and price of topping

				//creating the name of the topping
				const toppingName = document.createElement("h4")
				const name = toppingLabelText.substring(0, separationIndex - 1)
				toppingName.innerHTML = name
				toppingName.classList.add("cart_topping_name")

				//creating the price of the topping
				let price = Number(Helper.priceify(Menu.toppings.get(name).price))

				const toppingPrice = document.createElement("p")
				toppingPrice.innerHTML = `$${price}`
				toppingPrice.classList.add("cart_topping_price")

				totalToppingsPrice += price

				toppingContainer.appendChild(toppingName)
				toppingContainer.appendChild(toppingPrice)

				cartItemToppingsSection.appendChild(toppingContainer)
			}

			cartItemName.appendChild(cartItemItemName)
			cartItemName.appendChild(cartItemToppingsSection)
		}

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


			cartItemQuantityInput.onkeyup = (event) =>
			{
				event.preventDefault()
				const enterKey = 13

				if (event.keyCode == enterKey)
				{
					//ensures that the value of the input is within the set max
					if (cartItemQuantityInput.value > cartItemQuantityInput.max)
						cartItemQuantityInput.value = cartItemQuantityInput.max

					//ensures that the value of the input is within the set min
					if(cartItemQuantityInput.value < cartItemQuantityInput.min)
						cartItemQuantityInput.value = cartItemQuantityInput.min

					cartItemQuantityInput.blur() //removes focus from the input
				}

			}

			cartItemQuantityContainer.appendChild(cartItemQuantityInput)
			cartItemQuantitySection.appendChild(cartItemQuantityContainer)
		}

		//creating the button for removing the item from the cart
		const removeItemButton = document.createElement("button")
		removeItemButton.innerHTML = "Remove"
		removeItemButton.classList.add("cart_remove_item_button")
		removeItemButton.onclick = (event) => {
			const tableRow = event.target.parentNode.parentNode.parentNode
			tableRow.remove()
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
		const itemPrice = Number(Helper.priceify(Menu.items.get(itemName).price))

		const unitPrice = Number(Helper.priceify(itemPrice + totalToppingsPrice))

		cartItemPrice.innerHTML = `$${unitPrice.toFixed(2)}` //total price of the item

		//updates price of item when the quantity is changed
		cartItemQuantityInput.onchange = (event) => {
			const priceSection = event.target.parentNode.parentNode.nextSibling
			const price = unitPrice * cartItemQuantityInput.value
			priceSection.innerHTML = `$${price.toFixed(2)}`
		}

		cartTable.appendChild(cartTableRow)
	}



	section.appendChild(image)
	section.appendChild(name)
	section.appendChild(price)
	section.appendChild(description)
	section.appendChild(viewToppingsButton)
	section.appendChild(addToCartButton)

	menuContainer.appendChild(toppingList)
	menuContainer.appendChild(section)
}

Menu.isDuplicateItem = (itemName, toppingList, cartItems) =>
{

}

Menu.createCartDisplay = (menuContainer) =>
{
	const cartContainer = document.createElement("div")
	cartContainer.id = "cart_container"
	cartContainer.setAttribute("isShown", false)

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
	const divpos = cartHeader.offsetHeight
	console.log(divpos)

	//creating table header for item quantity
	const headerItemQuantity = document.createElement("th")
	headerItemQuantity.id = "cart_th_item_quantity"
	headerItemQuantity.innerHTML = "Quantity"

	//creating table header for item price
	const headerItemPrice = document.createElement("th")
	headerItemPrice.innerHTML = "Price"
	headerItemPrice.id = "cart_th_item_price"

	//setting up payment section
	const paymentSection = document.createElement("div")
	paymentSection.id = "cart_payment_section_container"

	const cashButton = document.createElement("button")
	{
		cashButton.classList.add("cart_payment_button")
		cashButton.innerHTML = "Cash"
	}


	const cardPayment = document.createElement("button")
	{
		cardPayment.classList.add("cart_payment_button")
		cardPayment.innerHTML = "Card"
	}


	const payPalButton = document.createElement("button")
	{
		payPalButton.classList.add("cart_payment_button")
		payPalButton.innerHTML = "PayPal"
	}


	const applePayButton = document.createElement("button")
	{
		applePayButton.classList.add("cart_payment_button")
		applePayButton.innerHTML = "Apple Pay"
	}

	const samsungPayButton = document.createElement("button")
	{
		samsungPayButton.classList.add("cart_payment_button")
		samsungPayButton.innerHTML = "Samsung Pay"
	}

	const googlePayButton = document.createElement("button")
	{
		googlePayButton.classList.add("cart_payment_button")
		googlePayButton.innerHTML = "Google Pay"
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


	cartContainer.appendChild(cartHeader)
	cartContainer.appendChild(hr)
	cartContainer.appendChild(cartTableContainer)

	cartContainer.appendChild(paymentSection)

	menuContainer.appendChild(cartContainer)
}


///////////////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
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
	} , "../assets/menu/food/Quinoa_and_Vegetable_Stuffed_Bell_Peppers.jpg")

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

	if (location.href.substring(location.href.lastIndexOf('/') + 1) != "menu.html") return

	const menuContainer = document.createElement("div")
	menuContainer.id = "menu_container"



	Menu.createCartDisplay(menuContainer)

	//creating button for viewing cart
	const viewCartButton = document.createElement("button")
	viewCartButton.id = "view_cart_button"
	viewCartButton.innerHTML = "Cart"
	viewCartButton.onclick = () => {
		const cartContainer = document.querySelector("#cart_container")

		const isShown = (/true/).test(cartContainer.getAttribute("isShown"))

		cartContainer.setAttribute("isShown", !isShown )
	}

	//broken
	viewCartButton.onkeyup = (event) =>
	{
		const escapeKey = 27

		if (event.keyCode == escapeKey)
			cartContainer.setAttribute("isShown", false)

	}

	const menuArray = Array.from(Menu.items.keys())

	for(const itemName of menuArray)
		Menu.createItemDisplay(itemName, Menu.items.get(itemName), menuContainer)

	document.body.appendChild(viewCartButton)
	document.body.appendChild(menuContainer)
})