class MsasAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/metro-areas';
  }

  fetchAll() {
    return fetch(this.baseUrl)
      .then(res => res.json());
  }
}
