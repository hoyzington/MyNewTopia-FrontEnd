const app = new App()


// const about = {
//   element: HtmlItems.menuAbout,
//   stat: false
// }

// const account = {
//   element: HtmlItems.menuAccount,
//   stat: false
// }

// const contentArea = HtmlItems.menuContent

// activateMenuItems()

// function activateMenuItems() {
//   about.element.addEventListener('click', () => {
//     processClick(about, account, HtmlItems.aboutContent)
//   })
//   account.element.addEventListener('click', () => {
//     processClick(account, about, HtmlItems.accountContent)
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
//     contentArea.className = 'menu-active'
//   } else {
//     contentArea.className = 'menu-inactive'
//   }
//   contentArea.innerHTML = html
// }

// function clickOff () {
//   // const body = document.querySelector('body')
//   // body.addEventListener('blur', hideMenuContent.bind(this), true)
//   document.addEventListener('click', (e) => {
//     const inElement = (contentArea.contains(e.target) || about['element'].contains(e.target) || account['element'].contains(e.target))
//     if (!inElement) { hideMenuContent() }
//   })
// }

// function hideMenuContent() {
//   about['element'].classList.remove('menu-active')
//   account['element'].classList.remove('menu-active')
//   contentArea.className = 'menu-inactive'
// }
