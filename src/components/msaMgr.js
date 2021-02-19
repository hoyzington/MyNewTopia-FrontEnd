class MsaMgr {
  constructor() {
    this.all = []
    this.filtered = []
    this.adapter = new MsasAdapter
    // this.initBindingsAndEventListeners()
    this.getAll()
  }

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

  useFilter(filter) {
    this.filtered = this.all
    for (const fItem of filter.items) {
      this.filtered = this.filtered.filter((msa) => msa.msaUseFilter(fItem))
      if (this.filtered.length == 0) {
        return this.emptyListArea()
      }
    }
    sessionStorage.newFilter = 'true'
    this.renderMsaList(filter)
    return 'true'
  }

  emptyListArea() {
    this.resetListArea()
    sessionStorage.newFilter = 'false'
    Msas.listArea.innerHTML = Msas.noMsasMsg
    this.resetMap()
  }

  renderMsaList(filter) {
    this.resetListArea()
    if (sessionStorage.login == 'true') {
      // Filters.all[0].createBtn(filter)
    }
    for (const msa of this.filtered) {
      const li = msa.createLi()
      Msas.listArea.appendChild(li)
    }
    this.addMsasToMap()
  }

  resetListArea() {
    const list = Msas.listArea
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
    while (Msas.chosen.hasChildNodes()) {
      Msas.notChosen.appendChild(Msas.chosen.firstChild)
    }
  }
}
