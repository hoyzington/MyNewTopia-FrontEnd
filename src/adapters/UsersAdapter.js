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
    console.log(this.configObj(userData))
    console.log(urlSuffix)
    // return fetch(this.baseUrl + urlSuffix, this.configObj(userData))
    //   .then(res => res.json())
    //   .then(obj => console.log(obj))
    //   .catch(err => alert(err.message))
  }
}
