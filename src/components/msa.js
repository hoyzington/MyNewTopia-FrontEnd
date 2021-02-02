class Msa {
  constructor(json) {
    this.id = json.id
    this.code = json.code
    this.name = json.name
    this.states = json.states
    this.zone = json.zone
    this.pop = json.pop
    this.wage = json.wage
    this.unemp = json.unemp
    this.heat = json.heat
    this.cold = json.cold
    this.precip = json.precip
    this.snow = json.snow
    this.aqi = json.aqi
    this.initBindingsAndEventListeners()
  }

  static highlighted = document.getElementById('highlighted-msa')
  static map = document.getElementById('map')

  initBindingsAndEventListeners() {
    this.mapLoc = Msa.map.getElementById(this.code)
  }

  createLi() {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.className = 'list-item'
    btn.id = `msa-${this.code}`
    btn.innerHTML = `<b>${this.name}</b> (${this.states})`
    li.appendChild(btn)
    this.btnMouseover(btn)
    return li
  }

  btnMouseover(msaBtn) {
    msaBtn.addEventListener('mouseover', () => {
      Msa.highlighted.appendChild(this.mapLoc)
    })
    msaBtn.addEventListener('mouseout', () => {
      Msas.chosen.appendChild(this.mapLoc)
    })
  }

  addToMap() {
    if (this.mapLoc) {
      Msas.chosen.appendChild(this.mapLoc)
    } else {
      console.log(`Incorrect MSA code ${this.code} for ${this.name}`)
    }
    this.mapLocMouseover()
  }

  mapLocMouseover() {
    const id = `msa-${this.code}`
    const msaBtn = document.getElementById(id)
    // const title = mapLoc.removeChild(mapLoc.childNodes[-1])
    this.mapLoc.addEventListener('mouseover', () => {
      msaBtn.classList.add('highlighted')
    }, )
    this.mapLoc.addEventListener('mouseout', () => {
      msaBtn.classList.remove('highlighted')
    }, )
    // console.log(mapLoc.childNodes[-2])
  }
}
