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
	Menu.addTopping("tomatoes", 10)
	Menu.addTopping("lettuce", 1.50)
	Menu.addTopping("cheese", 0.50)

	// Add items
	Menu.addItem("pizza", 5, "A pizza", [ "cheese", "tomatoes" ], "")

	//Healthy Haven
	Menu.addItem("Salmon Salad", 5, "Grilled Salmon Salad with Citrus Vinaigrette", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "Quinoa and Vegetable Stuffed Bell Peppers", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "Avocado Toast Trio with Tomato Salsa", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "Mediterranean Power Bowl with Hummus", [ "lettuce" ], "")

	//Indulgence Oasis
	Menu.addItem("Salmon Salad", 5, "Truffle-infused Lobster Mac and Cheese", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "Filet Mignon with Red Wine Reduction", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "Foie Gras Crostini with Fig Jam", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "Black Truffle Risotto with Parmesan Crisps", [ "lettuce" ], "")


	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")

	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")

	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")
	Menu.addItem("Salmon Salad", 5, "", [ "lettuce" ], "")



})