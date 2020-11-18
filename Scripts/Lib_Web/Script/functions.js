function Remove(str_confirm, url) {
    var str = '<div class="modal-dialog"><div class="modal-content"><div class="modal-body">' + str_confirm + '</div>' +
        '<div class="modal-footer"><button type="button" data-dismiss="modal" class="btn btn-default">Quay lại</button>' +
        '<a href="' + url + '" class="btn btn-primary">Đồng ý</a></div></div></div>';
    $("#modal-confirm").html(str).modal("show");
}
function AlertAction(str) {
    str = str;
    var div = "<div id='thongbao_capnhat' class='page_mess_animate page_mess_ok'>" + str + "</div>";
    $("body").prepend(div);
    $("#thongbao_capnhat").fadeOut(2500);
}
function AlertError(str) {
    str = str;
    var div = "<div id='thongbao_capnhat_error' class='page_mess_animate page_mess_ok'>" + str + "</div>";
    $("body").prepend(div);
    $("#thongbao_capnhat_error").fadeOut(2500);
}
function str_replace(string, search, replace) {
    return string.split(search).join(replace);
}
function GetUrl_Params(pr) {
    //alert(pr);
    var vars = [], hash, val;
    var val = null;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    //alert(hashes.length);
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        //alert(hashes[i]);
        if (hash[0] == pr) {
            val = hash[1];
            break;
        }
    }
    //var val_return = null;
    if (val != null) {
        val = str_replace(val, "+", " ");
        val = decodeURIComponent(val.trim());
    }
    return val;
}
function Get_User_info() {

    $.ajax({
        url: '/Home/Json_User_info/',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var menu = result.menu;
            var user_login = result.user_login;
            $("#side-menu").html(Render_Menu_Left(menu, user_login.CTEN));
            $("#userlogin_name").html(user_login.CTEN);
            $("#thongtinlogin").html("<a href='/Thietlap/Thongtin?id=" + result.enc_iduser + "'><i class='fa fa-user'></i>Thông tin người dùng</a>");
            if (getCookie("nava") == "true") {
                $('body').addClass('sidebar-collapsed');
            }
            else {
                $('body').removeClass('sidebar-collapsed');
            }
            setTimeout(function () {
                $("#script_footer").html(Load_All_Script());

            }, 500);
        },
    });
}
function Render_Menu_Left(menu, name) {
    var str = "<li><a href='/Home/Index'><i class='fa fa-tachometer fa-fw'>" +
        "<div class='icon-bg bg-pink'></div></i><span class='menu-title'>Trang chủ</span></a></li>";
    var uri = location.pathname.substring(1);

    if (uri.trim() == "" || uri.trim() == "/") {
        str = "" +
            "</ul>" +
            "</div>" +
            "<div class='clearfix'>" +
            "</div>" +
            " <li class='active'><a href='/'><i class='fa fa-tachometer fa-fw'>" +
            "<div class='icon-bg bg-orange'></div></i><span class='menu-title'>Trang chủ</span></a></li>";
    } else {
        uri = uri.split("/")[0];
    }

    var id_parent = 0;
    if (menu != null && menu != "") {
        for (var i = 0; i < menu.length; i++) {
            var t = menu[i];
            if (id_parent != t["IPARENT"]) {
                var bg_parent = "bg-pink";
                var active_parent = "";
                if (uri == t["URL"].split("/")[1]) {
                    bg_parent = "bg-orange";
                    active_parent = "active";
                }
                if (i > 0) {
                    str += "</ul></li>";
                }
                str += '<li class="' + active_parent + '"><a href="#"><i class="fa ' + t["ICON_PARENT"] + ' fa-fw"><div class="icon-bg ' + bg_parent + '"></div>' +
                    '</i><span class="menu-title">' + t["TEN_PARENT"] + '</span><span class="fa arrow"></span></a><ul class="nav nav-second-level">';
            }
            var bg_child = ""; if (location.pathname == t["URL"]) { bg_child = "active"; }
            str += '<li class="' + bg_child + '"><a href="' + t["URL"] + '"><i class="fa ' + t["ICON"] + '"></i><span class="submenu-title">' + t["CTEN"] + '</span></a></li>';
            id_parent = t["IPARENT"];
            var j = i + 1;
            if (j == menu.length) {
                str += "</ul></li>";
            }
        }
    }
    return str;
}
function Load_All_Script() {
    var str = '<script src="/vendors/bootstrap/js/bootstrap.min.js"></script>' +
        '<script src="/vendors/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js"></script>' +
        '<script src="/js/html5shiv.js"></script>' +
        '<script src="/js/respond.min.js"></script>' +
        '<script src="/vendors/metisMenu/jquery.metisMenu.js"></script>' +
        '<script src="/vendors/slimScroll/jquery.slimscroll.js"></script>' +
        ' <script src="/vendors/jquery-cookie/jquery.cookie.js"></script>' +
        '<script src="/js/jquery.menu.js"></script>' +
        ' <script src="/vendors/responsive-tabs/responsive-tabs.js"></script>' +
        ' ' +
        ' <script src="/vendors/datepicker/bootstrap-datepicker.js"></script>' +
        ' <script src="/js/main.js"></script>';
    return str;
}
function SetToggle() {
    if (getCookie("nava") == "true") {
        setCookie("nava", false, 10);
        Get_User_info();
    }
    else {
        setCookie("nava", true, 10);
        Get_User_info();
    }
}
function UpdateStatus(post, url) {
    //alert(post+url);
    $.post(url, post, function (data) {
        if (data == 1) {
            AlertAction("Cập nhật thành công!");
        } else {
            alert(data);
        }
    });
}
function UpdateOrder(post, value, url) {
    if (value.trim() != "") {
        $.post(url, post + "&value=" + value, function (data) {
            if (data == 1) {
                AlertAction("Cập nhật thành công!")
            }
            else { alert("Cập nhật lỗi!"); }
        });
    } else {
        //alert("Vui lòng nhập số!");
    }
}
function Option_List_ID(list, id) {

    var str = "";
    for (var i = 0; i < list.length; i++) {
        var t = list[i];
        var sel = ""; if (t["ID"] == id) { sel = "selected"; }
        str += "<option " + sel + " value='" + t["ID"] + "'>" + t["NAME"] + "</option>";
    }
    return str;
}

