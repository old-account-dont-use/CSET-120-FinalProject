const NavigationManager = {}

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
		a.classList.add("glass_morphism_weak")
		a.innerHTML = name

		li.appendChild(a)
	}

	return li
}

/*
*	Creates a navbar user control
*/
NavigationManager.createNavBarUserControl = (label, callback) =>
{
	const panel = document.createElement("div")
	panel.classList.add("navbar_usercontrols_dropdown_control")
	panel.classList.add("glass_morphism_weak")
	panel.onclick = callback
	{
		const p = document.createElement("p")
		p.classList.add("navbar_usercontrols_dropdown_control_label")
		p.innerHTML = label

		panel.appendChild(p)
	}

	return panel
}

/*
*	Toggles the navbar user controls dropdown position and size
*/
NavigationManager.fixNavBarUserControlsDropdown = (panel, dropdown) =>
{
	if (!panel)
	{
		panel = document.getElementById("navbar_usercontrols")
		if (!panel) return
	}

	if (!dropdown)
	{
		dropdown = document.getElementById("navbar_usercontrols_dropdown")
		if (!dropdown) return
	}

	const isVisible = (/true/).test(panel.getAttribute("open"))
	if (!isVisible) return

	const rect = panel.getBoundingClientRect()

	dropdown.style = `top: ${rect.top + rect.height}px; left: ${rect.left}px; width: ${rect.width}px;`
}

/*
*	Toggles the navbar user controls
*/
NavigationManager.toggleNavBarUserControls = (bState) =>
{
	const panel = document.getElementById("navbar_usercontrols")
	if (!panel) return

	const dropdown = document.getElementById("navbar_usercontrols_dropdown")
	if (!dropdown) return

	const isVisible = (/true/).test(panel.getAttribute("open"))
	if (bState == isVisible) return

	panel.setAttribute("open", !isVisible)
	dropdown.setAttribute("open", panel.getAttribute("open"))

	NavigationManager.fixNavBarUserControlsDropdown(panel, dropdown)
}

/*
*	Creates the navbar user controls
*/
NavigationManager.createNavBarUserControls = () =>
{
	const panel = document.createElement("div")
	panel.id = "navbar_usercontrols"
	panel.classList.add("glass_morphism_weak")
	{
		panel.onclick = NavigationManager.toggleNavBarUserControls
		panel.setAttribute("open", false)

		const img = document.createElement("img")
		img.id = "navbar_usercontrols_img"
		img.setAttribute("src", "../assets/user.jpg")

		const label = document.createElement("p")
		label.id = "navbar_usercontrols_label"
		{
			if (AccountManager.g_bLoggedIn)
				label.innerHTML = AccountManager.g_AccountData.email
			else
				label.innerHTML = "Not signed in"
		}

		panel.appendChild(img)
		panel.appendChild(label)
	}

	const dropdown = document.createElement("div")
	dropdown.id = "navbar_usercontrols_dropdown"
	dropdown.classList.add("glass_morphism")
	dropdown.setAttribute("open", false)
	{
		let looped = null
		if (AccountManager.g_bLoggedIn)
			looped = NAVBAR_PROPERTIES["Dropdown"]["Active"]
		else
			looped = NAVBAR_PROPERTIES["Dropdown"]["Inactive"]

		const properties = Object.getOwnPropertyNames(looped)

		for (const property of properties)
		{
			const propertyData = looped[property]

			let show = propertyData[0]
			if (show instanceof Function)
				show = show()
			if (!show) continue

			const control = NavigationManager.createNavBarUserControl(property, propertyData[1])
			dropdown.appendChild(control)
		}
	}

	document.body.appendChild(dropdown)
	panel.m_Dropdown = dropdown

	return panel
}

/*
*	Creates a navbar on the page
*
*	NAVBAR_PROPERTIES is defined within the HTML file just after the <body> tag
*	If NAVBAR_PROPERTIES is not defined, no navbar will be generated for that file
*
*	NAVBAR_PROPERTIES controls the layout of the tab buttons (links) as well as the dropdown items (user controls)
*	The links will always be present whilst the dropdown items have optional filters that control their visibility
*/
NavigationManager.createNavBar = (NAVBAR_PROPERTIES) =>
{
	const navbar = document.createElement("div")
	navbar.id = "navbar"
	navbar.classList.add("glass_morphism")
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

			/*
			*	Link buttons
			*/
			if (NAVBAR_PROPERTIES["Tabs"])
			{
				const navbar_tabs = document.createElement("ul")
				navbar_tabs.id = "navbar_tabs"
				{
					const properties = Object.getOwnPropertyNames(NAVBAR_PROPERTIES["Tabs"])

					for (const property of properties)
					{
						const link = NavigationManager.createNavBarLink(property, NAVBAR_PROPERTIES["Tabs"][property])
						navbar_tabs.appendChild(link)
					}
				}
				navbar_right.appendChild(navbar_tabs)
			}

			/*
			*	User controls
			*/
			if (NAVBAR_PROPERTIES["Dropdown"] && NAVBAR_PROPERTIES["Dropdown"]["Active"] && NAVBAR_PROPERTIES["Dropdown"]["Inactive"])
			{
				const userControls = NavigationManager.createNavBarUserControls()
				navbar_right.appendChild(userControls)
			}
		}

		navbar.appendChild(navbar_left)
		navbar.appendChild(navbar_right)
	}

	return navbar
}

///////////////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
	if (AccountManager.g_bLoggedIn === undefined) // Login process not yet completed
		return false

	if (NAVBAR_PROPERTIES)
	{
		const navbar = NavigationManager.createNavBar(NAVBAR_PROPERTIES)

		document.body.insertAdjacentElement("afterbegin", navbar)
		document.m_NavBar = navbar
	}
})

Helper.hookEvent(document, "scroll", true, (event) =>
{
	NavigationManager.toggleNavBarUserControls(false) // Re-hide user control menu
})

Helper.hookEvent(window, "resize", true, () =>
{
	NavigationManager.fixNavBarUserControlsDropdown() // Fix the dropdown position and size
})