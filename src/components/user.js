class User {
  constructor(id, username, lists) {
    this.id = id
    this.username = username
    this.lists = []
    this.createLists(lists)
    User.all.push(this)
    sessionStorage.login = 'true'
    this.initBindingsAndEventListeners()
    this.beginUX()
  }

  static all = []

  initBindingsAndEventListeners() {
    this.acctArea = document.getElementById('menu-account')
  }

  createLists(lists) {
    if (lists) {
      for (const list of lists) {
        this.lists.push(new List(list))
      }
    }
  }

  beginUX() {
    if (sessionStorage.listMade == 'true') {
      Msas.createBtn('save')
    } else {
      document.getElementById('list-msg').remove()
    }
    document.getElementById('account').innerText = 'My Account'
    let myAccount = MenuItem.all[1]
    myAccount.name = 'myAccount'
    myAccount.htmlContent = HtmlItems.menuMyAccount
    myAccount.addHtmlContent()
    this.logout()
  }

  logout(e) {
    const logout = document.getElementById('logout')
    logout.addEventListener('click', () => {
      localStorage.clear()
      sessionStorage.clear()
      window.location.reload()
    })
  }
}
