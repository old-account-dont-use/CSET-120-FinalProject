const Menu = {}

Menu.TOPPING_TYPE_GENERIC = 1
Menu.TOPPING_TYPE_SAUCE = 2
Menu.TOPPING_TYPE_SPICE = 3
Menu.TOPPING_TYPE_SIDE = 4
Menu.TOPPING_TYPE_DRINK = 5

Menu.MIN_TOPPING_TYPES = 1
Menu.MAX_TOPPING_TYPES = 5

Menu.ITEM_BUTTON_TOPPINGS = 1
Menu.ITEM_BUTTON_CART = 2

Menu.MIN_CART_ITEM_QUANTITY = 1
Menu.MAX_CART_ITEM_QUANTITY = 10

Menu.m_Items = new Map()
Menu.m_Toppings = new Map() // Toppings are more than just toppings. Condiments, sides, etc.

Menu.m_Cart = new Map()

class Menu__Item
{
	constructor(data)
	{
		if (!data)
			throw new Error("No item data provided")

		if (data instanceof Menu__Item) // Time to make a copy
		{
			const newStructure = {}

			newStructure.section = data.getSectionName()

			newStructure.name = data.getName()
			newStructure.description = data.getDescription()

			newStructure.price = data.getPrice()

			newStructure.toppingList = []
			{
				for (const [ item, _ ] of data.getToppings().entries())
					newStructure.toppingList.push(item)
			}

			newStructure.image = data.getImagePath()

			newStructure.available = data.getAvailable()

			data = newStructure
		}

		this.m_strSection = Helper.getString(data.section, "BROKEN SECTION").trim()

		this.m_strName = Helper.getString(data.name, "BROKEN ITEM").trim()
		this.m_strDescription = Helper.getString(data.description, "").trim()

		this.m_flPrice = Helper.priceifyNumber(data.price)

		if (data.toppingList instanceof Array)
		{
			this.m_Toppings = new Map()

			for (const topping of data.toppingList)
			{
				if (!(topping instanceof Menu__Topping))
					throw new Error("Invalid topping provided")

				const found = Menu.findTopping(topping.getName())
				if (!found)
					throw new Error("Invalid topping provided")

				this.m_Toppings.set(topping, found[1])
			}
		}

		this.m_strImagePath = Helper.getString(data.image, "").trim()

		this.m_bAvailable = Helper.getBool(data.available, true)
	}

	toString()
	{
		let built = {}

		const properties = Object.getOwnPropertyNames(this)

		for (const property of properties)
		{
			const propertyValue = this[property]

			if (!(propertyValue instanceof Map))
				built[property] = propertyValue
			else
				built[property] = Helper.json(propertyValue)
		}

		return Helper.json(built)
	}

	/*
	*	Getters
	*/
	getSectionName()
	{
		return this.m_strSection
	}

	getName()
	{
		return this.m_strName
	}

	getDescription()
	{
		return this.m_strDescription
	}

	getPrice()
	{
		return this.m_flPrice
	}

	getToppings()
	{
		return this.m_Toppings
	}

	getImagePath()
	{
		return this.m_strImagePath
	}

	getAvailable()
	{
		return this.m_bAvailable
	}

	/*
	*	Setters
	*/
	setPrice(price)
	{
		this.m_flPrice = Helper.priceifyNumber(price)
	}

	// Returns true if the topping was successfully added, false otherwise
	addTopping(topping)
	{
		if (!this.m_Toppings)
			throw new Error("This object does not support toppings")

		if (!(topping instanceof Menu__Topping))
			throw new Error("Invalid topping provided")

		if (this.m_Toppings.has(topping))
			return false

		this.m_Toppings.set(topping, true)
		return true
	}

	// Returns true if the topping was successfully removed, false otherwise
	removeTopping(topping)
	{
		if (!this.m_Toppings)
			throw new Error("This object does not support toppings")

		if (!(topping instanceof Menu__Topping))
			throw new Error("Invalid topping provided")

		if (!this.m_Toppings.has(topping))
			return false

		this.m_Toppings.delete(topping)
		return true
	}

	setAvailable(available)
	{
		this.m_bAvailable = Helper.getBool(available, true)
	}
}

class Menu__Topping extends Menu__Item // Exists so we can do instanceof
{
	constructor(data)
	{
		super(data)

		let type = Helper.getNumber(data.type, false, Menu.TOPPING_TYPE_GENERIC)
		if (type < Menu.MIN_TOPPING_TYPES || type > Menu.MAX_TOPPING_TYPES)
			type = Menu.TOPPING_TYPE_GENERIC

		this.m_iType = type
	}

	/*
	*	Getters
	*/
	getToppingType()
	{
		return this.m_iType
	}
}

/*
*	Controls off by default mode
*/
Menu.setOffByDefault = (state) =>
{
	Menu.m_bOffByDefault = Helper.getBool(state, false)
}

/*
*	Adds a new item
*/
Menu.addItem = (item) =>
{
	if (!(item instanceof Menu__Item) && !(item instanceof Object))
		throw new Error("Tried to add an invalid menu item")

	if (!(item instanceof Menu__Item))
		item = new Menu__Item(item)

	Menu.m_Items.set(item, !Menu.m_bOffByDefault)

	return item
}

/*
*	Adds a new topping
*/
Menu.addTopping = (topping) =>
{
	if (!(topping instanceof Menu__Topping) && !(topping instanceof Object))
		throw new Error("Tried to add an invalid menu topping")

	if (!(topping instanceof Menu__Topping))
		topping = new Menu__Topping(topping)

	Menu.m_Toppings.set(topping, !Menu.m_bOffByDefault)

	return topping
}

