var database = firebase.database();
var date_str;
var time;

$(function () {
    setInterval(date_time, 1000);
    getData();
});

function date_time() {
    var today = new Date();
    date_str = (('0' + (today.getMonth() + 1)).slice(-2) + '-'
        + ('0' + today.getDate()).slice(-2)
        + '-' + today.getFullYear())

    time = ('0' + (today.getHours())).slice(-2)
        + ":" + ('0' + (today.getMinutes())).slice(-2)
        + ":" + ('0' + (today.getSeconds())).slice(-2)
    document.getElementById("date_today").innerHTML = "&nbsp;&nbsp;[ DATE ] : <b> " + date_str + "</b> &nbsp;&nbsp;&nbsp; [ TIME ] : <b> " + time + "</b>";
};


function getData() {
    var today = new Date();
    date_str = (('0' + (today.getMonth() + 1)).slice(-2) + '-'
        + ('0' + today.getDate()).slice(-2)
        + '-' + today.getFullYear())

    database.ref("data").orderByChild("date").equalTo(date_str).on('value', function (snapshot) {
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
            if ($('#table-content tr').length == 0) {
                alert("No data available.");
            }
        }
    })
};

function modal_image(x) {
    console.log(x);
    document.getElementById('image_modal').src = x;
    $('#exampleModal').modal('show');
};


function excel_export() {
    var today = new Date();
    date_str = (('0' + (today.getMonth() + 1)).slice(-2) + '-'
        + ('0' + today.getDate()).slice(-2)
        + '-' + today.getFullYear())

    time = ('0' + (today.getHours())).slice(-2)
        + "_" + ('0' + (today.getMinutes())).slice(-2)

    let table = document.getElementsByTagName("table");
    TableToExcel.convert(table[0], {
        name: `data--` + date_str + `--` + time + `.xlsx`,
        sheet: {
            name: 'Sheet 1'
        }
    });
};


