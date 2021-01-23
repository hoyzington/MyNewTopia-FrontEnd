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
      
const heat = { name: 'heat', vals: {} },
      cold = { name: 'cold', vals: {} },
      precip = { name: 'precip', vals: {} },
      snow = { name: 'snow', vals: {} },
      wage = { name: 'wage', vals: {} },
      unemp = { name: 'unemp', vals: {} },
      aqi = { name: 'aqi', vals: {} };

const fHashes = [heat, cold, precip, snow, wage, unemp, aqi]

function activate(attrCtrl, inputHash) {
  attrCtrl.addEventListener('click', (e) => gatherInput(e, inputHash))
}

function gatherInput(e, inputHash) {
  const box = e.target
  if (inputHash.vals[box.id]) {
    delete inputHash.vals[box.id]
  } else {
    inputHash.vals[box.id] = box.value
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
const findBtns = document.getElementsByClassName('find')
for (const btn of findBtns) {
  btn.addEventListener('click', () => filterMsas())
}

function filterMsas() {
  msaCollection = msas
  fHashesLoop:
  for (const f of fHashes) {
    hash = f.vals
    hashKeys = Object.keys(hash)
    if (hashKeys.length > 0) {
      const filter = createFilter(hash)
      msaCollection = applyFilter(f, filter)
      if (checkIfEmpty(msaCollection)) {
        msaCollection = null
        break fHashesLoop
      }
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

function applyFilter(fHash, filter) {
  return msaCollection.filter((m) => {
    if (filter.length > 1) {
      return (m[fHash.name] >= filter[0]) && (m[fHash.name] <= filter[1])
    } else {
      return m.snow == filter[0]
    }
  }, filter)
}

function checkIfEmpty(collection) {
  if (collection.length == 0) {
    document.getElementById('metro-list').innerHTML = '<h3>No Matches</h3>'
    const chosen = document.getElementById('chosen-msas')
    resetMap(chosen)
    return true
  } else {
    return false
  }
}

function resetMap(chosen) {
  const not_chosen = document.getElementById('not-chosen-msas')
  while (chosen.hasChildNodes()) {
    not_chosen.appendChild(chosen.firstChild)
  }
}

function makeList(collection) {
  if (collection) {
    const ul = document.getElementById('metro-list')
    while (ul.hasChildNodes()) {  
      ul.removeChild(ul.firstChild)
    }
    for (const msa of collection) {
      let li = document.createElement('li')
      li.className = 'list-item'
      li.id = msa.code
      li.innerHTML = `<b>${msa.name}</b> (${msa.states})`
      ul.appendChild(li)
    }
    mapMsas(collection)
  }
}

function mapMsas(collection) {
  const svgObj = document.getElementById('map')
  const chosen = document.getElementById('chosen-msas')
  resetMap(chosen)
  for (const msa of collection) {
    let loc = svgObj.getElementById(msa.code)
    if (loc) {
      chosen.appendChild(loc)
    } else {
      console.log(`${msa.code} ${msa.name} was NOT found`)
    }
  }
}
