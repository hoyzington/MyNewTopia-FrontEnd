class Msas {
  constructor() {
    this.all = []
    this.adapter = new MsasAdapter
    // this.initBindingsAndEventListeners()
    this.getAll()
  }

  static list = document.getElementById('list-container')
  static listMsg = document.getElementById('list-msg')
  static listNoMsasMsg = '<h1>No Matches</h1><h2>None of the 100 most populated metropolitan areas in the USA meet the criteria you selected.</h2>'
  static chosen = document.getElementById('chosen-msas')
  static notChosen = document.getElementById('not-chosen-msas')

  // initBindingsAndEventListeners() {

  // }

  getAll() {
    this.adapter
      .fetchMsas()
      .then(msas => {
        msas.forEach(msa => this.all.push(new Msa(msa)))
      })
      .then(() => this.renderMsaList())
  }

  renderMsaList() {
    if (this.all) {
      this.resetList()
      for (const msa of this.all) {
        const li = msa.createLi()
        Msas.list.appendChild(li)
      }
      this.addMsasToMap()
    }
  }

  resetList() {
    const list = Msas.list
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild)
    }
  }

  addMsasToMap() {
    this.resetMap()
    for (const msa of this.all) {
      msa.addToMap()
    }
  }

  resetMap() {
    while (Msas.chosen.hasChildNodes()) {
      Msas.notChosen.appendChild(Msas.chosen.firstChild)
    }
  }
}
