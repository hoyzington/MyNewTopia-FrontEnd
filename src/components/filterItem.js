class FilterItem {
  constructor(attr, vals = {}, savedVals = {}, hiLoVals = []) {
    this.msaAttr = attr;
    this.vals = vals;
    this.savedVals = savedVals;
    this.hiLoVals = hiLoVals;
  }

  static different(obj1, obj2) {
    for (const key in obj1) {
      if (!obj2[key]) {
        return true;
      }
    }
    for (const key in obj2) {
      if (!obj1[key]) {
        return true;
      }
    }
    return false;
  }

  addElement() {
    this.element = document.getElementById(this.msaAttr);
    this.element.addEventListener('change', e => this.checkboxToggle(e));
  }

  checkboxToggle(e) {
    if (this.vals[e.target.id]) {
      delete this.vals[e.target.id];
    } else {
      this.vals[e.target.id] = e.target.value;
    }
  }

  createHiLoVals() {
    const valsHash = this.vals;
    const valsHashKeys = Object.keys(valsHash);
    if (valsHashKeys.length > 0) {
      const valsArray = Object.values(valsHash).join(',')
        .split(',').map(valu => parseFloat(valu));
      if (valsArray.length > 1) {
        valsArray.sort((a, b) => a - b).splice(1, (valsArray.length - 2));
      }
      this.hiLoVals = valsArray;
    } else {
      this.hiLoVals = [];
    }
  }

  save() {
    this.savedVals = {...this.vals};
  }

  unsave() {
    this.savedVals = {};
  }

  reset() {
    this.vals = {};
    this.savedVals = {};
    this.hiLoVals = [];
  }
}
