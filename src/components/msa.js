class Msa {
  constructor(json) {
    this.id = json.id
    this.code = json.code
    this.name = json.name
    this.states = json.states
    this.zone = json.zone
    this.pop = json.pop
    this.wage = json.wage
    this.unemp = json.unemp
    this.heat = json.heat
    this.cold = json.cold
    this.precip = json.precip
    this.snow = json.snow
    this.aqi = json.aqi
  }
}
