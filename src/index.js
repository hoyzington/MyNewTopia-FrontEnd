const app = new App()






// // Fetch Metro Area Data

// let msas = null

// function getMsas() {
//   ApiAdapter.get('/metro-areas')
//     .then(json => msas = json)
// }

// getMsas()






// // Add Event Listeners To Menu Bar

// const about = {
//   elem: Html.menuAbout,
//   stat: false
// }

// const account = {
//   elem: Html.menuAccount,
//   stat: false
// }

// const content = Html.menuContent

// activateMenuItems()

// function activateMenuItems() {
//   about.elem.addEventListener('click', () => {
//     processClick(about, account, Html.aboutContent)
//   })
//   account.elem.addEventListener('click', () => {
//     processClick(account, about, Html.accountContent)
//   })
//   clickOff()
// }

// function processClick(item1, item2, html) {
//   onOffSwitch(item1, item2)
//   highlight(item1, item2)
//   showOrHide(html)
// }

// function onOffSwitch(item1, item2) {
//   if (item2['stat']) {
//     item2['stat'] = !item2['stat']
//   }
//   item1['stat'] = !item1['stat']
// }

// function highlight(item1, item2) {
//   if (item1['stat']) {
//     item1['elem'].classList.add('menu-active')
//     item2['elem'].classList.remove('menu-active')
//   } else {
//     item1['elem'].classList.remove('menu-active')
//   }
// }

// function showOrHide(html) {
//   if (about.stat || account.stat) {
//     content.className = 'menu-active'
//   } else {
//     content.className = 'menu-inactive'
//   }
//   content.innerHTML = html
// }

// function clickOff () {
//   document.addEventListener('click', (e) => {
//     const inElement = (content.contains(e.target) || about['elem'].contains(e.target) || account['elem'].contains(e.target))
//     if (!inElement) {
//       about['elem'].classList.remove('menu-active')
//       account['elem'].classList.remove('menu-active')
//       content.className = 'menu-inactive'
//     }
//   })
// }






// // Add Event Listeners To Filter Form

// const heat = {
//   name: 'heat', elem: Html.heatCtrl, vals: {}
// },
//       cold = {
//   name: 'cold', elem: Html.coldCtrl, vals: {}
// },
//       precip = {
//   name: 'precip', elem: Html.precipCtrl, vals: {}
// },
//       snow = {
//   name: 'snow', elem: Html.snowCtrl, vals: {}
// },
//       wage = {
//   name: 'wage', elem: Html.wageCtrl, vals: {}
// },
//       unemp = {
//   name: 'unemp', elem: Html.unempCtrl, vals: {}
// },
//       aqi = {
//   name: 'aqi', elem: Html.aqiCtrl, vals: {}
// };

// const fHashes = [heat, cold, precip, snow, wage, unemp, aqi]

// function activate(attr) {
//   attr['elem'].addEventListener('click', (e) => addOrReplaceInput(e, attr['vals']))
// }

// function addOrReplaceInput(e, input) {
//   if (input[e.target.id]) {
//     delete input[e.target.id]
//   } else {
//     input[e.target.id] = e.target.value
//   }
// }

// fHashes.forEach(f => activate(f))






// // Process Filter

// for (const btn of Html.findBtns) {
//   btn.addEventListener('click', () => filterMsas())
// }

// function filterMsas() {
//   let msas = Msas.all
//   fHashesLoop:
//   for (const f of fHashes) {
//     const hash = f.vals
//     const hashKeys = Object.keys(hash)
//     if (hashKeys.length > 0) {
//       const filter = createFilter(hash)
//       msas = applyFilter(msas, f, filter)
//       if (checkIfEmpty(msas)) {
//         msas = null
//         break fHashesLoop
//       }
//     }
//   }
//   makeList(msas)
// }

// function createFilter(hash) {
//   filterArray = Object.values(hash).join(',').split(',')
//   filter = filterArray.map(item => parseFloat(item))
//   if (filter.length > 1) {
//     filter.sort((a, b) => a - b).splice(1, (filter.length - 2))
//   }
//   return filter
// }

// function applyFilter(collection, fHash, filter) {
//   return collection.filter((m) => {
//     if (filter.length > 1) {
//       return (m[fHash.name] >= filter[0]) && (m[fHash.name] <= filter[1])
//     } else {
//       return m.snow == filter[0]
//     }
//   }, filter)
// }

// function checkIfEmpty(collection) {
//   if (collection.length == 0) {
//     clearListSection(Html.listContainer)
//     Html.listMsg.innerHTML = Html.noMatches
//     resetMap(Html.chosenMsas)
//     return true
//   } else {
//     return false
//   }
// }

// function clearListSection(list) {
//   while (list.hasChildNodes()) {  
//     list.removeChild(list.firstChild)
//   }
// }

// function resetMap(chosenMsas) {
//   while (chosenMsas.hasChildNodes()) {
//     Html.notChosenMsas.appendChild(chosenMsas.firstChild)
//   }
// }
