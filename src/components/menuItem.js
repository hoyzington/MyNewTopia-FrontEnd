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
    this.addHtmlContent()
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
  }

  addHtmlContent() {
    Menu.contentArea.innerHTML = this.htmlContent
    if (this.name == 'account') {
      const logOrSignIn = document.getElementById('submit-row')
      logOrSignIn.addEventListener('click', (e) => {
        e.preventDefault()
        new Users(e)
      })
    } else if (this.name == 'myAccount') {
      User.all[0].myAcctContent()
    }
  }

  logInEffect() {
    this.name = 'myAccount'
    this.element.innerText = 'My Account'
    this.showFiltersArea()
  }

  showFiltersArea() {
    this.htmlContent = HtmlItems.menuMyAccount
    this.addHtmlContent()
  }

  buildSaveForm() {
    this.stat = true
    this.element.classList.add('menu-active')
    Menu.contentArea.innerHTML = HtmlItems.saveForm
    Menu.contentArea.className = 'menu-active'
  }

}
