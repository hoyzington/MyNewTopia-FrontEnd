class FiltersAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/"
  }

  configObj(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
  }

  create(data, urlSuffix) {
    return fetch(this.baseUrl + urlSuffix, this.configObj(data))
      .then(res => res.json())
      .catch(err => alert(err.message))
  }
}
