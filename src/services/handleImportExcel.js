export const parseFileUpload = (arr, fieldArr, result = []) => {
  if (arr.length === 0) {
    return;
  }
  for (let i = 1; i < arr.length; i++) {
    var objData = {};
    for (let j = 0; j < arr[i].length; j++) {
      const singleArr = arr[i];
      objData[fieldArr[j]] = singleArr[j]
    }
    result.push(objData);
  }
  return result;
}
