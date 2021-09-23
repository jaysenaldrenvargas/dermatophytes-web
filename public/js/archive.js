var database = firebase.database();

function getData() {
    var searchTerm = document.getElementById("search").value.toLowerCase();
    database.ref("data").orderByChild("date").equalTo(searchTerm).on('value', function (snapshot) {
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

                if (val.time) {
                    content += '<td>' + val.time + '</td>';
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

                if (val.area1) {
                    content += '<td>' + val.area1 + '</td>';
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

                if (val.area2) {
                    content += '<td>' + val.area2 + '</td>';
                } else {
                    content += '<td> - </td>';
                }

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