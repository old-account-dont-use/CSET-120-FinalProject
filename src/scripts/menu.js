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
	const section = document.createElement("div")
	section.classList.add("menu_item_section")
	section.classList.add("glass_morphism_weak")

	const image = document.createElement("img")
	image.classList.add("menu_item_image")
	image.src = item.image

	const name = document.createElement("h3")
	name.classList.add("menu_item_name")
	name.innerHTML = itemName

	const price = document.createElement("h3")
	price.classList.add("menu_item_price")
	price.innerHTML = `$${Helper.priceify(item.price)}`

	const description = document.createElement("p")
	description.classList.add("menu_item_description")
	description.innerHTML = item.description

	const itemToppings = item.toppings

	const toppingList = document.createElement("div")
	toppingList.classList.add("menu_item_topping_list")
	toppingList.classList.add("glass_morphism")
	toppingList.setAttribute("isShown", false)

	const toppingListItemLabel = document.createElement("h3")
	toppingListItemLabel.classList.add("item_menu_topping_list_item_label")
	toppingListItemLabel.innerHTML = itemName

	toppingList.appendChild(toppingListItemLabel)

	for (const topping of itemToppings)
	{
		const toppingData = Menu.toppings.get(topping.toLowerCase())
		if (!toppingData)
		{
			console.error(`Item ${itemName} has invalid topping ${topping}`)
			continue
		}

		const toppingCheckbox = document.createElement("input")
		toppingCheckbox.type = "checkbox"
		toppingCheckbox.classList.add("menu_item_topping_checkbox")
		toppingCheckbox.id = `topping_checkbox_${topping}`

		const toppingLabel = document.createElement("label")
		toppingLabel.classList.add("menu_item_topping_label")
		toppingLabel.innerHTML = `${topping} $${toppingData.price}`
		toppingLabel.setAttribute("for", `topping_checkbox_${topping}`)

		const lineBreak = document.createElement("br")

		toppingList.appendChild(toppingCheckbox)
		toppingList.appendChild(toppingLabel)
		toppingList.appendChild(lineBreak)
	}

	const viewToppingsButton = document.createElement("button")
	viewToppingsButton.classList.add("menu_item_toppings_view_button")
	viewToppingsButton.innerHTML = "Select Toppings"
	viewToppingsButton.m_ToppingList = toppingList


	viewToppingsButton.onclick = (event) =>
	{
		const toppingList = event.target.m_ToppingList

		const isShown = (/true/).test(toppingList.getAttribute("isShown"))

		const toppingLists = document.querySelectorAll(".menu_item_topping_list")

		//hides the already displayed list if applicable so that only one list displays at a time
		for(const list of toppingLists)
		{
			if ((/true/).test(list.getAttribute("isShown")))
			{
				list.setAttribute("isShown", false)
				break
			}
		}

		//toggles list of toppings when "Select Toppings" button is clicked
		toppingList.setAttribute("isShown", !isShown)
	}

	const addToCartButton = document.createElement("button")
	addToCartButton.classList.add("menu_item_cart_button")
	addToCartButton.innerHTML = "Add to cart"
	//add item to cart along with selected toppings
	addToCartButton.onclick = (event) =>
	{

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
	Menu.addTopping("coke", 0.50)
	Menu.addTopping("cherry coke", 0.50)
	Menu.addTopping("pepsi", 0.50)
	Menu.addTopping("root beer", 0.50)
	Menu.addTopping("hi c", 0.50)
	Menu.addTopping("sprite", 0.50)
	Menu.addTopping("ginger ale", 0.50)
	Menu.addTopping("grape fanta", 0.50)
	Menu.addTopping("orange fanta", 0.50)
	Menu.addTopping("powerade", 0.50)
	Menu.addTopping("lemonade brisk", 0.50)
	Menu.addTopping("7up", 0.50)
	Menu.addTopping("dr pepper", 0.50)
	Menu.addTopping("minute maid lemonade", 0.50)
	Menu.addTopping("chocolate milk", 0.50)
	Menu.addTopping("white milk", 0.50)

	// Add items

	// Healthy Haven
	Menu.addItem("Salmon Salad", 12.00, "Grilled Salmon Salad with Citrus Vinaigrette", ["lettuce", "red onion", "asparagus", "red pepper", "green pepper", "orange pepper", "yellow pepper", "zucchini", "cucumber", "pomegranate seeds", "pumpkin seeds", "white sesame seeds", "quinoa seeds", "salmon", "lemon juice", "lemon zest", "white wine vinegar", "extra virgin olive oil", "dijon mustard", "honey", "minced garlic", "thyme", "salt", "white pepper", "black pepper", "ruby red grapefruit", "blood oranges", "orange"], "../assets/menu/food/Grilled_Salmon_Salad_with_Citrus_Vinaigrette.jpg")
	Menu.addItem("Bell Peppers", 4.00, "Quinoa and Vegetable Stuffed Bell Peppers", ["quinoa", "chicken stock", "vegetable stock", "red pepper", "orange pepper", "yellow pepper", "black pepper", "minced garlic", "egg plant", "zucchini", "red onion", "parsely leaves", "mint leaves", "tomatoes"], "../assets/menu/food/Quinoa_and_Vegetable_Stuffed_Bell_Peppers.jpg")
	Menu.addItem("Avocado Toast Trio", 4.00, "Avocado Toast Trio with Tomato Salsa", ["toasted", "tomatoes", "lettuce", "red onion", "asparagus", "red pepper", "green pepper", "orange pepper", "yellow pepper", "zucchini", "cucumber", "cream cheese", "eggs", "tuna", "mayonnaise", "salt", "white pepper", "black pepper", "tomato salsa"], "../assets/menu/food/Avocado_Toast_Trio_with_Tomato_Salsa.jpg")
	Menu.addItem("Mediterranean Power Bowl", 4.00, "Mediterranean Power Bowl with Hummus", ["hummus", "chickpeas", "chicken", "beef", "shrimp", "pork", "quinoa", "tomatoes", "cucumber", "red onion", "spinach", "green pepper", "orange pepper", "red pepper", "yellow pepper", "salt", "white pepper", "black pepper", "american cheese", "cheddar cheese", "provolone cheese"], "../assets/menu/food/Mediterranean_Power_Bowl_with_Hummus.jpg")

	// Indulgence Oasis
	Menu.addItem("Lobster", 15.00, "Truffle-infused Lobster Mac and Cheese", ["salt", "white pepper", "black pepper", "extra virgin olive oil", "onion", "red onion", "minced garlic", "carrots", "celery", "provolone cheese", "american cheese", "cheddar cheese"], "../assets/menu/food/Truffle-infused_Lobster_Mac_and_Cheese.jpg")
	Menu.addItem("Filet Mignon", 8.00, "Filet Mignon with Red Wine Reduction", ["beef", "extra virgin olive oil", "black pepper", "white pepper", "red wine"], "../assets/menu/food/Filet_Mignon_with_Red_Wine_Reduction.jpg")
	Menu.addItem("Foie Gras Crostini", 5.00, "Foie Gras Crostini with Fig Jam", ["orange zest", "extra virgin olive oil", "canola oil", "vegetable oil", "chives", "salt", "white pepper", "black pepper", "sourdough bread", "raisin bread", "fig jam", "foie gras"], "../assets/menu/food/Foie_Gras_Crostini_with_Fig_Jam.jpg")
	Menu.addItem("Risotto", 5.00, "Black Truffle Risotto with Parmesan Crisps", ["arborio rice", "white rice", "brown rice", "minced garlic", "vegetable broth", "chicken broth", "extra virgin olive oil", "canola oil", "truffle oil", "white wine", "red wine", "parmesan cheese", "cheddar cheese", "provolone cheese", "colby jack cheese", "american cheese", "salt", "white pepper", "black pepper", "chives"], "../assets/menu/food/Black_Truffle_Risotto_with_Parmesan_Crisps.jpg")

	// Fast Fusion Corner
	Menu.addItem("Burger", 6.00, "Gourmet Beef Burger with Chipotle Aioli", ["cilantro", "minced garlic", "worcestershire sauce", "eggs", "paprika", "cumin", "onion powder", "garlic powder", "salt", "white pepper", "black pepper", "beef", "chicken", "pork", "mayonnaise", "lime juice", "lemon juice", "chiles", "hamburger bun", "colby jack cheese", "american cheese", "cheddar cheese", "provolone cheese", "red onion", "jalapeño", "pickle", "lettuce"], "../assets/menu/food/Gourmet_Beef_Burger_with_Chipotle_Aioli.jpg")
	Menu.addItem("Pesto Chicken Panini", 6.00, "Pesto Chicken Panini with Sundried Tomatoes", ["basil leaves", "pine nuts", "cashew nuts", "peanuts", "parmesan cheese", "extra virgin olive oil", "minced garlic", "salt", "white pepper", "black pepper", "chicken", "beef", "pork", "mozzarella cheese", "tomatoes", "sourdough bread", "raisin bread", "french bread"], "../assets/menu/food/Pesto_Chicken_Panini_with_Sundried_Tomatoes.jpg")
	Menu.addItem("Tacos", 3.00, "Street-Style Tacos with Mango Salsa", ["mango", "lime juice", "red pepper", "yellow pepper", "orange pepper", "green pepper", "red onion", "jalapeño", "cilantro", "avocado", "sour cream", "garlic powder", "salt", "brown sugar", "white sugar", "cane sugar", "white fish", "chili powder", "beans", "tortilla", "sourdough bread"], "../assets/menu/food/Street-Style_Tacos_with_Mango_Salsa.jpg")
	Menu.addItem("BBQ Pulled Pork Sliders", 8.00, "BBQ Pulled Pork Sliders with Coleslaw", ["ketchup", "mustard", "mayonnaise", "brown sugar", "white sugar", "cane sugar", "salt", "black pepper", "white pepper", "minced garlic", "white wine vinegar", "cider vinegar", "worcestershire sauce", "cajun seasoning", "red onion", "onion", "chicken stock", "red cabbage", "green cabbage", "carrots", "hamburger bun", "sourdough bread", "french bread"], "../assets/menu/food/BBQ_Pulled_Pork_Sliders_with_Coleslaw.jpg")

	// Guilt-Free Delights
	Menu.addItem("Pizza", 5.00, "Cauliflower Crust Margherita Pizza", ["cauliflower", "parmesan cheese", "mozzarella cheese", "provolone cheese", "cheddar cheese", "american cheese", "almond flour", "corn flour", "eggs", "garlic powder", "pizza sauce", "tomatoes", "basil leaves"], "../assets/menu/food/Cauliflower_Crust_Margherita_Pizza.jpg")
	Menu.addItem("Zucchini Noodles", 2.00, "Zucchini Noodles with Basil Pesto", ["zucchini", "basil leaves", "minced garlic", "extra virgin olive oil", "lemon juice", "parmesan cheese", "american cheese", "cheddar cheese", "provolone cheese", "colby jack cheese", "mozzarella cheese", "black pepper", "white pepper", "tomatoes"], "../assets/menu/food/Zucchini_Noodles_with_Basil_Pesto.jpg")
	Menu.addItem("Vegan Thai Coconut Curry", 5.00, "Vegan Thai Coconut Curry with Tofu", ["tofu", "coconut milk", "red curry paste", "salt", "white pepper", "black pepper", "cornstarch", "coconut oil", "red onion", "onion", "minced garlic", "broccoli", "red pepper", "green pepper", "yellow pepper", "orange pepper", "carrots", "white sugar", "brown sugar", "soy sauce", "lime juice", "basil leaves", "sriracha"], "../assets/menu/food/Vegan_Thai_Coconut_Curry_with_Tofu.jpg")
	Menu.addItem("Pudding Parfait", 4.00, "Chia Seed Pudding Parfait with Mixed Berries", ["yogurt", "chia seeds", "honey", "vanilla extract", "raspberries", "black berries", "blue berries"], "../assets/menu/food/Chia_Seed_Pudding_Parfait_with_Mixed_Berries.jpg")

	// Decadent Dessert Haven
	Menu.addItem("Lava Cake", 3.00, "Molten Chocolate/Vanilla Lava Cake with Raspberry Coulis", ["milk chocolate", "vanilla", "unsalted butter", "salted butter", "salt", "vanilla extract", "eggs", "confectioners’ sugar", "brown sugar", "white sugar", "cane sugar", "whipped cream", "ice cream", "raspberries", "blue berries", "black berries"], "../assets/menu/food/Molten_Chocolate_Lava_Cake_with_Raspberry_Coulis.jpg")
	Menu.addItem("Sundae", 3.00, "Sundae Caramelized Banana Foster", ["salted butter", "unsalted butter", "brown sugar", "white sugar", "cane sugar", "banana", "rum", "vanilla ice cream", "whipped cream", "pecans", "cashew nuts", "peanuts"], "../assets/menu/food/Sundae_Caramelized_Banana_Foster.jpg")
	Menu.addItem("Mousse", 3.00, "Pistachio White Chocolate Mousse", ["white chocolate", "dark chocolate", "milk chocolate", "pistachio milk", "whipped cream", "cream cheese", "powdered sugar", "white sugar", "brown sugar", "cane sugar", "confectioners’ sugar", "pistachio paste"], "../assets/menu/food/Pistachio_White_Chocolate_Mousse.jpg")
	Menu.addItem("Tart", 3.00, "Raspberry Almond Tart with Vanilla Bean Cream", ["white sugar", "brown sugar", "cane sugar", "confectioners’ sugar", "powdered sugar", "salt", "unsalted butter", "salted butter", "eggs", "cornstarch", "whole milk", "coconut milk", "almond milk", "pistachio milk", "vanilla bean", "vanilla", "raspberries", "blue berries", "black berries", "icing sugar"], "../assets/menu/food/Raspberry_Almond_Tart_with_Vanilla_Bean_Cream.jpg")

	// Exotic Elixirs Bar
	Menu.addItem("Detox Water", 1.00, "Hibiscus Infused Detox Water", ["hibiscus flowers", "sweetener", "ice"], "../assets/menu/drinks/Hibiscus_Infused_Detox_Water.jpg")
	Menu.addItem("Smoothie", 2.00, "Mango Tango Smoothie with Chia Seeds", ["banana", "mango", "spinach", "ginger juice", "ginger puree", "chia seeds", "ice"], "../assets/menu/drinks/Mango_Tango_Smoothie_with_Chia_Seeds.jpg")
	Menu.addItem("Sparkler", 1.00, "Basil Lemonade Sparkler", ["lemon juice", "basil leaves", "carbonated water", "maple syrup", "ice"], "../assets/menu/drinks/Basil_Lemonade_Sparkler.jpg")
	Menu.addItem("Matcha Latte", 2.00, "Matcha Latte with Almond Milk", ["matcha powder", "almond milk", "coconut milk", "torani sugar-free coconut syrup"], "../assets/menu/drinks/Matcha_Latte_with_Almond_Milk.jpg")

	// Drinks
	Menu.addItem("Water", 0.50, "Water", [], "../assets/menu/drinks/Water.jpg")
	Menu.addItem("Milk", 0.50, "Milk", ["chocolate milk", "white milk", "whole milk", "coconut milk", "almond milk", "pistachio milk"], "../assets/menu/drinks/Milk.jpg")
	Menu.addItem("Fountain Drink", 0.50, "Coke/Pepsi product", ["coke", "cherry coke", "pepsi", "root beer", "hi c", "sprite", "ginger ale", "grape fanta", "orange fanta", "powerade", "lemonade brisk", "7up", "dr pepper", "minute maid lemonade"], "../assets/menu/drinks/Fountain_Drink.jpg")

	const menuContainer = document.createElement("div")
	menuContainer.id = "menu_container"

	const menuArray = Array.from(Menu.items.keys())

	for(const itemName of menuArray)
		Menu.createItemDisplay(itemName, Menu.items.get(itemName), menuContainer)

	document.body.appendChild(menuContainer)
})