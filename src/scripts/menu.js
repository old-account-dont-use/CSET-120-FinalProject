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

	Menu.items.set(name, newItem)
}

///////////////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
	// Add toppings
	Menu.addTopping("tomatoes", 10.00)
	Menu.addTopping("lettuce", 1.50)
	Menu.addTopping("hummus", 0.50)
	Menu.addTopping("quinoa", 0.50)
	Menu.addTopping("citrus vinaigrette", 0.50)
	Menu.addTopping("vegetable", 0.50)
	Menu.addTopping("toasted", 0.50)

	// Add items

	//Healthy Haven
	Menu.addItem("Salmon Salad", 5.00, "Grilled Salmon Salad with Citrus Vinaigrette", [ "lettuce", "salmon", "citrus vinaigrette" ], "")
	Menu.addItem("Bell Peppers", 5.00, "Quinoa and Vegetable Stuffed Bell Peppers", [ "quinoa", "vegetable" ], "")
	Menu.addItem("Avocado Toast Trio", 5.00, "Avocado Toast Trio with Tomato Salsa", [ "toasted", "tomatoes" ], "")
	Menu.addItem("Mediterranean Power Bowl", 5.00, "Mediterranean Power Bowl with Hummus", [ "hummus", "vegetable" ], "")

	//Indulgence Oasis
	Menu.addItem("Lobster", 5.00, "Truffle-infused Lobster Mac and Cheese", [ "lettuce" ], "")
	Menu.addItem("Filet Mignon", 5.00, "Filet Mignon with Red Wine Reduction", [ "lettuce" ], "")
	Menu.addItem("Foie Gras Crostini", 5.00, "Foie Gras Crostini with Fig Jam", [ "lettuce" ], "")
	Menu.addItem("Risotto", 5.00, "Black Truffle Risotto with Parmesan Crisps", [ "lettuce" ], "")
})