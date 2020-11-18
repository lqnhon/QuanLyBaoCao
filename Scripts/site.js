
function LogOut() {    
    $.get('/Home/Logout', function (data, status) {
        window.location.href = "/Home/Login";
    }).fail(function (ajaxContext) {
        alert("Status : " + ajaxContext.status + ", Status Text : " + ajaxContext.statusText);
    });    
}
function selectedUnit() {
    var ma = document.getElementById('objUnit').value;
    if (ma.length == 0) {
        alert('Vui lòng chọn đơn vị');
        return;
    }
    $('#closeModal').click();
}
function SearchHomeYear() {
    var year = document.getElementById("homeYear").value;
    html = '';
    $.get('/Home/DashBoard?yearHome=' + year, function (data, status) {
        var obj = JSON.parse(data)
        var head = obj.head;
        var prop = obj.prop;
        var body = obj.body;
        var islogin = obj.islogin;
        if (islogin == false)
            window.location.href = "/Home/Login"
        html += DrawTableHomePage(head, prop, body);
        $('#HomePage_wrapper').html(html);
        $('#tableHomePage').DataTable({
            "pageLength": 20,
            "ordering": false
        });
    }).fail(function (ajaxContext) {
        alert("Status : " + ajaxContext.status + ", Status Text : " + ajaxContext.statusText);
    });
}
function DrawTableHomePage(head, prop, body) {
    var html = '';
    html += "        <table id=\"tableHomePage\" class=\"display table table-striped table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "                <tr>";
    for (var idx in head) {
        html += "<th>" + head[idx] + "</th>";
    }
    html += "                </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    for (var idx in body) {
        html += "<tr>";
        for (var jdx in prop) {
            var value = "";
            if (body[idx][prop[jdx]] != null) {
                value = body[idx][prop[jdx]];
            }
            html += "<td>" + value + "</td>";
        }
        html += "</tr>";
    }
    html += "            </tbody>";
    html += "        </table>";
    return html;
}