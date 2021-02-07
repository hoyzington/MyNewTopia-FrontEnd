class MenuItem {
  constructor(element, htmlContent) {
    this.element = document.getElementById(element)
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
    this.partner = MenuItem.all.find((item) => {
      return item.element != this.element
    })
    this.onOffSwitch()
    this.highlight()
    this.showOrHide()
  }

  onOffSwitch() {
    if (this.partner.stat) {
      this.partner.stat = !this.partner.stat
    }
    this.stat = !this.stat
  }

  highlight() {
    if (this.stat) {
      this.element.classList.add('menu-active')
      this.partner.element.classList.remove('menu-active')
    } else {
      this.element.classList.remove('menu-active')
    }
  }

  showOrHide() {
    const content = Menu.contentArea
    if (this.stat || this.partner.stat) {
      content.className = 'menu-active'
    } else {
      content.className = 'menu-inactive'
    }
    content.innerHTML = this.htmlContent
  }

}
