function getColumnNameList (tableName) {
  var table = tables[tableName];

  if (table) {
    return _.keys(table.columns)
  }
}

function generateTransData (columnNameList, data) {
  var values = [];

  for (var i = 0; i < columnNameList.length; i++) {
    var columnName = columnNameList[i];
    var value = null

    if (columnName === 'PAYMENT_ID') {
      value = generatePaymentId();
    } else if (columnName === 'PAYMENT_DATE') {
      value = generatePaymentDate(data['PAYMENT_DATE'], data['TIME'])
    } else if (data.hasOwnProperty(columnName) === true) {
      if (columnName === 'AMOUNT') {
        value = parseFloat(data[columnName])
      } else {
        value = data[columnName]
      }
    } else {
      value = getDefaultValue('TRANS', columnName)
    }

    if (typeof value === 'string') {
      values.push('\'' + value + '\'');
    } else {
      values.push(value)
    }
  }

  return values.join(',');
}

function generatePaymentId () {
  return 'TEST_' + Math.floor(Math.random() * 100000000);
}

function generatePaymentDate (dateOffset, strTime) {
  var date = null;
  var time = moment();
  // var paymentDate = moment().set({ 'year': 2016, 'month': 11, 'date': 20, 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 });
  var timeList = strTime.split('.');
  var hour = timeList[0] || 0;
  var minute = timeList[1] || 0;
  var second = timeList[2] || 0;
  var millisecond = timeList[3] || 0;

  if (dateOffset === 'T-2') {
    date = '18 Dec 2016 '
    // paymentDate.subtract(2, 'days');
  } else if (dateOffset === 'T-1') {
    date = '19 Dec 2016 '
    // paymentDate.subtract(1, 'days');
  } else if (dateOffset === 'T+1') {
    date = '21 Dec 2016 '
    // paymentDate.add(1, 'days');
  }

  time.set({
    hour: parseInt(hour),
    minute: parseInt(minute),
    second: parseInt(second),
    millisecond: parseInt(millisecond),
  });

  // return paymentDate.format('DD MMM YYYY HH.mm.ss.SSS')
  return date + ' ' + time.format('HH.mm.ss.SSS');
}

function getDefaultValue (tableName, columnName) {
  var table = tables[tableName];

  if (table) {
    return table.columns[columnName];
  }

  return '';
}
