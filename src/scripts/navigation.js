let NavigationManager = new Map()

/*
*	Creates a navbar link
*/
NavigationManager.createNavBarLink = (name, url) =>
{
	if (!Helper.isString(name))
		name = String(name)

	if (!Helper.isString(url))
		url = String(url)

	const li = document.createElement("li")
	li.id = `navbar_li_${name.toLowerCase()}`
	{
		const a = document.createElement("a")
		a.setAttribute("href", url)
		a.innerHTML = name

		li.appendChild(a)
	}

	return li
}

/*
*	Creates the navbar user controls
*/
NavigationManager.createNavBarUserControl = () =>
{
	const panel = document.createElement("div")
	panel.id = "navbar_usercontrols"

	if (AccountManager.g_bLoggedIn)
	{

	}
	else
	{

	}

	return panel
}

/*
*	Creates a navbar on the page
*
*	NAVBAR_PROPERTIES is defined within the HTML file just after the <body> tag
*	If NAVBAR_PROPERTIES is not defined, no navbar will be generated for that file
*/
NavigationManager.createNavBar = (NAVBAR_PROPERTIES) =>
{
	const navbar = document.createElement("div")
	navbar.id = "navbar"
	{
		/*
		*	Left side
		*/
		const navbar_left = document.createElement("div")
		navbar_left.id = "navbar_left"
		{
			navbar_left.classList.add("float_left")

			const logo = document.createElement("img")
			logo.id = "navbar_logo"
			logo.setAttribute("src", "../assets/logo.png")

			const title = document.createElement("h1")
			title.id = "navbar_title"
			title.innerHTML = "Eclectic Eats Haven"

			navbar_left.appendChild(logo)
			navbar_left.appendChild(title)
		}

		/*
		*	Right side
		*/
		const navbar_right = document.createElement("div")
		navbar_right.id = "navbar_right"
		{
			navbar_right.classList.add("float_right")

			const navbar_tabs = document.createElement("ul")
			navbar_tabs.id = "navbar_tabs"
			{
				/*
				*	Link buttons
				*/
				const properties = Object.getOwnPropertyNames(NAVBAR_PROPERTIES)

				for (const property of properties)
				{
					const link = NavigationManager.createNavBarLink(property, NAVBAR_PROPERTIES[property])
					navbar_tabs.appendChild(link)
				}
			}
			navbar_right.appendChild(navbar_tabs)

			const userControls = NavigationManager.createNavBarUserControl()
			navbar_right.appendChild(userControls)
		}

		navbar.appendChild(navbar_left)
		navbar.appendChild(navbar_right)
	}

	document.body.insertAdjacentElement("afterbegin", navbar)
}

///////////////////////////////////////////////////////////////////////////////
Helper.addLoadEvent(() =>
{
	if (AccountManager.g_bLoggedIn === undefined) // Login process not yet completed
		return false

	if (NAVBAR_PROPERTIES)
		NavigationManager.createNavBar(NAVBAR_PROPERTIES)
})