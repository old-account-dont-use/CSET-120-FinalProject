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
	// Vegetable options
	Menu.addTopping("tomatoes", 10.00)
	Menu.addTopping("lettuce", 1.50)
	Menu.addTopping("red onion", 0.50)
	Menu.addTopping("asparagus", 0.50)
	Menu.addTopping("hummus", 0.50)
	Menu.addTopping("red pepper", 0.50)
	Menu.addTopping("green pepper", 0.50)
	Menu.addTopping("orange pepper", 0.50)
	Menu.addTopping("yellow pepper", 0.50)
	Menu.addTopping("zucchini", 0.50)
	Menu.addTopping("cucumber", 0.50)

	// Seed options
	Menu.addTopping("pomegranate seeds", 0.50)
	Menu.addTopping("pumpkin seeds", 0.50)
	Menu.addTopping("white sesame seeds", 0.50)
	Menu.addTopping("quinoa seeds", 0.50)

	// Condiments
	Menu.addTopping("lemon juice", 0.50)
	Menu.addTopping("lemon zest", 0.50)
	Menu.addTopping("white wine vinegar", 0.50)
	Menu.addTopping("extra virgin olive oil", 0.50)
	Menu.addTopping("dijon mustard", 0.50)
	Menu.addTopping("honey", 0.50)
	Menu.addTopping("minced garlic", 0.50)
	Menu.addTopping("thyme", 0.50)
	Menu.addTopping("salt", 0.50)
	Menu.addTopping("white pepper", 0.50)
	Menu.addTopping("black pepper", 0.50)
	Menu.addTopping("tomato salsa", 0.50)

	// Protein options
	Menu.addTopping("salmon", 0.50)
	Menu.addTopping("steak", 0.50)
	Menu.addTopping("chicken", 0.50)
	Menu.addTopping("shrimp", 0.50)
	Menu.addTopping("beef", 0.50)

	// Fruit options
	Menu.addTopping("ruby red grapefruit", 0.50)
	Menu.addTopping("blood oranges", 0.50)
	Menu.addTopping("orange", 0.50)
	Menu.addTopping("quinoa", 0.50)
	Menu.addTopping("apple", 0.50)
	Menu.addTopping("avocado", 0.50)

	// Dairy options
	Menu.addTopping("blue cheese crumbles", 0.50)
	Menu.addTopping("american cheese", 0.50)
	Menu.addTopping("cheddar cheese", 0.50)
	Menu.addTopping("colby jack cheese", 0.50)
	Menu.addTopping("provolone cheese", 0.50)

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
	Menu.addItem("Salmon Salad", 5.00, "Grilled Salmon Salad with Citrus Vinaigrette", [ "lettuce", "salmon", "" ], "")
	Menu.addItem("Bell Peppers", 5.00, "Quinoa and Vegetable Stuffed Bell Peppers", [ "quinoa", "vegetable" ], "")
	Menu.addItem("Avocado Toast Trio", 5.00, "Avocado Toast Trio with Tomato Salsa", [ "toasted", "tomatoes" ], "")
	Menu.addItem("Mediterranean Power Bowl", 5.00, "Mediterranean Power Bowl with Hummus", [ "hummus", "vegetable" ], "")

	// Indulgence Oasis
	Menu.addItem("Lobster", 5.00, "Truffle-infused Lobster Mac and Cheese", [ "" ], "")
	Menu.addItem("Filet Mignon", 5.00, "Filet Mignon with Red Wine Reduction", [ "" ], "")
	Menu.addItem("Foie Gras Crostini", 5.00, "Foie Gras Crostini with Fig Jam", [ "" ], "")
	Menu.addItem("Risotto", 5.00, "Black Truffle Risotto with Parmesan Crisps", [ "" ], "")

	// Fast Fusion Corner
	Menu.addItem("Burger", 5.00, "Gourmet Beef Burger with Chipotle Aioli", [ "" ], "")
	Menu.addItem("Pesto Chicken Panini", 5.00, "Pesto Chicken Panini with Sundried Tomatoes", [ "" ], "")
	Menu.addItem("Tacos", 5.00, "Street-Style Tacos with Mango Salsa", [ "" ], "")
	Menu.addItem("BBQ Pulled Pork Sliders", 5.00, "BBQ Pulled Pork Sliders with Coleslaw", [ "" ], "")

	// Guilt-Free Delights
	Menu.addItem("Pizza", 5.00, "Cauliflower Crust Margherita Pizza", [ "" ], "")
	Menu.addItem("Zucchini Noodles", 5.00, "Zucchini Noodles with Basil Pesto", [ "" ], "")
	Menu.addItem("Vegan Thai Coconut Curry", 5.00, "Vegan Thai Coconut Curry with Tofu", [ "" ], "")
	Menu.addItem("Pudding Parfait", 5.00, "Chia Seed Pudding Parfait with Mixed Berries", [ "" ], "")

	// Decadent Dessert Haven
	Menu.addItem("Chocolate Lava Cake", 5.00, "Molten Chocolate Lava Cake with Raspberry Coulis", [ "" ], "")
	Menu.addItem("Lobster", 5.00, "Sundae Caramelized Banana Foster ", [ "" ], "")
	Menu.addItem("Mousse", 5.00, "Pistachio White Chocolate Mousse", [ "" ], "")
	Menu.addItem("Tart", 5.00, "Raspberry Almond Tart with Vanilla Bean Cream", [ "" ], "")

	// Exotic Elixirs Bar
	Menu.addItem("Detox Water", 5.00, "Hibiscus Infused Detox Water", [ "" ], "")
	Menu.addItem("Smoothie", 5.00, "Mango Tango Smoothie with Chia Seeds", [ "" ], "")
	Menu.addItem("Sparkler", 5.00, "Basil Lemonade Sparkler", [ "" ], "")
	Menu.addItem("Almond Milk", 5.00, "Matcha Latte with Almond Milk", [ "" ], "")

	// Drinks
	Menu.addItem("Water", 5.00, "Water", [ "" ], "")
	Menu.addItem("Fountain Drink", 5.00, "Coke/Pepsi product", [ "coke", "cherry coke", "pepsi", "root beer", "hi c", "sprite", "ginger ale", "grape fanta", "orange fanta", "powerade", "lemonade brisk", "7up", "dr pepper", "minaute maid lemonade" ], "")
})