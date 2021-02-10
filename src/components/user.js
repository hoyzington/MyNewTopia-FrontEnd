class User {
  constructor(id, username, lists) {
    this.id = id
    this.username = username
    this.lists = []
    this.createLists(lists)
    User.all.push(this)
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
    // console.log(this)
    document.getElementById('list-msg').remove()
    document.getElementById('account').innerText = 'My Account'
    let myAccount = MenuItem.all[1]
    myAccount.name = 'myAccount'
    myAccount.htmlContent = HtmlItems.menuMyAccount
    myAccount.addHtmlContent()
  }
}
