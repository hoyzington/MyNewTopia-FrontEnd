class Filter {
  constructor() {
    this.items = []
    this.createFilterBase()
  }

  static msaAttrs = ['heat', 'cold', 'precip', 'snow', 'wage', 'unemp', 'aqi']

  createFilterBase() {
    for (const attr of Filter.msaAttrs) {
      this.items.push(new FilterItem(attr))
    }
  }

  prepFilterItems() {
    for (const filterItem of this.items) {
      filterItem.isolateHiLoVals()
    }
  }
}
