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
  static logOrSignIn = null

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
      const logOrSignIn = document.getElementById('log-or-sign-in')
      logOrSignIn.addEventListener('click', (e) => {
        e.preventDefault()
        this.processSubmit(e)
      })
    }
  }

  processSubmit(e) {
    const adapter = new UsersAdapter
    const userData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }
    let urlSuffix = ''
    if (e.target.value == 'Log In') {
      urlSuffix = 'login'
    }
    adapter.loginOrCreateUser(urlSuffix, userData)
  }
}
