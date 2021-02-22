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
    let filter = this.currentFilter
    filter.name = name
    filter.items = JSON.stringify(filter.items)
    filter.vals = JSON.stringify(filter.changedVals)
    const user = User.all[0]
    const urlSuffix = `users/${user.id}/filters`
    this.adapter.create(filter, urlSuffix)
      .then((APIFilter) => {
        this.currentFilter = user.addFilter(APIFilter)
        // console.log(user.filters)
        filter.createBtn('delete')
        MenuItem.all[1].showFiltersArea()
      })
  }

  deleteFilter() {
    const user = User.all[0]
    const filter = this.currentFilter
    const urlSuffix = `filters/${filter.id}`
    this.adapter.delete(urlSuffix)
      .then((deleted) => {
        // console.log(deleted)
        // console.log(`displayed filter: ${filter.id}`)
        // console.log(user.filters)
        user.filters = user.filters.filter((f) => {
          return f.id != deleted.id
        })
        // console.log(user.filters)
        filter.id = null
        filter.name = null
        filter.saved = false
        filter.createBtn('save')
      })
  }
}
