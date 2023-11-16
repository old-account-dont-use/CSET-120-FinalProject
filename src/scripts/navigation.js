let NavigationManager = new Map()

/*
*	Creates a navbar on the page
*/
NavigationManager.createNavBar = () =>
{
	const navbar = document.createElement("div")
	navbar.id = "navbar"
	{
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

		const navbar_right = document.createElement("div")
		navbar_right.id = "navbar_right"
		{
			navbar_right.classList.add("float_right")

			const navbar_tabs = document.createElement("ul")
			navbar_tabs.id = "navbar_tabs"
			{
				const home = document.createElement("a")
				home.setAttribute("href", "home.html")
				{
					const li = document.createElement("li")
					li.id = "navbar_li_home"
					li.innerHTML = "Home"

					home.appendChild(li)
				}

				const menu = document.createElement("a")
				menu.setAttribute("href", "menu.html")
				{
					const li = document.createElement("li")
					li.id = "navbar_li_menu"
					li.innerHTML = "Menu"

					menu.appendChild(li)
				}

				const contact = document.createElement("a")
				contact.setAttribute("href", "home.html#contact")
				{
					const li = document.createElement("li")
					li.id = "navbar_li_contact"
					li.innerHTML = "Contact"

					contact.appendChild(li)
				}

				navbar_tabs.appendChild(home)
				navbar_tabs.appendChild(menu)
				navbar_tabs.appendChild(contact)
			}

			navbar_right.appendChild(navbar_tabs)
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

	if (HAS_NAVBAR)
		NavigationManager.createNavBar()
})