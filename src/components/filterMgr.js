/* global User, MenuItem, Filter, MsaMgr, FiltersAdapter */

class FilterMgr {
  constructor() {
    this.adapter = new FiltersAdapter();
    this.currentFilter = new Filter();
    this.currentFilter.createFilterChoices();
    this.currentFilter.addElements();
    this.initBindingsAndEventListeners();
    FilterMgr.all.push(this);
  }

  static all = [];

  initBindingsAndEventListeners() {
    this.findBtns = document.getElementsByClassName('find');
    for (const btn of this.findBtns) {
      btn.addEventListener('click', () => this.currentFilter.processFind());
    }
    const clearBtns = document.getElementsByClassName('clear');
    for (const btn of clearBtns) {
      btn.addEventListener('click', () => this.processClear());
    }
  }

  processClear() {
    MsaMgr.all[0].resetMap();
    MsaMgr.all[0].resetListArea();
    document.getElementById('filter-form').reset();
    this.currentFilter.reset();
  }

  saveFilter(name) {
    const filter = this.currentFilter;
    filter.choices.forEach(choice => choice.save());
    const filterToSave = new Filter(null, name);
    filterToSave.choices = JSON.stringify(filter.choices);
    const user = User.all[0];
    const urlSuffix = `users/${user.id}/filters`;
    this.adapter.create(filterToSave, urlSuffix)
      .then(json => {
        user.addFilter(json);
        filter.id = json.id;
        filter.saved = true;
        filter.createBtn('delete');
        MenuItem.all[1].showFiltersArea();
      });
  }

  deleteFilter() {
    const user = User.all[0];
    const filter = this.currentFilter;
    const urlSuffix = `filters/${filter.id}`;
    this.adapter.delete(urlSuffix)
      .then(deleted => {
        user.filters = user.filters.filter(f => f.id !== deleted.id);
        filter.backToPreSave();
      });
  }
}
