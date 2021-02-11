class UsersAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/"
  }

  configObj(userData) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    }
  }

  loginOrCreateUser(urlSuffix, userData) {
    return fetch(this.baseUrl + urlSuffix, this.configObj(userData))
      .then(res => res.json())
      .catch(err => alert(err.message))
  }
}
