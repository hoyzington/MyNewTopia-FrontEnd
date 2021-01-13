const endPoint = 'http://localhost:3000/api/v1/metro-areas'

function mapMsas(json) {
  console.log('Hello??')
  const svgObj = document.getElementById('map')
  if (svgObj) {
    console.log('got svg')
  } else {
    console.log("didn't get svg")
  }
  // const prev_msas = document.getElementsByClassName('chosen')
  // if (prev_msas.length > 0) {
  //   for (const msa of prev_msas) {
  //     msa.className = 'prev_chosen'
  //   }
  // }
  const chosen = document.getElementById('chosen-msas')
  const not_chosen = document.getElementById('not-chosen-msas')
  for (const msa of json) {
    let loc = svgObj.getElementById(`MSA_${msa.msa_code}`)
    if (loc) {
      console.log(loc)
      chosen.appendChild(loc)
    } else {
      console.log(`${msa.msa_code} ${msa.name} was NOT found`)
    }
  }
}

function makeList(json) {
  for (const msa of json) {
    let list = document.getElementById('metro-list')
    let div = document.createElement('div')
    let card = document.createElement('div')
    card.className = 'list-item'
    card.id = msa.msa_code
    card.innerHTML = `<b>${msa.name}</b> (${msa.states})`
    div.appendChild(card)
    list.appendChild(div)
  }
  mapMsas(json)
}

function getMsas() {
  fetch(endPoint)
    .then(res => res.json())
    .then(json => makeList(json))
    // .then(json => mapMsas(json))
}

getMsas()
