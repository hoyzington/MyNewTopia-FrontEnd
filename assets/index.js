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

function activate(attrCtrl, inputHash) {
  attrCtrl.addEventListener('click', (e) => gatherInput(e, inputHash))
}

function gatherInput(e, inputHash) {
  let box = e.target
  if (inputHash[box.id]) {
    delete inputHash[box.id]
  } else {
    inputHash[box.id] = box.value
  }
}

activate(heatCtrl, heat)
activate(coldCtrl, cold)
activate(precipCtrl, precip)
activate(snowCtrl, snow)
activate(wageCtrl, wage)
activate(unempCtrl, unemp)
activate(aqiCtrl, aqi)

// make or update list & map when "Find" button is clicked

let msaCollection = null
const findBtn = document.getElementById('find')
findBtn.addEventListener('click', () => filterMsas())

function filterMsas() {
  const filterHashes = [heat, cold, precip, snow, wage, unemp, aqi]
  msaCollection = msas
  for (const f of filterHashes) {
    if (Object.keys(f).length > 0) {
      const filter = createFilter(f)
      msaCollection = applyFilter(filter)
      checkIfEmpty(msaCollection)
    }
  }
  makeList(msaCollection)
}

function createFilter(hash) {
  filterArray = Object.values(hash).join(',').split(',')
  filter = filterArray.map(item => parseFloat(item))
  if (filter.length > 1) {
    filter.sort((a, b) => a - b).splice(1, (filter.length - 2))
  }
  return filter
}

function applyFilter(filter) {
  return msaCollection.filter((m) => {
    if (filter.length > 1) {
      return (m.heat > filter[0]) && (m.heat < filter[1])
    } else {
      return m.snow == filter[0]
    }
  }, filter)
}

function checkIfEmpty(collection) {
  if (collection.length == 0) {
    document.getElementById('metro-list').innerHTML = '<h3>No Matches</h3>'
    return
  }
}

function makeList(collection) {
  for (const msa of collection) {
    let ul = document.getElementById('metro-list')
    let li = document.createElement('li')
    li.className = 'list-item'
    li.id = msa.code
    li.innerHTML = `<b>${msa.name}</b> (${msa.states})`
    ul.appendChild(li)
  }
  mapMsas(collection)
}

function mapMsas(collection) {
  const svgObj = document.getElementById('map')
  const chosen = document.getElementById('chosen-msas')
  const not_chosen = document.getElementById('not-chosen-msas')
  if (chosen.children.length > 0) {
    for (const msa of chosen.children) {
      not_chosen.appendChild(msa)
    }
  }
  for (const msa of collection) {
    let loc = svgObj.getElementById(msa.code)
    if (loc) {
      chosen.appendChild(loc)
    } else {
      console.log(`${msa.code} ${msa.name} was NOT found`)
    }
  }
}
