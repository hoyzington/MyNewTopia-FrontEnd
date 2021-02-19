class App {
  constructor() {
    this.menu = new MenuMgr
    this.msas = new MsaMgr
    this.filters = new FilterMgr
    this.initBindingsAndEventListeners()
  }

  initBindingsAndEventListeners() {
    sessionStorage.setItem('login', 'false')
    sessionStorage.setItem('newFilter', 'false')
    this.findBtns = document.getElementsByClassName('find')
    for (const btn of this.findBtns) {
      btn.addEventListener('click', () => this.filterMsas())
    }
  }

  filterMsas() {
    const filter = this.filters.finishNewFilter()
    const success = this.msas.useFilter(filter)
    if (success == 'true') {
      if (sessionStorage.login == 'true') {
        if (sessionStorage.newFilter == 'true') {
          this.filters.createBtn('save')
        } else {
          this.filters.createBtn('delete')
        }
      }
    }
  }

}
