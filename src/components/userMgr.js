/* global UsersAdapter, User, MenuMgr */

class UserMgr {
  constructor(e) {
    this.event = e;
    this.all = [];
    this.adapter = new UsersAdapter();
    this.processSubmit();
  }

  processSubmit() {
    let urlSuffix = 'signup';
    if (this.event.target.innerText === 'Log In') {
      urlSuffix = 'login';
    }
    const userData = this.packageFormData();
    this.adapter.create(userData, urlSuffix)
      .then(user => {
        if (user.errors) {
          MenuMgr.all[0].handleAccountErrors(user.errors);
        } else {
          const newUser = new User(user.id, user.username, user.filters)
        }
      });
  }

  packageFormData() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return { user: { username, password }};
  }
}
