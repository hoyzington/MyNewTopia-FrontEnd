/* global MsasAdapter, Msa, HtmlItems,  */

const listArea = document.getElementById('list-area'),
      notChosen = document.getElementById('not-chosen-msas');

class MsaMgr {
  constructor() {
    this.all = [];
    this.filtered = [];
    this.adapter = new MsasAdapter();
    MsaMgr.all.push(this);
    this.getAll();
  }

  static all = [];

  static chosen = document.getElementById('chosen-msas');

  getAll() {
    this.adapter
      .fetchAll()
      .then(msas => {
        msas.forEach(msa => this.all.push(new Msa(msa)));
      });
  }

  use(filter) {
    this.filtered = this.all;
    for (const fChoice of filter.choices) {
      this.filtered = this.filtered.filter(msa => msa.msaUseFilter(fChoice));
      if (this.filtered.length === 0) {
        this.emptyListArea();
        return false;
      }
    }
    this.renderMsaList();
    return true;
  }

  emptyListArea() {
    this.resetListArea();
    listArea.innerHTML = HtmlItems.listNoMsas;
    this.resetMap();
  }

  renderMsaList() {
    this.resetListArea();
    for (const msa of this.filtered) {
      const li = msa.createLi();
      listArea.appendChild(li);
    }
    this.addMsasToMap();
  }

  resetListArea() {
    const list = listArea;
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    const btnArea = document.getElementById('save-btn-area');
    while (btnArea.hasChildNodes()) {
      btnArea.removeChild(btnArea.firstChild);
    }
  }

  addMsasToMap() {
    this.resetMap();
    for (const msa of this.filtered) {
      msa.addToMap();
    }
  }

  resetMap() {
    while (MsaMgr.chosen.hasChildNodes()) {
      notChosen.appendChild(MsaMgr.chosen.firstChild);
    }
  }
}