function Check_SoNguyenDuong(id) {
    var soluong = $("#" + id).val().trim();
    //alert(soluong);
    if (isNaN(soluong)) {
        //alert("Vui lòng chỉ nhập số!");
        //setTimeout(function () { $("#" + id).focus(); }, 500);
        return false;
    } else {
        if (soluong != "") {
            if (soluong.indexOf(',') != -1 || soluong.indexOf('.') != -1) {
                //alert("Vui lòng chỉ nhập số nguyên!");
                //setTimeout(function () { $("#" + id).focus(); }, 500);
                return false;
            }
            if (parseInt(soluong) <= 0) {
                //alert("Vui lòng chỉ nhập số nguyên dương!");
                //setTimeout(function () { $("#" + id).focus(); }, 500);
                return false;
            }
        }
    }
    return true;
}
function Error_Page() {
    return false;
}
function Validate_DateVN(id) {
    var date = $("#" + id).val();
    if (moment(date, 'DD/MM/YYYY', true).isValid() || moment(date, 'DD/M/YYYY', true).isValid()
        || moment(date, 'D/M/YYYY', true).isValid() || moment(date, 'D/MM/YYYY', true).isValid()) {
        //alert("ok");
        return true;
    } else {
        alert("Vui lòng điền đúng định dạng ngày/tháng/năm !");
        $("#" + id).focus();
        $("#" + id).val("");
        return false;
    }
}
function Validate_DateVN_ByValue(date) {
    //var date = $("#" + id).val();
    if (moment(date, 'DD/MM/YYYY', true).isValid() || moment(date, 'DD/M/YYYY', true).isValid()
        || moment(date, 'D/M/YYYY', true).isValid() || moment(date, 'D/MM/YYYY', true).isValid()) {    //alert("ok");
        return true;
    } else {
        //alert("Vui lòng điền đúng định dạng ngày/tháng/năm !");
        //$("#" + id).focus();
        //$("#" + id).val("");
        return false;
    }
}
function Compare2Date(from, to) {

    if ($("#" + from).val() != "" && $("#" + to).val() != "") {
        //var date_from = $("#" + from).val();
        //var date_to = $("#" + to).val();
        var date_from = moment($("#" + from).val(), 'DD/MM/YYYY');
        var date_to = moment($("#" + to).val(), 'DD/MM/YYYY');
        //alert(date_from + " - " + date_to);
        if (date_to >= date_from) {
            return true;
        } else {
            return false;
        }
    }
}

