class FilterItem {
  constructor(attr, filterId) {
    this.msaAttr = attr
    this.element = document.getElementById(attr)
    this.vals = {}
    this.valCount = this.getValCount()
    this.filterId = filterId
    this.initBindingsAndEventListeners()
  }

  initBindingsAndEventListeners() {
    this.element.addEventListener('click', (e) => {
      this.checkboxToggle(e)
    })
  }

  getValCount() {
    if (this.msaAttr == 'unemp') {
      return 3
    } else {
      return 4
    }
  }

  checkboxToggle(e) {
    if (this['vals'][e.target.id]) {
      delete this['vals'][e.target.id]
    } else {
      this['vals'][e.target.id] = e.target.value
    }
  }

  createHiLoVals() {
    const valsHash = this.vals
    const valsHashKeys = Object.keys(valsHash)
    if (valsHashKeys.length > 0) {
      let valsArray = Object.values(valsHash).join(',')
        .split(',').map(valu => parseFloat(valu))
      if (valsArray.length > 1) {
        valsArray.sort((a, b) => a - b).splice(1, (valsArray.length - 2))
      }
      this.hiLoVals = valsArray
    } else {
      this.hiLoVals = []
    }
  }
}
