class MenuMgr {
  constructor() {
    this.items = []
    this.initBindingsAndEventListeners()
    MenuMgr.all.push(this)
    this.createMenuItems()
  }

  static all = []

  initBindingsAndEventListeners() {
    this.contentArea = document.getElementById('menu-content')
    document.addEventListener('click', (e) => this.clickOff(e), true)
  }

  createMenuItems() {
    const menuItemArgs = [
      ['about', HtmlItems.menuAbout],
      ['account', HtmlItems.menuAccount]
    ]
    for (const mItemArg of menuItemArgs) {
      this.items.push(new MenuItem(...mItemArg))
    }
  }

  clickOff(e) {
    if (e.target.classList.contains('msa-btn') || e.target.parentNode.classList.contains('msa-btn')) {
      return
    } else {
      const inElement = (this.contentArea.contains(e.target) || this.items[0].element.contains(e.target) || this.items[1].element.contains(e.target))
      if (!inElement) { this.hideMenuContent() }
    }
  }

  hideMenuContent() {
    for (const item of this.items) {
      item.element.classList.remove('menu-active')
      item.stat = false
    }
    this.contentArea.className = 'menu-inactive'
    sessionStorage.msaAbout = 'null'
  }

  handleAccountError(message) {
    const inputs = document.querySelectorAll("header input[type='text']")
    for (const input of inputs) {
      input.value = ''
    }
    const msg = document.createElement('div')
    msg.className = 'alert'
    msg.innerHTML = `<h3>${message}</h3>`
    this.contentArea.prepend(msg)
    document.getElementById('username').focus()
  }
}
