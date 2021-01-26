// Fetch metro area data

let msas = null

function getMsas() {
  ApiAdapter.get('/metro-areas')
    .then(json => msas = json)
}

getMsas()

// Add event listeners to navbar

let abClick = false
let acClick = false
Html.menuAbout.addEventListener('click', () => showHideAbout())
Html.menuAccount.addEventListener('click', () => showHideAcct())
clickOff()

function showHideAbout() {
  if (acClick) {
    acClick = !acClick
  }
  abClick = !abClick
  if (abClick) {
    Html.menuAbout.classList.add('active')
    Html.menuAccount.classList.remove('active')
  } else {
    Html.menuAbout.classList.remove('active')
  }
  showHideContent()
  Html.menuContent.innerText = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat eaque accusamus reiciendis nobis corrupti quidem dolorem, hic ducimus, minus, tenetur cupiditate tempore laudantium amet perspiciatis repellendus iusto vitae! Perferendis, harum. Quaerat, qui incidunt ex error deleniti repudiandae ducimus nulla perferendis libero laborum, consequuntur vitae doloribus eum veniam aperiam aut minima asperiores sunt.'
}

function showHideAcct() {
  if (abClick) {
    abClick = !abClick
  }
  acClick = !acClick
  if (acClick) {
    Html.menuAccount.classList.add('active')
    Html.menuAbout.classList.remove('active')
  } else {
    Html.menuAccount.classList.remove('active')
  }
  showHideContent()
  Html.menuContent.innerHTML = `
    <div id="menu-login">
      <h3>Sign up / Log in to save the lists and maps you create!</h3>
      <form action="">
        <div class="inputs-row">
          <div class="col-25">
            <label for="username">Username</label>
          </div>
          <div class="col-75">
            <input type="text" id="username" name="username">
          </div>
        </div>
        <div class="inputs-row">
          <div class="col-25">
            <label for="password">Password</label>
          </div>
          <div class="col-75">
            <input type="text" id="password" name="password">
          </div>
        </div>
        <div class="submit-row">
          <input type="submit" id="menu-submit" value="Submit">
        </div>
      </form>
    </div>`
}

function showHideContent() {
  if (abClick || acClick) {
    Html.menuContent.className = 'active'
  } else {
    Html.menuContent.className = 'inactive'
  }
}

function clickOff() {
  document.addEventListener('click', (e) => {
    const content = Html.menuContent,
          about = Html.menuAbout,
          account = Html.menuAccount;
    const inElement = (content.contains(e.target) || about.contains(e.target) || account.contains(e.target))
    if (!inElement) {
      about.classList.remove('active')
      account.classList.remove('active')
      content.className = 'inactive'
      abClick = false
      acClick = false
    }
  })
}

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
    Html.listMsg.innerHTML = '<h1>No Matches</h1><h2>None of the 100 most populated metropolitan areas in the USA meet the criteria you selected.</h2>'
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
      const lit = Html.svgObj.getElementById(msa.code)
      btn.addEventListener('mouseover', () => {
        Html.highlightedMsa.appendChild(lit)
      }, lit)
      btn.addEventListener('mouseout', () => {
        Html.chosenMsas.appendChild(lit)
      }, lit)
    }
    mapMsas(collection)
  }
}

function mapMsas(collection) {
  resetMap(Html.chosenMsas)
  for (const msa of collection) {
    const loc = Html.svgObj.getElementById(msa.code)
    if (loc) {
      Html.chosenMsas.appendChild(loc)
    } else {
      console.log(`${msa.code} ${msa.name} was NOT found`)
    }
    const id = `msa-${msa.code}`
    const btn = document.getElementById(id)
    // const title = loc.removeChild(loc.childNodes[-1])
    loc.addEventListener('mouseover', () => {
      btn.classList.add('highlighted')
    }, )
    loc.addEventListener('mouseout', () => {
      btn.classList.remove('highlighted')
    }, )
    // console.log(loc.childNodes[-2])
  }
}
