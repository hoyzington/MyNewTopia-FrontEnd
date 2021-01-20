const endPoint = 'http://localhost:3000/api/v1/metro-areas'

function mapMsas(json) {
  const svgObj = document.getElementById('map')
  const chosen = document.getElementById('chosen-msas')
  const not_chosen = document.getElementById('not-chosen-msas')
  if (chosen.children.length > 0) {
    for (const msa of chosen) {
      not_chosen.appendChild(msa)
    }
  }
  for (const msa of json) {
    let loc = svgObj.getElementById(msa.msa_code)
    if (loc) {
      chosen.appendChild(loc)
    } else {
      console.log(`${msa.msa_code} ${msa.name} was NOT found`)
    }
  }
}

function makeList(json) {
  for (const msa of json) {
    let ul = document.getElementById('metro-list')
    let li = document.createElement('li')
    li.className = 'list-item'
    li.id = msa.msa_code
    li.innerHTML = `<b>${msa.name}</b> (${msa.states})`
    ul.appendChild(li)
  }
  mapMsas(json)
}

function getMsas() {
  fetch(endPoint)
    .then(res => res.json())
    .then(json => makeList(json))
}

getMsas()
