class Menu {
  constructor() {
    this.items = []
    this.menuItemArgs = [
      ['about', HtmlItems.menuAbout],
      ['account', HtmlItems.menuAccount]
    ]
    this.createMenuItems()
    this.initBindingsAndEventListeners()
  }

  static contentArea = document.getElementById('menu-content')

  static handleAccountError(message) {
    const inputs = document.querySelectorAll("header input[type='text']")
    for (const input of inputs) {
      input.value = ''
    }
    const msg = document.createElement('div')
    msg.className = 'alert'
    msg.innerHTML = `<h3>${message}</h3>`
    Menu.contentArea.prepend(msg)
  }
  
  initBindingsAndEventListeners() {
    document.addEventListener('click', (e) => this.clickOff(e), true)
  }

  createMenuItems() {
    for (const mItemArg of this.menuItemArgs) {
      this.items.push(new MenuItem(...mItemArg))
    }
  }

  clickOff(e) {
    const inElement = (Menu.contentArea.contains(e.target) || this.items[0].element.contains(e.target) || this.items[1].element.contains(e.target))
    if (!inElement) { this.hideMenuContent() }
  }

  hideMenuContent() {
    for (const item of this.items) {
      item.element.classList.remove('menu-active')
      item.stat = false
    }
    Menu.contentArea.className = 'menu-inactive'
  }
}
