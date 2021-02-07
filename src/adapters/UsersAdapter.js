class UsersAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/"
  }

  fetchUser() {
    return fetch(this.baseUrl)
      .then(res => res.json())
  }
}
