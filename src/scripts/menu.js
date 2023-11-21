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

	//Fast Fusion Corner
	Menu.addItem("Lobster", 5.00, "Gourmet Beef Burger with Chipotle Aioli", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Pesto Chicken Panini with Sundried Tomatoes", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Street-Style Tacos with Mango Salsa", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "BBQ Pulled Pork Sliders with Coleslaw", [ "lettuce" ], "")

	//Guilt-Free Delights
	Menu.addItem("Lobster", 5.00, "Cauliflower Crust Margherita Pizza", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Zucchini Noodles with Basil Pesto", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Vegan Thai Coconut Curry with Tofu", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Chia Seed Pudding Parfait with Mixed Berries", [ "lettuce" ], "")

	//Decadent Dessert Haven
	Menu.addItem("Lobster", 5.00, "Molten Chocolate Lava Cake with Raspberry Coulis", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Sundae Caramelized Banana Foster ", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Pistachio White Chocolate Mousse", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Raspberry Almond Tart with Vanilla Bean Cream", [ "lettuce" ], "")

	//Exotic Elixirs Bar
	Menu.addItem("Lobster", 5.00, "Hibiscus Infused Detox Water", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Mango Tango Smoothie with Chia Seeds", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Basil Lemonade Sparkler", [ "lettuce" ], "")
	Menu.addItem("Lobster", 5.00, "Matcha Latte with Almond Milk", [ "lettuce" ], "")
1

})