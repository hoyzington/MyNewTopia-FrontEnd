class MsasAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/metro-areas"
  }

  fetchMsas() {
    return fetch(this.baseUrl)
      .then(res => res.json())
  }
}
