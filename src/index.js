const app = new App()

// // Add Event Listeners To Menu Bar

// const about = {
//   element: Html.menuAbout,
//   stat: false
// }

// const account = {
//   element: Html.menuAccount,
//   stat: false
// }

// const content = Html.menuContent

// activateMenuItems()

// function activateMenuItems() {
//   about.element.addEventListener('click', () => {
//     processClick(about, account, Html.aboutContent)
//   })
//   account.element.addEventListener('click', () => {
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
//     item1['element'].classList.add('menu-active')
//     item2['element'].classList.remove('menu-active')
//   } else {
//     item1['element'].classList.remove('menu-active')
//   }
// }

// function showOrHide(html) {
//   if (about.stat || account.stat) {
//     content.classmsaAttr = 'menu-active'
//   } else {
//     content.classmsaAttr = 'menu-inactive'
//   }
//   content.innerHTML = html
// }

// function clickOff () {
//   document.addEventListener('click', (e) => {
//     const inelementent = (content.contains(e.target) || about['element'].contains(e.target) || account['element'].contains(e.target))
//     if (!inelementent) {
//       about['element'].classList.remove('menu-active')
//       account['element'].classList.remove('menu-active')
//       content.classmsaAttr = 'menu-inactive'
//     }
//   })
// }
