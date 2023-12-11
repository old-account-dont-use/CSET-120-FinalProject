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
			const toppings = Array.from(Menu.toppings.keys())

			for (const toppingName of toppings)
			{

			}

			const items = Array.from(Menu.items.keys())



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

	if (Helper.isOnPage("manager.html"))
		Manager.createManagerPage()
})