class App {
  constructor() {
    this.menuMgr = new MenuMgr
    this.msaMgr = new MsaMgr
    this.filterMgr = new FilterMgr
    this.initBindingsAndEventListeners()
  }

  initBindingsAndEventListeners() {
    sessionStorage.setItem('login', 'false')
  }
}
