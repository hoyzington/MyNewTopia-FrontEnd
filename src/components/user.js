class User {
  constructor(id, username, listCollection) {
    this.id = id
    this.username = username
    this.lists = listCollection
    User.all.push(this)
    sessionStorage.login = 'true'
    this.initBindingsAndEventListeners()
    this.beginUX()
  }

  static all = []

  initBindingsAndEventListeners() {
    this.acctArea = document.getElementById('menu-account')
  }

  beginUX() {
    MenuItem.all[1].logInEffect()
    if (sessionStorage.listMade = 'true') {
      // Lists.all[0].createBtn(filter)
    }
    this.logoutBtn()
  }

  logoutBtn(e) {
    const logout = document.getElementById('logout')
    logout.addEventListener('click', () => {
      localStorage.clear()
      sessionStorage.clear()
      window.location.reload()
    })
  }

  myAcctContent() {
    const lists = this.lists
    console.log(lists)
    const listsArea = document.getElementById('menu-lists')
    if (lists.length == 0) {
      listsArea.innerHTML =
        `<h3>Welcome ${this.username}!</h3>
        <p>You can access your saved lists and maps from here after you save them.</p>`
    } else {
      const title = document.createElement('h3')
      title.innerText = `${this.username}'s Lists`
      listsArea.appendChild(title)
      for (const list of lists) {
        list.buildMenuLink()
      }
    }
  }
}
