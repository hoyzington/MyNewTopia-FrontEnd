// Fetch metro area data

const endPoint = 'http://localhost:3000/api/v1/metro-areas'

let msas = null

function getMsas() {
  fetch(endPoint)
    .then(res => res.json())
    .then(json => msas = json)
}

getMsas()

// Add event listeners to filter form

const heatCtrl = document.getElementById('heat'),
      coldCtrl = document.getElementById('cold'),
      precipCtrl = document.getElementById('precip'),
      snowCtrl = document.getElementById('snow'),
      wageCtrl = document.getElementById('wage'),
      unempCtrl = document.getElementById('unemp'),
      aqiCtrl = document.getElementById('aqi');
      
let heat = {}, cold = {}, precip = {}, snow = {}, wage = {}, unemp = {}, aqi = {};

function activate(attrCtrl, attrHash) {
  attrCtrl.addEventListener('click', (e) => gatherInput(e, attrHash))
}

function gatherInput(e, attrHash) {
  let box = e.target
    if (attrHash[box.id]) {
      delete attrHash[box.id]
    } else {
      attrHash[box.id] = box.value
    }
    console.log(attrHash)
}

activate(heatCtrl, heat)
activate(coldCtrl, cold)
activate(precipCtrl, precip)
activate(snowCtrl, snow)
activate(wageCtrl, wage)
activate(unempCtrl, unemp)
activate(aqiCtrl, aqi)

// make or update list & map when "Find" button is clicked

const findBtn = document.getElementById('find')
findBtn.addEventListener('click', () => filterMsas())

function filterMsas() {
  const filters = [heat, cold, precip, snow, wage, unemp, aqi]
  for (const f of filters) {
    filter = createFilter(f)
    applyFilter(filter)
  }
}

function createFilter(hash) {
  if (Object.keys(hash).length > 0) {
    filterArray = Object.values(hash).join(',').split(',')
    filter = filterArray.map(item => parseFloat(item))
    if (filter.length > 1) {
      filter.sort((a, b) => a - b).splice(1, (filter.length - 2))
    }
  }
}

function applyFilter(filter) {
  
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
