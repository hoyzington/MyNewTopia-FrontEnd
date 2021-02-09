class HtmlItems {

  static get menuAbout() {
    return 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat eaque accusamus reiciendis nobis corrupti quidem dolorem, hic ducimus, minus, tenetur cupiditate tempore laudantium amet perspiciatis repellendus iusto vitae! Perferendis, harum. Quaerat, qui incidunt ex error deleniti repudiandae ducimus nulla perferendis libero laborum, consequuntur vitae doloribus eum veniam aperiam aut minima asperiores sunt.'
  }

  static get menuAccount() {
    return `
      <div id="menu-login">
        <h3>Log In / Sign Up to save the lists and maps you create!</h3>
        <form id="log-or-sign-in" action="">
          <div class="menu-inputs-row">
            <div class="col-25">
              <label for="username">Username</label>
            </div>
            <div class="col-75">
              <input type="text" id="username" name="username" autofocus="true">
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
            <input type="submit" id="login" class="menu-submit" value="Log In">
            <input type="submit" id="signup" class="menu-submit" value="Sign Up">
          </div>
        </form>
      </div>`
  }

  static get menuLists() {
    return ``
  }
}
