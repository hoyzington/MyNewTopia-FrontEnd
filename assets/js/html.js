class Html {

// Navbar Elements

  static get menuAbout() {
    return document.getElementById('about')
  }

  static get menuAccount() {
    return document.getElementById('account')
  }

  static get menuContent() {
    return document.getElementById('menu-content')
  }

// Checkbox Elements

  static get heatCtrl() {
    return document.getElementById('heat')
  }

  static get coldCtrl() {
    return document.getElementById('cold')
  }

  static get precipCtrl() {
    return document.getElementById('precip')
  }

  static get snowCtrl() {
    return document.getElementById('snow')
  }

  static get wageCtrl() {
    return document.getElementById('wage')
  }

  static get unempCtrl() {
    return document.getElementById('unemp')
  }

  static get aqiCtrl() {
    return document.getElementById('aqi')
  }

// SVG Elements

  static get svgObj() {
    return document.getElementById('map')
  }

  static get chosenMsas() {
    return document.getElementById('chosen-msas')
  }

  static get notChosenMsas() {
    return document.getElementById('not-chosen-msas')
  }

  static get highlightedMsa() {
    return document.getElementById('highlight-msa')
  }

// MSA List Elements

  static get findBtns() {
    return document.getElementsByClassName('find')
  }

  static get listContainer() {
    return document.getElementById('list-container')
  }

  static get listMsg() {
    return document.getElementById('list-msg')
  }
}
