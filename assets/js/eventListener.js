class EventListener {

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