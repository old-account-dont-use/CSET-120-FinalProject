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
	Menu.addItem("Lobster", 5.00, "Truffle-infused Lobster Mac and Cheese", [ "" ], "")
	Menu.addItem("Filet Mignon", 5.00, "Filet Mignon with Red Wine Reduction", [ "" ], "")
	Menu.addItem("Foie Gras Crostini", 5.00, "Foie Gras Crostini with Fig Jam", [ "" ], "")
	Menu.addItem("Risotto", 5.00, "Black Truffle Risotto with Parmesan Crisps", [ "" ], "")

	//Fast Fusion Corner
	Menu.addItem("Burger", 5.00, "Gourmet Beef Burger with Chipotle Aioli", [ "" ], "")
	Menu.addItem("Pesto Chicken Panini", 5.00, "Pesto Chicken Panini with Sundried Tomatoes", [ "" ], "")
	Menu.addItem("Tacos", 5.00, "Street-Style Tacos with Mango Salsa", [ "" ], "")
	Menu.addItem("BBQ Pulled Pork Sliders", 5.00, "BBQ Pulled Pork Sliders with Coleslaw", [ "" ], "")

	//Guilt-Free Delights
	Menu.addItem("Pizza", 5.00, "Cauliflower Crust Margherita Pizza", [ "" ], "")
	Menu.addItem("Zucchini Noodles", 5.00, "Zucchini Noodles with Basil Pesto", [ "" ], "")
	Menu.addItem("Vegan Thai Coconut Curry", 5.00, "Vegan Thai Coconut Curry with Tofu", [ "" ], "")
	Menu.addItem("Pudding Parfait", 5.00, "Chia Seed Pudding Parfait with Mixed Berries", [ "" ], "")

	//Decadent Dessert Haven
	Menu.addItem("Chocolate Lava Cake", 5.00, "Molten Chocolate Lava Cake with Raspberry Coulis", [ "" ], "")
	Menu.addItem("Lobster", 5.00, "Sundae Caramelized Banana Foster ", [ "" ], "")
	Menu.addItem("Mousse", 5.00, "Pistachio White Chocolate Mousse", [ "" ], "")
	Menu.addItem("Tart", 5.00, "Raspberry Almond Tart with Vanilla Bean Cream", [ "" ], "")

	//Exotic Elixirs Bar
	Menu.addItem("Detox Water", 5.00, "Hibiscus Infused Detox Water", [ "" ], "")
	Menu.addItem("Smoothie", 5.00, "Mango Tango Smoothie with Chia Seeds", [ "" ], "")
	Menu.addItem("Sparkler", 5.00, "Basil Lemonade Sparkler", [ "" ], "")
	Menu.addItem("Almond Milk", 5.00, "Matcha Latte with Almond Milk", [ "" ], "")
1

})