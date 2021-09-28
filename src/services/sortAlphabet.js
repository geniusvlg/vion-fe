export default function sortAlphabet (arr, field) {
  return arr.sort((a, b) => a[field]?.localeCompare(b[field]))
}
