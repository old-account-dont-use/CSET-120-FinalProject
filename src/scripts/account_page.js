let AccountPage = new Map()

/*
*
*	Entry page
*
*/
AccountPage.ENTRY_MODE_NEW = 1
AccountPage.ENTRY_MODE_EXISTING = 2
AccountPage.ENTRY_MODE_FORGOT = 3

/*
*	Handles the submit
*/
AccountPage.onEntrySubmit = () =>
{
	const form = document.getElementById("account_entry_form")
	if (!form) return true

	const mode = form.m_EntryMode
	if (!mode) return true

	const email_input = document.getElementById("account_entry_email")
	if (!email_input) return true

	const email = email_input.value

	const accountData = AccountManager.lookupAccount(email)
	if (!accountData && mode != AccountPage.ENTRY_MODE_NEW)
	{
		alert(`Account ${email} not found`)
		return false
	}

	switch (mode)
	{
		default:
		case AccountPage.ENTRY_MODE_NEW:
		{
			if (accountData)
			{
				alert(`Account with email ${email} already exists`)
				return false
			}

			const password_input = document.getElementById("account_entry_password")
			if (!password_input) break

			const password_input_confirm = document.getElementById("account_entry_password_confirm")
			if (!password_input_confirm) break

			const password = Helper.hash(password_input.value)
			const password_confirm = Helper.hash(password_input_confirm.value)

			if (password !== password_confirm)
			{
				alert("Passwords don't match")
				return false
			}

			if (AccountManager.signUpHashed(email, password) && AccountManager.loginHashed(email, password))
				alert("Account created")
			else
				alert("Failed to create account (???)")

			break
		}

		case AccountPage.ENTRY_MODE_EXISTING:
		{
			const password_input = document.getElementById("account_entry_password")
			if (!password_input) break

			if (!AccountManager.loginHashed(email, Helper.hash(password_input.value)))
			{
				alert("Failed to log in")
				return false
			}
			else
				alert("Welcome back")

			break
		}

		case AccountPage.ENTRY_MODE_FORGOT:
		{
			if (AccountManager.resetAccountPassword(email))
				alert("Password reset to '12345678'")
			else
				alert("Failed to update password (???)")

			break
		}
	}

	return true
}

/*
*   Gets the text corresponding to the entry mode
*/
AccountPage.getEntryText = (mode) =>
{
	switch (mode)
	{
		default:
		case AccountPage.ENTRY_MODE_NEW:
			return "Sign up"

		case AccountPage.ENTRY_MODE_EXISTING:
			return "Login"

		case AccountPage.ENTRY_MODE_FORGOT:
			return "Forgot Password"
	}
}

/*
*   Creates a sub text
*/
AccountPage.createSubText = (preText, linkText, mode, secondary) =>
{
	const subText = document.createElement("p")
	subText.id = secondary ? "account_entry_subtext_2" : "account_entry_subtext"
	{
		subText.innerHTML = preText

		const a = document.createElement("a")
		a.classList.add("account_entry_subtext_link")
		a.m_SetupMode = mode
		{
			a.onclick = (event) =>
			{
				AccountPage.setupEntryPanel(event.target.m_SetupMode)
			}

			a.innerHTML = linkText
		}

		subText.appendChild(a)
	}

	return subText
}

