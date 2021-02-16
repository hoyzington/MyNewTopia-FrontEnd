class Filters {
  constructor() {
    this.all = []
    this.adapter = new FiltersAdapter
    this.currentFilter = new Filter
    this.initBindingsAndEventListeners()
    Filters.all.push(this)
  }

  static all = []

  initBindingsAndEventListeners() {

  }

  finishNewFilter() {
    // console.log(this.newFilter)
    return this.currentFilter.prepFilterItems()
  }

  // createFilters() {
  //   if (this.filters.length > 0) {
  //     for (const filter of filters) {
  //       this.all.push(new Filter(filter.id, filter.name, filter.choices))
  //     }

  //   }
  // }

  createBtn(purpose) {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.id = purpose
    btn.className = 'list-control'
    btn.innerHTML = purpose.slice(0, 1).toUpperCase() + purpose.slice(1)
    li.appendChild(btn)
    Msas.listArea.prepend(li)
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      if (purpose == 'save') {
        // const adapter = new ListsAdapter
        // const data = []
        // const urlSuffix = 'users/'
        // adapter.create(data, urlSuffix)
        //   .then(list => new List(list.id, list.name, list.choices))
        //   .then()
      } else {

      }
    })
  }

}
