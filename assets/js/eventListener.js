class EventListener {

// Menu Items

  static menuItems() {
    Html.menuAbout.addEventListener('click', () => showOrHideMenuItem(Html.menuAbout, Html.menuAccount, Html.aboutContent))
    Html.menuAccount.addEventListener('click', () => showOrHideMenuItem(Html.menuAccount, Html.menuAbout, Html.accountContent))
    clickOff()
  }

  showOrHideMenuItem(item1, item2, content) {
    let clickOnA = false, clickOnB = false;
    if (clickOnA) { clickOnA = !clickOnA }
    clickOnB = !clickOnB
    if (clickOnB) {
      item1.classList.add('active')
      item2.classList.remove('active')
    } else {
      item1.classList.remove('active')
    }
    showOrHideContent(clickOnA, clickOnB)
    Html.menuContent.innerHTML = content
  }
  
  showOrHideContent(clickOnA, clickOnB) {
    if (clickOnA || clickOnB) {
      Html.menuContent.className = 'active'
    } else {
      Html.menuContent.className = 'inactive'
    }
  }

  clickOff() {
    document.addEventListener('click', (e) => {
      const content = Html.menuContent,
            about = Html.menuAbout,
            account = Html.menuAccount;
      const inElement = (content.contains(e.target) || about.contains(e.target) || account.contains(e.target))
      if (!inElement) {
        about.classList.remove('active')
        account.classList.remove('active')
        content.className = 'inactive'
      }
    })
  }

// MSA List

  static listItemMouseover(item, id) {
    const lit = Html.svgObj.getElementById(id)
    item.addEventListener('mouseover', () => {
      Html.highlightedMsa.appendChild(lit)
    }, lit)
    item.addEventListener('mouseout', () => {
      Html.chosenMsas.appendChild(lit)
    }, lit)
  }

// MSA Map

  static mapMsaMouseover(mapLoc, id) {
    const btn = document.getElementById(id)
    // const title = mapLoc.removeChild(mapLoc.childNodes[-1])
    mapLoc.addEventListener('mouseover', () => {
      btn.classList.add('highlighted')
    }, )
    mapLoc.addEventListener('mouseout', () => {
      btn.classList.remove('highlighted')
    }, )
    // console.log(mapLoc.childNodes[-2])
  }

}