class App {
  constructor() {
    this.menu = new Menu
    this.msas = new Msas
    this.filter = new Filter
    this.initBindingsAndEventListeners()
  }

  static findBtns = document.getElementsByClassName('find')

  initBindingsAndEventListeners() {
    sessionStorage.setItem('login', 'false')
    sessionStorage.setItem('listMade', 'false')
    for (const btn of App.findBtns) {
      btn.addEventListener('click', () => this.filterMsas())
    }
  }

  filterMsas() {
    this.filter.prepFilterItems()
    this.msas.useFilter(this.filter)
  }

}
