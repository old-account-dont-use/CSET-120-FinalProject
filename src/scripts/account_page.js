let AccountPage = new Map()

AccountPage.ENTRY_MODE_NEW = 1
AccountPage.ENTRY_MODE_EXISTING = 2
AccountPage.ENTRY_MODE_FORGOT = 3

/*
*   Gets the text corresponding to the entry mode
*/
AccountPage.getEntryText = (mode) =>
{
    switch(mode)
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
*   Sets up the form corresponding to the entry mode
*/
AccountPage.setupEntryForm = (form, mode) =>
{
	const email = document.createElement("h4")
	email.innerHTML = "Email Address"

	const email_input = document.createElement("input")
	email_input.id = "account_entry_email"
	{
		email_input.setAttribute("type", "text")
		email_input.setAttribute("placeholder", "Enter your email address")
		email_input.setAttribute("required", true)
	}

	form.appendChild(email)
	form.appendChild(email_input)

	switch(mode)
	{
		default:
		case AccountPage.ENTRY_MODE_NEW:
        case AccountPage.ENTRY_MODE_EXISTING:
        {
			const password = document.createElement("h4")
			password.innerHTML = "Password"

			const password_input = document.createElement("input")
			password_input.id = "account_entry_password"
			{
				password_input.setAttribute("type", "password")
				password_input.setAttribute("minlength", 8)
				password_input.setAttribute("maxlength", 255)
				password_input.setAttribute("placeholder", "Enter your desired password")
				password_input.setAttribute("required", true)
			}

			form.appendChild(password)
			form.appendChild(password_input)

			if (mode == AccountPage.ENTRY_MODE_NEW)
			{
				const password_input_confirm = document.createElement("input")
				password_input_confirm.id = "account_entry_password_confirm"
				{
					password_input_confirm.setAttribute("type", "password")
					password_input_confirm.setAttribute("minlength", 8)
					password_input_confirm.setAttribute("maxlength", 255)
					password_input_confirm.setAttribute("placeholder", "Confirm your password")
					password_input_confirm.setAttribute("required", true)
				}
				form.appendChild(password_input_confirm)
			}

			break
		}

        case AccountPage.ENTRY_MODE_FORGOT:
        {
			break
		}
	}

	const submit = document.createElement("input")
	submit.id = "account_entry_submit"
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
    {
        const panel = document.createElement("div")
        panel.id = "account_entry"
        {
            const title = document.createElement("h1")
            title.id = "account_entry_title"
            title.innerHTML = AccountPage.getEntryText(mode)

            const form = document.createElement("form")
            form.id = "account_entry_form"
            form.setAttribute("onsubmit", "") // TODO: On form submit action
            AccountPage.setupEntryForm(form, mode)

            panel.appendChild(title)
            panel.appendChild(form)
        }

        container.appendChild(panel)
    }

    return container
}

///////////////////////////////////////////////////////////////////////////////
Helper.hookEvent(window, "load", false, () =>
{
    if (AccountManager.g_bLoggedIn === undefined) // Login process not yet completed
        return false

    if (AccountManager.g_bLoggedIn)
    {
        // Show normal account page
    }
    else
    {
        const entryPanel = AccountPage.createEntryPanel(AccountPage.ENTRY_MODE_EXISTING)
        document.body.appendChild(entryPanel)
    }
})