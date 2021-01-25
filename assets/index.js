// Fetch metro area data

const endPoint = 'http://localhost:3000/api/v1/metro-areas'

let msas = null

function getMsas() {
  fetch(endPoint)
    .then(res => res.json())
    .then(json => msas = json)
}

getMsas()

// Add event listeners to navbar

const about = document.getElementById('about')
const account = document.getElementById('account')
const menuContent = document.getElementById('menu-content')
let abClick = false
let acClick = false
about.addEventListener('click', () => showHideAbout())
account.addEventListener('click', () => showHideAccount())
clickOff()

function showHideAbout() {
  if (acClick) {
    acClick = !acClick
  }
  abClick = !abClick
  if (abClick) {
    about.classList.add('active')
    account.classList.remove('active')
  } else {
    about.classList.remove('active')
  }
  showHideContent()
  menuContent.innerText = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat eaque accusamus reiciendis nobis corrupti quidem dolorem, hic ducimus, minus, tenetur cupiditate tempore laudantium amet perspiciatis repellendus iusto vitae! Perferendis, harum. Quaerat, qui incidunt ex error deleniti repudiandae ducimus nulla perferendis libero laborum, consequuntur vitae doloribus eum veniam aperiam aut minima asperiores sunt.'
}

function showHideAccount() {
  if (abClick) {
    abClick = !abClick
  }
  acClick = !acClick
  if (acClick) {
    account.classList.add('active')
    about.classList.remove('active')
  } else {
    account.classList.remove('active')
  }
  showHideContent()
  menuContent.innerHTML = `
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
    menuContent.className = 'active'
  } else {
    menuContent.className = 'inactive'
  }
}

function clickOff() {
  document.addEventListener('click', (e) => {
    const inElement = (menuContent.contains(e.target) || about.contains(e.target) || account.contains(e.target))
    if (!inElement) {
      about.classList.remove('active')
      account.classList.remove('active')
      menuContent.className = 'inactive'
      abClick = false
      acClick = false
    }
  })
}

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
const svgObj = document.getElementById('map')
const chosen = document.getElementById('chosen-msas')
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
  const list = document.getElementById('list')
  if (collection) {
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild)
    }
    const highlight = document.getElementById('highlight-msa')
    for (const msa of collection) {
      const li = document.createElement('li')
      const btn = document.createElement('button')
      btn.className = 'list-item'
      btn.id = `msa-${msa.code}`
      btn.innerHTML = `<b>${msa.name}</b> (${msa.states})`
      li.appendChild(btn)
      list.appendChild(li)
      const lit = svgObj.getElementById(msa.code)
      btn.addEventListener('mouseover', () => {
        highlight.appendChild(lit)
      }, lit)
      btn.addEventListener('mouseout', () => {
        chosen.appendChild(lit)
      }, lit)
    }
    mapMsas(collection)
  }
}

function mapMsas(collection) {
  resetMap(chosen)
  const list = document.getElementById('list')
  for (const msa of collection) {
    const loc = svgObj.getElementById(msa.code)
    if (loc) {
      chosen.appendChild(loc)
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
