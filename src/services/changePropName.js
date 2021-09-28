export const changePropName = (obj, newName, oldName) => {
  obj[newName] = obj[oldName];
  delete obj[oldName];
  return obj;
}