function ConvertTo_VN_Date(datetime) {
    return moment(datetime).format('DD/MM/YYYY');
}
function ShowPageLoading(id = "body", str = "Đang tải dữ liệu") {
    var div = "<div id='thongbao_taidulieu' class='page_mess_animate page_mess_ok'>" + str + " <img src='/vendors/pageloader/images/loader9.gif'></div>";
    $(id).prepend(div);
    //$("#" + id).prepend('<div id="sc" class="tcenter"><img src="/Images/loader5.gif" ></div>');
}
function ShowFormLoading(id = "body", str = "Đang tải dữ liệu") {
    var div = "<div id='thongbao_taidulieu' class='page_mess_animate page_mess_ok'>" + str + " <img src='/vendors/pageloader/images/loader9.gif'></div>";
    $("#" + id).htm(div);
    //$("#" + id).prepend('<div id="sc" class="tcenter"><img src="/Images/loader5.gif" ></div>');
}
function RemovePageLoading() {
    $("#thongbao_taidulieu").fadeOut(2500);
}

function Check_Range_ByValue(val, length) {
    var str_length = val.length;
    if (str_length > length) {
        return false;
    } else {
        return true;
    }
}
function Check_Range_ByID(id, length) {
    var str = $("#" + id).val().trim();
    var str_length = str.length;
    if (str_length > length) {
        return false;
    } else {
        return true;
    }
}
function Check_Range_ByName(name, length) {
    var str = $("input[name='" + name + "'],textarea[name='" + name + "']").val().trim();
    var str_length = str.length;
    //alert(str_length);
    if (str_length > length) {
        return false;
    } else {
        return true;
    }
}

