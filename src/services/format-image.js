import readFiles from "./files-reader"

export function formatImage (file, mime_type, dataType) {
  // if(!file.type.startsWith('image') || (file.type === mime_type && dataType === "blob")) {
  if(!(file instanceof File && file.type.startsWith('image'))) {
    return file
  }
  return new Promise(function (resolve, reject) {
    readFiles([file], ([fileData]) => {
      /* if(file.type === mime_type) {
        return resolve(fileData)
      } */
      const image = new Image()
      image.onerror = function () {
        reject("load image failed")
      }
      image.onload = function () {
        const canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height
        canvas.getContext("2d").drawImage(image, 0, 0)
        if (dataType === "blob") {
          canvas.toBlob(resolve, mime_type)
        }
        if (dataType === "url") {
          resolve(canvas.toDataURL(mime_type))
        }
      }
      image.src = fileData
    })
  })
}

export function getImageBlob (file) {
  return formatImage(file, file.type, 'blob')
}

export function getImageBase64 (file) {
  return formatImage(file, file.type, 'url')
}