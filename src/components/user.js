class User {
  constructor(id, username, filterCollection) {
    this.id = id
    this.username = username
    this.filters = filterCollection
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
    if (sessionStorage.newFilter == 'true') {
      Filters.all[0].createBtn('save')
    } else {
      document.getElementById('list-msg').remove()
    }
  }

  myAcctContent() {
    const filters = this.filters
    // console.log(filters)
    const listsArea = document.getElementById('menu-lists')
    if (filters.length == 0) {
      listsArea.innerHTML =
        `<h3>Welcome ${this.username}!</h3>
        <p>You can access your saved lists and maps from here after you save them.</p>`
    } else {
      const title = document.createElement('h3')
      title.innerText = `${this.username}'s Lists`
      listsArea.appendChild(title)
      for (const filter of filters) {
        filter.buildMenuLink()
      }
    }
    this.logoutBtn()
  }

  logoutBtn() {
    const logout = document.getElementById('logout')
    logout.addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.clear()
      sessionStorage.clear()
      window.location.reload()
    })
  }
}