/*
*   Sets up the form corresponding to the entry mode
*/
AccountPage.setupEntryForm = (form, mode) =>
{
	form.m_EntryMode = mode

	const email = document.createElement("h4")
	email.innerHTML = "Email Address"

	const email_input = document.createElement("input")
	email_input.id = "account_entry_email"
	email_input.classList.add("glass_morphism_weak")
	{
		email_input.setAttribute("type", "text")
		email_input.setAttribute("placeholder", "Enter your email address")
		email_input.setAttribute("required", true)
	}

	form.appendChild(email)
	form.appendChild(email_input)

	switch (mode)
	{
		default:
		case AccountPage.ENTRY_MODE_NEW:
		case AccountPage.ENTRY_MODE_EXISTING:
		{
			const password = document.createElement("h4")
			password.innerHTML = "Password"

			const password_input = document.createElement("input")
			password_input.id = "account_entry_password"
			password_input.classList.add("glass_morphism_weak")
			{
				password_input.setAttribute("type", "password")
				password_input.setAttribute("minlength", 8)
				password_input.setAttribute("maxlength", 255)
				password_input.setAttribute("placeholder", "Enter your password")
				password_input.setAttribute("required", true)
			}

			form.appendChild(password)
			form.appendChild(password_input)

			if (mode == AccountPage.ENTRY_MODE_NEW)
			{
				const password_input_confirm = document.createElement("input")
				password_input_confirm.id = "account_entry_password_confirm"
				password_input_confirm.classList.add("glass_morphism_weak")
				{
					password_input_confirm.setAttribute("type", "password")
					password_input_confirm.setAttribute("minlength", 8)
					password_input_confirm.setAttribute("maxlength", 255)
					password_input_confirm.setAttribute("placeholder", "Confirm your password")
					password_input_confirm.setAttribute("required", true)
				}
				form.appendChild(password_input_confirm)
			}

			const preText = mode == AccountPage.ENTRY_MODE_NEW ? "Already have an account? " : "Don't remember your password? "
			const linkText = mode == AccountPage.ENTRY_MODE_NEW ? "Login" : "Forgot Password"
			const subMode = mode == AccountPage.ENTRY_MODE_NEW ? AccountPage.ENTRY_MODE_EXISTING : AccountPage.ENTRY_MODE_FORGOT
			const subText = AccountPage.createSubText(preText, linkText, subMode, false)

			form.appendChild(subText)

			if (mode == AccountPage.ENTRY_MODE_EXISTING)
			{
				const secondaryText = AccountPage.createSubText("Don't have an account? ", "Sign Up", AccountPage.ENTRY_MODE_NEW, true)
				form.appendChild(secondaryText)
			}

			break
		}

		case AccountPage.ENTRY_MODE_FORGOT:
		{
			const subText = AccountPage.createSubText("Already have an account? ", "Login", AccountPage.ENTRY_MODE_EXISTING, false)
			const secondaryText = AccountPage.createSubText("Don't have an account? ", "Sign Up", AccountPage.ENTRY_MODE_NEW, true)

			form.appendChild(secondaryText)
			form.appendChild(subText)

			break
		}
	}

	const submit = document.createElement("input")
	submit.id = "account_entry_submit"
	submit.classList.add("glass_morphism_weak")
	{
		submit.setAttribute("type", "submit")
		submit.setAttribute("value", AccountPage.getEntryText(mode))
	}
	form.appendChild(submit)
}

/*
*   Create the sign up / login / forgot password page
*/
AccountPage.createEntryPanel = (mode) =>
{
	const container = document.createElement("div")
	container.id = "account_entry_container"
	container.classList.add("page_container")
	{
		const panel = document.createElement("div")
		panel.id = "account_entry"
		panel.classList.add("glass_morphism_weak")
		{
			const title = document.createElement("h1")
			title.id = "account_entry_title"
			title.innerHTML = AccountPage.getEntryText(mode)

			const form = document.createElement("form")
			form.id = "account_entry_form"
			form.setAttribute("onsubmit", "return AccountPage.onEntrySubmit()")
			AccountPage.setupEntryForm(form, mode)

			panel.appendChild(title)
			panel.appendChild(form)
		}

		container.appendChild(panel)
	}

	return container
}

/*
*   Delete the sign up / login / forgot password page
*/
AccountPage.deleteEntryPanel = () =>
{
	const container = document.getElementById("account_entry_container")
	if (container)
	{
		container.remove()
	}
}

/*
*   Setup the sign up / login / forgot password page
*/
AccountPage.setupEntryPanel = (mode) =>
{
	AccountPage.deleteEntryPanel()

	const entryPanel = AccountPage.createEntryPanel(mode)
	document.body.appendChild(entryPanel)
}

