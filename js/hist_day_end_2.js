function Account_Name() {
  var array = Hist_DayEnd_1;
  uniqueKeys = [];
  $.each(array, function (index, dict) {
    $.each(dict, function (key, value) {
      if ($.inArray(key, uniqueKeys) === -1) {
        uniqueKeys.push(key);
      }
    });
  });

  for (var i = 0; i < uniqueKeys.length; i++) {
    if (uniqueKeys[i] == 'update1') {
      $('#Account_option').append(`<option id="dropdown_value_${i + 1}" value="${uniqueKeys[i]}">5 paisa</option>`)
    } else if (uniqueKeys[i] == 'update2') {
      $('#Account_option').append(`<option id="dropdown_value_${i + 1}" value="${uniqueKeys[i]}">Arham</option>`)
    } else {
      $('#Account_option').append(`<option id="dropdown_value_${i + 1}" value="${uniqueKeys[i]}">Account ${i + 1}</option>`)
    }
  }
}

// Removing the deleted strategy from the API Data
function remove_unnecessary_strategy() {
  var Account_option_1 = $('#Account_option').val();
  var storedValue = localStorage.getItem(Account_option_1);

  if (storedValue !== null) {
    Hist_DayEnd_2 = [];

    for (let i = 0; i < API_Data.length; i++) {
      Hist_DayEnd_2.push(JSON.parse(API_Data[i][1]));
    }

    // Iterate through each object in Hist_DayEnd_2
    for (let i = 0; i < Hist_DayEnd_2.length; i++) {
      var obj = Hist_DayEnd_2[i];

      // Check if the specified account option exists in the object
      if (obj.hasOwnProperty(Account_option_1)) {
        var accountObj = obj[Account_option_1];

        // Check if the account object has the 'strategy_mtm' key
        if (accountObj.hasOwnProperty('stratergy_mtm')) {
          var strategyMtmObj = accountObj.stratergy_mtm;

          // Remove key-value pairs from strategy_mtm based on the stored value
          var parsedStoredValue = JSON.parse(storedValue);
          for (let j = 0; j < parsedStoredValue.length; j++) {
            var keyToRemove = parsedStoredValue[j];
            if (strategyMtmObj.hasOwnProperty(keyToRemove)) {
              delete strategyMtmObj[keyToRemove];
            }
          }
        }
      }
    }
  }
  else {
    Hist_DayEnd_2 = [];

    for (let i = 0; i < API_Data.length; i++) {
      Hist_DayEnd_2.push(JSON.parse(API_Data[i][1]));
    }
  }
  Hist_DayEnd_1 = Hist_DayEnd_2
}

// Removing all other things and keeping only "stratergy_mtm" and "order_updates"
function remove_unnecessary() {
  Hist_DayEnd_1 = []
  for (let i = 0; i < Hist_DayEnd.length; i++) {
    Hist_DayEnd_1.push(JSON.parse(Hist_DayEnd[i][1]))
  }
}

// Strategy MTM function
function MTM_strategy(Account) {
  // stratergy_mtm (ALL DATA) and stratergy_mtm_1 (UNDEFINED REMOVED) also removing number value only array is accepted
  for (var j = 0; j < Hist_DayEnd.length; j++) {
    var text = Hist_DayEnd[j][0]
    var key = text;
    if (Hist_DayEnd_1[j][Account] != undefined) {
      if (Hist_DayEnd_1[j][Account]['stratergy_mtm'] != undefined) {
        var a = Object.values(Hist_DayEnd_1[j][Account]['stratergy_mtm'])[0]
        if (Array.isArray(a)) {
          var value_1 = Hist_DayEnd_1[j][Account]['stratergy_mtm']
          stratergy_mtm_1[key] = value_1;
        }
      }
    }
  }

  // Removing Duplicate days
  var key = Object.keys(stratergy_mtm_1)[0]
  var values = Object.values(stratergy_mtm_1)[0]
  stratergy_mtm_2[key] = values
  var text = moment(key * 1000).format('dddd')
  if (text == "Monday") { Monday[key] = values }
  else if (text == "Tuesday") { Tuesday[key] = values }
  else if (text == "Wednesday") { Wednesday[key] = values }
  else if (text == "Thursday") { Thursday[key] = values }
  else if (text == "Friday") { Friday[key] = values }
  for (var i = 1; i < Object.keys(stratergy_mtm_1).length; i++) {
    var currentArray = Object.values(stratergy_mtm_1)[i]
    var compareArray = Object.values(stratergy_mtm_1)[i - 1]
    var key = Object.keys(stratergy_mtm_1)[i]
    var values = Object.values(stratergy_mtm_1)[i]
    stratergy_mtm_2[key] = values
    if (JSON.stringify(currentArray) === JSON.stringify(compareArray)) {
      delete stratergy_mtm_2[key]
    }
    var text = moment(Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] * 1000).format('dddd')
    if (text == "Monday") { Monday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }
    else if (text == "Tuesday") { Tuesday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }
    else if (text == "Wednesday") { Wednesday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }
    else if (text == "Thursday") { Thursday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }
    else if (text == "Friday") { Friday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }
  }

  // For Order Updates
  for (let i = 0; i < Object.keys(stratergy_mtm_2).length; i++) {
    let key = Object.keys(stratergy_mtm_2)[i];
    for (let j = 0; j < Hist_DayEnd.length; j++) {
      let key_1 = Hist_DayEnd[j][0];
      if (key == key_1) {
        if (JSON.parse(Hist_DayEnd[j][1])[Account]['order_updates'] != undefined) {
          let value_1 = JSON.parse(Hist_DayEnd[j][1])[Account]['order_updates']
          order_quantity[key] = value_1;
        }
      }
    }
  }
}

