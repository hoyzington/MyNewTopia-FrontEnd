class MenuItem {
  constructor(name, htmlContent) {
    this.name = name
    this.element = document.getElementById(name)
    this.htmlContent = htmlContent
    this.stat = false
    MenuItem.all.push(this)
    this.initBindingsAndEventListeners()
  }

  static all = []
  // static logOrSignIn = null

  initBindingsAndEventListeners() {
    this.element.addEventListener('click', this.processClick.bind(this))
  }

  processClick() {
    const partner = MenuItem.all.find((item) => {
      return item.name != this.name
    })
    this.onOffSwitch(partner)
    this.highlight(partner)
    this.showOrHide()
  }

  onOffSwitch(partner) {
    if (partner.stat) {
      partner.stat = !partner.stat
    }
    this.stat = !this.stat
  }

  highlight(partner) {
    if (this.stat) {
      this.element.classList.add('menu-active')
      partner.element.classList.remove('menu-active')
    } else {
      this.element.classList.remove('menu-active')
    }
  }

  showOrHide() {
    if (this.stat) {
      Menu.contentArea.className = 'menu-active'
    } else {
      Menu.contentArea.className = 'menu-inactive'
    }
    this.addHtmlContent()
  }

  addHtmlContent() {
    Menu.contentArea.innerHTML = this.htmlContent
    if (this.name == 'account') {
      const logOrSignIn = document.getElementById('submit-row')
      logOrSignIn.addEventListener('click', (e) => {
        e.preventDefault()
        this.processSubmit(e)
      })
    } else if (this.name == 'myAccount') {
      this.myAcctContent()
    }
  }

  processSubmit(e) {
    const adapter = new UsersAdapter
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const userData = { user: { username, password }}
    let urlSuffix = 'signup'
    if (e.target.value == 'Log In') {
      urlSuffix = 'login'
    }
    adapter.loginOrCreateUser(urlSuffix, userData)
      .then((user) => {
        new User(user.id, user.username)
      })
  }

  myAcctContent() {
    const user = User.all[0]
    const listsArea = document.getElementById('menu-lists')
    if (user.lists.length == 0) {
      listsArea.innerHTML =
        `<h3>Welcome ${user.username}!</h3>
        <p>You can access your saved lists and maps from here after you save them.</p>`
    } else {
      listsArea.appendChild(
        `<h3>${user.username}'s Lists</h3>`
      )
      // const lists = user.lists
      // for (const list of lists) {
        
      // }
    }
  }

}
