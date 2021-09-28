const fileReader = new FileReader()
const queue = []
let readEnd = true

function startQueue (files, callback) {
  if(readEnd) {
    readEnd = false
    const readFiles = []
    fileReader.onload = function (e) {
      readFiles.push(e.target.result)
      if(files.length > 0) {
        fileReader.readAsDataURL(files.pop())
      } else {
        callback(readFiles)
        if(queue.length > 0) {
          startQueue(...queue.shift())
        } else {
          readEnd = true
        }
      }
    }
    fileReader.readAsDataURL(files.pop())
  } else {
    queue.push([files, callback])
  }
}

export default startQueue