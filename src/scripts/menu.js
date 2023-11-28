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
	Menu.addTopping("green cabbage", 0.50)
	Menu.addTopping("red cabbage", 0.50)
	Menu.addTopping("red onion", 0.50)
	Menu.addTopping("onion", 0.50)
	Menu.addTopping("asparagus", 0.50)
	Menu.addTopping("hummus", 0.50)
	Menu.addTopping("red pepper", 0.50)
	Menu.addTopping("green pepper", 0.50)
	Menu.addTopping("orange pepper", 0.50)
	Menu.addTopping("yellow pepper", 0.50)
	Menu.addTopping("zucchini", 0.50)
	Menu.addTopping("cucumber", 0.50)
	Menu.addTopping("egg plant", 0.50)
	Menu.addTopping("chickpeas", 0.50)
	Menu.addTopping("spinach", 0.50)
	Menu.addTopping("celery", 0.50)
	Menu.addTopping("carrots", 0.50)
	Menu.addTopping("pickle", 0.50)
	Menu.addTopping("cauliflower", 0.50)

	// Seed options
	Menu.addTopping("pomegranate seeds", 0.50)
	Menu.addTopping("pumpkin seeds", 0.50)
	Menu.addTopping("white sesame seeds", 0.50)
	Menu.addTopping("quinoa seeds", 0.50)
	Menu.addTopping("chia seeds", 0.50)

	// Condiments
	Menu.addTopping("lemon juice", 0.50)
	Menu.addTopping("lemon zest", 0.50)
	Menu.addTopping("orange zest", 0.50)
	Menu.addTopping("ginger jucie", 0.50)
	Menu.addTopping("ginger puree", 0.50)
	Menu.addTopping("white wine vinegar", 0.50)
	Menu.addTopping("cider vinegar", 0.50)
	Menu.addTopping("extra virgin olive oil", 0.50)
	Menu.addTopping("dijon mustard", 0.50)
	Menu.addTopping("honey", 0.50)
	Menu.addTopping("minced garlic", 0.50)
	Menu.addTopping("thyme", 0.50)
	Menu.addTopping("salt", 0.50)
	Menu.addTopping("white pepper", 0.50)
	Menu.addTopping("black pepper", 0.50)
	Menu.addTopping("tomato salsa", 0.50)
	Menu.addTopping("chocolate ", 0.50)
	Menu.addTopping("vanilla", 0.50)
	Menu.addTopping("chicken stock", 0.50)
	Menu.addTopping("vegetable stock", 0.50)
	Menu.addTopping("parsely leaves", 0.50)
	Menu.addTopping("hibiscus flowers", 0.50)
	Menu.addTopping("mint leaves", 0.50)
	Menu.addTopping("basil leaves", 0.50)
	Menu.addTopping("mayonnaise", 0.50)
	Menu.addTopping("red wine", 0.50)
	Menu.addTopping("white wine", 0.50)
	Menu.addTopping("chives", 0.50)
	Menu.addTopping("cilantro", 0.50)
	Menu.addTopping("worcestershire sauce", 0.50)
	Menu.addTopping("paprika", 0.50)
	Menu.addTopping("cumin", 0.50)
	Menu.addTopping("onion powder", 0.50)
	Menu.addTopping("garlic powder", 0.50)
	Menu.addTopping("lime juice", 0.50)
	Menu.addTopping("chiles", 0.50)
	Menu.addTopping("cjili powder", 0.50)
	Menu.addTopping("jalapeño ", 0.50)
	Menu.addTopping("brown sugar", 0.50)
	Menu.addTopping("white sugar", 0.50)
	Menu.addTopping("cane sugar", 0.50)
	Menu.addTopping("confectioners’ sugar", 0.50)
	Menu.addTopping("powdered sugar", 0.50)
	Menu.addTopping("icing sugar", 0.50)
	Menu.addTopping("sweetener", 0.50)
	Menu.addTopping("beans", 0.50)
	Menu.addTopping("ketchup", 0.50)
	Menu.addTopping("mustard", 0.50)
	Menu.addTopping("cajun seasoning", 0.50)
	Menu.addTopping("pizza sauce", 0.50)

	// Protein options
	Menu.addTopping("salmon", 0.50)
	Menu.addTopping("steak", 0.50)
	Menu.addTopping("chicken", 0.50)
	Menu.addTopping("shrimp", 0.50)
	Menu.addTopping("beef", 0.50)
	Menu.addTopping("pork", 0.50)
	Menu.addTopping("eggs", 0.50)
	Menu.addTopping("tuna", 0.50)
	Menu.addTopping("white fish", 0.50)
	Menu.addTopping("bacon", 0.50)

	// Fruit options
	Menu.addTopping("ruby red grapefruit", 0.50)
	Menu.addTopping("blood oranges", 0.50)
	Menu.addTopping("orange", 0.50)
	Menu.addTopping("quinoa", 0.50)
	Menu.addTopping("apple", 0.50)
	Menu.addTopping("banana", 0.50)
	Menu.addTopping("mango", 0.50)
	Menu.addTopping("avocado", 0.50)
	Menu.addTopping("raspberries", 0.50)
	Menu.addTopping("black berries", 0.50)
	Menu.addTopping("blue berries", 0.50)

	// Dairy options
	Menu.addTopping("blue cheese crumbles", 0.50)
	Menu.addTopping("american cheese", 0.50)
	Menu.addTopping("cheddar cheese", 0.50)
	Menu.addTopping("colby jack cheese", 0.50)
	Menu.addTopping("provolone cheese", 0.50)
	Menu.addTopping("cream cheese", 0.50)
	Menu.addTopping("parmesan cheese", 0.50)
	Menu.addTopping("mozzarella cheese", 0.50)
	Menu.addTopping("sour cream", 0.50)
	Menu.addTopping("coconut milk", 0.50)
	Menu.addTopping("pistachio milk", 0.50)
	Menu.addTopping("whole milk", 0.50)
	Menu.addTopping("almond milk", 0.50)
	Menu.addTopping("tofu", 0.50)
	Menu.addTopping("yogurt", 0.50)
	Menu.addTopping("unsalted butter", 0.50)
	Menu.addTopping("salted butter", 0.50)

	// Other
	Menu.addTopping("sourdough bread", 0.50)
	Menu.addTopping("raisin bread", 0.50)
	Menu.addTopping("french bread", 0.50)
	Menu.addTopping("tortilla", 0.50)
	Menu.addTopping("fig jam", 0.50)
	Menu.addTopping("foie gras", 0.50)
	Menu.addTopping("arborio rice", 0.50)
	Menu.addTopping("white rice", 0.50)
	Menu.addTopping("brown rice", 0.50)
	Menu.addTopping("vegetable broth", 0.50)
	Menu.addTopping("chicken broth", 0.50)
	Menu.addTopping("shallot", 0.50)
	Menu.addTopping("truffle oil", 0.50)
	Menu.addTopping("canola oil", 0.50)
	Menu.addTopping("coconut oil", 0.50)
	Menu.addTopping("hamburger bun", 0.50)
	Menu.addTopping("pine nuts", 0.50)
	Menu.addTopping("cashew nuts", 0.50)
	Menu.addTopping("peanuts", 0.50)
	Menu.addTopping("pecans", 0.50)
	Menu.addTopping("almond flour", 0.50)
	Menu.addTopping("corn flour", 0.50)
	Menu.addTopping("cornstarch", 0.50)
	Menu.addTopping("red curry paste", 0.50)
	Menu.addTopping("yellow curry paste", 0.50)
	Menu.addTopping("sriracha", 0.50)
	Menu.addTopping("honey", 0.50)
	Menu.addTopping("vanilla extract", 0.50)
	Menu.addTopping("whipped cream", 0.50)
	Menu.addTopping("ice cream", 0.50)
	Menu.addTopping("vanilla ice cream", 0.50)
	Menu.addTopping("white chocolate", 0.50)
	Menu.addTopping("dark chocolate", 0.50)
	Menu.addTopping("milk chocolate", 0.50)
	Menu.addTopping("pistachio paste", 0.50)
	Menu.addTopping("vanilla bean", 0.50)
	Menu.addTopping("vanilla", 0.50)
	Menu.addTopping("ice", 0.50)
	Menu.addTopping("maple syrup", 0.50)
	Menu.addTopping("torani sugar-free coconut syrup", 0.50)
	Menu.addTopping("carbonated water", 0.50)
	Menu.addTopping("matcha powder", 0.50)

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
	Menu.addItem("Salmon Salad", 5.00, "Grilled Salmon Salad with Citrus Vinaigrette", ["lettuce", "red onion", "asparagus", "red pepper", "green pepper", "orange pepper", "yellow pepper", "zucchini", "cucumber", "pomegrante seeds", "pumkpin seeds", " white sesame seeds", "quinoa seeds", "salmon", "lemon juice", "lemon zest", "white wine vinegar", "extra virgin olive oil", "dijon mustard", "honey", " minced garlic", "thyme", "salt", "white pepper", "black pepper", "ruby red grapefruit", "blood oranges", "orange"], "../assets/menu/food/Grilled_Salmon_Salad_with_Citrus_Vinaigrette.jpg")
	Menu.addItem("Bell Peppers", 5.00, "Quinoa and Vegetable Stuffed Bell Peppers", ["quinoa", "chicken stock", "vegetable stock", "red pepper", "orange pepper", "yellow pepper", "black pepper", "minced pepper", "egg plant", "zucchini", "red onion", "parsely leaves", "mint leaves", "tomatoes"], "../assets/menu/food/Quinoa_and_Vegetable_Stuffed_Bell_Peppers.jpg")
	Menu.addItem("Avocado Toast Trio", 5.00, "Avocado Toast Trio with Tomato Salsa", ["toasted", "tomatoes", "lettuce", "red onion", "asparagus", "red pepper", "green pepper", "orange pepper", "yellow pepper", "zucchini", "cucumber", "cream cheese", "eggs", "tuna", "mayonnaise", "salt", "white pepper", "black pepper", "tomato salsa"], "../assets/menu/food/Avocado_Toast_Trio_with_Tomato_Salsa.jpg")
	Menu.addItem("Mediterranean Power Bowl", 5.00, "Mediterranean Power Bowl with Hummus", ["hummus", "chickpeas", "chicken", "beef", "shrimp", "pork", "quinoa", "tomatoes", "cucumbers", "red onion", "spinach", "green pepper", "orange pepper", "red pepper", "yellow pepper", "salt", "white pepper", "black pepper", "american cheese", "cheddar cheese", "provolone cheese"], "../assets/menu/food/Mediterranean_Power_Bowl_with_Hummus.jpg")

	// Indulgence Oasis
	Menu.addItem("Lobster", 5.00, "Truffle-infused Lobster Mac and Cheese", ["salt", "white pepper", "black pepper", "extra virgin olive oil", "onion", "red onion", "minced garlic", "carrots", "celery", "provolone cheese", "american cheese", "cheddar cheese"], "../assets/menu/food/Truffle-infused_Lobster_Mac_and_Cheese.jpg")
	Menu.addItem("Filet Mignon", 5.00, "Filet Mignon with Red Wine Reduction", ["beef", "extra virgin olive oil", "black pepper", "white pepper", "red wine"], "../assets/menu/Filet_Mignon_with_Red_Wine_Reduction.jpg")
	Menu.addItem("Foie Gras Crostini", 5.00, "Foie Gras Crostini with Fig Jam", ["orange zest", "extra virgin olive oil", "canola oil", "vegetable oil", "chives", "salt", "white pepper", "black pepper", "sourdough bread", "raisin bread", "fig jam", "foie gras"], "../assets/menu/food/Foie_Gras_Crostini_with_Fig_Jam.jpg")
	Menu.addItem("Risotto", 5.00, "Black Truffle Risotto with Parmesan Crisps", ["arborio rice", "white rice", "brown rice", "minced garlic", "vegetable broth", "chicken broth", "extra virgin olive oil", "canola oil", "truffle oil", "white wine", "red wine", "parmesan cheese", "cheddar cheese", "provolone cheese", "colby jack cheese", "american cheese", "salt", "white pepper", "black pepper", "chives"], "../assets/menu/food/Black_Truffle_Risotto_with_Parmesan_Crisps.jpg")

	// Fast Fusion Corner
	Menu.addItem("Burger", 5.00, "Gourmet Beef Burger with Chipotle Aioli", ["cilantro", "minced garlic", "worcestershire sauce", "egg", "paprika", "cumin", "onion powder", "garlic powder", "salt", "white pepper", "black pepper", "beef", "chicken", "pork", "mayonnaise", "lime juice", "lemon juice", "chiles", "hamburger bun", "colby jack", "american cheese", "cheddar cheese", "provolone cheese", "red onion", "jalapeño", "pickle", "lettuce"], "../assets/menu/food/Gourmet_Beef_Burger_with_Chipotle_Aioli.jpg")
	Menu.addItem("Pesto Chicken Panini", 5.00, "Pesto Chicken Panini with Sundried Tomatoes", ["basil leaves", "pine nuts", "cashew nuts", "peanuts", "parmesan cheese", "extra virgin olive oil", "minced garlic", "salt", "white pepper", "black pepper", "chicken", "beef", "pork", "mozzarella cheese", "tomatoes", "sourdough bread", "raisin bread", "french bread"], "../assets/menu/food/Pesto_Chicken_Panini_with_Sundried_Tomatoes.jpg")
	Menu.addItem("Tacos", 5.00, "Street-Style Tacos with Mango Salsa", ["mango", "lime juice", "red pepper", "yellow pepper", "orange pepper", "green pepper", "red onion", "jalapeño", "cilantro", "avocado", "sour cream", "garlic powder", "salt", "brown sugar", "white sugar", "cane sugar", "white fish", "chili powder", "beans", "tortilla", "sourdough bread", ""], "../assets/menu/food/Street-Style_Tacos_with_Mango_Salsa.jpg")
	Menu.addItem("BBQ Pulled Pork Sliders", 5.00, "BBQ Pulled Pork Sliders with Coleslaw", ["ketchup", "mustard", "mayonnaise", "brown sugar", "white sugar", "cane sugar", "salt", "black pepper", "white pepper", "minced garlic", "white wine vinegar", "cider vinegar", "worcestershire sauce", "cajun seasoning", "red onion", "onion", "chicken stock", "red cabbage", "green cabbage", "carrots", "hamburger bun", "sourdough bread", "french bread"], "../assets/menu/BBQ_Pulled_Pork_Sliders_with_Coleslaw.jpg")

	// Guilt-Free Delights
	Menu.addItem("Pizza", 5.00, "Cauliflower Crust Margherita Pizza", ["cauliflower", "parmesan cheese", "mozzarella cheese", "provolone cheese", "cheddar cheese", "american cheese", "almond flour", "corn flour", "eggs", "garlic powder", "pizza sauce", "tomatoes", "basil leaves"], "../assets/menu/food/Cauliflower_Crust_Margherita_Pizza.jpg")
	Menu.addItem("Zucchini Noodles", 5.00, "Zucchini Noodles with Basil Pesto", ["zucchini", "basil leaves", "minced garlic", "extra virgin olive oil", "lemon juice", "parmesan cheese", "american cheese", "cheddar cheese", "provolone cheese", "colby jack cheese", "mozzarella cheese", "black pepper", "white pepper", "tomatoes"], "../assets/menu/food/Zucchini_Noodles_with_Basil_Pesto.jpg")
	Menu.addItem("Vegan Thai Coconut Curry", 5.00, "Vegan Thai Coconut Curry with Tofu", ["tofu", "coconut milk", "red curry paste", "salt", "white pepper", "black pepper", "cornstarch", "coconut oil", "red onion", "onion", "minced garlic", "broccoli", "red pepper", "green pepper", "yellow pepper", "orange pepper", "carrots", "white sugar", "brown sugar", "soy sauce", "lime juice", "basil leaves", "sriracha"], "../assets/menu/food/Vegan_Thai_Coconut_Curry_with_Tofu.jpg")
	Menu.addItem("Pudding Parfait", 5.00, "Chia Seed Pudding Parfait with Mixed Berries", ["yogurt", "chia seeds", "honey", "vanilla extract", "raspberries", "black berries", "blue berries"], "../assets/menu/food/Chia_Seed_Pudding_Parfait_with_Mixed_Berries.jpg")

	// Decadent Dessert Haven
	Menu.addItem("Lava Cake", 5.00, "Molten Chocolate/Vanilla Lava Cake with Raspberry Coulis", ["chocolate", "vanilla", "unsalted butter", "salted butter", "salt", "vanilla extract", "eggs", "confectioners’ sugar", "brown sugar", "white sugar", "cane sugar", "whipped cream", "ice cream", "raspberries", "blue berries", "black berries"], "../assets/menu/food/Molten_Chocolate_Lava_Cake_with_Raspberry_Coulis.jpg")
	Menu.addItem("Sundae", 5.00, "Sundae Caramelized Banana Foster", ["salted butter", "unsalted butter", "brown sugar", "white sugar", "cane sugar", "banana", "rum", "vanilla ice cream", "whipped cream", "pecans", "cashew nuts", "peanuts"], "../assets/menu/food/Sundae_Caramelized_Banana_Foster.jpg")
	Menu.addItem("Mousse", 5.00, "Pistachio White Chocolate Mousse", ["white chocolate", "dark chocolate", "milk chocolate", "pistachio milk", "whipped cream", "cream cheese", "powdered sugar", "white sugar", "brown sugar", "cane sugar", "confectioners’ sugar", "pistachio paste"], "../assets/menu/food/Pistachio_White_Chocolate_Mousse.jpg")
	Menu.addItem("Tart", 5.00, "Raspberry Almond Tart with Vanilla Bean Cream", ["white sugar", "brown sugar", "cane sugar", "confectioners’ sugar", "powdered sugar", "salt", "unsalted butter", "salted butter", "eggs", "cornstarch", "whole milk", "coconut milk", "almond milk", "pistchio milk", "vanilla bean", "vanilla", "raspberries", "blue berries", "black berries", "icing sugar"], "../assets/menu/food/Raspberry_Almond_Tart_with_Vanilla_Bean_Cream.jpg")

	// Exotic Elixirs Bar
	Menu.addItem("Detox Water", 5.00, "Hibiscus Infused Detox Water", ["water", "hibiscus flowers", "sweetener", "ice"], "../assets/menu/drinks/Hibiscus_Infused_Detox_Water.jpg")
	Menu.addItem("Smoothie", 5.00, "Mango Tango Smoothie with Chia Seeds", ["banana", "mango", "spinach", "ginger juice", "ginger puree", "water", "chia seeds", "ice"], "../assets/menu/drinks/Mango_Tango_Smoothie_with_Chia_Seeds.jpg")
	Menu.addItem("Sparkler", 5.00, "Basil Lemonade Sparkler", ["lemon juice", "basil leaves", "carbonated water", "maple syrup", "ice"], "../assets/menu/drinks/Basil_Lemonade_Sparkler.jpg")
	Menu.addItem("Almond Milk", 5.00, "Matcha Latte with Almond Milk", ["matcha powder", "water", "almond milk", "coconut milk", "torani sugar-free coconut syrup"], "../assets/menu/drinks/Matcha_Latte_with_Almond_Milk.jpg")

	// Drinks
	Menu.addItem("Water", 5.00, "Water", [""], "../assets/menu/drinks/Water.jpg")
	Menu.addItem("Milk", 5.00, "Milk", ["chocolate milk", "white milk", "whole milk", "coconut milk", "almond milk", "pistachio milk"], "../assets/menu/drinks/Milk.jpg")
	Menu.addItem("Fountain Drink", 5.00, "Coke/Pepsi product", ["coke", "cherry coke", "pepsi", "root beer", "hi c", "sprite", "ginger ale", "grape fanta", "orange fanta", "powerade", "lemonade brisk", "7up", "dr pepper", "minute maid lemonade"], "../assets/menu/drinks/Fountain_Drink.jpg")
})