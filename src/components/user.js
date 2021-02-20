class User {
  constructor(id, username, filterObjs) {
    this.id = id
    this.username = username
    this.filters = []
    this.addFilters(filterObjs)
    User.all.push(this)
    this.initBindingsAndEventListeners()
    this.beginUX()
  }

  static all = []

  initBindingsAndEventListeners() {
    this.acctArea = document.getElementById('menu-account')
  }

  addFilters(filterObjs) {
    for (const obj of filterObjs) { this.addFilter(obj) }
  }

  addFilter(obj) {
    filter = new Filter(obj.id, obj.name, eval(obj.items), eval(obj.vals))
    this.filters.push(filter)
    return filter
  }

  beginUX() {
    sessionStorage.login = 'true'
    MenuItem.all[1].logInEffect()
    FilterMgr.all[0].currentFilter.logInEffect()
  }

  myAcctContent() {
    const filters = this.filters
    const listsArea = document.getElementById('menu-lists')
    if (filters.length == 0) {
      listsArea.innerHTML =
        `<h3>Welcome ${this.username}!</h3>
        <p>You can access your saved lists and maps from here after you save them.</p>`
    } else {
      const title = document.createElement('h3')
      title.innerText = `${this.username}'s Lists (${this.filters.length})`
      listsArea.appendChild(title)
      for (const filter of filters) {
        const listBtn = filter.buildMenuLink()
        listsArea.appendChild(listBtn)
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
