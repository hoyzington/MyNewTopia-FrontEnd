class MsaMgr {
  constructor() {
    this.all = []
    this.filtered = []
    this.adapter = new MsasAdapter
    // this.initBindingsAndEventListeners()
    MsaMgr.all.push(this)
    this.getAll()
  }

  static all = []
  static listArea = document.getElementById('list-container')
  static noMsasMsg = "<div id='list-msg'><h1>No Matches</h1><h2>None of the 100 most populated metropolitan areas in the USA meet the criteria you selected.</h2></div>"
  static chosen = document.getElementById('chosen-msas')
  static notChosen = document.getElementById('not-chosen-msas')

  // initBindingsAndEventListeners() {

  // }

  getAll() {
    this.adapter
      .fetchAll()
      .then(msas => {
        msas.forEach(msa => this.all.push(new Msa(msa)))
      })
  }

  use(filter) {
    this.filtered = this.all
    for (const fItem of filter.items) {
      this.filtered = this.filtered.filter((msa) => msa.msaUseFilter(fItem))
      if (this.filtered.length == 0) {
        this.emptyListArea()
        return false
      }
    }
    this.renderMsaList(filter)
    return true
  }

  emptyListArea() {
    this.resetListArea()
    MsaMgr.listArea.innerHTML = MsaMgr.noMsasMsg
    this.resetMap()
  }

  renderMsaList(filter) {
    this.resetListArea()
    if (sessionStorage.login == 'true') {
      // Filters.all[0].createBtn(filter)
    }
    for (const msa of this.filtered) {
      const li = msa.createLi()
      MsaMgr.listArea.appendChild(li)
    }
    this.addMsasToMap()
  }

  resetListArea() {
    const list = MsaMgr.listArea
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild)
    }
  }

  addMsasToMap() {
    this.resetMap()
    for (const msa of this.filtered) {
      msa.addToMap()
    }
  }

  resetMap() {
    while (MsaMgr.chosen.hasChildNodes()) {
      MsaMgr.notChosen.appendChild(MsaMgr.chosen.firstChild)
    }
  }
}