function ConfirmDelete(stralert, link_delete) {
    $("#confirm-delete h5").html(stralert);
    $("#confirm-delete .modal-footer .btn-submit").attr("onclick", "location.href='" + link_delete + "'");
    $("#confirm-delete").modal("show");
}
function Confirm(stralert, id) {
    $("#confirm-delete h5").html(stralert);
    $("#confirm-delete .modal-footer .btn-submit ").attr("data-id", id);
    $("#confirm-delete .modal-footer .btn-submit").addClass("btn-del");
    $("#confirm-delete").modal("show");
}
function Url_Action(controller, action) {
    var url = "/" + controller + "/" + action;
    return url;
}
function Get_Checked(val) {
    var str = "";
    if (val == 1) { str = "checked"; }
    return str;
}
function IsNullOrEmpty(value) {

    if (value != null) {
        if (value != "") {
            if (value != "MHx0bF9rbnRj0") {
                return false;
            }
            else return true;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
function Render_Checbox_PhanCap(list, id_parent, level) {
    var str = "";
    var space = "";
    var pading = 1;
    for (var i = 0; i < level; i++) {
        space += "";
        pading = level * 30;
    }
    var style = level == 0 ? "'" : "style='display:none'";
    var lv = 0;
    var lstObj = list.filter(obj => obj.IPARENT === id_parent);
    for (var j = 0; j < list.length; j++) {
        var t = lstObj[j];
        if (t != null) {
            var ten = space + t["CTEN"];
            var lstObjChild = list.filter(obj => obj.IPARENT === t["ID"]);
            if (lstObjChild.length > 0) {
                str += "<div " + style + " class='checkbox div_" + t["IPARENT"] + "'><label style='padding-left: " + pading + "px;padding-bottom: 15px;' ><input  name='cbxDonVi' type=\"checkbox\" value='" + t["ID"] + "'></label><strong><a href='javascript:void(0)' onclick='ShowCoQuanCapDuoi(" + t["ID"] + ")' >" + ten + "</a></strong></div>";
                var level_next = level + 1;
                str += Render_Checbox_PhanCap(list, t["ID"], level_next);
            }
            else {
                if (lv != t["IPARENT"]) {
                    str += "<div " + style + " class='checkbox div_" + t["IPARENT"] + "'><label style='padding-left: " + pading + "px;' ><strong><input type=\"checkbox\" onclick='CheckAll(" + t["IPARENT"] + ",this)'  value='" + t["IPARENT"] + "'>Chọn tất cả</strong></label></div>";
                }
                str += "<div " + style + " class='checkbox div_" + t["IPARENT"] + "'><label style='padding-left: " + pading + "px;padding-bottom: 15px;'><input name='cbxDonVi' type=\"checkbox\" value='" + t["ID"] + "'></label>" + ten + "</div>";
                lv = t["IPARENT"];
            }
        }
    }
    return str;
}
var arrObj = [];
function ArrayObj(list, id_parent, level) {

    var space = "";
    for (var i = 0; i < level; i++) {
        space += "- - - ";
    }
    var lstObj = list.filter(obj => obj.IPARENT === id_parent);
    for (var j = 0; j < list.length; j++) {
        var t = lstObj[j];
        if (t != null) {
            var ten = space + t["CTEN"];
            var obj = new Object();
            obj.ID = t["ID_ENCR"];
            obj.Name = ten;
            arrObj.push(obj);

            var lstObjChild = list.filter(obj => obj.IPARENT === t["ID"]);
            if (lstObjChild.length > 0) {
                var level_next = level + 1;
                ArrayObj(list, t["ID"], level_next);
            }
        }
    }
    return arrObj;
}

function Render_CapDonVi() {
    var lstObj = [{ Name: "UBND tỉnh Thừa Thiên Huế", ID: 0 }, { Name: "Cơ quan Sở ban ngành", ID: 1 }, { Name: "UBND Quận, Huyện, Thị xã", ID: 2 }, { Name: "UBND Xã, Phường, Thị trấn", ID: 3 }];
    var str = "<div class=\"form-group\"><div class=\"checkbox\">";
    for (var i = 0; i < lstObj.length; i++) {
        var t = lstObj[i];
        var style = t["ID"] == 0 ? " style=\"padding-left: 20px;\"" : "";
        str += "<label " + style + "><input type=\"checkbox\" onclick='ChoseCapDonViBiLoai(this)' class='cbxCapDonVi' name='cbxCapDonVi' value=" + t["ID"] + ">" + t["Name"] + "</label>";
    }
    str += "</div></div>";
    return str;
}
function ShowCoQuanCapDuoi(id) {
    if ($(".div_" + id + "").is(":hidden")) {
        $(".div_" + id + "").show();

    }
    else {
        $(".div_" + id + "").hide();

    }
}

var file_type = "doc,docx,xls,xlsx,pdf,jpg,JPG,PDF";
function CheckFileTypeUpload(idfile, id_namefile) {

    file = $("#" + idfile).val();
    filetype_upload = file.split(".");
    typefile = filetype_upload[filetype_upload.length - 1];
    var filetype_check = file_type.split(",");
    check = 0;
    for (i = 0; i < filetype_check.length; i++) {
        if (typefile == filetype_check[i]) { check = check + 1; break; }
    }
    if (check == 0) {
        alert("Định dạng file đính kèm không hợp lệ! Vui lòng chỉ chọn các định dạng: " + file_type);
        $("#" + idfile).val("");
        $("#" + id_namefile).val("");


    } else {
        $("#" + id_namefile).val(file);
    }
}
function parseJsonDate(jsonDateString) {
    return new Date(parseInt(jsonDateString.replace('/Date(', '')));
}
String.prototype.replaceAll = function (stringToFind, stringToReplace) {
    if (stringToFind === stringToReplace) return this;
    var temp = this;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
};
function financial(x, n) {
    return Number.parseFloat(x).toFixed(n);
}

var arr = [];
function RenderTable(list_cot, level, id_parent) {
    var str = "";
    var space = "";
    for (var i = 0; i < level; i++) {
        space += "- - - ";
    }
    var list = list_cot.filter(obj => obj.IPARENT === id_parent);
    for (var i = 0; i < list.length; i++) {
        var t = list[i];
        var list_child = list_cot.filter(obj => obj.IPARENT === t["ID"]);
        if (list_child.length > 0) {
            var level_next = level + 1;
            var max_level = $("#max_level").val();

            if (level_next > max_level) {
                $("#max_level").val(level_next);
            }
            str += RenderTable(list_cot, level_next, t["ID"]);
        } else {
            var max_level = $("#max_level").val();
            if (level > max_level) {
                $("#max_level").val(level);
            }
        }
    }
    return str;
}
function Render_Table_View(list_cot, id_parent, level, list_parent, baocaovalue) {
    var str = "<tr>";
    if (id_parent == 0) {//cấp 0
        var list = list_cot.filter(obj => obj.IPARENT === id_parent);
        for (var i = 0; i < list.length; i++) {
            var t = list[i];
            var rowspan = RowSpan_Column(list_cot, level, t["ID"]);
            var colspan = ColSpan_Column(list_cot, 0, t["ID"], 0);
            var loaicongthuc = !IsNullOrEmpty(t["CLOAICONGTHUC"]) ? " (" + t["CLOAICONGTHUC"].trim() + ") " : "";
            var kyhieuorcongthuc = t["CCONGTHUC"] != "" ? "<p style='font-weight: normal;'><em>(" + t["CKYHIEU"] + ")=" + t["CCONGTHUC"].replaceAll("{", "(").replaceAll("}", ")") + loaicongthuc + "</em></p>" : t["CKYHIEU"] != "" ? "<p style='font-weight: normal;'><em>(" + t["CKYHIEU"] + ")</em></p>" : "";
            var swith = !IsNullOrEmpty(t["IWIDTH"]) ? style = "style='width:" + t["IWIDTH"] + "px'" : "";
            str += "<th " + swith + "  rowspan='" + rowspan + "' colspan='" + colspan + "' class='tcenter'>" + t["CTEN"] + kyhieuorcongthuc + "</th>";
            var list_child = list_cot.filter(obj => obj.IPARENT === t["ID"]);
            if (list_child.length > 0) {
                list_parent.push(t["ID"]);
            }
        }
        if (list_parent.length > 0) {
            //alert(list_parent.length);
            var level_next = level + 1;
            str += Render_Table_View(list_cot, 1, level_next, list_parent, baocaovalue)
        }
    } else {
        var list_parent_child = [];
        for (var j = 0; j < list_parent.length; j++) {
            var list = list_cot.filter(obj => obj.IPARENT === list_parent[j]);
            for (var i = 0; i < list.length; i++) {
                var t = list[i];
                var rowspan = RowSpan_Column(list_cot, level, t["ID"]);
                var colspan = ColSpan_Column(list_cot, 0, t["ID"], 0);
                var loaicongthuc = !IsNullOrEmpty(t["CLOAICONGTHUC"]) ? " (" + t["CLOAICONGTHUC"].trim() + ") " : "";
                var kyhieuorcongthuc = t["CCONGTHUC"] != "" ? "<p style='font-weight: normal;'><em>(" + t["CKYHIEU"] + ")=" + t["CCONGTHUC"].replaceAll("{", "(").replaceAll("}", ")") + loaicongthuc + "</em></p>" : t["CKYHIEU"] != "" ? "<p style='font-weight: normal;'><em>(" + t["CKYHIEU"] + ")</em></p>" : "";
                var swith = !IsNullOrEmpty(t["IWIDTH"]) ? style = "style='width:" + t["IWIDTH"] + "px';display:" : "";
                str += "<th " + swith + " rowspan='" + rowspan + "' colspan='" + colspan + "' class='tcenter'>" + t["CTEN"] + kyhieuorcongthuc + "</th>";
                var list_child = list_cot.filter(obj => obj.IPARENT === t["ID"]);
                if (list_child.length > 0) {
                    list_parent_child.push(t["ID"]);
                }
            }
        }
        if (list_parent_child.length > 0) {
            var level_next = level + 1;
            str += Render_Table_View(list_cot, id_parent, level_next, list_parent_child, baocaovalue);
        }
    }

    str += "</tr>";
    return str;
}
function RowSpan_Column(list_cot, level, id_cot) {
    var list = list_cot.filter(obj => obj.IPARENT === id_cot);
    if (list.length > 0) {
        return 1;
    } else {
        var max_level = parseFloat($("#max_level").val()) + 1;
        var rowspan = max_level - level;
        return rowspan;
    }
}
function ColSpan_Column(list_cot, level, id_cot, colspan) {
    var list = list_cot.filter(obj => obj.IPARENT === id_cot);
    if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            var t = list[i];
            var list_child = list_cot.filter(obj => obj.IPARENT === t["ID"]);
            if (list_child.length > 0) {
                for (var j = 0; j < list_child.length; j++) {
                    var list_child_j = list_cot.filter(obj => obj.IPARENT === list_child[j]["ID"]);
                    if (list_child_j.length > 0) {
                        for (var k = 0; k < list_child_j.length; k++) {
                            var list_child_k = list_cot.filter(obj => obj.IPARENT === list_child_j[k]["ID"]);
                            if (list_child_k.length > 0) {
                                for (var l = 0; l < list_child_k.length; l++) {
                                    var list_child_l = list_cot.filter(obj => obj.IPARENT === list_child_k[l]["ID"]);
                                    if (list_child_l.length > 0) {
                                        colspan += list_child_l.length;
                                    } else {
                                        colspan++;
                                    }
                                }
                            } else {
                                colspan++;
                            }
                        }
                    } else {
                        colspan++;
                    }
                }
            } else {
                colspan++;
            }
        }
        return colspan;
    } else {
        return 1;
    }
}
function RowNumberCol(list_cot, id_parent) {
    var list = list_cot.filter(obj => obj.IPARENT === id_parent);
    for (var i = 0; i < list.length; i++) {
        var t = list[i];
        var list_child = list_cot.filter(obj => obj.IPARENT === t["ID"]);
        if (list_child.length <= 0) {
            arr.push(t);
        }
        else {
            RowNumberCol(list_cot, t["ID"])
        }
    }
    return arr;
}
function CheckKyTuTrongCongThuc(string) {
    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (string.match(format)) {
        return true;
    } else {
        return false;
    }
}
function CheckIsDauNgoac(item) {
    if (item == "{" || item == "}") {
        return true;
    }
    else return false;
}
function isNumeric(num) {
    return !isNaN(num)
}
function ChuyenPhepTinhThanhMang(expression) {
    var copy = expression;
    expression = expression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
    var numbers = copy.split(/[^0-9\.]+/);
    var operators = expression.split("#").filter(function (n) { return n });
    var result = [];
    for (i = 0; i < numbers.length; i++) {
        result.push(numbers[i]);
        if (i < operators.length) result.push(operators[i]);
    }
    return result;
    //console.log(result);
}
function KetQua_Chuoi_NhieuNgoac(congthuc, stt_ngoac) {
    var congthuc_split_mongoac = congthuc.split("(");
    var congthuc_split_dongngoac = congthuc.split(")");
    if (congthuc_split_dongngoac[0].indexOf("(") != -1) {
        var congthuc_split_dongngoac0_split = congthuc_split_dongngoac[0].split("(");

        var vitri_mongoac_cuoi = congthuc_split_dongngoac0_split.length - 1;
        var ketqua_trongngoac = KetQua_Chuoi_KhongNgoac(congthuc_split_dongngoac0_split[congthuc_split_dongngoac0_split.length - 1]);
        var congthuc_split_mongoac_1 = congthuc_split_dongngoac[0].split("(");
        var congthuc_new = "";
        for (var i = 0; i < congthuc_split_mongoac_1.length - 1; i++) {
            if (i > 0) {
                //if (vitri_mongoac_cuoi)
                congthuc_new += "(" + congthuc_split_mongoac_1[i];
            } else {
                congthuc_new += congthuc_split_mongoac_1[i];
            }
        }
        congthuc_new = congthuc_new + ketqua_trongngoac + Noi_Mang_Ngoac(congthuc_split_dongngoac, 1, ")");
    }
}
function KetQua_Chuoi_TrongNgoac(congthuc) {
    var congthuc_split = congthuc.split("(");
    //console.log(congthuc_split[1]);
    var count_ngoac = congthuc_split.length - 1;
    //console.log(count_ngoac);
    if (count_ngoac > 0) {//có ngoặc
        if (count_ngoac == 1) {// công thức chỉ có 1 dấu ngoặc
            //C*(A+B)+D || C*(A+B) || (A+B)+D
            var chuoi_right = congthuc_split[1];

            var congthuc_split_dong = chuoi_right.split(")");
            var chuoi_trongngoac = congthuc_split_dong[0];
            var mang_chuoi_trongngoac = ChuyenPhepTinhThanhMang(chuoi_trongngoac);
            if (congthuc_split[0] == "" && congthuc_split_dong[1] == "") {
                return KetQua_Chuoi_KhongNgoac(mang_chuoi_trongngoac);
            }
            congthuc = congthuc_split[0] + KetQua_Chuoi_KhongNgoac(mang_chuoi_trongngoac) + congthuc_split_dong[1];

            var mang_congthuc = ChuyenPhepTinhThanhMang(congthuc);
            var ketqua = KetQua_Chuoi_KhongNgoac(mang_congthuc);
            return ketqua;
        } else {
            KetQua_Chuoi_NhieuNgoac(congthuc, 1)
            //console.log(congthuc);
            var chuoi_right = congthuc_split[1];
            var congthuc_split_dong_ngoac = chuoi_right.split(")");
            var mang_dongngoac = congthuc.split(")");
            //console.log(Noi_Mang(chuoi_right, 1));
            if (congthuc_split_dong_ngoac[0].indexOf("(") == -1) {//trong ngoặc không có ngoặc
                //c*(a+b)+c*(d+e)
                var mang_congthuc = ChuyenPhepTinhThanhMang(congthuc_split_dong_ngoac[0]);
                var ketqua = KetQua_Chuoi_KhongNgoac(mang_congthuc);
                congthuc = congthuc_split[0] + ketqua + Noi_Mang_Ngoac(mang_dongngoac, 1, ")");
                //console.log(congthuc);
                if (congthuc.indexOf("(") != -1) {// có ngoặc
                    return KetQua_Chuoi_TrongNgoac(congthuc);
                } else {
                    var mang_congthuc_return = ChuyenPhepTinhThanhMang(congthuc);
                    return KetQua_Chuoi_KhongNgoac(mang_congthuc_return)
                }
            } else {//trong ngoặc có chứa ngoặc

            }
        }
    } else {// không có ngoặc
        //console.log(congthuc_split[1]);
        var congthuc_split_dong = congthuc_split[1].split(")");
        var chuoi_trongngoac = congthuc_split_dong[0];
        var ketqua = KetQua_Chuoi_KhongNgoac(chuoi_trongngoac);
    }
}
function Noi_Mang_Ngoac(mang, vitri_batdau, noi) {
    var str = "";
    for (var t = 0; t < mang.length; t++) {
        if (t >= vitri_batdau) {
            //console.log(mang[t]);
            if (t < mang.length - 1) {
                if (noi == ")") {
                    str += mang[t] + ")";
                } else {
                    str += "(" + mang[t];
                }
            }

        }
    }
    return str;
}
function Read_(congthuc) {

    if (congthuc.indexOf("(") != -1) {// có ngoặc
        var ketqua = KetQua_Chuoi_TrongNgoac(congthuc) == "Infinity" ? "0" : KetQua_Chuoi_TrongNgoac(congthuc);
        return ketqua;
    }
    else {// không có ngoặc
        //A+B*2-C/D
        if (congthuc.indexOf("*") != -1 || congthuc.indexOf("/") != -1 ||
            congthuc.indexOf("-") != -1 || congthuc.indexOf("+") != -1) {
            var chuoi = ChuyenPhepTinhThanhMang(congthuc);
            var ketqua = KetQua_Chuoi_KhongNgoac(chuoi);
            return ketqua;
        }
    }
}
function KetQua_Chuoi_KhongNgoac_NhanChia(chuoi_arr) {
    var ketqua = 0;
    var chuoi_new = [];
    var count_chuoi = chuoi_arr.length;
    for (var i = 0; i < chuoi_arr.length; i++) {
        var next = i + 1;
        var preview = i - 1;
        if (chuoi_arr[i] == "*" || chuoi_arr[i] == "/") {
            var tich = 0
            if (chuoi_arr[i] == "*") {
                tich = parseFloat(chuoi_arr[preview]) * parseFloat(chuoi_arr[next]);
            } else {
                tich = parseFloat(chuoi_arr[preview]) / parseFloat(chuoi_arr[next]);
            }
            for (var j = 0; j < chuoi_arr.length; j++) {
                if (j < preview || j > next) {
                    chuoi_new.push(chuoi_arr[j]);
                } else {
                    if (j > preview && j < next) {
                        chuoi_new.push(tich);
                    }
                }
            }
            break;
        }
    }
    if (chuoi_new.length > 0 && (chuoi_new.indexOf("*") != -1 || chuoi_new.indexOf("/") != -1)) {
        //console.log(chuoi_new);
        return KetQua_Chuoi_KhongNgoac_NhanChia(chuoi_new);
    } else {
        return chuoi_new;
    }
}
function KetQua_Chuoi_KhongNgoac(chuoi_arr) {
    //var chuoi_arr = ChuyenPhepTinhThanhMang(chuoi);    
    if (chuoi_arr.indexOf("*") != -1 || chuoi_arr.indexOf("/") != -1) {
        chuoi_arr = KetQua_Chuoi_KhongNgoac_NhanChia(chuoi_arr);
    }
    var ketqua = 0;
    if (chuoi_arr.length == 1) {
        return chuoi_arr[0];

    }
    var chuoi_new = [];
    var count_chuoi = chuoi_arr.length;
    for (var i = 0; i < chuoi_arr.length; i++) {
        var next = i + 1;
        var preview = i - 1;
        if (chuoi_arr[i] == "+" || chuoi_arr[i] == "-") {
            var tich = 0;
            if (chuoi_arr[i] == "-") {
                tich = parseFloat(chuoi_arr[preview]) - parseFloat(chuoi_arr[next]);
            } else {
                tich = parseFloat(chuoi_arr[preview]) + parseFloat(chuoi_arr[next]);
            }
            for (var j = 0; j < chuoi_arr.length; j++) {
                if (j < preview || j > next) {
                    chuoi_new.push(chuoi_arr[j]);
                } else {
                    if (j > preview && j < next) {
                        chuoi_new.push(tich);
                    }
                }
            }
            break;
        }
    }
    if (chuoi_new.length == 1) {
        return chuoi_new;

    }
    else {
        if ((chuoi_new.indexOf("+") != -1 || chuoi_new.indexOf("-") != -1)) {
            //console.log(chuoi_new);
            return KetQua_Chuoi_KhongNgoac(chuoi_new);
        } else {
            //console.log(chuoi_new);
            return chuoi_new;
        }
    }

}
function Read_TrongNgoac(congthuc_in) {
    var val = 0;
    if (congthuc_in.split("(") == -1) {

    }
    return val;
}
function getNum(val) {
    if (isNaN(val)) {
        return 0;
    }
    else if (!isFinite(val)) {
        return 0;
    }
    else return val;
}
function LichSu(id) {
    $.ajax({
        url: "/BaoCao/LichSu_Json",
        type: 'GET',
        dataType: 'json',
        data: { "id": id },
        success: function (response) {
            var data = response.data;
            var html = "";
            if (data.length) {
                for (var i = 0; i < data.length; i++) {
                    var lst = data[i];
                    var blue = "";
                    var noidung = !IsNullOrEmpty(lst["ITYPEVALUE"]) ? lst["CNOIDUNG"] + "<br/>" + "<span class='f-red'>" + base.fomatValueByType(lst["ITYPEVALUE"], lst["GIATRICU"]) + "</span> => <span class='f-blue'>" + base.fomatValueByType(lst["ITYPEVALUE"], lst["GIATRIMOI"]) : lst["CNOIDUNG"];
                    if (lst["ITYPEPING"] == 1) { blue = ""; }
                    html += "<tr class='" + blue + "'><td class='tcenter'>" + parseInt(i + 1)
                        + "</td><td class='tcenter'>" + base.formatDatetime(lst["DDATE_MODIFY"]) + "<br/>" + lst["CTAIKHOAN"]
                        + "</td><td>" + noidung
                        + "</td><td>" + lst["CGHICHU"]
                        + "</td></tr>";
                }
            }
            $("#modal-title-lichsu").html("Lịch sử cập nhật báo cáo");
            $("#gird_lichsu").html(html);
            $("#modal-lichsu").modal("show");
        },
    });
}
function CheckResultThreading(result, loadPage) {
    //$("#progress").html('<div class="progress progress-striped"><div role="progressbar" class="progress-bar progress-bar-success" style="width: 0%;">0 / 100</div></div>');
    setTimeout(function () {
        $.ajax({
            url: '/Home/CheckResultThreading',
            data: { "ID": result.ID },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var data = data.ketqua;
                var kq = data.IsDone == "true" || data.IsDone == "True" || data.IsDone == true ? true : false;
                if (!kq) {
                    //$("#progress").html('<div class="progress progress-striped"><div role="progressbar" class="progress-bar progress-bar-success" style="width: ' + temp + '%;">' + temp + ' / 100</div></div>');
                    CheckResultThreading(result, loadPage);
                }
                else {
                    AlertAction(data.thongbao);
                    loadPage();
                }
            }
        });
    }, 0);
}
function LoadCurentPage() {
    location.reload();
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function ConvertDouble(value) {
    if (value == "true" || value == true || value == "True") return true;
    else return false;
}
function LoadForm(url, id, loadFuntion) {
    ShowPageLoading();
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'html',
        data: { "id": id },
        success: function (result) {
            $("#page-wrapper").html(result); loadFuntion();
        },
    });
    RemovePageLoading();
}
function MethodPost(url, formData, loadFuntion) {
    $.ajax({
        url: url,
        type: 'POST',
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        dataType: 'json',
        success: function (resule) {
            if (resule) {
                AlertAction("Cập nhật thành công!");
                loadFuntion();
            }
            else {
                AlertAction("Đã có lỗi trong quá trình xử lý!");
            }
        }
    });
}
