class FilterItem {
  constructor(attr) {
    this.msaAttr = attr
    this.element = document.getElementById(attr)
    this.vals = {}
    this.initBindingsAndEventListeners()
  }

  initBindingsAndEventListeners() {
    this.element.addEventListener('click', (e) => {
      this.checkboxToggle(e)
    })
  }

  checkboxToggle(e) {
    if (this['vals'][e.target.id]) {
      delete this['vals'][e.target.id]
    } else {
      this['vals'][e.target.id] = e.target.value
    }
  }

  isolateHiLoVals() {
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
