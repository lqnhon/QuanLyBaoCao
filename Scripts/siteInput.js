//$(document).ready(function () {
//    $('#example').DataTable();
//});
//1109879
function LoadNhapLieu(type) {
    document.getElementById('type_Input').value = type;
    var title = "";
    if (type == "B01BCTC_TT99") {
        title = "Nhập Báo cáo tài chính tổng hợp B01/BCTC–TH TT99";
    }
    else if (type == "B02BCTC_TT99") {
        title = "Nhập Báo cáo kết quả hoạt động tổng hợp B02/BCTC–TH TT99";
    }
    else if (type == "B03BCTC_TT99") {
        title = "Nhập Báo cáo lưu chuyển tiền tệ tổng hợp B03/BCTC–TH TT99";
    }
    else if (type == "B04BCTC_TT99") {
        title = "Nhập Thuyết minh báo cáo tài chính tổng hợp B04/BCTC–TH TT99";
    }
    else if (type == "B01BSTT_TT99") {
        title = "Nhập Báo cáo bổ sung tài chính B01/BSTT TT99";
    }  
    //
    else if (type == "B01BCTC_TT107") {
        title = "Nhập Báo cáo tài chính tổng hợp B01/BCTC–TH TT107";
    }
    else if (type == "B02BCTC_TT107") {
        title = "Nhập Báo cáo kết quả hoạt động tổng hợp B02/BCTC–TH TT107";
    }
    else if (type == "B03BCTC_TT107") {
        title = "Nhập Báo cáo lưu chuyển tiền tệ tổng hợp B03a/BCTC–TH TT107";
    }
    else if (type == "B04BCTC_TT107") {
        title = "Nhập Thuyết minh báo cáo tài chính tổng hợp B04/BCTC–TH TT107";
    }
    else if (type == "B01BSTT_TT107") {
        title = "Nhập Báo cáo bổ sung tài chính B01/BSTT TT107";
    }  
    //
    else if (type == "B01BCTC_TT107GT") {
        title = "Nhập Báo cáo tài chính tổng hợp B01/BCTC–TH TT107 GT";
    }
    else if (type == "B02BCTC_TT107GT") {
        title = "Nhập Báo cáo kết quả hoạt động tổng hợp B02/BCTC–TH TT107 GT";
    }
    else if (type == "B03BCTC_TT107GT") {
        title = "Nhập Báo cáo lưu chuyển tiền tệ tổng hợp B03b/BCTC–TH TT107 GT";
    }
    else if (type == "B04BCTC_TT107GT") {
        title = "Nhập Thuyết minh báo cáo tài chính tổng hợp B04/BCTC–TH TT107 GT";
    }
    else if (type == "B01BSTT_TT107GT") {
        title = "Nhập Báo cáo bổ sung tài chính B01/BSTT TT107";
    }
    var page_url = "";
    page_url += "    <ol class=\"breadcrumb page-breadcrumb pull-left\">";
    page_url += "        <li><i class=\"fa fa-home\"></i>&nbsp;Trang chủ&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i>&nbsp;&nbsp;</li>";
    page_url += "        <li class=\"\">Nhập liệu&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i> &nbsp;&nbsp;</li>";
    page_url += "        <li class=\"active\">" + title + "</li>";
    page_url += "    </ol>";
    $('#page-current-url').html(page_url);
    var html = '';
    html += "<div id=\"content_Input\">";
    html += DrawControlsInput(type);
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
    LoadUnit("inputCodeUnit", obj);
}
function LoadTableInput(type) {
    var MaDV = document.getElementById("inputCodeUnit").value;
    var Nam = document.getElementById("inputYear").value;
    var Loai = document.getElementById("hdType").value;
    if (MaDV.length == 0) {
        return;
    }
    if (Nam.length == 0) {
        return;
    }
    var html = '';
    $.get('/Home/Input?type=' + type + '&Nam=' + Nam + '&MaDV=' + MaDV, function (data, status) {
        var obj = JSON.parse(data)        
        var head;var prop;var body;
        var islogin = obj.islogin;
        if (islogin == false)
            window.location.href = "/Home/Login"
        if (type == "B01BCTC_TT99") {            
            head = obj.head[0];
            prop = obj.prop[0];
            body = obj.body.Table;
            html += DrawTableInput(head, prop, body, "BÁO CÁO TÌNH HÌNH TÀI CHÍNH TỔNG HỢP", type);
        }
        else if (type == "B02BCTC_TT99") {            
            head = obj.head[0];
            prop = obj.prop[0];
            body = obj.body.Table1;
            html += DrawTableInput(head, prop, body, "BÁO CÁO KẾT QUẢ HOẠT ĐỘNG TỔNG HỢP", type);
        } 
        else if (type == "B03BCTC_TT99") {            
            head = obj.head[0];
            prop = obj.prop[0];
            body = obj.body.Table2;
            html += DrawTableInput(head, prop, body, "BÁO CÁO LƯU CHUYỂN TIỀN TỆ TỔNG HỢP", type);
        } 
        else if (type == "B04BCTC_TT99") {
            body = obj.body
            html += DrawTableInput_B04BCTC_TT99(body, type);
        } 
        else if (type == "B01BSTT_TT99") {
            body = obj.body
            html += DrawTableInput_B01BSTT_TT99(body, type);
        } 
        //
        else if (type == "B01BCTC_TT107") {
            head = obj.head[0];
            prop = obj.prop[0];
            body = obj.body.Table;
            html += DrawTableInput(head, prop, body, "BÁO CÁO TÌNH HÌNH TÀI CHÍNH TỔNG HỢP", type);
        }
        else if (type == "B02BCTC_TT107") {
            head = obj.head[0];
            prop = obj.prop[0];
            body = obj.body.Table1;
            html += DrawTableInput(head, prop, body, "BÁO CÁO KẾT QUẢ HOẠT ĐỘNG TỔNG HỢP", type);
        }
        else if (type == "B03BCTC_TT107") {
            head = obj.head[0];
            prop = obj.prop[0];
            body = obj.body.Table2;
            html += DrawTableInput(head, prop, body, "BÁO CÁO LƯU CHUYỂN TIỀN TỆ TỔNG HỢP", type);
        }
        else if (type == "B04BCTC_TT107") {
            body = obj.body
            html += DrawTableInput_B04BCTC_TT99(body, type);
        }
        else if (type == "B01BSTT_TT107") {
            body = obj.body
            html += DrawTableInput_B01BSTT_TT99(body, type);
        }
        //
        else if (type == "B01BCTC_TT107GT") {
            head = obj.head[0];
            prop = obj.prop[0];
            body = obj.body.Table;
            html += DrawTableInput(head, prop, body, "BÁO CÁO TÌNH HÌNH TÀI CHÍNH TỔNG HỢP", type);
        }
        else if (type == "B02BCTC_TT107GT") {
            head = obj.head[0];
            prop = obj.prop[0];
            body = obj.body.Table1;
            html += DrawTableInput(head, prop, body, "BÁO CÁO KẾT QUẢ HOẠT ĐỘNG TỔNG HỢP", type);
        }
        else if (type == "B03BCTC_TT107GT") {
            head = obj.head[0];
            prop = obj.prop[0];
            body = obj.body.Table2;
            html += DrawTableInput(head, prop, body, "BÁO CÁO LƯU CHUYỂN TIỀN TỆ TỔNG HỢP", type);
        }
        else if (type == "B04BCTC_TT107GT") {
            body = obj.body
            html += DrawTableInput_B04BCTC_TT99(body, type);
        }
        else if (type == "B01BSTT_TT107GT") {
            body = obj.body
            html += DrawTableInput_B01BSTT_TT99(body, type);
        }
        $('#table_wrapper').html(html);
        if (type == "B01BCTC_TT99" || type == "B02BCTC_TT99" || type == "B03BCTC_TT99") {
            $('#example').DataTable({
                "pageLength": 10,
                "ordering": false
            });
        }
        else if (type == "B04BCTC_TT99") {
            for (var idx = 1; idx <= 23; idx++) {
                $('#example' + idx).DataTable({
                    "pageLength": 10,
                    "ordering": false
                });
            }
        }       
        else if (type == "B01BSTT_TT99") {
            $('#example1').DataTable({
                "pageLength": 10,
                "ordering": false
            });
            $('#example2').DataTable({
                "pageLength": 10,
                "ordering": false
            });
        }
        //
        else if (type == "B01BCTC_TT107" || type == "B02BCTC_TT107" || type == "B03BCTC_TT107") {
            $('#example').DataTable({
                "pageLength": 10,
                "ordering": false
            });
        }
        else if (type == "B04BCTC_TT107") {
            for (var idx = 1; idx <= 23; idx++) {
                $('#example' + idx).DataTable({
                    "pageLength": 10,
                    "ordering": false
                });
            }
        }
        else if (type == "B01BSTT_TT107") {
            $('#example1').DataTable({
                "pageLength": 10,
                "ordering": false
            });
            $('#example2').DataTable({
                "pageLength": 10,
                "ordering": false
            });
        }
        //
        else if (type == "B01BCTC_TT107GT" || type == "B02BCTC_TT107GT" || type == "B03BCTC_TT107GT") {
            $('#example').DataTable({
                "pageLength": 10,
                "ordering": false
            });
        }
        else if (type == "B04BCTC_TT107GT") {
            for (var idx = 1; idx <= 23; idx++) {
                $('#example' + idx).DataTable({
                    "pageLength": 10,
                    "ordering": false
                });
            }
        }
        else if (type == "B01BSTT_TT107GT") {
            $('#example1').DataTable({
                "pageLength": 10,
                "ordering": false
            });
            $('#example2').DataTable({
                "pageLength": 10,
                "ordering": false
            });
        }
    }).fail(function (ajaxContext) {
        alert("Status : " + ajaxContext.status + ", Status Text : " + ajaxContext.statusText);
    });
}
function DrawControlsInput(type) {
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
    html += "       <div class=\"form-group\">";
    html += "           <label for=\"inputYear\" class=\"col-md-3 control-label text-right\"><strong>Năm</strong> <span class=\"require\">(*)</span></label>";    
    html += "            <div class=\"col-md-1\">";
    html += "               <input type=\"number\" class=\"form-control\" id=\"inputYear\" value=" + year + " />";;
    html += "            </div>";
    html += "            <label for=\"inputCodeUnit\" class=\"col-md-1 control-label text-right\"><strong>Tên đơn vị</strong> <span class=\"require\">(*)</span></label>";
    html += "            <div class=\"col-md-4\">";
    html += "               <select id=\"inputCodeUnit\" class=\"form-control\"></select>";
    html += "            </div>";
    html += "            <div class=\"col-md-2 text-left\">";
    html += "               <input type=\"hidden\" id=\"hdType\" value=\"0\" />";
    html += "                    <button class=\"btn btn-success\" onclick=\"SearchInput('" + type + "')\">";
    html += "                        Tìm kiếm";
    html += "                    </button>";
    html += "            </div>";
    html += "       </div>";
    html += "   </div>";
    html += "</div>";
    html += "       </div>";
    html += "   </div>";
    html += "</div>";
    return html;
}
//
function DrawTableInput_B04BCTC_TT99(bodyRs) {
    var type = document.getElementById('type_Input').value;
    //    
    var html = '';    
    html += "        <h4>Bảng 1: Tiền</h4>";
    
    
       
    html += "        <table id=\"example1\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";    
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table5;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 1);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //    
    html += "        <h4>Bảng 2: Các khoản phải thu khác</h4>";
    
    
       
    html += "        <table id=\"example2\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table6;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 2);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 3: Hàng tồn kho</h4>";
    
    
       
    html += "        <table id=\"example3\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table7;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 3);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 4: Tài sản cố định trang bị cho đơn vị</h4>";
    
    
       
    html += "        <table id=\"example4\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Tổng cộng</th>";
    html += "                   <th>TSCĐ hữu hình</th>";
    html += "                   <th>TSCĐ vô hình</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table8;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A5"] != null) {
            value = body[idx]["A5"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 4);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 5: Xây dựng cơ bản dở dang</h4>";
    
    
       
    html += "        <table id=\"example5\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table9;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 5);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 6: Tài sản khác</h4>";
    
    
       
    html += "        <table id=\"example6\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table10;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 6);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 7: Phải trả nợ vay</h4>";
    
    
       
    html += "        <table id=\"example7\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table11;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 7);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 8: Tạm thu</h4>";
    
    
       
    html += "        <table id=\"example8\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table12;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 8);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 9: Các quỹ đặc thù</h4>";
    
    
       
    html += "        <table id=\"example9\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table13;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 9);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 10: Các khoản nhận trước chưa ghi thu</h4>";
    
    
       
    html += "        <table id=\"example10\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table14;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 10);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 11: Nợ phải trả khác</h4>";
    
    
       
    html += "        <table id=\"example11\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table15;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 11);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 12: Nguồn vốn kinh doanh</h4>";
    
    
       
    html += "        <table id=\"example12\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table16;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 12);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>"; 
    //
    html += "        <h4>Bảng 13: Các quỹ</h4>";
    
    
       
    html += "        <table id=\"example13\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table17;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 13);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>"; 
    //
    html += "        <h4>Bảng 14: Tài sản thuần khác</h4>";
    
    
       
    html += "        <table id=\"example14\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table18;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 14);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>"; 
    //
    html += "        <h4>Bảng 15: Tài sản thuần của đơn vị thực hiện chế độ kế toán khác</h4>";
    
    
       
    html += "        <table id=\"example15\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table19;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 15);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>"; 
    //
    html += "        <h4>Bảng 16: Biến động của nguồn vốn</h4>";
    
    
       
    html += "        <table id=\"example16\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Nguồn vốn kinh soanh</th>";
    html += "                   <th>Chênh lệch tỷ giá</th>";
    html += "                   <th>Thặng dư,thâm hụt lũy kế</th>";
    html += "                   <th>Các quỹ</th>";
    html += "                   <th>Nguồn cải cách tiền lương</th>";
    html += "                   <th>Khác</th>";
    html += "                   <th>Cộng</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table20;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A5"] != null) {
            value = body[idx]["A5"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A6"] != null) {
            value = body[idx]["A6"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A7"] != null) {
            value = body[idx]["A7"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A8"] != null) {
            value = body[idx]["A8"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A9"] != null) {
            value = body[idx]["A9"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 16);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>"; 
    //
    html += "        <h4>Bảng 17(IV.1): Hoạt động hành chính, sự nghiệp</h4>";
    
    
       
    html += "        <table id=\"example17\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table21;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 17);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 18(IV.2): Hoạt động sản xuất kinh doanh, dịch vụ</h4>";
    
    
       
    html += "        <table id=\"example18\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table22;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 18);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 19(IV.3): Hoạt động tài chính</h4>";
    
    
       
    html += "        <table id=\"example19\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table23;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 19);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 20(IV.4): Hoạt động khác</h4>";
    
    
       
    html += "        <table id=\"example20\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table24;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 20);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 21(IV.5): Phân phối cho các quỹ</h4>";
    
    
       
    html += "        <table id=\"example21\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table25;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 21);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 22(IV.6): Sử dụng kinh phí tiết kiệm của đơn vị hành chính</h4>";
    
    
       
    html += "        <table id=\"example22\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table26;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 22);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>Bảng 23(V.1): Các giao dịch không bằng tiền trong kỳ ảnh hưởng đến báo cáo lưu chuyển tiền tệ</h4>";
    
    
       
    html += "        <table id=\"example23\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Số cuối năm</th>";
    html += "                   <th>Số đầu năm</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table27;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 23);
        html += "   </td>";
    }
    html += "            </tbody>";
    html += "        </table>";
    return html;
}
function DrawTableInput_B01BSTT_TT99(bodyRs, type) {
    var html = '';
    html += "        <h3 class=\"text-center\">BÁO CÁO BỔ SUNG THÔNG TIN TÀI CHÍNH</h3>";
    html += "        <h4>1. Phân tích số liệu để loại trừ giao dịch nội bộ khi lập báo cáo tài chính tổng hợp</h4>";
    
    
       
    html += "        <table id=\"example1\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th rowspan=\"2\">STT</th>";
    html += "                   <th rowspan=\"2\">Chỉ tiêu</th>";
    html += "                   <th rowspan=\"2\">Mã số</th>";
    html += "                   <th rowspan=\"2\">Tổng số</th>";
    html += "                   <th colspan=\"3\">Quan hệ giao dịch</th>";
    html += "               </tr>";
    html += "               <tr>";
    html += "                   <th>Ngoài đơn vị dự toán cấp 1 trong cùng tỉnh</th>";
    html += "                   <th>Ngoài đơn vị dự toán cấp 1 khác tỉnh</th>";
    html += "                   <th>Ngoài khu vực nhà nước</th>";
    html += "                   <th></th>";
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    var body = bodyRs.Table3;
    for (var idx in body) {
        html += "<tr>"; 
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A5"] != null) {
            value = body[idx]["A5"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A6"] != null) {
            value = body[idx]["A6"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A7"] != null) {
            value = body[idx]["A7"];
        }
        html += "<td>" + value + "</td>";
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 1);
        html += "   </td>";
        html += "</tr>";
    }
    html += "            </tbody>";
    html += "        </table>";
    //
    html += "        <h4>2. Bổ sung thông tin thuyết minh tài chính</h4>";
    
    
       
    html += "        <table id=\"example2\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "               <tr>";
    html += "                   <th>STT</th>";
    html += "                   <th>Chỉ tiêu</th>";
    html += "                   <th>Mã số</th>";
    html += "                   <th>Năm nay</th>";    
    html += "               </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    body = bodyRs.Table4;
    for (var idx in body) {
        html += "<tr>";
        var value = "";
        if (body[idx]["A1"] != null) {
            value = body[idx]["A1"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A2"] != null) {
            value = body[idx]["A2"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A3"] != null) {
            value = body[idx]["A3"];
        }
        html += "<td>" + value + "</td>";
        value = "";
        if (body[idx]["A4"] != null) {
            value = body[idx]["A4"];
        }
        html += "<td>" + value + "</td>";        
        //
        html += "   <td class=\"text-center\">";
        html += DrawButtonGrid_Input(body[idx], type, 2);
        html += "   </td>";
        //
    }
    html += "            </tbody>";
    html += "        </table>";
    return html;
}
function DrawTableInput(head, prop, body, title, type) {
    var html = '';
    html += "        <h3 class=\"text-center\">" + title + "</h3>";
    
    
        
    html += "        <table id=\"example\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "                <tr>";
    for (var idx in head) {
        html += "<th>" + head[idx] + "</th>";
    }
    if (true) {
        html += "<th></th>";
    }
    html += "                </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    for (var idx in body) {
        html += "<tr>";
        for (var jdx in prop) {
            if (jdx == prop.length - 1) {
                if (true) {
                    html += "   <td class=\"text-center\">";
                    html += DrawButtonGrid_Input(body[idx], type, 1);
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
//
function DrawButtonGrid_Input(obj, type, indexTable) {
    var jsonObject = JSON.stringify(obj);
    var click = "onclick=\"UpdateGridInput(event,'" + type + "'," + indexTable + ")\"";
    var param = "data-param='\"" + jsonObject + "\"'";
    html = "";
    html += "    <button style=\"padding: 4px 5px 5px 9px !important;line-height: 17px;font-size: 12px;margin-top: -6px; margin-bottom: -5px;\" type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#InputModal\" " + param + " " + click + ">";
    html += "        <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>";
    html += "    </button>";
    return html;
}
function SearchInput(type) {
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
    LoadTableInput(type)
}
function DrawContentModal_Input(type, obj, idx) {
    var html = "";
    var selected = "";
    html += "<input type=\"hidden\" id=\"keyId\" value=" + obj.H1 + ">";
    if (type == "B01BCTC_TT99" || type == "B02BCTC_TT99" || type == "B03BCTC_TT99" || type == "B01BCTC_TT107" || type == "B02BCTC_TT107" || type == "B03BCTC_TT107" || type == "B01BCTC_TT107TG" || type == "B02BCTC_TT107TG" || type == "B03BCTC_TT107TG") {
        html += "                <div class=\"row\">";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtCN\">CN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtCN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtDN\">DN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtDN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                </div>";
    }
    else if (type == "B04BCTC_TT99" || type == "B04BCTC_TT107" || type == "B04BCTC_TT107TG") {
        html += "                <div class=\"row\">";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtCN\">CN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtCN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtDN\">DN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtDN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtEN\">EN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtEN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtFN\">FN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtFN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-4\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtGN\">GN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtGN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-4\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtHN\">HN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtHN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-4\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtIN\">IN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtIN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                </div>";
    }
    else if ((type == "B01BSTT_TT99" && idx == 1) || (type == "B01BSTT_TT107" && idx == 1) || (type == "B01BSTT_TT107TG" && idx == 1)) {
        html += "                <div class=\"row\">";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtCN\">CN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtCN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtDN\">DN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtDN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtEN\">EN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtEN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-6\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtFN\">FN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtFN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                </div>";
    }
    else if ((type == "B01BSTT_TT99" && idx == 2) || (type == "B01BSTT_TT107" && idx == 2) || (type == "B01BSTT_TT107TG" && idx == 2)) {
        html += "                <div class=\"row\">";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtCN\">CN</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtCN\" value=\"\">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                </div>";
    }
    return html;
}

function UpdateGridInput(event, type, idx) {
    var jsonObject = event.target.getAttribute("data-param");
    jsonObject = jsonObject.slice(1, jsonObject.length - 1);
    var object = JSON.parse(jsonObject);
    var type = document.getElementById("type_Input").value;
    var html = "";
    html += "        <div class=\"modal-dialog\" role=\"document\">";
    html += "            <div class=\"modal-content\">";
    html += "                <div class=\"modal-header\">";
    html += "                    <h5 class=\"modal-title\">Thêm/Sửa dữ liệu</h5>";
    html += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
    html += "                        <span aria-hidden=\"true\">&times;</span>";
    html += "                    </button>";
    html += "                </div>";
    html += "                <div class=\"modal-body\">";
    html += DrawContentModal_Input(type, object, idx);
    html += "                </div>";
    html += "                <div class=\"modal-footer\">";
    html += "                    <button type=\"button\" class=\"btn btn-success\" onclick=\"SaveInput('" + type + "'," + idx + ")\">Lưu</button>";
    html += "                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Đóng</button>";
    html += "                </div>";
    html += "            </div>";
    html += "        </div>";
    $('#InputModal').html(html);
}
//
function SaveInput(type, idx) {
    var id = $("#keyId").val();
    var txtmdv = $("#inputCodeUnit").val();
    var txtyear = $("#inputYear").val();
    //
    if (type == "B01BCTC_TT99" || type == "B02BCTC_TT99" || type == "B03BCTC_TT99" || type == "B01BCTC_TT107" || type == "B02BCTC_TT107" || type == "B03BCTC_TT107" || type == "B01BCTC_TT107TG" || type == "B02BCTC_TT107TG" || type == "B03BCTC_TT107TG") {
        var obj = {
            id: id,
            type: type,
            sTT: idx,
            maDonVi: txtmdv,
            nam: txtyear,
            cN: $("#txtCN").val(),
            dN: $("#txtDN").val(),
        }
        $.post("/Home/SaveInput", obj, function (data) {
            alert(data);
            SearchInput(type)
        });
    }
    else if (type == "B04BCTC_TT99" || type == "B04BCTC_TT107" || type == "B04BCTC_TT107TG") {
        var obj = {
            id: id,
            type: type,
            sTT: idx,
            maDonVi: txtmdv,
            nam: txtyear,
            cN: $("#txtCN").val(),
            dN: $("#txtDN").val(),
            eN: $("#txtEN").val(),
            fN: $("#txtFN").val(),
            gN: $("#txtGN").val(),
            hN: $("#txtHN").val(),
            iN: $("#txtIN").val(),
        }
        $.post("/Home/SaveInput", obj, function (data) {
            alert(data);            
            SearchInput(type)
        });
    }
    else if ((type == "B01BSTT_TT99" && idx == 1) || (type == "B01BSTT_TT107" && idx == 1) || (type == "B01BSTT_TT107TG" && idx == 1)) {
        var obj = {
            id: id,
            type: type,
            sTT: idx,
            maDonVi: txtmdv,
            nam: txtyear,
            cN: $("#txtCN").val(),
            dN: $("#txtDN").val(),
            eN: $("#txtEN").val(),
            fN: $("#txtFN").val(),
        }
        $.post("/Home/SaveInput", obj, function (data) {
            alert(data);       
            SearchInput(type)
        });
    }
    else if ((type == "B01BSTT_TT99" && idx == 2) || (type == "B01BSTT_TT107" && idx == 2) || (type == "B01BSTT_TT107TG" && idx == 2)) {
        var obj = {
            id: id,
            type: type,
            sTT: idx,
            maDonVi: txtmdv,
            nam: txtyear,
            cN: $("#txtCN").val(),
        }
        $.post("/Home/SaveInput", obj, function (data) {
            alert(data);    
            SearchInput(type)
        });
    }
    //
}
function DeleteGridInput(event) {
    var jsonObject = event.target.getAttribute("data-param");
    jsonObject = jsonObject.slice(1, jsonObject.length - 1);
    var object = JSON.parse(jsonObject);
    var type = document.getElementById("type_Input").value;
    var r = confirm("Bạn muốn xóa bản ghi này không ?");
    if (r == true) {
        if (type == "DMTaiKhoan") {
            var obj = {
                id: object.ID,
                type: type
            }
            $.post("/Home/DeleteInput", obj, function (data) {
                alert(data);
                LoadTableInput(type);
            });
        }
        else if (type == "DMNguonKP") {
            var obj = {
                id: object.ID,
                type: type
            }
            $.post("/Home/DeleteInput", obj, function (data) {
                alert(data);
                LoadTableInput(type);
            });
        }
        else if (type == "DMHDSN") {
            var obj = {
                id: object.A1,
                type: type
            }
            $.post("/Home/DeleteInput", obj, function (data) {
                alert(data);
                LoadTableInput(type);
            });
        }
        else if (type == "DMQTPKHD") {
            var obj = {
                id: object.ID,
                type: type
            }
            $.post("/Home/DeleteInput", obj, function (data) {
                alert(data);
                LoadTableInput(type);
            });
        }
        else if (type == "DMTHTC") {
            var obj = {
                id: object.ID,
                type: type
            }
            $.post("/Home/DeleteInput", obj, function (data) {
                alert(data);
                LoadTableInput(type);
            });
        }
    }
}
//
function LoadUnit(name, obj) {
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
    })
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

