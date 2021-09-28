export const setOrderList = (list) => {
  if (!list && list.length === 0) {
    return;
  }
  var countChildData = 0;
  var countParentData = 0;

  list.forEach(item => {
    if (!item.hasOwnProperty("parent")) {
      item.parent_order = countParentData;
      countParentData += 1;
    }
    else {
      item.parent.child_order = countChildData;
      countChildData += 1;
    }
  })
  return list;
}
