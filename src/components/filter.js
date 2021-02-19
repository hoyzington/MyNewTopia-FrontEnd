class Filter {
  constructor(id=null, name=null, items=[]) {
    this.id = id
    this.name = name
    this.items = items
    this.mgr = FilterMgr.all[0]
    this.createFilterBase()
  }

  static msaAttrs = ['heat', 'cold', 'precip', 'snow', 'wage', 'unemp', 'aqi']

  createFilterBase() {
    if (this.items.length == 0) {
      for (const attr of Filter.msaAttrs) {
        this.items.push(new FilterItem(attr, this))
      }
    }
  }

  prepFilterItems() {
    for (const filterItem of this.items) {
      filterItem.createHiLoVals()
    }
    return this
  }

  buildMenuLink() {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.classList.add('menu-btn', 'dark-blue')
    btn.id = `${this.id}`
    btn.innerHTML = `${this.name}`
    li.appendChild(btn)
    return li
  }
}
