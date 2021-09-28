/**
 * Nhu cầu làm ra chỗ này là để chuẩn hoá các loại hình query áp cho cái table thế hệ mới :v
 * @param {*} query
 * @returns
 */
export default function getFilterStr (query) {
  const { filters } = query
  var arrAndFilter = []
  var arrOrFilter = []
  filters.forEach(({value, column: {field, o}}) => {
    let reSearch = ''
    if (Array.isArray(value)) {
      /** Chỗ này để xử lý filter phần trạng thái hiển thị */
      value.map(v => {
        reSearch = v.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/g, '').trim()
        return arrOrFilter.push(`${o}(${field}, ${reSearch})`)
      })
    } else {
      reSearch = value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/g, '').trim()
      if (o === 'regexp') {
        /** Chỗ này để xử lý những phần string như name mà có index trigram */
        return arrAndFilter.push(`${o}(${field},/${reSearch}/)`)
      } else {
        return arrAndFilter.push(`${o}(${field},"${reSearch}")`)
      }
    }
  })

  let strFilter = ""
  if (arrAndFilter?.length > 0 && arrOrFilter?.length > 0) {
    strFilter = arrAndFilter.join(' AND ') + ' AND ' + arrOrFilter.join(' OR ')
  } else if (arrAndFilter?.length > 0) {
    strFilter = arrAndFilter.join(' AND ')
  } else {
    strFilter = arrOrFilter.join(' OR ')
  }
  return { strFilter }
}