/* global User, UserMgr, HtmlItems, FilterMgr, MenuMgr */

class MenuItem {
  constructor(name, htmlContent) {
    this.name = name;
    this.element = document.getElementById(name);
    this.htmlContent = htmlContent;
    this.stat = false;
    MenuItem.all.push(this);
    this.initBindingsAndEventListeners();
  }

  static all = [];

  initBindingsAndEventListeners() {
    this.contentArea = document.getElementById('menu-content');
    this.element.addEventListener(
      'click', this.processMenuItemClick.bind(this),
    );
  }

  processMenuItemClick() {
    if (sessionStorage.msaAbout !== 'null') {
      this.stat = false;
    }
    const partner = MenuItem.all.find(item => item.name !== this.name);
    this.onOffSwitch(partner);
    this.highlight(partner);
    this.showOrHide();
    this.addHtmlContent();
  }

  onOffSwitch(partner) {
    if (partner.stat) {
      partner.stat = !partner.stat;
    }
    this.stat = !this.stat;
  }

  highlight(partner) {
    if (this.stat) {
      this.element.classList.add('menu-active');
      partner.element.classList.remove('menu-active');
    } else {
      this.element.classList.remove('menu-active');
    }
  }

  showOrHide() {
    if (this.stat) {
      this.contentArea.className = 'menu-active';
    } else {
      this.contentArea.className = 'menu-inactive';
    }
  }

  addHtmlContent() {
    this.contentArea.innerHTML = this.htmlContent;
    if (this.name === 'account') {
      const logOrSignIn = document.getElementById('submit-row');
      document.getElementById('username').focus();
      logOrSignIn.addEventListener('click', e => {
        e.preventDefault();
        const userMgr = new UserMgr(e);
      });
    } else if (this.name === 'myAccount') {
      User.all[0].myAcctContent();
    } else {
      this.htmlContent = HtmlItems.menuAbout;
    }
    sessionStorage.msaAbout = 'null';
  }

  logInEffect() {
    this.name = 'myAccount';
    this.element.innerText = 'My Account';
    this.showFiltersArea();
  }

  showFiltersArea() {
    this.htmlContent = HtmlItems.menuMyAccount;
    this.addHtmlContent();
  }

  buildSaveForm() {
    this.stat = true;
    this.element.classList.add('menu-active');
    this.contentArea.innerHTML = HtmlItems.menuSaveForm;
    this.contentArea.className = 'menu-active';
    const name = document.getElementById('name');
    name.focus();
    const saveBtn = document.getElementById('save-with-name');
    saveBtn.addEventListener('click', e => this.processFilterSaveClick(e, name));
  }

  processFilterSaveClick(e, name) {
    e.preventDefault();
    if (name.value) {
      FilterMgr.all[0].saveFilter(name.value);
    } else {
      document.querySelector('#menu-account h3').className = 'alert';
      document.getElementById('name').focus();
    }
  }

  show(msa) {
    if (sessionStorage.msaAbout === msa.code) {
      MenuMgr.all[0].hideMenuContent();
      sessionStorage.msaAbout = 'null';
    } else {
      this.stat = false;
      this.htmlContent = HtmlItems.msaDetails(msa);
      this.processMenuItemClick();
      sessionStorage.msaAbout = msa.code;
    }
  }
}
