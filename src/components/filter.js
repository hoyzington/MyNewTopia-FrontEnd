/* global FilterChoice, MsaMgr, User, MenuItem, FilterMgr, MenuMgr */

const msaAttrs = ['heat', 'cold', 'precip', 'snow', 'wage', 'unemp', 'aqi'];

class Filter {
  constructor(id = null, name = null, choices = []) {
    this.id = id;
    this.name = name;
    this.choices = choices;
    this.made = false;
    this.saved = false;
  }

  createFilterChoices() {
    if (this.choices.length === 0) {
      for (const attr of msaAttrs) {
        this.choices.push(new FilterChoice(attr));
      }
    } else {
      this.choices = this.choices.map(choice => new FilterChoice(
        choice.msaAttr, choice.vals, choice.savedVals, choice.hiLoVals,
      ));
      this.made = true;
      this.saved = true;
    }
  }

  addElements() {
    this.choices.forEach(choice => choice.addElement());
  }

  reset() {
    this.id = null;
    this.name = null;
    this.made = false;
    this.saved = false;
    this.choices.forEach(choice => choice.reset());
  }

  processFind() {
    const changed = this.changed();
    if (changed) {
      for (const choice of this.choices) {
        choice.createHiLoVals();
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
    for (const choice of this.choices) {
      if (FilterChoice.different(choice.vals, choice.savedVals)) {
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
    for (let i = 0; i < 7; i++) { // Every filter has 7 choices
      for (const key in this.choices[i].vals) {
        if (!filter.choices[i].vals[key]) {
          return false;
        }
      }
      for (const key in filter.choices[i].vals) {
        if (!this.choices[i].vals[key]) {
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
      filter.choices.forEach(choice => choice.reset());
      filter.made = true;
      filter.saved = true;
      this.choices.forEach((choice, i) => {
        const formchoice = document.getElementById(choice.msaAttr);
        for (const key in choice.savedVals) {
          if ({}.hasOwnProperty.call(choice.savedVals, key)) {
            formchoice.querySelector(`input[id='${key}']`).checked = true;
          }
        }
        filter.choices[i].vals = {...choice.vals};
        filter.choices[i].savedVals = {...choice.savedVals};
        filter.choices[i].hiLoVals.push(...choice.hiLoVals);
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
    this.choices.forEach(choice => choice.unsave());
    this.saved = false;
    this.createBtn('save');
  }
}
