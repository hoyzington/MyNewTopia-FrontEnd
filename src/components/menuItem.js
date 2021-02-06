class MenuItem {
  constructor(element, htmlContent) {
    this.element = document.getElementById(element)
    this.htmlContent = htmlContent
    this.stat = false
    this.initBindingsAndEventListeners()
  }

  initBindingsAndEventListeners() {
    this.element.addEventListener('click', this.processClick.bind(this))
  }

  processClick() {
    this.onOffSwitch()
    this.highlight()
    this.showOrHide()
  }

  onOffSwitch() {

  }

  highlight() {

  }

  showOrHide() {

  }

}
