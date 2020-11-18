//$(document).ready(function () {
//    $('#example').DataTable();
//});
//1109879
function LoadDanhMuc(type) {
    document.getElementById('type_Categories').value = type;
    var title = "";
    if (type == "DMDonvi") {
        title = "Danh mục Đơn vị cấp dưới";
    }
    else if (type == "DMTaiKhoan") {
        title = "Danh mục Tài khoản";
    }
    else if (type == "DMNguonVon") {
        title = "Danh mục Nguồn vốn";
    }
    else if (type == "DMLoaiKhoan") {
        title = "Danh mục Loại khoản";
    }
    else if (type == "DMNguonKP") {
        title = "Danh mục Nguồn kinh phí";
    }
    else if (type == "DMMuc") {
        title = "Danh mục Mục";
    }
    else if (type == "DMHDSN") {
        title = "Danh mục Hoạt động sự nghiệp";
    }
    else if (type == "DMQTPKHD") {
        title = "Danh mục chi tiêu QT kinh phí HĐ";
    }
    else if (type == "DMTHTC") {
        title = "Danh mục chi tiêu THTC";
    }

    var page_url = "";
    page_url += "    <ol class=\"breadcrumb page-breadcrumb pull-left\">";
    page_url += "        <li><i class=\"fa fa-home\"></i>&nbsp;Trang chủ&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i>&nbsp;&nbsp;</li>";
    page_url += "        <li class=\"\">Danh mục&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i> &nbsp;&nbsp;</li>";
    page_url += "        <li class=\"active\">" + title +"</li>";
    page_url += "    </ol>";
    $('#page-current-url').html(page_url);
    var html = '';
    html += "<div id=\"content_Categories\">";
    html += DrawControlsCategories(type);
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
function LoadTableCategories(type) {
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
    $.get('/Home/Categories?type=' + type + '&Nam=' + Nam + '&MaDV=' + MaDV + '&Loai=' + Loai, function (data, status) {        
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
            "order": [],
            "ordering": false
        });
    }).fail(function (ajaxContext) {        
        alert("Status : " + ajaxContext.status + ", Status Text : " + ajaxContext.statusText);
    }); 
}
function DrawControlsCategories(type) {
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
    html += "            <label for=\"inputCodeUnit\" class=\"col-md-1 control-label text-right\"><strong>Tên đơn vị</strong> <span class=\"require\">(*)</span></label>";
    html += "            <div class=\"col-md-4\">";
    html += "               <select id=\"inputCodeUnit\" class=\"form-control\"></select>";
    html += "            </div>";
    html += "            <div class=\"col-md-2 text-left\">";
    html += "                <input type=\"hidden\" id=\"hdType\" value=\"0\" />";
    html += "                <div class=\"form-group\">";
    html += "                    <button class=\"btn btn-success\" onclick=\"SearchCategories('" + type + "')\">";
    html += "                        Tìm kiếm";
    html += "                    </button>";
    //if (type == "DMTaiKhoan" || type == "DMNguonKP" || type == "DMHDSN" || type == "DMQTPKHD" || type == "DMTHTC") {
    //    html += "                    <button class=\"btn btn-info\" onclick=\"AddCategories('" + type + "')\" data-toggle=\"modal\" data-target=\"#CategoriesModal\">";
    //    html += "                        Tạo mới";
    //    html += "                    </button>";
    //}
    html += "                </div>";
    html += "            </div>";
    html += "        </div>";
    html += "   </div>";
    html += "</div>";
    html += "       </div>";
    html += "   </div>";
    html += "</div>";
    return html;
}
function DrawTableCategories(head, prop, body) {
    var type = document.getElementById('type_Categories').value;
    var html = '';    
        if (type == "DMTaiKhoan" || type == "DMNguonKP" || type == "DMHDSN" || type == "DMQTPKHD" || type == "DMTHTC") {
            html += "                    <button style=\" float: right;\" class=\"btn btn-info\" onclick=\"AddCategories('" + type + "')\" data-toggle=\"modal\" data-target=\"#CategoriesModal\">";
        html += "                        Tạo mới";
        html += "                    </button>";
    }
    html += "        <table id=\"example\" class=\"display table  table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "                <tr>";    
    for (var idx in head) {        
        html += "<th>" + head[idx] + "</th>";
    }
    if (type == "DMTaiKhoan" || type == "DMNguonKP" || type == "DMHDSN" || type == "DMQTPKHD" || type == "DMTHTC") {
        html += "<th></th>";
    }
    html += "                </tr>";
    html += "            </thead>";
    html += "            <tbody>";
    for (var idx in body) {
        html += "<tr>";
        for (var jdx in prop) {
            if (jdx == prop.length - 1) {    
                if (type == "DMTaiKhoan" || type == "DMNguonKP" || type == "DMHDSN" || type == "DMQTPKHD" || type == "DMTHTC") {
                    html += "   <td class=\"text-center\">";
                    html += DrawButtonGrid_Categories(body[idx]);
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
function DrawButtonGrid_Categories(obj) {        
    var jsonObject = JSON.stringify(obj);
    var click = "onclick=\"UpdateGridCategories(event)\"";
    var param = "data-param='\"" + jsonObject + "\"'";
    html = "";
    html += "    <button style=\"padding: 4px 5px 5px 9px !important;line-height: 17px;font-size: 12px;margin-top: -6px; margin-bottom: -5px;\" type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#CategoriesModal\" " + param + " " + click +">";
    html += "        <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>";
    html += "    </button>";
    html += "    <button style=\"padding: 4px 5px 5px 9px !important;line-height: 17px;font-size: 12px;margin-top: -6px; margin-bottom: -5px;\" type=\"button\" class=\"btn btn-danger\" " + param +" onclick=\"DeleteGridCategories(event)\">";
    html += "        Xóa";
    html += "    </button>";
    return html;
}
function SearchCategories(type) {
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
    LoadTableCategories(type)
}
function DrawContentModal_Categories(type, obj) {
    var arrLoaiTK = ["", "Tổng hợp (T)", "Chi tiết (C)"];
    var arrSoDu = ["", "Dư nợ (N)", "Dư có (C)", "Lưỡng tính (L)", "Triệt tiêu (T)", "Không có số dư (K)"];
    var arrChiTiet = ["", "Có (C)", "Không (K)"];
    var html = ""; 
    var selected = "";
    html += "<input type=\"hidden\" id=\"keyId\" value=" + obj.id + ">";
    if (type == "DMTaiKhoan") {
        html += "                <div class=\"row\">";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtMDV\">Tên đơn vị</label>";        
        html += "                                 <select id=\"txtMDV\" class=\"form-control\"></select>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtYear\">Năm</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtYear\" value=" + obj.nam + ">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtSTT\">STT</label>";
        html += "                            <input type=\"number\" class=\"form-control\" id=\"txtSTT\" value=" + obj.sTT + ">";
        html += "                        </div>";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtSHTK\">Số hiệu TK</label>";
        html += "                            <input type=\"text\" class=\"form-control\" id=\"txtSHTK\" value=\"" + obj.ma + "\">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"cbLoaiTK\">Loại TK</label>";
        html += "                            <select class=\"form-control\" id=\"cbLoaiTK\">";
        for (var idx in arrLoaiTK) {
            selected = "";
            if (obj.loai == arrLoaiTK[idx]) {
                selected = "selected"
            }
            html += "                               <option " + selected +">" + arrLoaiTK[idx] + "</option>";
        }
        html += "                            </select>";
        html += "                        </div>";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"cbSoDu\">Số dư</label>";
        html += "                            <select class=\"form-control\" id=\"cbSoDu\">";
        for (var idx in arrSoDu) {
            selected = "";
            if (obj.soDu == arrSoDu[idx]) {
                selected = "selected"
            }
            html += "                               <option " + selected + ">" + arrSoDu[idx] + "</option>";
        }
        html += "                            </select>";
        html += "                        </div>";
        html += "                    </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtTenTK\">Tên TK</label>";
        html += "                               <textarea class=\"form-control\" id=\"txtTenTK\" rows=\"3\">" + obj.ten + "</textarea>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                </div>";
    }
    else if (type == "DMNguonKP") {
        html += "                <div class=\"row\">";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtMDV\">Tên đơn vị</label>";
        html += "                               <select id=\"txtMDV\" class=\"form-control\"></select>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtYear\">Năm</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtYear\" value=" + obj.nam + ">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtSTT\">STT</label>";
        html += "                            <input type=\"number\" class=\"form-control\" id=\"txtSTT\" value=" + obj.sTT +">";
        html += "                        </div>";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtTRG\">Tên rút gọn</label>";
        html += "                            <input type=\"text\" class=\"form-control\" id=\"txtTRG\" value=\"" + obj.tenRutGon + "\">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtMNKP\">Mã NKP</label>";
        html += "                            <input type=\"text\" class=\"form-control\" id=\"txtMNKP\" value=\"" + obj.ma + "\">";
        html += "                        </div>";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"cbChiTiet\">Chi tiết</label>";
        html += "                            <select class=\"form-control\" id=\"cbChiTiet\">";
        for (var idx in arrChiTiet) {
            selected = "";
            if (obj.chiTiet == arrChiTiet[idx]) {
                selected = "selected"
            }
            html += "                               <option " + selected + ">" + arrChiTiet[idx] + "</option>";
        }
        html += "                            </select>";
        html += "                        </div>";
        html += "                    </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtTenNKP\">Tên NKP</label>";
        html += "                               <textarea class=\"form-control\" id=\"txtTenNKP\" rows=\"3\">" + obj.ten + "</textarea>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                </div>";
    }
    else if (type == "DMHDSN") {
        html += "                <div class=\"row\">";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtMDV\">Tên đơn vị</label>";
        html += "                               <select id=\"txtMDV\" class=\"form-control\"></select>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtYear\">Năm</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtYear\" value=" + obj.nam + ">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                    <div class=\"col-lg-12\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtSTT\">STT</label>";
        html += "                            <input type=\"number\" class=\"form-control\" id=\"txtSTT\" value=" + obj.sTT + ">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtTRG\">Tên rút gọn</label>";
        html += "                            <input type=\"text\" class=\"form-control\" id=\"txtTRG\" value=\"" + obj.tenRutGon + "\">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtMHDSN\">Mã HDSN</label>";
        html += "                            <input type=\"text\" class=\"form-control\" id=\"txtMHDSN\" value=\"" + obj.ma + "\">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtTenHDSN\">Tên HDSN</label>";
        html += "                               <textarea class=\"form-control\" id=\"txtTenHDSN\" rows=\"3\">" + obj.ten + "</textarea>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                </div>";
    }
    else if (type == "DMQTPKHD") {
        html += "                <div class=\"row\">";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtMDV\">Tên đơn vị</label>";
        html += "                               <select id=\"txtMDV\" class=\"form-control\"></select>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtYear\">Năm</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtYear\" value=" + obj.nam + ">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                    <div class=\"col-lg-12\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtSTT\">STT</label>";
        html += "                            <input type=\"number\" class=\"form-control\" id=\"txtSTT\" value=" + obj.sTT + ">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtMS\">Mã số</label>";
        html += "                            <input type=\"number\" class=\"form-control\" id=\"txtMS\" value=" + obj.maso + ">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtCM\">Chỉ mục</label>";
        html += "                            <input type=\"text\" class=\"form-control\" id=\"txtCM\" value=\"" + obj.chiMuc + "\">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtTenCT\">Tên chỉ tiêu</label>";
        html += "                               <textarea class=\"form-control\" id=\"txtTenCT\" rows=\"3\">" + obj.ten + "</textarea>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                </div>";
    }
    else if (type == "DMTHTC") {
        html += "                <div class=\"row\">";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtMDV\">Tên đơn vị</label>";
        html += "                               <select id=\"txtMDV\" class=\"form-control\"></select>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtYear\">Năm</label>";
        html += "                               <input type=\"number\" class=\"form-control\" id=\"txtYear\" value=" + obj.nam + ">";
        html += "                           </div>";
        html += "                       </div>";
        html += "                    <div class=\"col-lg-12\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtSTT\">STT</label>";
        html += "                            <input type=\"number\" class=\"form-control\" id=\"txtSTT\" value=" + obj.sTT + ">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtMS\">Mã số</label>";
        html += "                            <input type=\"number\" class=\"form-control\" id=\"txtMS\" value=" + obj.maso + ">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                    <div class=\"col-lg-6\">";
        html += "                        <div class=\"form-group\">";
        html += "                            <label for=\"txtCM\">Chỉ mục</label>";
        html += "                            <input type=\"text\" class=\"form-control\" id=\"txtCM\" value=\"" + obj.chiMuc + "\">";
        html += "                        </div>";
        html += "                    </div>";
        html += "                       <div class=\"col-lg-12\">";
        html += "                           <div class=\"form-group\">";
        html += "                               <label for=\"txtTenCT\">Tên chỉ tiêu</label>";
        html += "                               <textarea class=\"form-control\" id=\"txtTenCT\" rows=\"3\">" + obj.ten + "</textarea>";
        html += "                           </div>";
        html += "                       </div>";
        html += "                </div>";
    }    
    return html;
}
//
function AddCategories(type) {
    var html = "";
    html += "        <div class=\"modal-dialog\" role=\"document\">";
    html += "            <div class=\"modal-content\">";
    html += "                <div class=\"modal-header\">";
    if (type == "DMTaiKhoan") {
        html += "                    <h5 class=\"modal-title\">Thêm Tài khoản</h5>";
    }
    else if (type == "DMNguonKP") {
        html += "                    <h5 class=\"modal-title\">Thêm Nguồn kinh phí</h5>";
    }
    else if (type == "DMHDSN") {
        html += "                    <h5 class=\"modal-title\">Thêm Hoạt động sự nghiệp</h5>";
    }
    else if (type == "DMQTPKHD") {
        html += "                    <h5 class=\"modal-title\">Thêm Chi tiêu QT kinh phí HĐ</h5>";
    }
    else if (type == "DMTHTC") {
        html += "                    <h5 class=\"modal-title\">Thêm Tình hình Tài chính</h5>";
    }
    html += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
    html += "                        <span aria-hidden=\"true\">&times;</span>";
    html += "                    </button>";
    html += "                </div>";
    html += "                <div class=\"modal-body\">";
    if (type == "DMTaiKhoan") {
        var obj = {
            id: "",
            maDonVi: "",
            nam: new Date().getFullYear(),
            sTT: 0,
            ma: "",
            ten: "",
            loai: "",
            soDu: ""
        }
        html += DrawContentModal_Categories(type, obj);
    }
    else if (type == "DMNguonKP") {
        var obj = {
            id: "",            
            maDonVi: "",
            nam: new Date().getFullYear(),
            sTT: 0,
            ma: "",
            ten: "",
            tenRutGon: "",
            chiTiet: ""
        }
        html += DrawContentModal_Categories(type, obj);
    }
    else if (type == "DMHDSN") {
        var obj = {
            id: "",            
            maDonVi: "",
            nam: new Date().getFullYear(),
            sTT: 0,
            ma: "",
            ten: "",
            tenRutGon: ""
        }
        html += DrawContentModal_Categories(type, obj);
    }
    else if (type == "DMQTPKHD") {
        var obj = {
            id: "",            
            maDonVi: "",
            nam: new Date().getFullYear(),
            sTT: 0,
            maso: 0,
            ten: "",
            chiMuc: ""
        }
        html += DrawContentModal_Categories(type, obj);
    }
    else if (type == "DMTHTC") {
        var obj = {
            id: "",
            maDonVi: "",
            nam: new Date().getFullYear(),
            sTT: 0,
            maso: 0,
            ten: "",
            chiMuc: ""
        }
        html += DrawContentModal_Categories(type, obj);
    }
    html += "                </div>";
    html += "                <div class=\"modal-footer\">";
    html += "                    <button type=\"button\" class=\"btn btn-success\" onclick=\"SaveCategories('" + type + "')\">Lưu</button>";
    html += "                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Đóng</button>";
    html += "                </div>";
    html += "            </div>";
    html += "        </div>";
    $('#CategoriesModal').html(html);
    LoadUnit("txtMDV", null);
}
function UpdateGridCategories(event) {    
    var obj;
    var jsonObject = event.target.getAttribute("data-param");
    jsonObject = jsonObject.slice(1, jsonObject.length - 1);    
    var object = JSON.parse(jsonObject);
    var type = document.getElementById("type_Categories").value;
    var html = "";
    html += "        <div class=\"modal-dialog\" role=\"document\">";
    html += "            <div class=\"modal-content\">";
    html += "                <div class=\"modal-header\">";
    if (type == "DMTaiKhoan") {
        html += "                    <h5 class=\"modal-title\">Sửa Tài khoản</h5>";
    }
    else if (type == "DMNguonKP") {
        html += "                    <h5 class=\"modal-title\">Sửa Nguồn kinh phí</h5>";
    }
    else if (type == "DMHDSN") {
        html += "                    <h5 class=\"modal-title\">Sửa Hoạt động sự nghiệp</h5>";
    }
    else if (type == "DMQTPKHD") {
        html += "                    <h5 class=\"modal-title\">Sửa Chi tiêu QT kinh phí HĐ</h5>";
    }
    else if (type == "DMTHTC") {
        html += "                    <h5 class=\"modal-title\">Sửa Tình hình Tài chính</h5>";
    }
    html += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
    html += "                        <span aria-hidden=\"true\">&times;</span>";
    html += "                    </button>";
    html += "                </div>";
    html += "                <div class=\"modal-body\">";
    if (type == "DMTaiKhoan") {
        obj = {
            id: object.ID,
            maDonVi: document.getElementById("inputCodeUnit").value,
            nam: document.getElementById("inputYear").value,
            sTT: object.Column1,
            ma: object.SoHieuTK,
            ten: object.TenTK,
            loai: object.LoaiTK,
            soDu: object.Sodu
        }
        html += DrawContentModal_Categories(type, obj);
    }
    else if (type == "DMNguonKP") {
        obj = {
            id: object.ID,
            maDonVi: document.getElementById("inputCodeUnit").value,
            nam: document.getElementById("inputYear").value,
            sTT: object.Column1,
            ma: object.MaNKP,
            ten: object.TenNKP,
            tenRutGon: object.TenRG,
            chiTiet: object.ChiTiet
        }
        html += DrawContentModal_Categories(type, obj);
    }
    else if (type == "DMHDSN") {
        obj = {
            id: object.A1,
            maDonVi: document.getElementById("inputCodeUnit").value,
            nam: document.getElementById("inputYear").value,
            sTT: object.A2,
            ma: object.A3,
            ten: object.A4,
            tenRutGon: object.A5,
        }
        html += DrawContentModal_Categories(type, obj);
    }
    else if (type == "DMQTPKHD") {
        obj = {
            id: object.ID,
            maDonVi: document.getElementById("inputCodeUnit").value,
            nam: document.getElementById("inputYear").value,
            sTT: object.Column1,
            maso: object.Maso,
            ten: object.TenCT,
            chiMuc: object.ChiMuc
        }
        html += DrawContentModal_Categories(type, obj);
    }
    else if (type == "DMTHTC") {
        obj = {
            id: object.ID,
            maDonVi: document.getElementById("inputCodeUnit").value,
            nam: document.getElementById("inputYear").value,
            sTT: object.Column1,
            maso: object.Maso,
            ten: object.TenCT,
            chiMuc: object.ChiMuc
        }
        html += DrawContentModal_Categories(type, obj);
    }
    html += "                </div>";
    html += "                <div class=\"modal-footer\">";
    html += "                    <button type=\"button\" class=\"btn btn-success\" onclick=\"SaveCategories('" + type + "')\">Lưu</button>";
    html += "                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Đóng</button>";
    html += "                </div>";
    html += "            </div>";
    html += "        </div>";
    $.ajax({
        type: 'GET',
        url: '/Home/ObjUnit?id=' + obj.maDonVi
    }).then(function (data) {
        var objTemp = JSON.parse(data);
        $('#CategoriesModal').html(html);
        LoadUnit("txtMDV", objTemp);
    });
}
//
function SaveCategories(type) {
    var id = $("#keyId").val();
    if (type == "DMTaiKhoan") {
        var txtmdv = $("#txtMDV").val();
        var txtyear = $("#txtYear").val();
        var txtstt = $("#txtSTT").val();
        var txtshtk = $("#txtSHTK").val();
        var txttentk = $("#txtTenTK").val();
        var cbloaitk = $("#cbLoaiTK option:selected").text();
        var cbsodu = $("#cbSoDu option:selected").text();
        var obj = {
            id: id,
            type: type,
            maDonVi: txtmdv,
            nam: txtyear,
            sTT: txtstt,
            ma: txtshtk,
            ten: txttentk,
            loai: cbloaitk.trim(),
            soDu: cbsodu.trim()
        }
        $.post("/Home/SaveCategories", obj, function (data) {
            alert(data);
            LoadTableCategories(type);
        });
    }
    else if (type == "DMNguonKP") {
        var txtmdv = $("#txtMDV").val();
        var txtyear = $("#txtYear").val();
        var txtstt = $("#txtSTT").val();
        var txtmnkp = $("#txtMNKP").val();
        var txttennkp = $("#txtTenNKP").val();
        var txttrg = $("#txtTRG").val();
        var cbchitiet = $("#cbChiTiet option:selected").text();
        var obj = {
            id: id,
            type: type,
            maDonVi: txtmdv,
            nam: txtyear,
            sTT: txtstt,
            ma: txtmnkp,
            ten: txttennkp,
            tenRutGon: txttrg,
            chiTiet: cbchitiet.trim()
        }
        $.post("/Home/SaveCategories", obj, function (data) {
            alert(data);
            LoadTableCategories(type);
        });
    }
    else if (type == "DMHDSN") {
        var txtmdv = $("#txtMDV").val();
        var txtyear = $("#txtYear").val();
        var txtstt = $("#txtSTT").val();
        var txtmhdsn = $("#txtMHDSN").val();
        var txttenhdsn = $("#txtTenHDSN").val();
        var txttrg = $("#txtTRG").val();
        var obj = {
            id: id,
            type: type,
            maDonVi: txtmdv,
            nam: txtyear,
            sTT: txtstt,
            ma: txtmhdsn,
            ten: txttenhdsn,
            tenRutGon: txttrg
        }
        $.post("/Home/SaveCategories", obj, function (data) {
            alert(data);
            LoadTableCategories(type);
        });
    }
    else if (type == "DMQTPKHD") {
        var txtmdv = $("#txtMDV").val();
        var txtyear = $("#txtYear").val();
        var txtstt = $("#txtSTT").val();
        var txtms = $("#txtMS").val();
        var txttenct = $("#txtTenCT").val();
        var txtcm = $("#txtCM").val();
        var obj = {
            id: id,
            type: type,
            maDonVi: txtmdv,
            nam: txtyear,
            sTT: txtstt,
            maso: txtms,
            ten: txttenct,
            chiMuc: txtcm
        }
        $.post("/Home/SaveCategories", obj, function (data) {
            alert(data);
            LoadTableCategories(type);
        });
    }
    else if (type == "DMTHTC") {
        var txtmdv = $("#txtMDV").val();
        var txtyear = $("#txtYear").val();
        var txtstt = $("#txtSTT").val();
        var txtms = $("#txtMS").val();
        var txttenct = $("#txtTenCT").val();
        var txtcm = $("#txtCM").val();
        var obj = {
            id: id,
            type: type,
            maDonVi: txtmdv,
            nam: txtyear,
            sTT: txtstt,
            maso: txtms,
            ten: txttenct,
            chiMuc: txtcm
        }
        $.post("/Home/SaveCategories", obj, function (data) {
            alert(data);
            LoadTableCategories(type);
        });
    }
}
function DeleteGridCategories(event) {
    var jsonObject = event.target.getAttribute("data-param");
    jsonObject = jsonObject.slice(1, jsonObject.length - 1);
    var object = JSON.parse(jsonObject);
    var type = document.getElementById("type_Categories").value;
    var r = confirm("Bạn muốn xóa bản ghi này không ?");
    if (r == true) {
        if (type == "DMTaiKhoan") {
            var obj = {
                id: object.ID,
                type: type
            }
            $.post("/Home/DeleteCategories", obj, function (data) {
                alert(data);
                LoadTableCategories(type);
            });
        }
        else if (type == "DMNguonKP") {
            var obj = {
                id: object.ID,
                type: type
            }
            $.post("/Home/DeleteCategories", obj, function (data) {
                alert(data);
                LoadTableCategories(type);
            });
        }
        else if (type == "DMHDSN") {
            var obj = {
                id: object.A1,
                type: type
            }
            $.post("/Home/DeleteCategories", obj, function (data) {
                alert(data);
                LoadTableCategories(type);
            });
        }
        else if (type == "DMQTPKHD") {
            var obj = {
                id: object.ID,
                type: type
            }
            $.post("/Home/DeleteCategories", obj, function (data) {
                alert(data);
                LoadTableCategories(type);
            });
        }
        else if (type == "DMTHTC") {
            var obj = {
                id: object.ID,
                type: type
            }
            $.post("/Home/DeleteCategories", obj, function (data) {
                alert(data);
                LoadTableCategories(type);
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

