//$(document).ready(function () {
//    $('#example').DataTable();
//});
//'1007201','1109879',2019,0
//$("#js-example-tags").select2({
//    tags: true
//});
//<select class="form-control" id="js-example-tags">
//    <option selected="selected">orange</option>
//    <option>white</option>
//    <option>purple</option>
//</select>
function LoadSoLieu(type) {
    document.getElementById('type_Data').value = type;
    var title = "";
    if (type == "SLTHTC") {
        title = "Số liệu chỉ tiêu THTC";
    }
    else if (type == "SLKQHD") {
        title = "Số liệu chỉ tiêu KQHD";
    }
    else if (type == "SLLCTT_GT") {
        title = "Số liệu chỉ tiêu LCTT-GT";
    }
    else if (type == "SLTM_BCTC") {
        title = "Số liệu chỉ tiêu TM BCTC";
    }
    else if (type == "SLBSTTTC_P2") {
        title = "Số liệu chỉ tiêu bổ sung TTTC-P2";
    }
    else if (type == "SLQTTCCN") {
        title = "Số liệu quyết toán Thu chi - Các nguồn";
    }
    else if (type == "SLTDTPLP") {
        title = "Số liệu Xét duyệt(Thẩm định) Thu phí, Lệ phí";
    }
    else if (type == "TT1372017BTC") {
        title = "Đối chiếu số liệu KQHD TT137/2017-BTC";
    }
    var page_url = "";
    page_url += "    <ol class=\"breadcrumb page-breadcrumb pull-left\">";
    page_url += "        <li><i class=\"fa fa-home\"></i>&nbsp;Trang chủ&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i>&nbsp;&nbsp;</li>";
    page_url += "        <li class=\"\">Số liệu&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i> &nbsp;&nbsp;</li>";
    page_url += "        <li class=\"active\">" + title +"</li>";
    page_url += "    </ol>";
    $('#page-current-url').html(page_url);
    var html = '';
    html += "<div id=\"content_Data\">";
    html += DrawControlsData(type);
    html += "</div>";
    html += "<div id=\"table_wrapper\">";
    html += "</div>";
    $('.page-content').html(html);
    var obj = null;
    var ma = document.getElementById('objUnit').value;
    var ten = document.getElementById('objUnit').getAttribute('data-name');
    if (ma.length != 0 && ten.length != 0) {
        obj = { id: ma, title: ten }
    }
    LoadData("inputCodeUnit", obj);
    //LoadData("inputCodeUnitParent", null);    
}
function LoadTableData(type) {
    var MaDVTH = document.getElementById("inputCodeUnitParent").value;
    var MaDV = document.getElementById("inputCodeUnit").value;
    var Nam = document.getElementById("inputYear").value;
    var Loai = document.getElementById("hdType").value;
    if (MaDVTH.length == 0) {
        return;
    }
    if (MaDV.length == 0) {
        return;
    }
    if (Nam.length == 0) {        
        return;
    }    
    var html = '';
    $.get('/Home/Data?type=' + type + '&Nam=' + Nam + '&MaDVTH=' + MaDVTH + '&MaDV=' + MaDV + '&Loai=' + Loai, function (data, status) {
        console.log(status)
        var obj = JSON.parse(data)
        var head = obj.head;   
        var prop = obj.prop;
        var body = obj.body;
        var islogin = obj.islogin;
        if (islogin == false)
            window.location.href = "/Home/Login"
        html += DrawTableCategories(head, prop, body);
        $('#table_wrapper').html(html);
        $('#example').DataTable({
            "pageLength": 25,
            "ordering": false
        });
    }).fail(function (ajaxContext) {        
        alert("Status : " + ajaxContext.status + ", Status Text : " + ajaxContext.statusText);
    }); 
}
function DrawControlsData(type) {
    var year = new Date().getFullYear();
    html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-lg-12\">";
    html += "<div class=\"portlet box portlet-blue\">";
    html += "   <div class=\"portlet-header\">";
    html += "       <div class=\"caption\">";
    html += "           Tìm kiếm";
    html += "       </div>";
    html += "   </div>";
    html += "<div class=\"portlet-body\">";
    html += "   <div class=\"form-body\" style=\"padding-bottom: 40px;\">";
    html += "           <div class=\"form-group\">";
    html += "           <label for=\"inputYear\" class=\"col-md-1 control-label text-right\"><strong>Năm</strong> <span class=\"require\">(*)</span></label>";
    html += "            <div class=\"col-md-2\">";
    html += "               <input type=\"number\" class=\"form-control\" id=\"inputYear\" value=" + year + " />";;
    html += "            </div>";
    html += "            <input id=\"inputCodeUnitParent\" class=\"form-control\" type=\"hidden\" value=\"1007201\" />";
    html += "            <label for=\"inputCodeUnit\" class=\"col-md-1 control-label text-right\"><strong>Tên đơn vị</strong> <span class=\"require\">(*)</span></label>";
    html += "            <div class=\"col-md-4\">";
    html += "               <select id=\"inputCodeUnit\" class=\"form-control\"></select>";
    html += "            </div>";

    html += "            <div class=\"col-md-2 text-left\">";
    html += "                <input type=\"hidden\" id=\"hdType\" value=\"0\" />";
    html += "                    <button class=\"btn btn-success\" onclick=\"SearchData('" + type + "')\">";
    html += "                        Tìm kiếm";
    html += "                    </button>";
    html += "            </div>";
    html += "       </div>";
    html += "   </div>";
    html += "</div>";
    return html;
}
function DrawTableData(head, prop, body) {
    var html = '';
    html += "    <div class=\"row\">";
    html += "        <table id=\"example\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "                <tr>";    
    for (var idx in head) {        
        html += "<th>" + head[idx] + "</th>";
    }
    //html += "<th></th>";
    html += "                </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    for (var idx in body) {
        html += "<tr>";
        for (var jdx in prop) {
            if (jdx == prop.length - 1) {                
                //html += "   <td>";
                //html += DrawButtonGrid();
                //html += "   </td>";
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
    html += "    </div>";
    return html;
}
function SearchData(type) {
    var MaDVTH = document.getElementById("inputCodeUnitParent").value;
    var MaDV = document.getElementById("inputCodeUnit").value;
    var Nam = document.getElementById("inputYear").value;
    if (MaDVTH.length == 0) {
        alert("Yêu cầu chọn Tên đơn vị tổng hợp !");
        return;
    }
    if (MaDV.length == 0) {
        alert("Yêu cầu chọn Tên đơn vị !");
        return;
    }
    if (Nam.length == 0) {
        alert("Yêu cầu nhập Năm !");
        return;
    }    
    LoadTableData(type)
}
//
//
function LoadData(name, obj) {
    $('#' + name).select2({
        minimumInputLength: 3,
        ajax: {
            url: '/Home/ListUnit',
            type: 'POST',
            dataType: 'json',
            data: function (params) {
                return {
                    keyWord: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.ten,
                            id: item.ma,
                            data: item
                        };
                    })
                };
            }
        }
    });
    if (obj != null) {
        var objSelect = $('#' + name);
        var option = new Option(obj.title, obj.id, true, true);
        objSelect.append(option).trigger('change');
        objSelect.trigger({
            type: 'select2:select'
        });
    }
    $(".select2").css("width", "100%");
}

