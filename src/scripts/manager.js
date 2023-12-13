const Manager = {}

/*
*
*	Menu item management
*
*/

/*
*	Returns a map of stored modifications that exist or an empty map on failure
*/
Manager.getModifiedItemsList = () =>
{
	const list = StorageManager.getStoredString("modifiedItems")
	if (list.length < 1)
		return new Map()

	const map = Helper.parse(list)
	return map
}

/*
*	Sets the stored modifications list
*/
Manager.storeModifiedItemsList = () =>
{
	const list = Helper.json(Manager.m_ModifiedItems)
	StorageManager.setStoredValue("modifiedItems", list)
}

/*
*	Returns the original version of an item
*/
Manager.getOriginalItem = (itemName) =>
{
	itemName = Helper.getString(itemName).toLowerCase()

	let baseItem = Menu.toppings.get(itemName)

	if (!baseItem) baseItem = Menu.items.get(itemName)
	if (!baseItem) throw new Error(`Invalid item '${itemName}' passed to getOriginalItem`)

	return baseItem
}

/*
*	Adds an item to the storage
*	Returns the copied item
*/
Manager.storeItem = (itemName) =>
{
	itemName = Helper.getString(itemName).toLowerCase()

	if (Manager.m_ModifiedItems.get(itemName))
		Manager.m_ModifiedItems.delete(itemName)

	const baseItem = Manager.getOriginalItem(itemName)
	const copiedItem = Helper.copyObject(baseItem)

	Manager.m_ModifiedItems.set(itemName, copiedItem)
	Manager.storeModifiedItemsList()

	return copiedItem
}

/*
*	Returns the stored modified menu item
*	Will return the normal item if not present and store it
*/
Manager.getModifiedItem = (itemName) =>
{
	itemName = Helper.getString(itemName).toLowerCase()

	const stored = Manager.m_ModifiedItems.get(itemName)
	if (stored) return stored

	return Manager.storeItem(itemName)
}

/*
*	Returns if an item has modifications applied
*/
Manager.isItemModified = (itemName) =>
{
	const original = Manager.getOriginalItem(itemName)
	const stored = Manager.getModifiedItem(itemName)

	return !Helper.smartCompare(original, stored)
}

/*
*	Sets the field on a stored item and updates the cache
*/
Manager.setItemField = (itemName, field, value) =>
{
	const stored = Manager.getModifiedItem(itemName)

	stored[field] = value

	Manager.storeModifiedItemsList()
}

/*
*	Returns the field on a modified item
*/
Manager.getItemField = (itemName, field) =>
{
	const stored = Manager.getModifiedItem(itemName)
	return stored[field]
}

/*
*
*	Actual menu
*
*/
Manager.SUB_PAGE_MENU = 1
Manager.SUB_PAGE_ORDERS = 2
Manager.SUB_PAGE_ACCOUNTS = 3

Manager.createSubPage = (managerContainer, id) =>
{
	switch (id)
	{
		default:
		case Manager.SUB_PAGE_MENU:
		{
			//toppings
				const toppings = Array.from(Menu.m_Toppings.keys())

				const toppingSectionContainer = document.createElement("div")
				toppingSectionContainer.classList.add("manager_section_container")
				toppingSectionContainer.classList.add("glass_morphism_weak")

				const toppingHeader = document.createElement("div")
				toppingHeader.classList.add("center_text")
				toppingHeader.classList.add("manager_section_header")
				toppingHeader.classList.add("glass_morphism_weak")
				toppingHeader.innerHTML = "Toppings"

				const toppingsSection = document.createElement("div")
				toppingsSection.id = "manager_toppings_section"

				toppingSectionContainer.appendChild(toppingHeader)
				toppingSectionContainer.appendChild(toppingsSection)
				managerContainer.appendChild(toppingSectionContainer)

				for (const topping of toppings)
				{
					Manager.createItemDisplay(topping.getName(), "toppings", toppingsSection)
				}

			//items
				const items = Array.from(Menu.m_Items.keys())

				const itemSectionContainer = document.createElement("div")
				itemSectionContainer.classList.add("manager_section_container")
				itemSectionContainer.classList.add("glass_morphism_weak")

				const itemHeader = document.createElement("div")
				itemHeader.classList.add("center_text")
				itemHeader.classList.add("manager_section_header")
				itemHeader.classList.add("glass_morphism_weak")
				itemHeader.innerHTML = "Items"

				const itemsSection = document.createElement("div")
				itemsSection.id = "manager_items_section"

				itemSectionContainer.appendChild(itemHeader)
				itemSectionContainer.appendChild(itemsSection)
				managerContainer.appendChild(itemSectionContainer)

				for(const item of items)
				{
					Manager.createItemDisplay(item.getName(), "items", itemsSection)
				}

			break
		}

		case Manager.SUB_PAGE_ORDERS: // TODO
		{
			break
		}

		case Manager.SUB_PAGE_ACCOUNTS: // TODO
		{
			break
		}
	}
}

Manager.createItemDisplay = (itemName, type, container) =>
{
	//container for item
		const div = document.createElement("div")
		div.classList.add("flexbox")
		div.classList.add("manager_item_container")
		div.classList.add("glass_morphism_weak")

	//name section
		const name = document.createElement("h3")
		name.classList.add("manager_section_name")
		name.innerHTML = itemName
		div.appendChild(name)

	//price section
		const price = document.createElement("input")
		price.classList.add("center_text")
		price.setAttribute("type", "number")
		price.setAttribute("min", "0")
		price.setAttribute("max", "10")
		price.setAttribute("step", 0.1)
		price.value = Menu.find(itemName)[0].getPrice()
		price.onkeyup = (event) =>
		{
			event.preventDefault()

			if (Helper.isNumber(event.keyCode) && event.keyCode != 13) return
			if (Helper.isString(event.key) && event.key.toLowerCase() !== "enter") return
			if (Helper.isString(event.code) && event.code.toLowerCase() !== "enter") return

			Menu.find(itemName)[0].setPrice(price.value) //changes price

			price.blur()

		}
		div.appendChild(price)

	//availability section
		const checkbox = document.createElement("input")
		checkbox.setAttribute("type", "checkbox")
		checkbox.checked = true
		checkbox.onchange = (event) =>
		{
			Menu.find(itemName)[0].setAvailable(checkbox.checked) //changes availability
		}
		div.appendChild(checkbox)

	container.appendChild(div)
}

Manager.createManagerPage = () =>
{
	const managerContainer = document.createElement("div")
	managerContainer.id = "manager_menu_container"
	{
		Manager.createSubPage(managerContainer, Manager.SUB_PAGE_MENU) // TODO
	}
	document.body.appendChild(managerContainer)
}

///////////////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
	Manager.m_ModifiedItems = Manager.getModifiedItemsList()

	if (Helper.isOnPage("manager"))
	{
		if (!Menu.m_bReady) return false
		Manager.createManagerPage()
	}
})