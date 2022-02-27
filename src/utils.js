let count = 0
export function genUid (prefix) {
  return `_:${prefix}_${(new Date()).getTime() + count++}`
}
export function scaleImageUrl (url, width, height) {
  return `${url}?mode=scale${ width ? '&w=' + width : '' }${ height ? '&h=' + height : ''}`
}

export function ObjectsToForm (...objects) {
  const formData = new FormData()
  for(let obj of objects) {
    for(let [field, data] of Object.entries(obj)) {
      formData.set(field, data.constructor.name === 'Object' ? JSON.stringify(data) : data)
    }
  }
  return formData
}

export function createLookup (data, key_field, val_field) {
  const result = {}
  if(Array.isArray(data) && data.length > 0) {
    if(typeof data[0] === 'object') {
      for(let o of data) {
        result[o[key_field]] = o[val_field]
      }
    } else {
      for(let i = 0; i < data.length; i++) {
        result[i] = data[i]
      }
    }
  }
  return result
}
export const emptyImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII="

export const corrupted_img = "data:image/png;base64,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"