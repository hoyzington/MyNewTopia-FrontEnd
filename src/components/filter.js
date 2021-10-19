/* global FilterItem, MsaItem, MsaMgr, User, MenuItem, FilterMgr, MenuMgr */

const msaAttrs = ['heat', 'cold', 'precip', 'snow', 'wage', 'unemp', 'aqi'];

class Filter {
  constructor(id = null, name = null, items = []) {
    this.id = id;
    this.name = name;
    this.items = items;
    this.made = false;
    this.saved = false;
  }

  createFilterItems() {
    if (this.items.length === 0) {
      for (const attr of msaAttrs) {
        this.items.push(new FilterItem(attr));
      }
    } else {
      this.items = this.items.map(item => new FilterItem(
        item.msaAttr, item.vals, item.savedVals, item.hiLoVals,
      ));
      this.made = true;
      this.saved = true;
    }
  }

  addElements() {
    this.items.forEach(item => item.addElement());
  }

  reset() {
    this.id = null;
    this.name = null;
    this.made = false;
    this.saved = false;
    this.items.forEach(item => item.reset());
  }

  processFind() {
    const changed = this.changed();
    if (changed) {
      for (const item of this.items) {
        item.createHiLoVals();
      }
    }
    const success = MsaMgr.all[0].use(this);
    if (success && changed) {
      this.made = true;
      if ((sessionStorage.login === 'true') && (this.unique())) {
        this.createBtn('save');
      }
    }
  }

  changed() {
    for (const item of this.items) {
      if (FilterItem.different(item.vals, item.savedVals)) {
        return true;
      }
    }
    return false;
  }

  unique() {
    const { filters } = User.all[0];
    if (filters.length > 0) {
      for (const filter of filters) {
        if (this.identicalTo(filter)) {
          return false;
        }
      }
    }
    return true;
  }

  identicalTo(filter) {
    for (let i = 0; i < 7; i++) { // Every filter has 7 items
      for (const key in this.items[i].vals) {
        if (!filter.items[i].vals[key]) {
          return false;
        }
      }
      for (const key in filter.items[i].vals) {
        if (!this.items[i].vals[key]) {
          return false;
        }
      }
    }
    return true;
  }

  createBtn(purpose) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.id = purpose;
    btn.classList.add('list-btn', 'blue');
    btn.innerHTML = purpose.slice(0, 1).toUpperCase() + purpose.slice(1);
    li.appendChild(btn);
    const btnArea = document.getElementById('save-btn-area');
    if (btnArea.hasChildNodes()) {
      btnArea.removeChild(btnArea.firstChild);
    }
    btnArea.appendChild(li);
    btn.addEventListener('click', e => this.processClick(e, purpose));
  }

  processClick(e, purpose) {
    e.preventDefault();
    if (purpose === 'save') {
      MenuItem.all[1].buildSaveForm();
    } else {
      FilterMgr.all[0].deleteFilter();
    }
  }

  logInEffect() {
    if (this.made && this.unique()) {
      this.createBtn('save');
    } else {
      const element = document.getElementById('intro');
      if (element) {
        element.remove();
      }
    }
  }

  buildMenuLink() {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add('menu-btn', 'dark-blue');
    btn.id = `${this.id}`;
    btn.innerHTML = `${this.name}`;
    li.appendChild(btn);
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('filter-form').reset();
      const filter = FilterMgr.all[0].currentFilter;
      filter.id = this.id;
      filter.items.forEach(item => item.reset());
      filter.made = true;
      filter.saved = true;
      this.items.forEach((item, i) => {
        const formItem = document.getElementById(item.msaAttr);
        for (const key in item.savedVals) {
          if ({}.hasOwnProperty.call(item.savedVals, key)) {
            formItem.querySelector(`input[id='${key}']`).checked = true;
          }
        }
        filter.items[i].vals = {...item.vals};
        filter.items[i].savedVals = {...item.savedVals};
        filter.items[i].hiLoVals.push(...item.hiLoVals);
      });
      MenuMgr.all[0].hideMenuContent();
      MsaMgr.all[0].use(FilterMgr.all[0].currentFilter);
      FilterMgr.all[0].currentFilter.createBtn('delete');
    });
    return li;
  }

  backToPreSave() {
    this.id = null;
    this.name = null;
    this.items.forEach(item => item.unsave());
    this.saved = false;
    this.createBtn('save');
  }
}
