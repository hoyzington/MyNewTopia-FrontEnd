class MsasAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/metro-areas"
  }

  getMsas() {
    return fetch(this.baseUrl)
      .then(r => r.json())
  }
}
