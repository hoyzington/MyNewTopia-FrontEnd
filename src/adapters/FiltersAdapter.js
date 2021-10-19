class FiltersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/';
  }

  saveObj(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    };
  }

  create(data, urlSuffix) {
    return fetch(this.baseUrl + urlSuffix, this.saveObj(data))
      .then(res => res.json())
      .catch(err => alert(err.message));
  }

  deleteObj() {
    return { method: 'DELETE' };
  }

  delete(urlSuffix) {
    return fetch(this.baseUrl + urlSuffix, this.deleteObj())
      .then(res => res.json())
      .catch(err => alert(err.message));
  }
}
