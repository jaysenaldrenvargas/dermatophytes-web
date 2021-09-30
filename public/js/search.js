var database = firebase.database();
var datakey;
function getData() {
    var R1 = 0, G1 = 0, D1 = 0, Y1 = 0, R2 = 0, G2 = 0, D2 = 0, Y2 = 0;
    var searchTerm = document.getElementById("search").value.toLowerCase();
    database.ref("data").orderByChild("id").equalTo(searchTerm).once('value', function (snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                datakey = data.key;
                var val = data.val();
                if (val.date) {
                    $('#date').text("Date: " + val.date);
                }

                if (val.time1) {
                    $("#time1").text("Time: " + val.time1);
                }

                if (val.id) {
                    $('#id').val(val.id);
                }

                if (val.img1) {
                    $('#img1').attr("src", val.img1);
                } else {
                    $('#img1').attr("src", "assets/img/error-404-monochrome.svg");
                }

                if (val.R != "1") {
                    R1 = val.R;
                }

                if (val.D != "1") {
                    D1 = val.D;
                }

                if (val.G != "1") {
                    G1 = val.G;
                }

                if (val.Y != "1") {
                    Y1 = val.Y;
                }

                var total1 = (parseFloat(val.R) + parseFloat(val.D) + parseFloat(val.G) + parseFloat(val.Y)).toFixed(2);
                $("#total1").text("Total Detected: " + total1 + "%");

                if (val.time2) {
                    $("#time2").text("Time: " + val.time2);
                } else {
                    $("#time2").text("-");
                }

                if (val.img2) {
                    $("#img2").attr("src", val.img2);
                } else {
                    $('#img2').attr("src", "assets/img/error-404-monochrome.svg");
                }

                if (val.R2 != "1") {
                    R2 = val.R2;
                }

                if (val.D2 != "1") {
                    D2 = val.D2;
                }

                if (val.G2 != "1") {
                    G2 = val.G2;
                }

                if (val.Y2 != "1") {
                    Y2 = val.Y2;
                }

                if (val.Y2) {
                    var total2 = (parseFloat(val.R2) + parseFloat(val.D2) + parseFloat(val.G2) + parseFloat(val.Y2)).toFixed(2);
                    $("#total2").text("Total Detected: " + total2 + "%");
                } else {
                    $("#total2").text("-");
                }

                if (val.name) {
                    $("#name").val(val.name);
                } else {
                    $("#name").val('');
                }

                if (val.contact) {
                    $("#contact").val(val.contact);
                } else {
                    $("#contact").val('');
                }

                if (val.age) {
                    $("#age").val(val.age);
                } else {
                    $("#age").val('');
                }

                if (val.email) {
                    $("#email").val(val.email);
                } else {
                    $("#email").val('');
                }

                if (val.contact) {
                    $("#contact").val(val.contact);
                } else {
                    $("#contact").val('');
                }

                if (val.sex) {
                    $("#sex").val(val.sex);
                } else {
                    $("#sex").val('');
                }
            })
        } else {
            alert("Patient ID [ " + searchTerm + " ] not found.\nReloading the page ...");
            location.reload();
        }
    })
};

function deleteData() {
    database.ref("data").child(datakey).remove().then(() => { alert("Data removed."); location.reload(); });
}

function updateData() {
    var name = $("#name").val();
    var sex = $("#sex").val();
    var age = $("#age").val();
    var contact = $("#contact").val();
    var email = $("#email").val();

    var data = {
        "sex": sex,
        "name": name,
        "age": age,
        "contact": contact,
        "email": email
    }
    database.ref("data").child(datakey).update(data).then(() => {
        alert("Data updated.");
    });

}

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
