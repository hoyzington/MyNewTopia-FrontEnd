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

  initBindingsAndEventListeners() {
    document.addEventListener('click', (e) => this.clickOff(e))
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
