const uploadInput = document.getElementById('uploadInput')
var fileList = []
uploadInput.addEventListener(
  'change',
  () => {
    fileList.push(uploadInput.files)
    let numberOfBytes = 0
    for (const file of uploadInput.files) {
      numberOfBytes += file.size
    }
    var fileSize = SizeTransfrom(numberOfBytes)
    addRowInTable(uploadInput.files[0].name.split('.'), fileSize)
    sortTable(0)
  },
  false,
)
function SizeTransfrom(size) {
  if (size > 0 && size / 1024 < 1)
    return Math.floor(size).toFixed(2) + ' ' + 'Bytes'
  else if (size / 1024 >= 1 && Math.floor(size / 1024) < 1024)
    return (size / 1024).toFixed(2) + ' ' + 'KB'
  else if (size / 1024 >= 1024 && size / (1024 * 1024) < 1024)
    return Math.floor(size / (1024 * 1024)).toFixed(2) + ' ' + 'MB'
  else if (
    size / (1024 * 1024 * 1024) >= 1 &&
    size / (1024 * 1024 * 1024) < 1024
  )
    return Math.floor(size / (1024 * 1024 * 1024)).toFixed(2) + ' ' + 'GB'
  else return size / (1024 * 1024 * 1024 * 1024).toFixed(2) + ' ' + 'TB'
}
function addRowInTable(fileName, fileSize) {
  var button = document.createElement('button')
  var bText = document.createTextNode('Info')
  button.appendChild(bText)
  button.className = 'btn tooltip'
  var span = document.createElement('span')
  span.className = 'tooltiptext'
  span.id = fileName[0]
  var innerText =
    'file Name : ' +
    fileName[0] +
    '<br />' +
    'file type : ' +
    fileName[1] +
    '<br />' +
    'file size : ' +
    fileSize
  span.innerHTML = innerText
  button.appendChild(span)
  var x = document.getElementById('fileTable')
  var rowCount = x.rows.length
  var row = x.insertRow(rowCount)
  var cell1 = row.insertCell(0)
  cell1.innerHTML = fileName[0]
  var cell2 = row.insertCell(1)
  cell2.innerHTML = fileSize
  var cell3 = row.insertCell(2)
  cell3.appendChild(button)
}
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0
  table = document.getElementById('fileTable')
  switching = true
  dir = 'asc'
  while (switching) {
    switching = false
    rows = table.rows
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false
      x = rows[i].getElementsByTagName('TD')[n]
      y = rows[i + 1].getElementsByTagName('TD')[n]
      if (dir == 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      } else if (dir == 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
      switching = true
      switchcount++
    } else {
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc'
        switching = true
      }
    }
  }
}
