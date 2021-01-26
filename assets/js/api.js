class ApiAdapter {
  static get(url) {
    return fetch("http://localhost:3000/api/v1" + url)
      .then(r => r.json())
  }
}
