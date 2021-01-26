// Fetch metro area data

let msas = null

function getMsas() {
  ApiAdapter.get('/metro-areas')
    .then(json => msas = json)
}

getMsas()

// Add event listeners to navbar

EventListener.menuItems()

// Add event listeners to filter form

const heat = { name: 'heat', vals: {} },
      cold = { name: 'cold', vals: {} },
      precip = { name: 'precip', vals: {} },
      snow = { name: 'snow', vals: {} },
      wage = { name: 'wage', vals: {} },
      unemp = { name: 'unemp', vals: {} },
      aqi = { name: 'aqi', vals: {} };

const fHashes = [heat, cold, precip, snow, wage, unemp, aqi]

function activate(attrCtrl, inputHash) {
  attrCtrl.addEventListener('click', (e) => addOrReplaceInput(e, inputHash))
}

function addOrReplaceInput(e, input) {
  if (input.vals[e.target.id]) {
    delete input.vals[e.target.id]
  } else {
    input.vals[e.target.id] = e.target.value
  }
}

activate(Html.heatCtrl, heat)
activate(Html.coldCtrl, cold)
activate(Html.precipCtrl, precip)
activate(Html.snowCtrl, snow)
activate(Html.wageCtrl, wage)
activate(Html.unempCtrl, unemp)
activate(Html.aqiCtrl, aqi)

// make or update list & map when "Find" button is clicked

let msaCollection = null

for (const btn of Html.findBtns) {
  btn.addEventListener('click', () => filterMsas())
}

function filterMsas() {
  msaCollection = msas
  fHashesLoop:
  for (const f of fHashes) {
    const hash = f.vals
    const hashKeys = Object.keys(hash)
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
    Html.listMsg.innerHTML = Html.noMatches
    resetMap(Html.chosenMsas)
    return true
  } else {
    return false
  }
}

function resetMap(chosenMsas) {
  while (chosenMsas.hasChildNodes()) {
    Html.notChosenMsas.appendChild(chosenMsas.firstChild)
  }
}

function makeList(collection) {
  const list = Html.listContainer
  if (collection) {
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild)
    }
    for (const msa of collection) {
      const li = document.createElement('li')
      const btn = document.createElement('button')
      btn.className = 'list-item'
      btn.id = `msa-${msa.code}`
      btn.innerHTML = `<b>${msa.name}</b> (${msa.states})`
      li.appendChild(btn)
      list.appendChild(li)
      EventListener.listItemMouseover(btn, msa.code)
    }
    mapMsas(collection)
  }
}

function mapMsas(collection) {
  resetMap(Html.chosenMsas)
  for (const msa of collection) {
    const mapLoc = Html.svgObj.getElementById(msa.code)
    if (mapLoc) {
      Html.chosenMsas.appendChild(mapLoc)
    } else {
      console.log(`${msa.code} ${msa.name} was NOT found`)
    }
    const id = `msa-${msa.code}`
    EventListener.mapMsaMouseover(mapLoc, id)
  }
}
