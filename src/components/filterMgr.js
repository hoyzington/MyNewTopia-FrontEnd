class FilterMgr {
  constructor() {
    this.adapter = new FiltersAdapter
    this.currentFilter = new Filter
    this.initBindingsAndEventListeners()
    FilterMgr.all.push(this)
  }

  static all = []

  initBindingsAndEventListeners() {
    this.findBtns = document.getElementsByClassName('find')
    for (const btn of this.findBtns) {
      btn.addEventListener('click', () => this.currentFilter.processFind())
    }
  }

  saveFilter(name) {
    const filter = this.currentFilter
    filter.name = name
    filter.items = JSON.stringify(filter.items)
    filter.vals = JSON.stringify(filter.changedVals)
    const user = User.all[0]
    const urlSuffix = `users/${user.id}/filters`
    this.adapter.create(filter, urlSuffix)
      .then((APIFilter) => {
        filter = user.addFilter(APIFilter)
        filter.createBtn('delete')
        MenuItem.all[1].showFiltersArea()
      })
  }
}