/*
*
*	Account page
*
*/

/*
*	Sets up a specific page
*/
AccountPage.setupPage = (name) =>
{
	switch (name)
	{
		default:
		case "Account":
		{
			const subbers = Array.from(document.querySelectorAll(".account_page_account_information p"))

			for (const subber of subbers)
			{
				if (subber.getAttribute("setup"))
				{
					eval(`var setup = () => { ${subber.getAttribute("setup")} }`)
					subber.innerHTML = setup()

					continue
				}

				if (!subber.getAttribute("index")) continue
				subber.innerHTML = AccountManager.g_AccountData[subber.getAttribute("index")]
			}

			break
		}
	}
}

/*
*	Shows a specific page
*/
AccountPage.showPage = (name) =>
{
	const pages = Array.from(document.querySelectorAll(".account_page"))

	for (const page of pages)
	{
		const active = page.getAttribute("tabname") == name
		page.setAttribute("active", active)

		if (active)
			AccountPage.setupPage(name)
	}
}

/*
*	Sets up the sidebar
*/
AccountPage.setupAccountSidebar = (container, SIDEBAR_PROPERTIES) =>
{
	const sidebar = document.createElement("div")
	sidebar.id = "account_page_sidebar"
	sidebar.classList.add("glass_morphism")
	{
		for (const property of SIDEBAR_PROPERTIES)
		{
			const button = document.createElement("button")
			button.m_SectionName = property
			button.innerHTML = property
			{
				button.classList.add("account_page_sidebar_link")
				button.classList.add("account_page_button")
				button.classList.add("glass_morphism_weak")

				button.onclick = (event) =>
				{
					AccountPage.showPage(event.target.m_SectionName)
				}
			}
			sidebar.appendChild(button)
		}
	}

	container.appendChild(sidebar)
	AccountPage.showPage(SIDEBAR_PROPERTIES[0])
}

/*
*	Sets up the view that will be seen when logged in
*/
AccountPage.setupAccountPage = (SIDEBAR_PROPERTIES) =>
{
	if (!SIDEBAR_PROPERTIES)
		throw new Error("SIDEBAR_PROPERTIES not defined")

	const container = document.createElement("div")
	container.id = "account_page_container"
	container.classList.add("page_container")

	AccountPage.setupAccountSidebar(container, SIDEBAR_PROPERTIES)

	const pages = Array.from(document.querySelectorAll(".account_page"))
	for (const page of pages)
		container.appendChild(page)

	document.body.appendChild(container)
}

/*
*
*	Page stuff
*
*/

/*
*	Creates order history elements
*/
AccountPage.loadOrderHistory = () =>
{
	const account_page_orders = document.getElementById("account_page_orders")
	if (!account_page_orders) return

	const body = document.getElementById("account_page_orders_table_body")
	if (!body) return

	body.innerHTML = ""

	const orderHistory = [ "" ]//AccountManager.g_AccountData.orderHistory
	if (orderHistory.length < 1) return

	for (const order of orderHistory)
	{
		const tr = document.createElement("tr")
		{
			const id = document.createElement("td")
			id.innerHTML = order.id

			const date = document.createElement("td")
			date.innerHTML = "1234"

			const items = document.createElement("td")
			items.innerHTML = order.items.join(", ")

			const amount = document.createElement("td")
			amount.innerHTML = `$${Helper.priceify(order.amount)}`

			tr.appendChild(id)
			tr.appendChild(date)
			tr.appendChild(items)
			tr.appendChild(amount)
		}
		body.appendChild(tr)
	}
}

///////////////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
	if (AccountManager.g_bLoggedIn === undefined) // Login process not yet completed
		return false

	if (AccountManager.g_bLoggedIn)
		AccountPage.setupAccountPage(SIDEBAR_PROPERTIES)
	else
		AccountPage.setupEntryPanel(AccountPage.ENTRY_MODE_EXISTING)
})