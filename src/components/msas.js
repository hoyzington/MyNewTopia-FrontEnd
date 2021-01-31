class Msas {
  constructor() {
    this.msas = []
    this.adapter = new MsasAdapter
    // this.bindEventListeners()
    this.fetchAndLoadMsas()
  }

  fetchAndLoadMsas() {
    this.adapter.getMsas()
      .then(msas => console.log(msas))
  }
}
