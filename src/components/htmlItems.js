class HtmlItems {

// Menu Bar Elements

  static get menuAbout() {
    return document.getElementById('about')
  }

  static get menuAccount() {
    return document.getElementById('account')
  }

  static get menuContent() {
    return document.getElementById('menu-content')
  }

// Menu Item Content

static get aboutContent() {
  return 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat eaque accusamus reiciendis nobis corrupti quidem dolorem, hic ducimus, minus, tenetur cupiditate tempore laudantium amet perspiciatis repellendus iusto vitae! Perferendis, harum. Quaerat, qui incidunt ex error deleniti repudiandae ducimus nulla perferendis libero laborum, consequuntur vitae doloribus eum veniam aperiam aut minima asperiores sunt.'
}

static get accountContent() {
  return `
    <div id="menu-login">
      <h3>Sign up / Log in to save the lists and maps you create!</h3>
      <form action="">
        <div class="menu-inputs-row">
          <div class="col-25">
            <label for="username">Username</label>
          </div>
          <div class="col-75">
            <input type="text" id="username" name="username">
          </div>
        </div>
        <div class="menu-inputs-row">
          <div class="col-25">
            <label for="password">Password</label>
          </div>
          <div class="col-75">
            <input type="text" id="password" name="password">
          </div>
        </div>
        <div class="submit-row">
          <input type="submit" id="menu-submit" value="Submit">
        </div>
      </form>
    </div>`
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

  static get findBtns() {
    return document.getElementsByClassName('find')
  }
}