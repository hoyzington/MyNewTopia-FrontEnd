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
  static listArea = document.getElementById('list-area')
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
    this.renderMsaList()
    return true
  }

  emptyListArea() {
    this.resetListArea()
    MsaMgr.listArea.innerHTML = HtmlItems.listNoMsas
    this.resetMap()
  }

  renderMsaList() {
    this.resetListArea()
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
