class Filter {
  constructor() {
    this.items = []
    // this.adapter = new FilterAdapter
    this.createFilterBase()
    // this.initBindingsAndEventListeners()
  }

  static msaAttrs = ['heat', 'cold', 'precip', 'snow', 'wage', 'unemp', 'aqi']

  // initBindingsAndEventListeners() {

  // }

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