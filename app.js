var files = null;

function onSelectedFile (e) {
  files = e.target.files;
  handleFile();
}

function handleFile () {
  var i,f;

  document.getElementById('sql-pane').value = '';

  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;

      var workbook = XLSX.read(data, {type: 'binary'});
      var sheets = workbook.Sheets || {};

      for(var sheetName in sheets) {
        var rows = XLSX.utils.sheet_to_json(sheets[sheetName])

        console.log(sheetName)
        console.log(rows)

        for (var i = 0; i < rows.length; i++) {
          document.getElementById('sql-pane').value += addData(rows[i]);
        }
      }
    };
    reader.readAsBinaryString(f);
  }
}

function addData (rowData) {
  var columnNameList = getColumnNameList('TRANS')
  var str = 'INSERT INTO TRANS (' + columnNameList.join(',') + ') VALUES (' + generateTransData(columnNameList, rowData) + ');\n';

  console.log(str);

  return str;
};

document.getElementById('input-file').addEventListener('change', onSelectedFile, false);