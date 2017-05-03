let delimiter = ','
let newline = '\r\n'

function b64toBlob (b64Data, contentType, sliceSize) {
  // function taken from http://stackoverflow.com/a/16245768/2591950
  // author Jeremy Banks http://stackoverflow.com/users/1114/jeremy-banks
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  let byteCharacters = window.atob(b64Data)
  let byteArrays = []

  let offset
  for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize)

    let byteNumbers = new Array(slice.length)
    let i
    for (i = 0; i < slice.length; i = i + 1) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    let byteArray = new window.Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  let blob = new window.Blob(byteArrays, {
    type: contentType
  })
  return blob
}

let base64 = function (s) {
  return window.btoa(window.unescape(encodeURIComponent(s)))
}

// Refactored from https://github.com/jmaister/excellentexport
function createDownloadLink (anchor, base64data, exporttype, filename) {
  anchor.setAttribute('download', filename)
  anchor.style.visibility = 'hidden'
  let blob
  if (window.navigator.msSaveBlob) {
    blob = b64toBlob(base64data, exporttype)
    window.navigator.msSaveBlob(blob, filename)
    return false
  } else if (window.URL.createObjectURL) {
    blob = b64toBlob(base64data, exporttype)
    let blobUrl = window.URL.createObjectURL(blob)
    anchor.href = blobUrl
  } else {
    let hrefvalue = 'data:' + exporttype + 'base64,' + base64data
    anchor.download = filename
    anchor.href = hrefvalue
  }

  // Return true to allow the link click to work
  return true
}

let sanitizeCsvField = function (value) {
  value = value ? String(value) : ''
  let fixedValue = value
  let addQuotes = (value.indexOf(delimiter) !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1)
  let replaceDoubleQuotes = (value.indexOf('"') !== -1)

  if (replaceDoubleQuotes) {
    fixedValue = fixedValue.replace(/"/g, '""')
  }
  if (addQuotes || replaceDoubleQuotes) {
    fixedValue = '"' + fixedValue + '"'
  }

  return fixedValue
}

let generateCsvContent = function (dataLines) { // Array of arrays
  dataLines = dataLines.map(line => {
    line = line.map(sanitizeCsvField)
    return line.join(delimiter)
  })
  let csvData = '\uFEFF' + dataLines.join(newline)
  return base64(csvData)
}

let CsvExporter = {
  createDownloadLink,
  generateCsvContent
}

export default CsvExporter
