class Filter {
  constructor(id=null, name=null, items=[], vals=null) {
    this.id = id
    this.name = name
    this.items = items
    this.made = false
    this.saved = false
    this.vals = vals
    this.changedVals = null
    this.createFilterBase()
  }

  static msaAttrs = ['heat', 'cold', 'precip', 'snow', 'wage', 'unemp', 'aqi']
  static defaultVals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  createFilterBase() {
    if (this.items.length == 0) {
      for (const attr of Filter.msaAttrs) {
        this.items.push(new FilterItem(attr, this.id))
      }
      this.vals = Filter.defaultVals
    } else {
      this.made = true
      this.saved = true
    }
  }

  processFind() {
    const filterChanged = this.changed()
    if (!(this.saved && !filterChanged)) {
      for (const filterItem of this.items) {
        filterItem.createHiLoVals()
      }
      const success = MsaMgr.all[0].use(this)
      if (filterChanged && success) {
        this.made = true
        if (sessionStorage.login == 'true') {
          this.createBtn('save')
      }
      }
    }
  }

  changed() {
    this.changedVals = this.makeState()
    if (this.valsDiff(this.vals, this.changedVals)) { 
      return true }
    this.changedVals = null
    return false
  }

  makeState() {
    const state = []
    for (const item of this.items) {
      for (let i = 0; i < item.valCount; i++) {
        if (item.vals[(i + 1)]) {
          state.push(1)
        } else {
          state.push(0)
        }
      }
    }
    return state
  }

  valsDiff(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
      if (array2[i] != array1[i]) {
        return true
      }
    }
    return false
  }

  createBtn(purpose) {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.id = purpose
    btn.classList.add('list-btn', 'blue')
    btn.innerHTML = purpose.slice(0, 1).toUpperCase() + purpose.slice(1)
    li.appendChild(btn)
    const btnArea = document.getElementById('save-btn-area')
    if (btnArea.hasChildNodes()) {
      btnArea.removeChild(btnArea.firstChild)
    }
    btnArea.appendChild(li)
    btn.addEventListener('click', (e) => this.processClick(e, purpose))
  }

  processClick(e, purpose) {
    e.preventDefault()
    if (purpose == 'save') {
      MenuItem.all[1].buildSaveForm()
    } else {
      FilterMgr.all[0].deleteFilter()
    }
  }

  logInEffect() {
    if (this.made && this.unique()) {
      this.createBtn('save')
    } else {
      const element = document.getElementById('intro')
      if (element) { element.remove() }
    }
  }

  unique() {
    for (const filter of User.all[0].filters) {
      if (!this.valsDiff(filter.vals, this.changedVals)) { return false }
    }
    return true
  }

  buildMenuLink() {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.classList.add('menu-btn', 'dark-blue')
    btn.id = `${this.id}`
    btn.innerHTML = `${this.name}`
    li.appendChild(btn)
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      document.getElementById('filter-form').reset()
      this.items.forEach((item) => {
        const formItem = document.getElementById(item.msaAttr)
        for (const key in item.vals) {
          formItem.querySelector(`input[id='${key}']`).checked = true
        }
      })
      FilterMgr.all[0].currentFilter = this
      MenuMgr.all[0].hideMenuContent()
      MsaMgr.all[0].use(this)
      this.createBtn('delete')
    })
    return li
  }
}
