class Msas {
  constructor() {
    this.all = []
    this.filtered = []
    this.adapter = new MsasAdapter
    // this.initBindingsAndEventListeners()
    this.getAll()
  }

  static list = document.getElementById('list-container')
  static noMsasMsg = "<div id='list-msg'><h1>No Matches</h1><h2>None of the 100 most populated metropolitan areas in the USA meet the criteria you selected.</h2></div>"
  static chosen = document.getElementById('chosen-msas')
  static notChosen = document.getElementById('not-chosen-msas')

  static createBtn(purpose) {
    const btn = document.createElement('button')
    btn.id = purpose
    btn.innerHTML = purpose.slice(0, 1).toUpperCase() + purpose.slice(1)
    Msas.list.prepend(btn)
  }

  // initBindingsAndEventListeners() {

  // }

  getAll() {
    this.adapter
      .fetchMsas()
      .then(msas => {
        msas.forEach(msa => this.all.push(new Msa(msa)))
      })
  }

  useFilter(filter) {
    this.filtered = this.all
    filterItemsLoop:
    for (const fItem of filter.items) {
      this.filtered = this.filtered.filter((msa) => msa.msaUseFilter(fItem))
      if (this.filtered.length == 0) {
        this.emptyList()
        break filterItemsLoop
      }
    }
    this.renderMsaList()
  }

  emptyList() {
    this.resetList()
    Msas.list.innerHTML = Msas.noMsasMsg
    this.resetMap()
  }

  renderMsaList() {
    if (this.filtered.length > 0) {
      this.resetList()
      sessionStorage.listMade = 'true'
      if (sessionStorage.login == 'true') {
        this.createBtn('save')
      }
      for (const msa of this.filtered) {
        const li = msa.createLi()
        Msas.list.appendChild(li)
      }
      this.addMsasToMap()
    }
  }

  resetList() {
    sessionStorage.listMade = 'false'
    const list = Msas.list
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
