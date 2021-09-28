import api from 'services/api_cms';

const booleanType = {
  "checked": true,
  "unchecked": false
}

function parseQuery (query) {
  const filters = query.filters
    .filter(f => {
      if(typeof f.value === 'string' || Array.isArray(f.value)) {
        return f.value.length > 0
      }
      return f.value != null
    })
    .map(f => {
      if(f.column.type === "boolean") {
        f.value = booleanType[f.value] ?? f.value
      }
      return {
        operator: f.column.operator,
        field: f.column.field,
        value: f.value,
        order: f.column.groupSort || ''
      }
    })
  return {
    filters,
    page: query.page,
    pageSize: query.pageSize
  }
}

export default function (url, dataParser) {
  let page = 0
  return function (query) {
    if(query.inited) {
      page = query.page
    } else {
      query.inited = true
      query.page = page
    }
    return api.post(url, parseQuery(query))
      .then(({data}) => {
        if(dataParser) {
          data.data = dataParser(data.data)
        }
        return Object.assign(query, data)
      })
      .catch(error => console.log(error))
  }
}
