//$(document).ready(function () {
//    $('#example').DataTable();
//});
//1109879
function LoadHeThong(type) {
    document.getElementById('type_System').value = type;
    var title = "";
    if (type == "HTDonviCap1") {
        title = "Danh sách đơn vị dự toán cấp 1";
    }    

    var page_url = "";
    page_url += "    <ol class=\"breadcrumb page-breadcrumb pull-left\">";
    page_url += "        <li><i class=\"fa fa-home\"></i>&nbsp;Trang chủ>&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i>&nbsp;&nbsp;</li>";
    page_url += "        <li class=\"\">Hệ thống&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i> &nbsp;&nbsp;</li>";
    page_url += "        <li class=\"active\">" + title + "</li>";
    page_url += "    </ol>";
    $('#page-current-url').html(page_url);
    var html = '';
    html += "            <div class=\"row\">";
    html += "            <div class=\"col-lg-12\">";    
    html += "                    <button class=\"btn btn-info\" onclick=\"AddSystem('" + type + "')\" data-toggle=\"modal\" data-target=\"#SystemModal\" style=\"margin-bottom: 5px;\">";
    html += "                        Tạo mới";
    html += "                    </button>";        
    html += "            </div>";
    html += "            </div>";
    html += "<div id=\"table_wrapper\">";
    html += "</div>";
    $('.page-content').html(html);
    LoadTableSystem(type)
}
function LoadTableSystem(type) {
    var html = '';
    $.get('/Home/SystemHT?type=' + type, function (data, status) {
        var obj = JSON.parse(data)
        var head = obj.head;
        var prop = obj.prop;
        var body = obj.body;
        var islogin = obj.islogin;
        if (islogin == false)
            window.location.href = "/Home/Login"
        html += DrawTableSystem(head, prop, body);
        $('#table_wrapper').html(html);
        $('#example').DataTable({
            "pageLength": 25,
            "order": [],
            "ordering": false
        });
    }).fail(function (ajaxContext) {
        alert("Status : " + ajaxContext.status + ", Status Text : " + ajaxContext.statusText);
    });
}
function DrawTableSystem(head, prop, body) {
    var type = document.getElementById('type_System').value;
    var html = '';
    html += "        <table id=\"example\" class=\"display table table-striped table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "                <tr>";
    for (var idx in head) {
        html += "<th>" + head[idx] + "</th>";
    }
    if (type == "HTDonviCap1") {
        html += "<th></th>";
    }
    html += "                </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    for (var idx in body) {
        html += "<tr>";
        for (var jdx in prop) {
            if (jdx == prop.length - 1) {
                if (type == "HTDonviCap1") {
                    html += "   <td>";
                    html += DrawButtonGrid_System(body[idx]);
                    html += "   </td>";
                }
            }
            else {
                var value = "";
                if (body[idx][prop[jdx]] != null) {
                    value = body[idx][prop[jdx]];
                }
                html += "<td>" + value + "</td>";
            }
        }
        html += "</tr>";
    }
    html += "            </tbody>";
    html += "        </table>";
    return html;
}
function DrawTableSystemv2(head, prop, body) {
    var type = document.getElementById('type_System').value;
    var html = '';
    html += "        <table id=\"examplev2\" class=\"display table table-striped table-bordered\" style =\"width:100%\">";
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
function DrawButtonGrid_System(obj) {
    var jsonObject = JSON.stringify(obj);
    var click = "onclick=\"UpdateGridSystem(event)\"";
    var param = "data-param='\"" + jsonObject + "\"'";
    html = "";
    //html += "    <button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#SystemModal\" " + param + " " + click + "\">";
    //html += "        Sửa";
    //html += "    </button>";
    html += "    <button type=\"button\" class=\"btn btn-danger\" " + param + " onclick=\"DeleteGridSystem(event)\">";
    html += "        Xóa";
    html += "    </button>";
    return html;
}
function SearchSystem(type) {
    var MaDV = document.getElementById("inputCodeUnit").value;
    var Nam = document.getElementById("inputYear").value;
    if (MaDV.length == 0) {
        alert("Yêu cầu chọn Tên đơn vị !");
        return;
    }
    if (Nam.length == 0) {
        alert("Yêu cầu nhập Năm !");
        return;
    }
    LoadTableSystem(type)
}

//
function AddSystem(type) {
    var html = "";
    $.get('/Home/SelectSystemHT', function (data, status) {
        var obj = JSON.parse(data)
        var head = obj.head;
        var prop = obj.prop;
        var body = obj.body;
        var islogin = obj.islogin;
        if (islogin == false)
            window.location.href = "/Home/Login"
        //
        html += "        <div class=\"modal-dialog\" role=\"document\" style=\"width: 60vw;\">";
        html += "            <div class=\"modal-content\">";
        html += "                <div class=\"modal-header\">";
        if (type == "HTDonviCap1") {
            html += "                    <h5 class=\"modal-title\">Thêm Danh sách đơn vị dự toán cấp 1</h5>";
        }
        html += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
        html += "                        <span aria-hidden=\"true\">&times;</span>";
        html += "                    </button>";
        html += "                </div>";
        html += "                <div class=\"modal-body\">";

        //
        html += "                   <div class=\"row\">";
        html += DrawTableSystemv2(head, prop, body);
        html += "                   </div>";
        //
        html += "                </div>";
        html += "                <div class=\"modal-footer\">";
        html += "                    <button type=\"button\" class=\"btn btn-success\" onclick=\"SaveSystem('" + type + "')\">Đồng ý thêm</button>";
        html += "                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Đóng</button>";
        html += "                </div>";
        html += "            </div>";
        html += "        </div>";
        $('#SystemModal').html(html);
        var table = $('#examplev2').DataTable({
            "pageLength": 10,
            "order": [],
            "ordering": false
        });
        $('#examplev2 tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var data = table.row(this).data();
                document.getElementById('objMa_SelectModal_System').value = data[1];
                document.getElementById('objTitle_SelectModal_System').value = data[2];                                
            }            
        });
    }).fail(function (ajaxContext) {
        alert("Status : " + ajaxContext.status + ", Status Text : " + ajaxContext.statusText);
    });
}
//
function SaveSystem(type) {
    //var id = $("#keyId").val();
    if (type == "HTDonviCap1") {
        var maDonVi = $("#objMa_SelectModal_System").val();
        var tenDonVi = $("#objTitle_SelectModal_System").val();
        var obj = {            
            maDonVi: maDonVi,
            tenDonVi: tenDonVi            
        }
        $.post("/Home/SaveSystem", obj, function (data) {
            alert(data);
            LoadTableSystem(type);
        });
    }
}
function DeleteGridSystem(event) {
    var jsonObject = event.target.getAttribute("data-param");
    jsonObject = jsonObject.slice(1, jsonObject.length - 1);
    var object = JSON.parse(jsonObject);
    var type = document.getElementById("type_System").value;
    var r = confirm("Bạn muốn xóa bản ghi này không ?");
    if (r == true) {
        if (type == "HTDonviCap1") {
            var obj = {
                maDonVi: object.Ma,
                type: type
            }
            $.post("/Home/DeleteSystem", obj, function (data) {
                alert(data);
                LoadTableSystem(type);
            });
        }
    }
}

