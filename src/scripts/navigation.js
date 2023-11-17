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
*	Creates a navbar user control
*/
NavigationManager.createNavBarUserControl = (label, callback) =>
{
	const panel = document.createElement("div")
	panel.classList.add("navbar_usercontrols_dropdown_control")
	{
		const p = document.createElement("p")
		p.classList.add("navbar_usercontrols_dropdown_control_label")
		p.innerHTML = label

		panel.appendChild(p)
	}

	return panel
}

/*
*	Creates the navbar user controls
*/
NavigationManager.createNavBarUserControls = () =>
{
	const panel = document.createElement("div")
	panel.id = "navbar_usercontrols"
	{
		panel.onclick = () =>
		{
			const dropdown = document.getElementById("navbar_usercontrols_dropdown")
			if (!dropdown) return

			if (dropdown.style.length < 1)
				dropdown.setAttribute("style", "display: none;")
			else
				dropdown.removeAttribute("style")
		}

		const img = document.createElement("img")
		img.id = "navbar_usercontrols_img"
		img.setAttribute("src", "../assets/user.jpg")

		const label = document.createElement("p")
		label.id = "navbar_usercontrols_label"
		{
			if (AccountManager.g_bLoggedIn)
				label.innerHTML = AccountManager.g_AccountData[0]
			else
				label.innerHTML = "Not signed in"
		}

		panel.appendChild(img)
		panel.appendChild(label)
	}

	const dropdown = document.createElement("div")
	dropdown.id = "navbar_usercontrols_dropdown"
	dropdown.setAttribute("style", "display: none;")
	{
		if (AccountManager.g_bLoggedIn)
		{
			const email = AccountManager.g_AccountData[0]
			const accountType = AccountManager.g_AccountData[3]
			const isManager = accountData == AccountManager.ACCOUNT_TYPE_MANAGER

			dropdown.appendChild(NavigationManager.createNavBarUserControl("Account", () =>
			{

			}))

			if (isManager)
			{
				dropdown.appendChild(NavigationManager.createNavBarUserControl("Manager Menu", () =>
				{

				}))
			}

			dropdown.appendChild(NavigationManager.createNavBarUserControl("Logout", () =>
			{
				AccountManager.logout()
				location.reload()
			}))
		}
		else
		{
			dropdown.appendChild(NavigationManager.createNavBarUserControl("Login", () =>
			{
				window.location = "account.html"
			}))
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

			const userControls = NavigationManager.createNavBarUserControls()
			navbar_right.appendChild(userControls)
		}

		navbar.appendChild(navbar_left)
		navbar.appendChild(navbar_right)
	}

	document.body.insertAdjacentElement("afterbegin", navbar)
}

///////////////////////////////////////////////////////////////////////////////
Helper.hookEvent("load", window, false, () =>
{
	if (AccountManager.g_bLoggedIn === undefined) // Login process not yet completed
		return false

	if (NAVBAR_PROPERTIES)
		NavigationManager.createNavBar(NAVBAR_PROPERTIES)
})

Helper.hookEvent("scroll", document, true, (event) =>
{
	const dropdown = document.getElementById("navbar_usercontrols_dropdown") // Re-hide user control menu
	if (dropdown && dropdown.style.length < 1)
		dropdown.setAttribute("style", "display: none;")
})