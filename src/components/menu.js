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

  initBindingsAndEventListeners() {
    this.contentArea = document.getElementById('menu-content')
    document.addEventListener('click', (e) => this.ClickOff.bind(this))
  }

  createMenuItems() {
    for (const mItemArg of this.menuItemArgs) {
      this.items.push(new menuItem(mItemArg))
    }
  }

ClickOff() {
    const inElement = (this.contentArea.contains(e.target) || this.items[0]['element'].contains(e.target) || this.items[1]['element'].contains(e.target))
    if (!inElement) { hideMenuContent() }
  }

  hideMenuContent() {
    for (const item of this.items) {
      item['element'].classList.remove('menu-active')
    }
    this.contentArea.className = 'menu-inactive'
  }
}
