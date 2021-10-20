/* global Filter, MenuItem, FilterMgr, HtmlItems */

class User {
  constructor(id, username, filterObjs) {
    this.id = id;
    this.username = username;
    this.filters = [];
    this.addFilters(filterObjs);
    User.all.push(this);
    this.initBindingsAndEventListeners();
    this.beginUX();
  }

  static all = [];

  initBindingsAndEventListeners() {
    this.acctArea = document.getElementById('menu-account');
  }

  addFilters(filterObjs) {
    for (const obj of filterObjs) {
      this.addFilter(obj);
    }
  }

  addFilter(obj) {
    const unstringify = eval;
    const filter = new Filter(obj.id, obj.name, unstringify(obj.choices));
    filter.createFilterChoices();
    this.filters.push(filter);
    // return filter;
  }

  beginUX() {
    sessionStorage.login = 'true';
    MenuItem.all[1].logInEffect();
    FilterMgr.all[0].currentFilter.logInEffect();
  }

  myAcctContent() {
    const { filters } = this;
    const listsArea = document.getElementById('menu-lists');
    if (filters.length === 0) {
      listsArea.innerHTML = HtmlItems.menuWelcome(this.username);
    } else {
      const title = document.createElement('h3');
      title.innerText = `${this.username}'s Lists (${filters.length})`;
      listsArea.appendChild(title);
      for (const filter of filters) {
        const listBtn = filter.buildMenuLink();
        listsArea.appendChild(listBtn);
      }
    }
    this.logoutBtn();
  }

  logoutBtn() {
    const logout = document.getElementById('logout');
    logout.addEventListener('click', e => {
      e.preventDefault();
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    });
  }
}
