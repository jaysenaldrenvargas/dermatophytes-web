var database = firebase.database();

function getData() {
    var searchTerm = document.getElementById("search").value.toLowerCase();
    database.ref("data").orderByChild("id").equalTo(searchTerm).on('value', function (snapshot) {
        if (snapshot.exists()) {
            var content = '';
            $('#table-content').empty();
            snapshot.forEach(function (data) {
                var val = data.val();
                content += '<tr>';
                if (val.date) {
                    content += '<td class="text-nowrap">' + val.date + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.time1) {
                    content += '<td>' + val.time1 + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.id) {
                    content += '<td>' + val.id + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.img1) {
                    var x = val.img1;
                    x = x.trim();
                    content += `<td><a type="button" onclick='modal_image("${x}");'><p hidden>${x}</p><i class="fas fa-image"></i></a></td>`;
                } else {
                    content += '<td> - </td>';
                }

                if (val.R != "1") {
                    content += '<td>' + val.R + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.D != "1") {
                    content += '<td>' + val.D + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.G != "1") {
                    content += '<td>' + val.G + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.Y != "1") {
                    content += '<td>' + val.Y + '</td>';
                } else {
                    content += '<td> - </td>';
                }
                var total1 = (parseFloat(val.R) + parseFloat(val.D) + parseFloat(val.G) + parseFloat(val.Y)).toFixed(2);
                content += '<td>' + String(total1) + '</td>';

                if (val.time2) {
                    content += '<td>' + val.time2 + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.img2) {
                    var x = val.img2;
                    x = x.trim();
                    content += `<td><a type="button" onclick='modal_image("${x}");'><p hidden>${x}</p><i class="fas fa-image"></i></a></td>`;
                } else {
                    content += '<td> - </td>';
                }

                if (val.R2 != "1") {
                    content += '<td>' + val.R2 + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.D2 != "1") {
                    content += '<td>' + val.D2 + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.G2 != "1") {
                    content += '<td>' + val.G2 + '</td>';
                } else {
                    content += '<td> - </td>';
                }

                if (val.Y2 != "1") {
                    content += '<td>' + val.Y2 + '</td>';
                } else {
                    content += '<td> - </td>';
                }
                var total2 = (parseFloat(val.R2) + parseFloat(val.D2) + parseFloat(val.G2) + parseFloat(val.Y2)).toFixed(2);
                content += '<td>' + String(total2) + '</td>';

                content += '<td>' + String((total1 - total2).toFixed(2)) + '</td>';
                content += '</tr>';
            })
            $('#table-content').append(content);
            $("#table-content").each(function (elem, index) {
                var arr = $.makeArray($("tr", this).detach());
                arr.reverse();
                $(this).append(arr);
            })
            var table = document.getElementById("table1");
            var tbodyRowCount = table.tBodies[0].rows.length;
            document.getElementById('data_num').innerHTML = '[ ' + tbodyRowCount + ' ] data gathered';

            $("td").filter(":nth-child(9)").css({ "background-color": "#198754", "font-weight": "bold", "color": "white" });
            $("td").filter(":nth-child(16)").css({ "background-color": "#198754", "font-weight": "bold", "color": "white" });
            $("td").filter(":nth-child(17)").css({ "background-color": "#0d6efd", "font-weight": "bold", "color": "white" });
            var table = document.getElementById("table1");
            var tbodyRowCount = table.tBodies[0].rows.length;
            document.getElementById('data_num').innerHTML = '[ ' + tbodyRowCount + ' ] data gathered';
        } else {
            alert("No data found.");
        }
    })
};


function modal_image(x) {
    console.log(x);
    document.getElementById('image_modal').src = x;
    $('#exampleModal').modal('show');
};


function excel_export() {
    var searchTerm = document.getElementById("search").value.toLowerCase();
    var today = new Date();
    date_str = (('0' + (today.getMonth() + 1)).slice(-2) + '-'
        + ('0' + today.getDate()).slice(-2)
        + '-' + today.getFullYear())

    time = ('0' + (today.getHours())).slice(-2)
        + "_" + ('0' + (today.getMinutes())).slice(-2)

    let table = document.getElementsByTagName("table");
    TableToExcel.convert(table[0], {
        name: `archive-data--` + searchTerm + `--exAt-` + date_str + `-` + time + `.xlsx`,
        sheet: {
            name: 'Sheet 1'
        }
    });
};

function ClearFields() {
    location.reload();
};