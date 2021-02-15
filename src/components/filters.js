class Lists {
  constructor() {
    this.all = []
    this.adapter = new ListsAdapter
    // this.initBindingsAndEventListeners()
    this.createLists()
  }

  static all = []

  createLists() {
    if (this.lists.length > 0) {
      for (const list of lists) {
        this.all.push(new List(list.id, list.name, list.demands))
      }

    }
  }

  createBtn(filter) {
    if (sessionStorage.listMade == 'true') {
      this.lists.createBtn('save')
    } else {
      document.getElementById('list-msg').remove()
    }
  
      let purpose = null
    if (sessionStorage.listMade == 'true') {
      purpose = 'save'
    } else {
      purpose = 'delete'
    }
    const btn = document.createElement('button')
    btn.id = purpose
    btn.innerHTML = purpose.slice(0, 1).toUpperCase() + purpose.slice(1)
    Msas.listArea.prepend(btn)
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      if (purpose == 'save') {
        const adapter = new ListsAdapter
        const data = []
        const urlSuffix = 'users/'
        adapter.create(data, urlSuffix)
          .then(list => new List(list.id, list.name, list.demands))
          .then()
      } else {

      }
    })
  }

}
