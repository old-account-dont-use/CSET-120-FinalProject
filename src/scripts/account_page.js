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
            {

            }

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