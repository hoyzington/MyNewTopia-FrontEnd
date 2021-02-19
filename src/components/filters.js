class Filters {
  constructor() {
    // this.all = []
    this.adapter = new FiltersAdapter
    this.currentFilter = new Filter
    this.initBindingsAndEventListeners()
    Filters.all.push(this)
  }

  static all = []

  initBindingsAndEventListeners() {

  }

  finishNewFilter() {
    return this.currentFilter.prepFilterItems()
  }

  createBtn(purpose) {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.id = purpose
    btn.classList.add('list-btn', 'blue')
    btn.innerHTML = purpose.slice(0, 1).toUpperCase() + purpose.slice(1)
    li.appendChild(btn)
    Msas.listArea.prepend(li)
    btn.addEventListener('click', (e) => this.processClick(e, purpose))
  }

  processClick(e, purpose) {
    e.preventDefault()
    if (purpose == 'save') {
      this.getFilterName()
    } else {
      console.log('deleting')
    }
  }

  getFilterName() {
    const myAccount = MenuItem.all[1]
    myAccount.buildSaveForm()
    const saveBtn = document.getElementById('save-with-name')
    saveBtn.addEventListener('click', (e) => this.saveFilter(e, myAccount)) 
  }

  saveFilter(e, myAccount) {
    e.preventDefault()
    const name = document.getElementById('name').value
    if (name) {
      const filter = this.currentFilter
      const user = User.all[0]
      filter.name = name
      filter.items = JSON.stringify(filter.items)
      const urlSuffix = `users/${user.id}/filters`
      this.adapter.create(filter, urlSuffix)
        .then((APIFilter) => {
          filter.id = APIFilter.id
          user.filters.push(filter)
          myAccount.showFiltersArea()
        })
    } else {
      document.querySelector('#menu-account h3').className = 'alert'
    }
  }

}
