class Users {
  constructor(e) {
    this.event = e
    this.all = []
    this.adapter = new UsersAdapter
    // this.initBindingsAndEventListeners()
    this.processSubmit()
  }

  static all = []

  processSubmit() {
    let urlSuffix = 'signup'
    if (this.event.target.value == 'Log In') {
      urlSuffix = 'login'
    }
    const userData = this.packageFormData()
    this.adapter.create(userData, urlSuffix)
      .then((user) => {
        if (user.message) {
          Menu.handleAccountError(user.message)
        } else {
          new User(user.id, user.username, user.filters)
        }
      })
  }

  packageFormData() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    return { user: { username, password }}
  }
}
