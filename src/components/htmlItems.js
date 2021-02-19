class HtmlItems {

  static get menuAbout() {
    return 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat eaque accusamus reiciendis nobis corrupti quidem dolorem, hic ducimus, minus, tenetur cupiditate tempore laudantium amet perspiciatis repellendus iusto vitae! Perferendis, harum. Quaerat, qui incidunt ex error deleniti repudiandae ducimus nulla perferendis libero laborum, consequuntur vitae doloribus eum veniam aperiam aut minima asperiores sunt.'
  }

  static get menuAccount() {
    return `
      <div id="menu-account">
        <h3>Log In / Sign Up to save the lists and maps you create!</h3>
        <form id="log-or-sign-in" action="">
          <div class="menu-inputs-row">
            <div class="col-33">
              <label for="username">Username</label>
            </div>
            <div class="col-48">
              <input type="text" id="username" name="username" autofocus="true">
            </div>
          </div>
          <div class="menu-inputs-row">
            <div class="col-33">
              <label for="password">Password</label>
            </div>
            <div class="col-48">
              <input type="text" id="password" name="password">
            </div>
          </div>
          <div id="submit-row">
            <button type="button" id="login" class="menu-submit-btn green">Log In</button>
            <button type="button" id="signup" class="menu-submit-btn green">Sign Up</button>
          </div>
        </form>
      </div>`
  }

  static get menuMyAccount() {
    return `
      <div id="menu-account">
        <div id="menu-lists"></div>
        <div id="submit-row">
          <button type="button" id="logout" class="menu-submit-btn green">Log Out</button>
        </div>
      </div>`
  }

  static get saveForm() {
    return `
      <div id="menu-account">
        <h3>Provide a name for this map and list</h3>
        <form id="add-name" action="">
          <div class="menu-inputs-row">
            <div class="col-20">
              <label for="name">Name</label>
            </div>
            <div class="col-60">
              <input type="text" id="name" name="name" autofocus="true">
            </div>
          </div>
          <div id="submit-row">
            <button type="button" id="save-with-name" class="menu-submit-btn green">Save</button>
          </div>
        </form>
      </div>`
  }
}