// All strategy
function All_Strategy() {
  mergedArray = Object.keys(Object.values(stratergy_mtm_2)[0])
  for (var i = 1; i < Object.keys(stratergy_mtm_2).length; i++) {
    var firstArray = Object.keys(Object.values(stratergy_mtm_2)[i])
    $.merge(mergedArray, firstArray);
  }
  mergedArray.sort()
  $.unique(mergedArray);
  strategy_array = mergedArray

  var arr = strategy_array
  // Convert all items to lowercase for comparison
  var arrLower = arr.map(function (item) {
    return item.toLowerCase();
  });

  // Sort the array based on the processed items
  var sortedIndices = Array.from(arrLower, (_, i) => i);
  sortedIndices.sort(function (a, b) {
    var aProcessed = arrLower[a].replace(/^./, '');
    var bProcessed = arrLower[b].replace(/^./, '');
    return aProcessed.localeCompare(bProcessed);
  });

  // Build the final array using the sorted indices
  result = [];
  for (var i = 0; i < sortedIndices.length; i++) {
    result.push(arr[sortedIndices[i]]);
  }
  strategy_array = result
}

function weekday_addition() {
  All_WeekDay_1 = []
  weekday_mon = {}
  weekday_tue = {}
  weekday_wed = {}
  weekday_thu = {}
  weekday_fri = {}
  for (var i = 0; i < strategy_array.length; i++) {
    sum_m = 0
    sum_tu = 0
    sum_w = 0
    sum_th = 0
    sum_f = 0
    var strategy = strategy_array[i]
    for (var j = 0; j < Object.values(stratergy_mtm_2).length; j++) {
      var key = Object.keys(stratergy_mtm_2)[j]
      day_1 = moment(key * 1000).format('dddd')
      var myObject = Object.values(stratergy_mtm_2)[j]
      if (myObject.hasOwnProperty(strategy)) {
        var value = myObject[strategy][0];
      }
      else {
        var value = 0
      }
      if (day_1 == "Monday") {
        sum_m += value
        weekday_mon[strategy_array[i]] = sum_m;
      }
      else if (day_1 == "Tuesday") {
        sum_tu += value
        weekday_tue[strategy_array[i]] = sum_tu;
      }
      else if (day_1 == "Wednesday") {
        sum_w += value
        weekday_wed[strategy_array[i]] = sum_w;
      }
      else if (day_1 == "Thursday") {
        sum_th += value
        weekday_thu[strategy_array[i]] = sum_th;
      }
      else if (day_1 == "Friday") {
        sum_f += value
        weekday_fri[strategy_array[i]] = sum_f;
      }
    }
  }

  if (Object.values(weekday_mon).length == 0) {
    for (var i = 0; i < strategy_array.length; i++) {
      weekday_mon[strategy_array[i]] = 0;
    }
  }

  if (Object.values(weekday_tue).length == 0) {
    for (var i = 0; i < strategy_array.length; i++) {
      weekday_tue[strategy_array[i]] = 0;
    }
  }

  if (Object.values(weekday_wed).length == 0) {
    for (var i = 0; i < strategy_array.length; i++) {
      weekday_wed[strategy_array[i]] = 0;
    }
  }

  if (Object.values(weekday_thu).length == 0) {
    for (var i = 0; i < strategy_array.length; i++) {
      weekday_thu[strategy_array[i]] = 0;
    }
  }

  if (Object.values(weekday_fri).length == 0) {
    for (var i = 0; i < strategy_array.length; i++) {
      weekday_fri[strategy_array[i]] = 0;
    }
  }

  All_WeekDay_1.push(weekday_mon)
  All_WeekDay_1.push(weekday_tue)
  All_WeekDay_1.push(weekday_wed)
  All_WeekDay_1.push(weekday_thu)
  All_WeekDay_1.push(weekday_fri)
}

