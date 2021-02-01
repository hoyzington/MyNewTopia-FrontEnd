class Msas {
  constructor() {
    this.all = []
    this.adapter = new MsasAdapter
    this.initBindingsAndEventListeners()
    this.getAll()
  }

  initBindingsAndEventListeners() {
    this.listContainer = document.getElementById('list-container')
  }

  getAll() {
    this.adapter
      .fetchMsas()
      .then(msas => {
        msas.forEach(msa => this.all.push(new Msa(msa)))
      })
      .then(() => this.renderList())
  }

  renderList() {
    const container = this.listContainer
    if (this.all) {
      this.clearListSection(container)
      for (const msa of this.all) {
        const li = document.createElement('li')
        const btn = document.createElement('button')
        btn.className = 'list-item'
        btn.id = `msa-${msa.code}`
        btn.innerHTML = `<b>${msa.name}</b> (${msa.states})`
        li.appendChild(btn)
        container.appendChild(li)
        EventListener.listItemMouseover(btn, msa.code)
      }
      this.mapMsas()
    }
  }

  clearListSection(list) {
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild)
    }
  }

  mapMsas() {
    this.resetMap(Html.chosenMsas)
    for (const msa of this.all) {
      const mapLoc = Html.svgObj.getElementById(msa.code)
      if (mapLoc) {
        Html.chosenMsas.appendChild(mapLoc)
      } else {
        console.log(`${msa.code} ${msa.name} was NOT found`)
      }
      const id = `msa-${msa.code}`
      EventListener.mapMsaMouseover(mapLoc, id)
    }
  }

  resetMap(chosenMsas) {
    while (chosenMsas.hasChildNodes()) {
      Html.notChosenMsas.appendChild(chosenMsas.firstChild)
    }
  }

}