/*
*	Finds either an item or a topping by name
*
*	Returns the found object, null if not found
*/
Menu.find = (name, lookup) =>
{
	name = Helper.getString(name, null)
	if (!name) return null

	name = name.trim().toLowerCase()

	if (!lookup || !(lookup instanceof Map))
	{
		let result = Menu.find(name, Menu.m_Items)
		if (result) return result

		result = Menu.find(name, Menu.m_Toppings)
		if (result) return result
	}
	else
	{
		for (const [ item, value ] of lookup.entries())
		{
			if (!(item instanceof Menu__Item) && !(item instanceof Menu__Topping))
				continue

			if (item.getName().toLowerCase() == name)
				return [ item, value ]
		}
	}

	return null
}

/*
*	Finds an item by name
*
*	Returns the found item, null if not found
*/
Menu.findItem = (name) =>
{
	return Menu.find(name, Menu.m_Items)
}

/*
*	Finds a topping by name
*
*	Returns the found topping, null if not found
*/
Menu.findTopping = (name) =>
{
	return Menu.find(name, Menu.m_Toppings)
}

/*
*	Adds stuff to the menu
*/
Menu.initializeItems = () =>
{
	/*
	*	Toppings
	*/
	const cabbage = Menu.addTopping({ name: "Cabbage", price: 0.1 })
	const celery = Menu.addTopping({ name: "Celery", price: 0.1 })
	const chiaSeeds = Menu.addTopping({ name: "Chia Seeds", price: 0.1 })
	const cilantro = Menu.addTopping({ name: "Cilantro", price: 0.05 })
	const gingerJuice = Menu.addTopping({ name: "Ginger Juice", price: 0.05 })
	const gingerPuree = Menu.addTopping({ name: "Ginger Puree", price: 0.1 })
	const hibiscus = Menu.addTopping({ name: "Hibiscus", price: 0.05 })
	const honey = Menu.addTopping({ name: "Honey", price: 0.05 })
	const lemonJuice = Menu.addTopping({ name: "Lemon Juice", price: 0.05 })
	const lemonZest = Menu.addTopping({ name: "Lemon Zest", price: 0.05 })
	const lettuce = Menu.addTopping({ name: "Lettuce", price: 0.1 })
	const onion = Menu.addTopping({ name: "Onion", price: 0.1 })
	const orangeZest = Menu.addTopping({ name: "Orange Juice", price: 0.05 })
	const pomegranateSeeds = Menu.addTopping({ name: "Pomegranate Seeds", price: 0.1 })
	const pumpkinSeeds = Menu.addTopping({ name: "Pumpkin Seeds", price: 0.1 })
	const spinach = Menu.addTopping({ name: "Spinach", price: 0.1 })
	const tomatoes = Menu.addTopping({ name: "Tomatoes", price: 0.1 })
	const vinegar = Menu.addTopping({ name: "Vinegar", price: 0.05 })
	const whiteWine = Menu.addTopping({ name: "White Wine", price: 0.05 })
	Menu.setOffByDefault(true)
		const pepperoni = Menu.addTopping({ name: "Pepperoni", price: 0.05 })
		const jalapeno = Menu.addTopping({ name: "Jalapeño", price: 0.05 })
	Menu.setOffByDefault(false)

	Menu.setOffByDefault(true)
		const chocolate = Menu.addTopping({ name: "Chocolate", price: 0.1, type: Menu.TOPPING_TYPE_SAUCE })
		const ketchup = Menu.addTopping({ name: "Ketchup", price: 0.05, type: Menu.TOPPING_TYPE_SAUCE })
		const mayonnaise = Menu.addTopping({ name: "Mayonnaise", price: 0.05, type: Menu.TOPPING_TYPE_SAUCE })
		const mustard = Menu.addTopping({ name: "Mustard", price: 0.05, type: Menu.TOPPING_TYPE_SAUCE })
		const salsa = Menu.addTopping({ name: "Salsa", price: 0.05, type: Menu.TOPPING_TYPE_SAUCE })
		const soySauce = Menu.addTopping({ name: "Soy Sauce", price: 0.05, type: Menu.TOPPING_TYPE_SAUCE })
		const vanilla = Menu.addTopping({ name: "Vanilla", price: 0.1, type: Menu.TOPPING_TYPE_SAUCE })
		const worcestershire = Menu.addTopping({ name: "Worcestershire Sauce", price: 0.05, type: Menu.TOPPING_TYPE_SAUCE })
	Menu.setOffByDefault(false)

	const basil = Menu.addTopping({ name: "Basil", price: 0.05, type: Menu.TOPPING_TYPE_SPICE })
	const chives = Menu.addTopping({ name: "Chives", price: 0.05, type: Menu.TOPPING_TYPE_SPICE })
	const garlic = Menu.addTopping({ name: "Garlic", price: 0.1, type: Menu.TOPPING_TYPE_SPICE })
	const mint = Menu.addTopping({ name: "Mint", price: 0.05, type: Menu.TOPPING_TYPE_SPICE })
	const parsely = Menu.addTopping({ name: "Parsely", price: 0.05, type: Menu.TOPPING_TYPE_SPICE })
	const pepper = Menu.addTopping({ name: "Pepper", price: 0.05, type: Menu.TOPPING_TYPE_SPICE })
	const salt = Menu.addTopping({ name: "Salt", price: 0.05, type: Menu.TOPPING_TYPE_SPICE })
	const sugar = Menu.addTopping({ name: "Sugar", price: 0.05, type: Menu.TOPPING_TYPE_SPICE })
	const thyme = Menu.addTopping({ name: "Thyme", price: 0.1, type: Menu.TOPPING_TYPE_SPICE })

	Menu.setOffByDefault(true)
		const apples = Menu.addTopping({ name: "Apples", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const asparagus = Menu.addTopping({ name: "Asparagus", price: 0.1, type: Menu.TOPPING_TYPE_SIDE })
		const avocado = Menu.addTopping({ name: "Avocado", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const banana = Menu.addTopping({ name: "Banana", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const blackberries = Menu.addTopping({ name: "Blackberries", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const blueberries = Menu.addTopping({ name: "Blueberries", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const carrots = Menu.addTopping({ name: "Carrots", price: 0.1, type: Menu.TOPPING_TYPE_SIDE })
		const chickpeas = Menu.addTopping({ name: "Chickpeas", price: 0.1, type: Menu.TOPPING_TYPE_SIDE })
		const cucumber = Menu.addTopping({ name: "Cucumber", price: 0.1, type: Menu.TOPPING_TYPE_SIDE })
		const eggplant = Menu.addTopping({ name: "Eggplant", price: 0.1, type: Menu.TOPPING_TYPE_SIDE })
		const eggs = Menu.addTopping({ name: "Eggs", price: 0.1, type: Menu.TOPPING_TYPE_SIDE })
		const garlicBread = Menu.addTopping({ name: "Garlic Bread", price: 0.5, type: Menu.TOPPING_TYPE_SIDE })
		const grapefruit = Menu.addTopping({ name: "Grapefruit", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const hummus = Menu.addTopping({ name: "Hummus", price: 0.1, type: Menu.TOPPING_TYPE_SIDE })
		const iceCream = Menu.addTopping({ name: "Ice Cream", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const mango = Menu.addTopping({ name: "Mango", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const oranges = Menu.addTopping({ name: "Oranges", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const quinoa = Menu.addTopping({ name: "Quinoa", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const raspberries = Menu.addTopping({ name: "Raspberries", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const strawberries = Menu.addTopping({ name: "Strawberries", price: 0.3, type: Menu.TOPPING_TYPE_SIDE })
		const yogurt = Menu.addTopping({ name: "Yogurt", price: 0.15, type: Menu.TOPPING_TYPE_SIDE })
		const zucchini = Menu.addTopping({ name: "Zucchini", price: 0.1, type: Menu.TOPPING_TYPE_SIDE })
	Menu.setOffByDefault(false)

	Menu.setOffByDefault(true)
		const chocolateMilk = Menu.addTopping({ name: "Chocolate Milk", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const whiteMilk = Menu.addTopping({ name: "White Milk", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })

		const brisk = Menu.addTopping({ name: "Brisk", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const coke = Menu.addTopping({ name: "Coke", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const drPepper = Menu.addTopping({ name: "Dr. Pepper", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const fanta = Menu.addTopping({ name: "Fanta", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const gatorade = Menu.addTopping({ name: "Gatorade", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const gingerAle = Menu.addTopping({ name: "Ginger Ale", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const hiC = Menu.addTopping({ name: "Hi C", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const pepsi = Menu.addTopping({ name: "Pepsi", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const powerade = Menu.addTopping({ name: "Powerade", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const rootBeer = Menu.addTopping({ name: "Root Beer", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const sevenUp = Menu.addTopping({ name: "7up", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const sprite = Menu.addTopping({ name: "Sprite", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })

		const appleJuice = Menu.addTopping({ name: "Apple Juice", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const grapeJuice = Menu.addTopping({ name: "Grape Juice", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
		const orangeJuice = Menu.addTopping({ name: "Orange Juice", price: 0.3, type: Menu.TOPPING_TYPE_DRINK })
	Menu.setOffByDefault(false)

	/*
	*	Items
	*/

	// Healthy Haven
	Menu.addItem({
		section: "Healthy Haven",

		name: "Salmon Salad",
		description: "Grilled Salmon Salad with Citrus Vinaigrette",

		price: 12,

		toppingList: [
			garlic,
			honey,
			lemonJuice,
			lemonZest,
			lettuce,
			mustard,
			onion,
			pepper,
			pomegranateSeeds,
			pumpkinSeeds,
			salt,
			thyme,
			vinegar,
			zucchini
		],

		image: "../assets/menu/food/Grilled_Salmon_Salad_with_Citrus_Vinaigrette.jpg"
	})

	Menu.addItem({
		section: "Healthy Haven",

		name: "Bell Peppers",
		description: "Quinoa and Vegetable Stuffed Bell Peppers",

		price: 4,

		toppingList: [
			eggplant,
			garlic,
			mint,
			parsely,
			quinoa,
			tomatoes,
			zucchini
		],

		image: "../assets/menu/food/Quinoa_and_Vegetable_Stuffed_Bell_Peppers.jpg"
	})

	Menu.addItem({
		section: "Healthy Haven",

		name: "Avocado Toast Trio",
		description: "Avocado Toast Trio with Tomato Salsa",

		price: 4,

		toppingList: [
			eggs,
			lettuce,
			pepper,
			salt,
			tomatoes,
			zucchini
		],

		image: "../assets/menu/food/Avocado_Toast_Trio_with_Tomato_Salsa.jpg"
	})

	Menu.addItem({
		section: "Healthy Haven",

		name: "Mediterranean Power Bowl",
		description: "Mediterranean Power Bowl with Hummus",

		price: 4,

		toppingList: [
			chickpeas,
			cucumber,
			pepper,
			quinoa,
			salt,
			spinach,
			tomatoes
		],

		image: "../assets/menu/food/Mediterranean_Power_Bowl_with_Hummus.jpg"
	})

	// Indulgence Oasis
	Menu.addItem({
		section: "Indulgence Oasis",

		name: "Lobster Mac and Cheese",
		description: "Truffle-infused Lobster Mac and Cheese",

		price: 15,

		toppingList: [
			carrots,
			celery,
			garlic,
			onion,
			pepper,
			salt
		],

		image: "../assets/menu/food/Truffle-infused_Lobster_Mac_and_Cheese.jpg"
	})

	Menu.addItem({
		section: "Indulgence Oasis",

		name: "Filet Mignon",
		description: "Filet Mignon with Red Wine Reduction",

		price: 8,

		toppingList: [
			pepper,
			whiteWine
		],

		image: "../assets/menu/food/Filet_Mignon_with_Red_Wine_Reduction.jpg"
	})

	Menu.addItem({
		section: "Indulgence Oasis",

		name: "Foie Gras Crostini",
		description: "Foie Gras Crostini with Fig Jam",

		price: 5,

		toppingList: [
			chives,
			orangeZest,
			pepper,
			salt
		],

		image: "../assets/menu/food/Foie_Gras_Crostini_with_Fig_Jam.jpg"
	})

	Menu.addItem({
		section: "Indulgence Oasis",

		name: "Risotto",
		description: "Black Truffle Risotto with Parmesan Crisps",

		price: 5,

		toppingList: [
			chives,
			orangeZest,
			pepper,
			salt,
			whiteWine
		],

		image: "../assets/menu/food/Black_Truffle_Risotto_with_Parmesan_Crisps.jpg"
	})

	// Fast Fusion Corner
	Menu.addItem({
		section: "Fast Fusion Corner",

		name: "Burger",
		description: "Gourmet Beef Burger with Chipotle Aioli",

		price: 6,

		toppingList: [
			cilantro,
			garlic,
			lettuce,
			onion,
			tomatoes
		],

		image: "../assets/menu/food/Gourmet_Beef_Burger_with_Chipotle_Aioli.jpg"
	})

	Menu.addItem({
		section: "Fast Fusion Corner",

		name: "Pesto Chicken Panini",
		description: "Pesto Chicken Panini with Sundried Tomatoes",

		price: 6,

		toppingList: [
			basil,
			garlic,
			pepper,
			salt,
			tomatoes
		],

		image: "../assets/menu/food/Pesto_Chicken_Panini_with_Sundried_Tomatoes.jpg"
	})

	Menu.addItem({
		section: "Fast Fusion Corner",

		name: "Tacos",
		description: "Street-Style Tacos with Mango Salsa",

		price: 3,

		toppingList: [
			avocado,
			cabbage,
			cilantro,
			pepper,
			salsa,
			salt
		],

		image: "../assets/menu/food/Street-Style_Tacos_with_Mango_Salsa.jpg"
	}),

	Menu.addItem({
		section: "Fast Fusion Corner",

		name: "BBQ Pulled Pork Sliders",
		description: "BBQ Pulled Pork Sliders with Coleslaw",

		price: 8,

		toppingList: [
			garlic,
			pepper,
			salt,
			sugar,
			worcestershire
		],

		image: "../assets/menu/food/BBQ_Pulled_Pork_Sliders_with_Coleslaw.jpg"
	})

	// Guilt-Free Delights
	Menu.addItem({
		section: "Guilt-Free Delights",

		name: "Pizza",
		description: "Cauliflower Crust Margherita Pizza",

		price: 5,

		toppingList: [
			jalapeno,
			pepperoni
		],

		image: "../assets/menu/food/Cauliflower_Crust_Margherita_Pizza.jpg"
	})

	Menu.addItem({
		section: "Guilt-Free Delights",

		name: "Zucchini Noodles",
		description: "Zucchini Noodles with Basil Pesto",

		price: 2,

		toppingList: [
			basil,
			lemonJuice,
			pepper,
			zucchini
		],

		image: "../assets/menu/food/Zucchini_Noodles_with_Basil_Pesto.jpg"
	})

	Menu.addItem({
		section: "Guilt-Free Delights",

		name: "Vegan Thai Coconut Curry",
		description: "Vegan Thai Coconut Curry with Tofu",

		price: 5,

		toppingList: [
			basil,
			garlic,
			pepper,
			salt
		],

		image: "../assets/menu/food/Vegan_Thai_Coconut_Curry_with_Tofu.jpg"
	})

	Menu.addItem({
		section: "Guilt-Free Delights",

		name: "Pudding Parfait",
		description: "Chia Seed Pudding Parfait with Mixed Berries",

		price: 4,

		toppingList: [
			blackberries,
			blueberries,
			honey,
			raspberries,
			strawberries,
			yogurt
		],

		image: "../assets/menu/food/Chia_Seed_Pudding_Parfait_with_Mixed_Berries.jpg"
	})

	// Decadent Dessert Haven
	Menu.addItem({
		section: "Decadent Dessert Haven",

		name: "Lava Cake",
		description: "Molten Chocolate Lava Cake",

		price: 3,

		toppingList: [
			chocolate,
			raspberries,
			sugar,
			vanilla
		],

		image: "../assets/menu/food/Molten_Chocolate_Lava_Cake_with_Raspberry_Coulis.jpg"
	})

	Menu.addItem({
		section: "Decadent Dessert Haven",

		name: "Sundae",
		description: "Sundae Caramelized Banana Foster",

		price: 3,

		toppingList: [
			banana,
			iceCream,
			sugar
		],

		image: "../assets/menu/food/Sundae_Caramelized_Banana_Foster.jpg"
	})

	Menu.addItem({
		section: "Decadent Dessert Haven",

		name: "Mouesse",
		description: "Pistachio White Chocolate Mousse",

		price: 3,

		toppingList: [
			chocolate,
			sugar,
			vanilla
		],

		image: "../assets/menu/food/Pistachio_White_Chocolate_Mousse.jpg"
	})

	Menu.addItem({
		section: "Decadent Dessert Haven",

		name: "Tart",
		description: "Raspberry Almond Tart with Vanilla Bean Cream",

		price: 3,

		toppingList: [
			raspberries,
			sugar,
			vanilla
		],

		image: "../assets/menu/food/Raspberry_Almond_Tart_with_Vanilla_Bean_Cream.jpg"
	})

	// Exotic Elixirs Bar
	Menu.addItem({
		section: "Exotic Elixirs Bar",

		name: "Detox Water",
		description: "Hibiscus Infused Detox Water",

		price: 1,

		toppingList: [
			hibiscus
		],

		image: "../assets/menu/drinks/Hibiscus_Infused_Detox_Water.jpg"
	})

	Menu.addItem({
		section: "Exotic Elixirs Bar",

		name: "Smoothie",
		description: "Mango Tango Smoothie with Chia Seeds",

		price: 2,

		toppingList: [
			chiaSeeds,
			gingerJuice,
			gingerPuree,
			mango
		],

		image: "../assets/menu/drinks/Mango_Tango_Smoothie_with_Chia_Seeds.jpg"
	})

	Menu.addItem({
		section: "Exotic Elixirs Bar",

		name: "Lemonade",
		description: "Basil Lemonade Sparkler",

		price: 1,

		toppingList: [
			basil,
			lemonJuice
		],

		image: "../assets/menu/drinks/Basil_Lemonade_Sparkler.jpg"
	})

	Menu.addItem({
		section: "Exotic Elixirs Bar",

		name: "Matcha Latte",
		description: "Matcha Latte with Almond Milk",

		price: 2,

		toppingList: [
			sugar
		],

		image: "../assets/menu/drinks/Matcha_Latte_with_Almond_Milk.jpg"
	})

	// Drinks
	Menu.addItem({
		section: "⁣Drinks",

		name: "Water",
		description: "",

		price: 0.5,

		toppingList: [],

		image: "../assets/menu/drinks/Water.jpg"
	})

	Menu.addItem({
		section: "⁣Drinks",

		name: "Milk",
		description: "Fat-free Milk",

		price: 0.5,

		toppingList: [
			chocolateMilk,
			whiteMilk
		],

		image: "../assets/menu/drinks/Milk.jpg"
	})

	Menu.addItem({
		section: "⁣Drinks",

		name: "Fountain Drink",
		description: "",

		price: 0.5,

		toppingList: [
			brisk,
			coke,
			drPepper,
			fanta,
			gatorade,
			gingerAle,
			hiC,
			pepsi,
			powerade,
			rootBeer,
			sevenUp,
			sprite
		],

		image: "../assets/menu/drinks/Fountain_Drink.jpg"
	})

	Menu.addItem({
		section: "⁣Drinks",

		name: "Juice",
		description: "",

		price: 0.5,

		toppingList: [
			appleJuice,
			grapeJuice,
			orangeJuice
		],

		image: "../assets/menu/drinks/Juice.jpg"
	})

	////////////////////////////
	Menu.g_bInitialized = true
}

/*
*	Closes all open popups
*/
Menu.closePopups = () =>
{
	const popups = Array.from(document.querySelectorAll(".menu_popup"))
	for (const popup of popups)
		popup.remove()
}

/*
*	Creates a popup
*/
Menu.createPopup = (title) =>
{
	Menu.closePopups()

	const popup = document.createElement("div")
	popup.classList.add("menu_popup")
	popup.classList.add("glass_morphism")
	popup.classList.add("pop")
	{
		const closeBit = document.createElement("div")
		closeBit.classList.add("menu_item_container_bit")
		{
			const closeButton = document.createElement("button")
			closeButton.classList.add("close_btn")
			closeButton.classList.add("float_right")
			{
				closeButton.innerHTML = "X"
				closeButton.onclick = Menu.closePopups
			}

			closeBit.appendChild(closeButton)
		}

		const titleBit = document.createElement("div")
		titleBit.classList.add("menu_item_container_bit")
		titleBit.classList.add("flexbox")
		{
			const titleHeader = document.createElement("h1")
			titleHeader.innerHTML = title
			titleHeader.classList.add("blockbox")

			titleBit.appendChild(titleHeader)
		}

		const container = document.createElement("div")
		container.classList.add("menu_popup_container")
		container.classList.add("glass_morphism_weak")

		popup.appendChild(closeBit)
		popup.appendChild(titleBit)
		popup.appendChild(container)

		popup.m_CloseBit = closeBit
		popup.m_TitleBit = titleBit
		popup.m_Container = container
	}

	return popup
}

/*
*	Triggers when the checkbox in the topping selector is clicked
*/
Menu.toppingSelectorOnClick = (event) =>
{
	if (!event) return

	const checkbox = event.target
	if (!checkbox) return

	const providedItem = checkbox.m_Item
	const providedTopping = checkbox.m_Topping
	if (!providedItem || !providedTopping) return

	const itemToppings = providedItem.getToppings()

	for (const [ topping, _ ] of itemToppings.entries())
	{
		if (topping != providedTopping) continue

		itemToppings.set(topping, checkbox.checked)
		break
	}
}

/*
*	Opens the topping selector for the specified item
*/
Menu.openToppingSelector = (item, active) =>
{
	const selector = Menu.createPopup(`Toppings for ${item.getName()}`)
	{
		if (active)
		{
			const closeBit = selector.m_CloseBit
			{
				closeBit.innerHTML = ""

				const backButton = document.createElement("button")
				backButton.classList.add("back_btn")
				backButton.classList.add("float_right")
				{
					backButton.innerHTML = "<-"
					backButton.onclick = Menu.openCart
				}

				closeBit.appendChild(backButton)
			}
		}

		const container = selector.m_Container
		{
			for (const [ topping, value ] of item.getToppings())
			{
				const available = topping.getAvailable()

				const toppingBlock = document.createElement("div")
				toppingBlock.classList.add("menu_item_topping_choice")
				toppingBlock.classList.add("inline_blockbox")
				toppingBlock.classList.add("glass_morphism_weak")
				{
					toppingBlock.setAttribute("available", available)

					const name = document.createElement("h3")
					name.innerHTML = topping.getName()

					const price = document.createElement("p")
					price.innerHTML = Helper.priceify(topping.getPrice())
					price.classList.add("float_right")

					const selected = document.createElement("input")
					selected.setAttribute("type", "checkbox")
					selected.classList.add("float_right")
					selected.checked = value

					if (active && available)
					{
						selected.m_Item = item
						selected.m_Topping = topping

						selected.onclick = Menu.toppingSelectorOnClick
					}
					else
						selected.disabled = true

					toppingBlock.appendChild(name)
					toppingBlock.appendChild(price)
					toppingBlock.appendChild(selected)
				}

				container.appendChild(toppingBlock)
			}
		}
	}

	Menu.m_Container.appendChild(selector)
}

/*
*	Creates a payment button
*/
Menu.paymentButtonOnClick = (event) =>
{
	if (!event) return

	const button = event.target
	if (!button) return
	if (!button.m_strParameter) return

	window.location.assign(`../pages/order.html?type=${button.m_strParameter}`)
}

Menu.createPaymentButton = (type) =>
{
	const translated = Order.translateType(type)

	const button = document.createElement("button")
	button.innerHTML = translated
	button.m_strParameter = translated.toLowerCase()
	button.m_iType = type
	button.onclick = Menu.paymentButtonOnClick

	return button
}

/*
*	Opens up the cart screen
*/
Menu.openCart = () =>
{
	const cart = Menu.createPopup("Cart")
	{
		const container = cart.m_Container
		container.id = "menu_cart_container"
		{
			const table = document.createElement("table")
			table.id = "menu_cart_table"
			{
				const thead = document.createElement("thead")
				{
					const tr = document.createElement("tr")
					{
						const th1 = document.createElement("th")
						th1.innerHTML = "Item"

						const th2 = document.createElement("th")
						th2.innerHTML = "Toppings"

						const th3 = document.createElement("th")
						th3.innerHTML = "Finalize"

						tr.appendChild(th1)
						tr.appendChild(th2)
						tr.appendChild(th3)
					}

					thead.appendChild(tr)
				}

				const tbody = document.createElement("tbody")
				tbody.id = "menu_cart_body"
				{
					Menu.updateCartDisplay(tbody)
				}

				table.appendChild(thead)
				table.appendChild(tbody)
			}

			container.appendChild(table)
		}

		const paymentContainer = document.createElement("div")
		paymentContainer.id = "menu_cart_payment_container"
		paymentContainer.classList.add("menu_popup_container")
		paymentContainer.classList.add("glass_morphism_weak")
		{
			const cash = Menu.createPaymentButton(Order.PAYMENT_TYPE_CASH)
			const card = Menu.createPaymentButton(Order.PAYMENT_TYPE_CARD)
			const paypal = Menu.createPaymentButton(Order.PAYMENT_TYPE_PAYPAL)
			const apple = Menu.createPaymentButton(Order.PAYMENT_TYPE_APPLE)
			const samsung = Menu.createPaymentButton(Order.PAYMENT_TYPE_SAMSUNG)
			const google = Menu.createPaymentButton(Order.PAYMENT_TYPE_GOOGLE)

			paymentContainer.appendChild(cash)
			paymentContainer.appendChild(card)
			paymentContainer.appendChild(paypal)
			paymentContainer.appendChild(apple)
			paymentContainer.appendChild(samsung)
			paymentContainer.appendChild(google)
		}

		cart.appendChild(paymentContainer)
	}

	Menu.m_Container.appendChild(cart)
}

/*
*	Quantity input on change event
*/
Menu.quantityInputOnChange = (event) =>
{
	if (!event) return

	const quantityInput = event.target
	if (!quantityInput) return
	if (!quantityInput.m_Item) return

	const item = quantityInput.m_Item
	let found = Menu.m_Cart.get(item)
	if (!found) return

	found = Helper.clamp(Helper.getNumber(quantityInput.value), Menu.MIN_CART_ITEM_QUANTITY, Menu.MAX_CART_ITEM_QUANTITY)
	Menu.m_Cart.set(item, found)

	Menu.updateCartDisplay()
}

/*
*	Updates the cart table display
*/
Menu.updateCartDisplay = (tbody) =>
{
	Menu.storeCart() // updateCartDisplay runs when the cart is modified in any way, so we can store here too

	if (!tbody)
	{
		tbody = document.getElementById("menu_cart_body")
		if (!tbody) return
	}

	tbody.innerHTML = ""

	for (const [ item, quantity ] of Menu.m_Cart.entries())
	{
		const tr = document.createElement("tr")
		{
			const name = document.createElement("td")
			name.innerHTML = item.getName()

			const toppings = document.createElement("td")
			{
				const button = Menu.createItemButton(item, Menu.ITEM_BUTTON_TOPPINGS, true)

				toppings.appendChild(button)
			}

			const finalize = document.createElement("td")
			finalize.classList.add("flexbox")
			{
				const removeBtn = document.createElement("button")
				removeBtn.innerHTML = "x"
				removeBtn.classList.add("close_btn")
				removeBtn.m_Item  = item
				removeBtn.onclick = (event) =>
				{
					Menu.m_Cart.delete(event.target.m_Item)
					Menu.updateCartDisplay()
				}

				const quantityInput = document.createElement("input")
				quantityInput.setAttribute("type", "number")
				quantityInput.setAttribute("min", Menu.MIN_CART_ITEM_QUANTITY)
				quantityInput.setAttribute("max", Menu.MAX_CART_ITEM_QUANTITY)
				{
					quantityInput.value = Helper.clamp(quantity, Menu.MIN_CART_ITEM_QUANTITY, Menu.MAX_CART_ITEM_QUANTITY)

					quantityInput.m_Item = item
					quantityInput.onchange = Menu.quantityInputOnChange
				}

				const priceDisplay = document.createElement("p")
				{
					let itemPrice = item.getPrice() * quantity
					let toppingPrice = 0

					for (const [ topping, value ] of item.getToppings().entries())
					{
						if (!value) continue
						toppingPrice += topping.getPrice() * quantity
					}

					const finalPrice = itemPrice + toppingPrice
					priceDisplay.innerHTML = Helper.priceify(finalPrice)
				}
				finalize.appendChild(removeBtn)
				finalize.appendChild(quantityInput)
				finalize.appendChild(priceDisplay)
			}

			tr.appendChild(name)
			tr.appendChild(toppings)
			tr.appendChild(finalize)
		}

		tbody.appendChild(tr)
	}
}

/*
*	Stores the cart
*/
Menu.storeCart = () =>
{
	const parsed = Helper.json(Object.fromEntries(Menu.m_Cart))
	StorageManager.setStoredValue("storedCart", parsed)
}

/*
*	Loads the stored cart
*/
Menu.restoreCart = (stored) =>
{
	const first = Helper.parse(stored)

	const keys = Object.getOwnPropertyNames(first)
	for (const key of keys)
	{
		const baseItem = Helper.parse(key)
		const baseToppings = Helper.parse(baseItem.m_Toppings)

		// Fix toppings
		const toppingArray = []

		for (const [ key, value ] of baseToppings.entries())
		{
			const convertedTopping = Helper.parse(key)

			// Make a thing for the constructor
			const toppingThing = {}

			toppingThing.name = convertedTopping.m_strName

			toppingThing.price = convertedTopping.m_flPrice

			toppingThing.type = convertedTopping.m_iType

			// Yay
			toppingArray.push(new Menu__Topping(toppingThing))
		}

		// Fix item
		const itemThing = {}

		itemThing.section = baseItem.m_strSection

		itemThing.name = baseItem.m_strName
		itemThing.description = baseItem.m_strDescription

		itemThing.price = baseItem.m_flPrice

		itemThing.toppingList = toppingArray

		itemThing.image = baseItem.m_strImagePath

		itemThing.available = baseItem.m_bAvailable

		// Yay!!!
		const fixedItem = new Menu__Item(itemThing)
		Menu.m_Cart.set(fixedItem, first[key])
	}
}

/*
*	Adds an item to the cart
*/
Menu.addToCart = (item) =>
{
	const found = Menu.find(item.getName(), Menu.m_Cart)
	if (found)
	{
		Menu.m_Cart.set(found[0], Helper.clamp(found[1] + 1, Menu.MIN_CART_ITEM_QUANTITY, Menu.MAX_CART_ITEM_QUANTITY))
	}
	else
	{
		const newItem = new Menu__Item(item)
		Menu.m_Cart.set(newItem, 1)
	}

	Menu.updateCartDisplay()
}

/*
*	Creates an item button
*/

// onclick for View Toppings buttons
Menu.itemButtonClick_Topping = (event) =>
{
	if (!event) return

	const button = event.target
	if (!button) return
	if (!button.m_Item) return

	Menu.openToppingSelector(button.m_Item, Helper.getBool(button.m_bActive, false))
}

// onclick for Add to Cart buttons
Menu.itemButtonClick_Cart = (event) =>
{
	if (!event) return

	const button = event.target
	if (!button) return
	if (!button.m_Item) return

	Menu.addToCart(button.m_Item)
}

Menu.createItemButton = (item, type, active) =>
{
	active = Helper.getBool(active, false)

	let title = ""
	let onclick = null

	const button = document.createElement("button")
	button.classList.add("menu_item_container_button")
	button.m_bActive = active
	{
		switch (type)
		{
			default:
			case Menu.ITEM_BUTTON_TOPPINGS:
			{
				title = "View Toppings"
				onclick = Menu.itemButtonClick_Topping

				if (Array.from(item.getToppings().keys()).length < 1)
					button.disabled = true

				break
			}

			case Menu.ITEM_BUTTON_CART:
			{
				title = "Add to Cart"
				onclick = Menu.itemButtonClick_Cart
				break
			}
		}

		button.innerHTML = title
		button.onclick = onclick

		button.m_Item = item
	}

	return button
}

/*
*	Sets up the menu page
*/

// Section sorter
Menu.sectionItemSort = (a, b) =>
{
	return a.getName() > b.getName() ? 1 : -1
}

Menu.setupPage = (container) =>
{
	// Organize section items in abc order
	const sectionsObject = {}
	{
		for (const [ item, value ] of Menu.m_Items.entries())
		{
			const section = item.getSectionName()
			let sectionList = sectionsObject[section]

			if (!sectionList)
			{
				sectionsObject[section] = []
				sectionList = sectionsObject[section]
			}

			sectionList.push(item)
			sectionList.sort(Menu.sectionItemSort)
		}
	}

	// Organize sections in abc order
	const sectionsArray = []
	{
		const properties = Object.getOwnPropertyNames(sectionsObject)
		properties.sort()

		for (const property of properties)
		{
			const sectionArray = sectionsObject[property]
			sectionArray.unshift(property)

			sectionsArray.push(sectionArray)
		}
	}

	// Menu item sections
	for (const section of sectionsArray)
	{
		const sectionName = section[0]

		const itemSection = document.createElement("div")
		itemSection.classList.add("menu_item_section")
		itemSection.classList.add("glass_morphism_weak")
		itemSection.classList.add("pop")
		{
			const header = document.createElement("div")
			header.classList.add("menu_item_section_header")
			header.classList.add("glass_morphism_weak")
			header.classList.add("pop")
			{
				const title = document.createElement("h1")
				title.innerHTML = section[0]

				header.appendChild(title)
			}

			const body = document.createElement("div")
			body.classList.add("menu_item_section_body")
			{
				for (let i = 1; i < section.length; i++)
				{
					const item = section[i]

					const itemContainer = document.createElement("div")
					itemContainer.classList.add("menu_item_container")
					itemContainer.classList.add("glass_morphism_weak")
					itemContainer.classList.add("pop")
					{
						const nameBit = document.createElement("div")
						nameBit.classList.add("menu_item_container_bit")
						nameBit.classList.add("flexbox")
						{
							const name = document.createElement("h3")
							name.innerHTML = item.getName()

							nameBit.appendChild(name)
						}

						const priceBit = document.createElement("div")
						priceBit.classList.add("menu_item_container_bit")
						priceBit.classList.add("flexbox")
						{
							const price = document.createElement("h4")
							price.innerHTML = Helper.priceify(item.getPrice())

							priceBit.appendChild(price)
						}

						const imageBit = document.createElement("div")
						imageBit.classList.add("menu_item_container_bit")
						imageBit.classList.add("flexbox")
						{
							const image = document.createElement("img")
							image.classList.add("menu_item_container_image")
							image.classList.add("pop")
							image.setAttribute("src", item.getImagePath())

							imageBit.appendChild(image)
						}

						const descriptionBit = document.createElement("div")
						descriptionBit.classList.add("menu_item_container_bit")
						descriptionBit.classList.add("flexbox")
						{
							const description = document.createElement("p")
							description.innerHTML = item.getDescription()

							descriptionBit.appendChild(description)
						}

						const buttonsBit = document.createElement("div")
						buttonsBit.classList.add("menu_item_container_bit")
						buttonsBit.classList.add("menu_item_container_buttons")
						buttonsBit.classList.add("flexbox")
						{
							const toppings = Menu.createItemButton(item, Menu.ITEM_BUTTON_TOPPINGS, false)
							const cart = Menu.createItemButton(item, Menu.ITEM_BUTTON_CART)

							buttonsBit.appendChild(toppings)
							buttonsBit.appendChild(cart)
						}

						itemContainer.appendChild(nameBit)
						itemContainer.appendChild(priceBit)
						itemContainer.appendChild(imageBit)
						itemContainer.appendChild(descriptionBit)
						itemContainer.appendChild(buttonsBit)
					}

					body.appendChild(itemContainer)
				}
			}

			itemSection.appendChild(header)
			itemSection.appendChild(body)
		}

		container.appendChild(itemSection)
	}

	// Cart
	const cartButton = document.createElement("button")
	cartButton.id = "menu_cart_button"
	{
		cartButton.onclick = Menu.openCart

		const icon = document.createElement("ion-icon")
		icon.setAttribute("name", "cart-outline")

		cartButton.appendChild(icon)
	}

	container.appendChild(cartButton)
}

///////////////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
	Menu.initializeItems()

	// Load the stored cart
	const stored = StorageManager.getStoredString("storedCart")
	if (stored.length > 0)
		Menu.restoreCart(stored)

	Menu.m_bReady = true
	if (!Helper.isOnPage("menu")) return

	const container = document.createElement("div")
	container.id = "menu_container"
	container.classList.add("page_container")
	{
		Menu.m_Container = container
		Menu.setupPage(container)
	}

	document.body.appendChild(container)

	Menu.updateCartDisplay()
})