// Printing Data to table
function Printing_to_table() {
  // Printing Monday Data
  if ($(window).width() > 576) {
    var table1 = document.getElementById('Hist_DayEnd_Data')
  }
  else {
    var table1 = document.getElementById('Hist_DayEnd_Data_Mobile')
  }
  for (var j = 0; j < strategy_array.length; j++) {
    var temp = Object.values(All_WeekDay_1[0])[j] + Object.values(All_WeekDay_1[1])[j] + Object.values(All_WeekDay_1[2])[j] + Object.values(All_WeekDay_1[3])[j] + Object.values(All_WeekDay_1[4])[j];
    let temp_1 = parseFloat(temp).toFixed(2)
    let temp_2 = parseFloat(temp).toFixed(2)
    var row = `<td>&nbsp;<input type="checkbox" id="${Object.keys(All_WeekDay_1[0])[j]}" name="${Object.keys(All_WeekDay_1[0])[j]}" checked>&nbsp;${Object.keys(All_WeekDay_1[0])[j]}</td>
               <td>${parseFloat(Object.values(All_WeekDay_1[0])[j]).toFixed(2)}(${parseFloat(Object.values(result)[j][0])})</td>
               <td>${parseFloat(Object.values(All_WeekDay_1[1])[j]).toFixed(2)}(${parseFloat(Object.values(result)[j][1])})</td>
               <td>${parseFloat(Object.values(All_WeekDay_1[2])[j]).toFixed(2)}(${parseFloat(Object.values(result)[j][2])})</td>
               <td>${parseFloat(Object.values(All_WeekDay_1[3])[j]).toFixed(2)}(${parseFloat(Object.values(result)[j][3])})</td>
               <td>${parseFloat(Object.values(All_WeekDay_1[4])[j]).toFixed(2)}(${parseFloat(Object.values(result)[j][4])})</td>  
               <td>${temp_1}(${parseFloat(Object.values(result)[j][5])})</td>`
    table1.innerHTML += row
  }

  if ($(window).width() > 576) {
    var table = $('#Hist_DayEnd_Data');
  }
  else {
    var table = $('#Hist_DayEnd_Data_Mobile')
  }
  var newRow = $('<tr>').attr('id', 'totalRow');
  newRow.append($('<td style="text-align:left">').text('TOTAL'));
  for (var i = 1; i <= 6; i++) {
    var total = 0;
    // Loop through each row and calculate the sum of the numbers in the current column
    table.find('tr').each(function () {
      var column = $(this).find('td:eq(' + i + ')');
      total += parseFloat(column.text());
    });
    let total_1 = parseFloat(total).toFixed(2)
    // Create a new cell in the "TOTAL" row with the calculated sum
    newRow.append($('<td>').text(total_1));
  }
  // Append the "TOTAL" row to the table
  table.append(newRow);

  if ($(window).width() > 576) {
    $("#Hist_DayEnd_Data tr:not(:last)").each(function () {
      // Get the value of the number columns
      var num1 = parseFloat($(this).find("td:eq(1)").text());
      var num2 = parseFloat($(this).find("td:eq(2)").text());
      var num3 = parseFloat($(this).find("td:eq(3)").text());
      var num4 = parseFloat($(this).find("td:eq(4)").text());
      var num5 = parseFloat($(this).find("td:eq(5)").text());
      var num6 = parseFloat($(this).find("td:eq(6)").text());

      // Apply styles to number columns based on their values
      if (num1 < 0) {
        $(this).find("td:eq(1)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(1)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num2 < 0) {
        $(this).find("td:eq(2)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(2)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num3 < 0) {
        $(this).find("td:eq(3)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(3)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num4 < 0) {
        $(this).find("td:eq(4)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(4)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num5 < 0) {
        $(this).find("td:eq(5)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(5)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num6 < 0) {
        $(this).find("td:eq(6)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(6)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }
    });
  }
  else {
    $("#Hist_DayEnd_Data_Mobile tr:not(:last)").each(function () {
      // Get the value of the number columns
      var num1 = parseFloat($(this).find("td:eq(1)").text());
      var num2 = parseFloat($(this).find("td:eq(2)").text());
      var num3 = parseFloat($(this).find("td:eq(3)").text());
      var num4 = parseFloat($(this).find("td:eq(4)").text());
      var num5 = parseFloat($(this).find("td:eq(5)").text());
      var num6 = parseFloat($(this).find("td:eq(6)").text());

      // Apply styles to number columns based on their values
      if (num1 < 0) {
        $(this).find("td:eq(1)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(1)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num2 < 0) {
        $(this).find("td:eq(2)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(2)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num3 < 0) {
        $(this).find("td:eq(3)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(3)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num4 < 0) {
        $(this).find("td:eq(4)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(4)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num5 < 0) {
        $(this).find("td:eq(5)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(5)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }

      if (num6 < 0) {
        $(this).find("td:eq(6)").css({
          "text-align": "right",
          "background-color": "#fec7d5",
          "color": "#823d44"
        });
      } else {
        $(this).find("td:eq(6)").css({
          "text-align": "right",
          "background-color": "#c7efcd",
          "color": "#276227"
        });
      }
    });
  }

  $('#totalRow').css('background-color', '#fcd5b4')
  $('#totalRow td:not(:first)').css('text-align', 'right')
}

// Function for order quantity and per lot

// function order_quantity_per_lot() {
//   for (let i = 0; i < Object.keys(order_quantity).length; i++) {
//     temp = {}
//     for (let j = 0; j < strategy_array.length; j++) {
//       // Loop through the main array
//       mainArray = order_quantity[Object.keys(order_quantity)[i]][strategy_array[j]]
//       $.each(mainArray, function (index, value) {
//         // Check if the current string value contains "Qty"
//         if (value[1].indexOf("Qty") !== -1) {
//           // Get the quantity value using a regular expression
//           qty = value[1].match(/Qty:(\d+)/)[1];
//           let key = Object.keys(order_quantity)[i]
//           let key_1 = strategy_array[j]
//           temp[key_1] = qty
//           order_quantity_Final[key] = temp
//         }
//       });
//     }
//   }
// }

function order_quantity_per_lot() {
  for (let i = 0; i < Object.keys(order_quantity).length; i++) {
    temp = {};
    for (let j = 0; j < strategy_array.length; j++) {
      // Loop through the main array
      mainArray = order_quantity[Object.keys(order_quantity)[i]][strategy_array[j]];
      let qtyFound = false; // Flag to check if "Qty" is found in this iteration

      $.each(mainArray, function (index, value) {
        // Check if the current string value contains "Qty"
        if (value[1].indexOf("Qty") !== -1) {
          // Get the quantity value using a regular expression
          qty = value[1].match(/Qty:(\d+)/)[1];
          let key = Object.keys(order_quantity)[i];
          let key_1 = strategy_array[j];
          temp[key_1] = qty;
          order_quantity_Final[key] = temp;
          qtyFound = true; // Set the flag to true as "Qty" is found
        }
      });

      // If "Qty" is not found for the current strategy, set it to 0
      if (!qtyFound) {
        let key = Object.keys(order_quantity)[i];

        var date = new Date(key * 1000);
        var comparisonDate = new Date('July 21, 2023');
        if (date < comparisonDate) {
          // Multiply by 25
          var res = 25;
        } else {
          // Multiply by 15
          var res = 15;
        }

        let key_1 = strategy_array[j];
        temp[key_1] = res;
        order_quantity_Final[key] = temp;
      }
    }
  }
}

// Right Table Heading

function Right_Table_Heading() {
  var keys = Object.keys(stratergy_mtm_2);
  var thead = $("<thead></thead>");
  if ($(window).width() > 576) {
    var headerRow = $("<tr></tr>");
  }
  else {
    var headerRow = $("<tr><th class='timestamp'></th></tr>");
  }

  for (var i = (keys.length - 1); i >= 0; i--) {
    var th = $("<th class='timestamp'></th>").text(moment(keys[i] * 1000).format('DD-MMM, ddd'));
    headerRow.append(th);
  }
  thead.append(headerRow);
  if ($(window).width() > 576) {
    $("#Hist_Daily_table").prepend(thead);
  }
  else {
    $("#Hist_Daily_table_Mobile").prepend(thead);
  }
}

// Right Table Data 
function Right_Table_Data() {
  let Account_option = $('#Account_option').val()
  for (var i = 0; i < strategy_array.length; i++) {
    var key = strategy_array[i];
    var headerRow = $("<tr></tr>");
    for (var j = (Object.values(stratergy_mtm_2).length - 1); j >= 0; j--) {
      myDict = Object.values(stratergy_mtm_2)[j];
      myDict_1 = Object.values(order_quantity_Final)[j];
      if (myDict.hasOwnProperty(key)) {
        Right_Table_Data_Array.push(myDict[key][0])
      } else {
        Right_Table_Data_Array.push(0)
      }

      // if (Account_option == 'update3') {
      //   Daily_Lot.push(25)
      // }
      // else {
      if (myDict_1.hasOwnProperty(key)) {
        Daily_Lot.push(parseInt(myDict_1[key]))
      } else {
        Daily_Lot.push(0)
      }
      // }
    }
    Final_Right_Table_Data_Array.push(Right_Table_Data_Array)
    Final_Daily_Lot.push(Daily_Lot)
    Right_Table_Data_Array = []
    Daily_Lot = []
  }

  if ($(window).width() > 576) {
    var table1 = document.getElementById('Hist_Daily_Data')
  }
  else {
    var table1 = document.getElementById('Hist_Daily_Data_Mobile')
  }
  for (var j = 0; j < Final_Right_Table_Data_Array.length; j++) {
    // for (var j = 0; j < 10; j++) {
    if ($(window).width() > 576) {
      var headerRow = $(`<tr></tr>`);
    }
    else {
      var headerRow = $(`<tr><th style="background-color:#fcd5b4">&nbsp;${strategy_array[j]}</th></tr>`);
    }
    // for (var i = 0; i < Final_Right_Table_Data_Array[0].length; i++) {
    for (var i = 0; i < Final_Right_Table_Data_Array[0].length; i++) {
      // var date = new Date(Object.keys(stratergy_mtm_2)[i] * 1000);
      // var comparisonDate = new Date('July 21, 2023');
      // if (date < comparisonDate) {
      //   // Multiply by 25
      //   var res = 25;
      // } else {
      //   // Multiply by 15
      //   var res = 15;
      // }
      if (parseFloat(Final_Right_Table_Data_Array[j][i]) > 0) {
        var th = $("<td style='text-align:right;background-color:#c7efcd;color:#276227'></td>").text(Final_Right_Table_Data_Array[j][i] + '(' + ((Final_Right_Table_Data_Array[j][i] / Final_Daily_Lot[j][i])).toFixed(2) + ')');
      }
      else if (parseFloat(Final_Right_Table_Data_Array[j][i]) == 0) {
        var th = $("<td style='text-align:right;background-color:#c7efcd;color:#276227'></td>").text(Final_Right_Table_Data_Array[j][i] + '(0)');
      }
      else {
        var th = $("<td style='text-align:right;background-color:#fec7d5;color:#823d44'></td>").text(Final_Right_Table_Data_Array[j][i] + '(' + ((Final_Right_Table_Data_Array[j][i] / Final_Daily_Lot[j][i])).toFixed(2) + ')');
      }
      headerRow.append(th);
    }
    table1.append(headerRow[0])
  }


  if ($(window).width() > 576) {
    var table = $('#Hist_Daily_Data')
    var newRow = $('<tr>').attr('class', 'totalRow');
  }
  else {
    var table = $('#Hist_Daily_Data_Mobile')
    var newRow = $('<tr>').attr('class', 'totalRow');
    newRow.append($('<td style="text-align:left">').text('TOTAL'))
  }
  for (var i = 0; i < Final_Right_Table_Data_Array[0].length; i++) {
    var total = 0;
    // Loop through each row and calculate the sum of the numbers in the current column
    table.find('tr').each(function () {
      var column = $(this).find('td:eq(' + i + ')');
      total += parseFloat(column.text());
    });
    // Create a new cell in the "TOTAL" row with the calculated sum
    newRow.append($('<td>').text(total));
    Right_Table_Total_Array.push(total)
  }
  // Append the "TOTAL" row to the table
  table.append(newRow);

  $('.totalRow').css('background-color', '#fcd5b4')
  $('.totalRow td').css('text-align', 'right')
}

// Function updateTotal
function updateTotal() {
  if ($(window).width() > 576) {
    $('#Hist_DayEnd_Data #totalRow').remove();
    var table = $('#Hist_DayEnd_Data');
  }
  else {
    $('#Hist_DayEnd_Data_Mobile #totalRow').remove();
    var table = $('#Hist_DayEnd_Data_Mobile');
  }
  var newRow = $('<tr>').attr('id', 'totalRow');
  newRow.append($('<td style="text-align:left">').text('TOTAL'));
  for (var i = 1; i <= 6; i++) {
    var total = 0;
    // Loop through each row and calculate the sum of the numbers in the current column
    table.find('tr').each(function () {
      var isChecked = $(this).find("input[type='checkbox']").prop("checked");
      if (isChecked) {
        var column = $(this).find('td:eq(' + i + ')');
        total += parseFloat(column.text());
      }
    });
    // Create a new cell in the "TOTAL" row with the calculated sum
    newRow.append($('<td>').text(total));
  }
  // Append the "TOTAL" row to the table
  table.append(newRow);

  $('#totalRow').css('background-color', '#fcd5b4')
  $('#totalRow td:not(:first)').css('text-align', 'right')


  if ($(window).width() > 576) {
    $('#Hist_Daily_Data .totalRow').remove();
    var table = $('#Hist_Daily_Data');
    var newRow = $('<tr>').attr('class', 'totalRow');
  }
  else {
    $('#Hist_Daily_Data_Mobile .totalRow').remove();
    var table = $('#Hist_Daily_Data_Mobile');
    var newRow = $('<tr>').attr('class', 'totalRow');
    newRow.append($('<td style="text-align: left">').text('TOTAL'));
  }
  for (var i = 0; i < Final_Right_Table_Data_Array[0].length; i++) {
    var total = 0;
    // Loop through each row and calculate the sum of the numbers in the current column
    table.find('tr').each(function () {
      if (!$(this).hasClass("fade")) {
        var column = $(this).find('td:eq(' + i + ')');
        total += parseFloat(column.text());
      }
    });
    // Create a new cell in the "TOTAL" row with the calculated sum
    newRow.append($('<td>').text(total));
  }
  // Append the "TOTAL" row to the table
  table.append(newRow);

  $('.totalRow').css('background-color', '#fcd5b4')
  $('.totalRow td').css('text-align', 'right')

}

// Left Table Update (ADDITION OF BRACKET OF RIGHT TABLE)
function order_qty_total() {
  order_Quantity_Total_Array = []
  order_Quantity_Total_Dict = {}
  var keys = Object.keys(stratergy_mtm_2);
  for (var i = 0; i < strategy_array.length; i++) {
    for (var j = 0; j < (keys.length - 1); j++) {
      value = ((Final_Right_Table_Data_Array[i][j] / Final_Daily_Lot[i][j] * 25)).toFixed(2)
      if (value === 'NaN' || value === NaN) { value = 0 }
      order_Quantity_Total_Array.push(moment.unix(keys[((keys.length - 1) - j)]).format('ddd'), value)
    }
    order_Quantity_Total_Dict[strategy_array[i]] = order_Quantity_Total_Array
    order_Quantity_Total_Array = []
  }

  result = {};

  $.each(order_Quantity_Total_Dict, function (name, values) {
    result[name] = [0, 0, 0, 0, 0]; // Initialize an array for each name with zeros for each weekday

    for (var i = 0; i < values.length; i += 2) {
      var day = values[i];
      var quantity = parseFloat(values[i + 1]);

      if (day === 'Mon') {
        result[name][0] += quantity;
      } else if (day === 'Tue') {
        result[name][1] += quantity;
      } else if (day === 'Wed') {
        result[name][2] += quantity;
      } else if (day === 'Thu') {
        result[name][3] += quantity;
      } else if (day === 'Fri') {
        result[name][4] += quantity;
      }
    }
    result[name][5] = result[name][0] + result[name][1] + result[name][2] + result[name][3] + result[name][4]
  });

  // Round the values to two decimal places
  $.each(result, function (name, values) {
    for (var i = 0; i < values.length; i++) {
      values[i] = values[i].toFixed(2);
    }
  });
}

$(document).ready(function () {

  $.ajaxSetup({ async: false }); // to stop async

  // console.log = function () { };

  root = 'https://stats.tradingcafeindia.in'
  route_fetch_hist_dayend = '/api/fetch_hist_dayend_new'
  route_delete = '/api/del_hist_strat'

  // root = "http://localhost:8080/mtm_chart_final/hist_dayend.txt"
  // route_fetch_hist_dayend = ""

  $.get(root + route_fetch_hist_dayend, function (data, status) {
    if (data == 'UnAuthorised Access') {
      window.location.href = '/'
    } else {
      Hist_DayEnd = data
      API_Data = data;
    }
  }).fail(function (response) {
    console.log('Error: ' + response);
  })

  Monday = {}
  Tuesday = {}
  Wednesday = {}
  Thursday = {}
  Friday = {}

  order_quantity = {}
  order_quantity_Final = {}
  stratergy_mtm_1 = {}
  stratergy_mtm_2 = {}

  week_day_table = {}
  All_WeekDay = []
  Right_Table_Data_Array = []
  Final_Right_Table_Data_Array = []

  Daily_Lot = []
  Final_Daily_Lot = []

  Right_Table_Total_Array = []

  u_r_at_end = false

  remove_unnecessary()
  Account_Name()

  remove_unnecessary_strategy()
  MTM_strategy('update1')

  $('input[name="daterange"]').daterangepicker({
    "startDate": moment.unix(Object.keys(stratergy_mtm_2)[0]).format('DD/MM/YYYY'),
    "endDate": moment.unix(Object.keys(stratergy_mtm_2)[Object.keys(stratergy_mtm_2).length - 1]).format('DD/MM/YYYY'),
    "minDate": moment.unix(Object.keys(stratergy_mtm_2)[0]).format('DD/MM/YYYY'),
    "maxDate": moment.unix(Object.keys(stratergy_mtm_2)[Object.keys(stratergy_mtm_2).length - 1]).format('DD/MM/YYYY'),
    locale: {
      format: 'DD/MM/YYYY'
    }
  }, function (start, end, label) {
    $('input[name="daterange"]').attr('value', start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'))
  });

  $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
    console.log('Apply has clicked')

    from_date = picker.startDate.format('DD/MM/YYYY')
    to_date = picker.endDate.format('DD/MM/YYYY')

    start_i_position = 'not_there'
    last_i_position = 'not_there'

    for (var i = 0; i < API_Data.length; i++) {
      let start_i = moment.unix(API_Data[i][0]).format('DD/MM/YYYY')
      if (from_date == start_i) { start_i_position = i }
      else if (to_date == start_i) { last_i_position = (i + 1) }
    }

    if (start_i_position == 'not_there') {
      alert('Start Day is not there');
      return;
    } else if (last_i_position == 'not_there') {
      alert('End Day is not there');
      return;
    }

    new_Hist_DayEnd = []
    for (var i = start_i_position; i < last_i_position; i++) {
      new_Hist_DayEnd.push(API_Data[i])
    }
    Hist_DayEnd = new_Hist_DayEnd

    let Account_option = $('#Account_option').val()
    $('#Hist_DayEnd_Data').empty()
    $('#Hist_Daily_table').empty()
    $('#Hist_Daily_table').append(`<tbody id="Hist_Daily_Data"></tbody>`)
    $('#Hist_DayEnd_Data_Mobile').empty()
    $('#Hist_Daily_table_Mobile').empty()
    $('#Hist_Daily_table_Mobile').append(`<tbody id="Hist_Daily_Data_Mobile"></tbody>`)

    Monday = {}
    Tuesday = {}
    Wednesday = {}
    Thursday = {}
    Friday = {}

    order_quantity = {}
    order_quantity_Final = {}
    stratergy_mtm_1 = {}
    stratergy_mtm_2 = {}

    week_day_table = {}
    All_WeekDay = []
    Right_Table_Data_Array = []
    Final_Right_Table_Data_Array = []

    Daily_Lot = []
    Final_Daily_Lot = []

    Right_Table_Total_Array = []

    remove_unnecessary_strategy()

    MTM_strategy(Account_option)
    All_Strategy()

    weekday_addition()


    order_quantity_per_lot()

    Right_Table_Heading()
    Right_Table_Data()

    order_qty_total()
    Printing_to_table()

    $("#Hist_DayEnd_table input[type='checkbox']").on("change", function () {
      // console.log('clicked')
      var $row = $(this).closest("tr");
      var index = $($row).index();
      if (!this.checked) {
        $row.addClass("fade");
        $('#Hist_Daily_Data tr:eq(' + index + ')').addClass("fade")
      } else {
        $row.removeClass("fade");
        $('#Hist_Daily_Data tr:eq(' + index + ')').removeClass("fade")
      }

      updateTotal()
    });

    $("#Hist_DayEnd_table_Mobile input[type='checkbox']").on("change", function () {
      // console.log('clicked')
      var $row = $(this).closest("tr");
      var index = $($row).index();
      if (!this.checked) {
        $row.addClass("fade");
        $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').addClass("fade")
      } else {
        $row.removeClass("fade");
        $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').removeClass("fade")
      }

      updateTotal()
    });

    // To Enable or Disable all function
    $('#showAllStrategy').on('change.bootstrapSwitch', function (e) {
      let val = e.target.checked;
      if (val == true) {
        $("input[type='checkbox']").prop('checked', true);
        $('#Hist_Daily_Data tr').removeClass("fade")
        $('#Hist_Daily_Data_Mobile tr').removeClass("fade")
        $('#Hist_DayEnd_Data tr').removeClass("fade")
        $('#Hist_DayEnd_Data_Mobile tr').removeClass("fade")
      }
      else if (val == false) {
        $("input[type='checkbox']").prop('checked', false);
        $('#Hist_Daily_Data tr').addClass("fade")
        $('#Hist_Daily_Data_Mobile tr').addClass("fade")
        $('#Hist_DayEnd_Data tr').addClass("fade")
        $('#Hist_DayEnd_Data_Mobile tr').addClass("fade")
      }

      updateTotal()
    });
  });


  All_Strategy()

  weekday_addition()


  order_quantity_per_lot()

  Right_Table_Heading()
  Right_Table_Data()

  order_qty_total()
  Printing_to_table()


  $("#Hist_DayEnd_table input[type='checkbox']").on("change", function () {

    var $row = $(this).closest("tr");
    var index = $($row).index();
    if (!this.checked) {
      $row.addClass("fade");
      $('#Hist_Daily_Data tr:eq(' + index + ')').addClass("fade")
    } else {
      $row.removeClass("fade");
      $('#Hist_Daily_Data tr:eq(' + index + ')').removeClass("fade")
    }

    updateTotal()
  });

  $("#Hist_DayEnd_table_Mobile input[type='checkbox']").on("change", function () {
    // console.log('clicked')
    var $row = $(this).closest("tr");
    var index = $($row).index();
    if (!this.checked) {
      $row.addClass("fade");
      $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').addClass("fade")
    } else {
      $row.removeClass("fade");
      $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').removeClass("fade")
    }
    updateTotal()
  });

  // To Enable or Disable all function
  $('#showAllStrategy').on('change.bootstrapSwitch', function (e) {
    let val = e.target.checked;
    if (val == true) {
      $("input[type='checkbox']").prop('checked', true);
      $('#Hist_Daily_Data tr').removeClass("fade")
      $('#Hist_Daily_Data_Mobile tr').removeClass("fade")
      $('#Hist_DayEnd_Data tr').removeClass("fade")
      $('#Hist_DayEnd_Data_Mobile tr').removeClass("fade")
    }
    else if (val == false) {
      $("input[type='checkbox']").prop('checked', false);
      $('#Hist_Daily_Data tr').addClass("fade")
      $('#Hist_Daily_Data_Mobile tr').addClass("fade")
      $('#Hist_DayEnd_Data tr').addClass("fade")
      $('#Hist_DayEnd_Data_Mobile tr').addClass("fade")
    }

    updateTotal()
  });

  $('#Account_option').change(() => {
    let Account_option = $('#Account_option').val()
    $('#Hist_DayEnd_Data').empty()
    $('#Hist_Daily_table').empty()
    $('#Hist_Daily_table').append(`<tbody id="Hist_Daily_Data"></tbody>`)
    $('#Hist_DayEnd_Data_Mobile').empty()
    $('#Hist_Daily_table_Mobile').empty()
    $('#Hist_Daily_table_Mobile').append(`<tbody id="Hist_Daily_Data_Mobile"></tbody>`)

    Monday = {}
    Tuesday = {}
    Wednesday = {}
    Thursday = {}
    Friday = {}

    order_quantity = {}
    order_quantity_Final = {}
    stratergy_mtm_1 = {}
    stratergy_mtm_2 = {}

    week_day_table = {}
    All_WeekDay = []
    Right_Table_Data_Array = []
    Final_Right_Table_Data_Array = []

    Daily_Lot = []
    Final_Daily_Lot = []

    Right_Table_Total_Array = []

    Hist_DayEnd = API_Data

    remove_unnecessary_strategy()
    MTM_strategy(Account_option)

    $('input[name="daterange"]').data('daterangepicker').remove();
    var newOptions = {
      "startDate": moment.unix(Object.keys(stratergy_mtm_2)[0]).format('DD/MM/YYYY'),
      "endDate": moment.unix(Object.keys(stratergy_mtm_2)[Object.keys(stratergy_mtm_2).length - 1]).format('DD/MM/YYYY'),
      "minDate": moment.unix(Object.keys(stratergy_mtm_2)[0]).format('DD/MM/YYYY'),
      "maxDate": moment.unix(Object.keys(stratergy_mtm_2)[Object.keys(stratergy_mtm_2).length - 1]).format('DD/MM/YYYY'),
      locale: {
        format: 'DD/MM/YYYY'
      }
    };
    $('input[name="daterange"]').daterangepicker(newOptions, function (start, end, label) {
      $('input[name="daterange"]').attr('value', start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
    });

    $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
      $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
      console.log('Apply has clicked')

      from_date = picker.startDate.format('DD/MM/YYYY')
      to_date = picker.endDate.format('DD/MM/YYYY')

      start_i_position = 'not_there'
      last_i_position = 'not_there'

      for (var i = 0; i < API_Data.length; i++) {
        let start_i = moment.unix(API_Data[i][0]).format('DD/MM/YYYY')
        if (from_date == start_i) { start_i_position = i }
        else if (to_date == start_i) { last_i_position = (i + 1) }
      }

      if (start_i_position == 'not_there') {
        alert('Start Day is not there');
        return;
      } else if (last_i_position == 'not_there') {
        alert('End Day is not there');
        return;
      }

      new_Hist_DayEnd = []
      for (var i = start_i_position; i < last_i_position; i++) {
        new_Hist_DayEnd.push(API_Data[i])
      }
      Hist_DayEnd = new_Hist_DayEnd

      let Account_option = $('#Account_option').val()
      $('#Hist_DayEnd_Data').empty()
      $('#Hist_Daily_table').empty()
      $('#Hist_Daily_table').append(`<tbody id="Hist_Daily_Data"></tbody>`)
      $('#Hist_DayEnd_Data_Mobile').empty()
      $('#Hist_Daily_table_Mobile').empty()
      $('#Hist_Daily_table_Mobile').append(`<tbody id="Hist_Daily_Data_Mobile"></tbody>`)

      Monday = {}
      Tuesday = {}
      Wednesday = {}
      Thursday = {}
      Friday = {}

      order_quantity = {}
      order_quantity_Final = {}
      stratergy_mtm_1 = {}
      stratergy_mtm_2 = {}

      week_day_table = {}
      All_WeekDay = []
      Right_Table_Data_Array = []
      Final_Right_Table_Data_Array = []

      Daily_Lot = []
      Final_Daily_Lot = []

      Right_Table_Total_Array = []

      remove_unnecessary_strategy()

      MTM_strategy(Account_option)
      All_Strategy()

      weekday_addition()

      order_quantity_per_lot()

      Right_Table_Heading()
      Right_Table_Data()

      order_qty_total()
      Printing_to_table()

      $("#Hist_DayEnd_table input[type='checkbox']").on("change", function () {
        // console.log('clicked')
        var $row = $(this).closest("tr");
        var index = $($row).index();
        if (!this.checked) {
          $row.addClass("fade");
          $('#Hist_Daily_Data tr:eq(' + index + ')').addClass("fade")
        } else {
          $row.removeClass("fade");
          $('#Hist_Daily_Data tr:eq(' + index + ')').removeClass("fade")
        }

        updateTotal()
      });

      $("#Hist_DayEnd_table_Mobile input[type='checkbox']").on("change", function () {
        // console.log('clicked')
        var $row = $(this).closest("tr");
        var index = $($row).index();
        if (!this.checked) {
          $row.addClass("fade");
          $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').addClass("fade")
        } else {
          $row.removeClass("fade");
          $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').removeClass("fade")
        }

        updateTotal()
      });

      // To Enable or Disable all function
      $('#showAllStrategy').on('change.bootstrapSwitch', function (e) {
        let val = e.target.checked;
        if (val == true) {
          $("input[type='checkbox']").prop('checked', true);
          $('#Hist_Daily_Data tr').removeClass("fade")
          $('#Hist_Daily_Data_Mobile tr').removeClass("fade")
          $('#Hist_DayEnd_Data tr').removeClass("fade")
          $('#Hist_DayEnd_Data_Mobile tr').removeClass("fade")
        }
        else if (val == false) {
          $("input[type='checkbox']").prop('checked', false);
          $('#Hist_Daily_Data tr').addClass("fade")
          $('#Hist_Daily_Data_Mobile tr').addClass("fade")
          $('#Hist_DayEnd_Data tr').addClass("fade")
          $('#Hist_DayEnd_Data_Mobile tr').addClass("fade")
        }

        updateTotal()
      });
    });


    All_Strategy()

    weekday_addition()


    order_quantity_per_lot()

    Right_Table_Heading()
    Right_Table_Data()

    order_qty_total()
    Printing_to_table()

    $("#Hist_DayEnd_table input[type='checkbox']").on("change", function () {
      // console.log('clicked')
      var $row = $(this).closest("tr");
      var index = $($row).index();
      if (!this.checked) {
        $row.addClass("fade");
        $('#Hist_Daily_Data tr:eq(' + index + ')').addClass("fade")
      } else {
        $row.removeClass("fade");
        $('#Hist_Daily_Data tr:eq(' + index + ')').removeClass("fade")
      }

      updateTotal()
    });

    $("#Hist_DayEnd_table_Mobile input[type='checkbox']").on("change", function () {
      // console.log('clicked')
      var $row = $(this).closest("tr");
      var index = $($row).index();
      if (!this.checked) {
        $row.addClass("fade");
        $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').addClass("fade")
      } else {
        $row.removeClass("fade");
        $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').removeClass("fade")
      }

      updateTotal()
    });

    // To Enable or Disable all function
    $('#showAllStrategy').on('change.bootstrapSwitch', function (e) {
      let val = e.target.checked;
      if (val == true) {
        $("input[type='checkbox']").prop('checked', true);
        $('#Hist_Daily_Data tr').removeClass("fade")
        $('#Hist_Daily_Data_Mobile tr').removeClass("fade")
        $('#Hist_DayEnd_Data tr').removeClass("fade")
        $('#Hist_DayEnd_Data_Mobile tr').removeClass("fade")
      }
      else if (val == false) {
        $("input[type='checkbox']").prop('checked', false);
        $('#Hist_Daily_Data tr').addClass("fade")
        $('#Hist_Daily_Data_Mobile tr').addClass("fade")
        $('#Hist_DayEnd_Data tr').addClass("fade")
        $('#Hist_DayEnd_Data_Mobile tr').addClass("fade")
      }

      updateTotal()
    });
  })

  if ($(window).width() > 576) {
    $('.container-fluid').hide();
    $('.table-container').show();
  }
  else {
    $('.container-fluid').show();
    $('.table-container').hide();
  }

  $(window).resize(function () {
    if ($(window).width() > 576) {
      $('.container-fluid').hide();
      $('.table-container').show();
    }
    else {
      $('.container-fluid').show();
      $('.table-container').hide();
    }
  })
})

$(document).on("dblclick", ".Hist_DayEnd_table td:first-child", function () {
  // Rest of your code...
  cellText = $(this).text();
  cellText = cellText.substr(2, cellText.length);
  if (confirm("Do you want to delete this cell?")) {
    if (confirm("Are you sure you want to delete " + cellText)) {
      var Account_option_1 = $('#Account_option').val()
      if (Account_option_1 == "update1") { acoount_no = 1 }
      else if (Account_option_1 == "update2") { acoount_no = 2 }
      else if (Account_option_1 == "update3") { acoount_no = 3 }

      $.post(root + route_delete, { acc: acoount_no, strat: cellText }, function (data, status) {
        console.log(data)
      }).fail(function (response) {
        console.log('Error: ' + response);
      })

      $.get(root + route_fetch_hist_dayend, function (data, status) {
        if (data == 'UnAuthorised Access') {
          window.location.href = '/'
        } else {
          Hist_DayEnd = data
          API_Data = data;
        }
      }).fail(function (response) {
        console.log('Error: ' + response);
      })


      $.each(stratergy_mtm_2, function (key, value) {
        delete value[cellText];
      });
      var Account_option_1 = $('#Account_option').val()
      // var storedValue = localStorage.getItem(Account_option_1);
      // if (storedValue == null) {
      //   value_1 = []
      //   value_1.push(cellText)
      //   localStorage.setItem(Account_option_1, JSON.stringify(value_1));
      // } else {
      //   storedValue = JSON.parse(storedValue)
      //   storedValue.push(cellText)
      //   localStorage.setItem(Account_option_1, JSON.stringify(storedValue));
      // }

      $('#Hist_DayEnd_Data').empty()
      $('#Hist_Daily_table').empty()
      $('#Hist_Daily_table').append(`<tbody id="Hist_Daily_Data"></tbody>`)
      $('#Hist_DayEnd_Data_Mobile').empty()
      $('#Hist_Daily_table_Mobile').empty()
      $('#Hist_Daily_table_Mobile').append(`<tbody id="Hist_Daily_Data_Mobile"></tbody>`)

      Monday = {}
      Tuesday = {}
      Wednesday = {}
      Thursday = {}
      Friday = {}

      order_quantity = {}
      order_quantity_Final = {}

      week_day_table = {}
      All_WeekDay = []
      Right_Table_Data_Array = []
      Final_Right_Table_Data_Array = []

      Daily_Lot = []
      Final_Daily_Lot = []

      Right_Table_Total_Array = []

      remove_unnecessary_strategy()

      let Account_option = $('#Account_option').val()

      // for (var i = 0; i < Object.keys(stratergy_mtm_2).length; i++) {
      //   var text = moment(Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] * 1000).format('dddd')
      //   if (text == "Monday") { Monday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }
      //   else if (text == "Tuesday") { Tuesday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }
      //   else if (text == "Wednesday") { Wednesday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }
      //   else if (text == "Thursday") { Thursday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }
      //   else if (text == "Friday") { Friday[Object.keys(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1]] = Object.values(stratergy_mtm_2)[Object.values(stratergy_mtm_2).length - 1] }

      //   let key = Object.keys(stratergy_mtm_2)[i];
      //   for (let j = 0; j < Hist_DayEnd.length; j++) {
      //     let key_1 = Hist_DayEnd[j][0];
      //     if (key == key_1) {
      //       if (JSON.parse(Hist_DayEnd[j][1])[Account_option]['order_updates'] != undefined) {
      //         let value_1 = JSON.parse(Hist_DayEnd[j][1])[Account_option]['order_updates']
      //         order_quantity[key] = value_1;
      //       }
      //     }
      //   }
      // }

      MTM_strategy(Account_option)

      All_Strategy()
      console.log('function call done')

      weekday_addition()

      order_quantity_per_lot()

      Right_Table_Heading()
      Right_Table_Data()

      order_qty_total()
      Printing_to_table()

      $("#Hist_DayEnd_table input[type='checkbox']").on("change", function () {
        // console.log('clicked')
        var $row = $(this).closest("tr");
        var index = $($row).index();
        if (!this.checked) {
          $row.addClass("fade");
          $('#Hist_Daily_Data tr:eq(' + index + ')').addClass("fade")
        } else {
          $row.removeClass("fade");
          $('#Hist_Daily_Data tr:eq(' + index + ')').removeClass("fade")
        }

        updateTotal()
      });

      $("#Hist_DayEnd_table_Mobile input[type='checkbox']").on("change", function () {
        // console.log('clicked')
        var $row = $(this).closest("tr");
        var index = $($row).index();
        if (!this.checked) {
          $row.addClass("fade");
          $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').addClass("fade")
        } else {
          $row.removeClass("fade");
          $('#Hist_Daily_Data_Mobile tr:eq(' + index + ')').removeClass("fade")
        }

        updateTotal()
      });

      // To Enable or Disable all function
      $('#showAllStrategy').on('change.bootstrapSwitch', function (e) {
        let val = e.target.checked;
        if (val == true) {
          $("input[type='checkbox']").prop('checked', true);
          $('#Hist_Daily_Data tr').removeClass("fade")
          $('#Hist_Daily_Data_Mobile tr').removeClass("fade")
          $('#Hist_DayEnd_Data tr').removeClass("fade")
          $('#Hist_DayEnd_Data_Mobile tr').removeClass("fade")
        }
        else if (val == false) {
          $("input[type='checkbox']").prop('checked', false);
          $('#Hist_Daily_Data tr').addClass("fade")
          $('#Hist_Daily_Data_Mobile tr').addClass("fade")
          $('#Hist_DayEnd_Data tr').addClass("fade")
          $('#Hist_DayEnd_Data_Mobile tr').addClass("fade")
        }

        updateTotal()
      });
    }
  }
});
