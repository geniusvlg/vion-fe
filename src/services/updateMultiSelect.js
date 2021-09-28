// UPDATE MULTI SELECT PRODUCT
export function updateMultiSelectProduct (set, listHighligtOld, node, pred) {
  const removeItem = listHighligtOld?.filter(({ uid: uid1 }) => !set?.some(({ uid: uid2 }) => uid1 === uid2));
  if(removeItem.length > 0) {
    let mergeArr = set.concat(removeItem)
    node.setState(pred, mergeArr, false)
    let highlight = node.getState(pred) ?? []
    highlight.map(hl => removeItem.find(ri => hl.state.uid == ri.uid ? hl.isDeleted = true : hl.isDeleted = false))
  } else {
    node.setState(pred, set, true)
  }
}

// UPDATE MULTI SELECT LAYOUT
export function updateMultiSelectLayout (set, listLaySecOld, node, pred) {
  const removeItem = listLaySecOld?.filter(({ uid: uid1 }) => !set?.some(({ uid: uid2 }) => uid1 === uid2));
  if(removeItem.length > 0) {
    let mergeArr = set.concat(removeItem)
    node.setState(pred, mergeArr, false)
    let layout = node.getState(pred) ?? []
    layout.map(hl => removeItem.find(ri => hl.state.uid == ri.uid ? hl.isDeleted = true : hl.isDeleted = false))
  } else {
    node.setState(pred, set, true)
  }
}