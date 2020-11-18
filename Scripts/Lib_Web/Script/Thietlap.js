function Get_Checked(val) {
    var str = "";
    if (val == 1) { str = "checked"; }
    return str;
}
function Option_LoaiTaiKhoan(phongban, id_user) {

    var str = "";
    if (phongban.length == 0 || phongban == "") {

        return str;
    }
    for (var i = 0; i < phongban.length; i++) {
        var t = phongban[i];
        var sel = ""; if (t["ID"] == id_user) { sel = "selected"; }
        str += "<option " + sel + " value='" + t["ID"] + "'>" + t["NAME"] + "</option>";
    }
    return str;
}
function Option_ChucVu(phongban, id_user) {

    var str = "<option value='0'>Vui lòng chọn</option>";
    if (phongban.length == 0 || phongban == "") {

        return str;
    }
    for (var i = 0; i < phongban.length; i++) {
        var t = phongban[i];
        var sel = ""; if (t["ICHUCVU"] == id_user) { sel = "selected"; }
        str += "<option " + sel + " value='" + t["ICHUCVU"] + "'>" + t["CTEN"] + "</option>";
    }
    return str;
}
function Option_PhongBan(phongban, id_user) {

    var str = "<option value='0'>Vui lòng chọn</option>";
    if (phongban.length == 0 || phongban == "") {

        return str;
    }
    for (var i = 0; i < phongban.length; i++) {
        var t = phongban[i];
        var sel = ""; if (t["ID"] == id_user) { sel = "selected"; }
        str += "<option " + sel + " value='" + t["ID"] + "'>" + t["CTEN"] + "</option>";
    }
    return str;
}
function Option_NhanVien(users_list, id_user) {

    var str = "<option value='0'>Vui lòng chọn</option>";
    if (users_list.length == 0 || users_list == "") {

        return str;
    }
    for (var i = 0; i < users_list.length; i++) {
        var t = users_list[i];
        var phongban = t["PHONGBAN"];
        if (t["CHUCVU"] != "") {
            phongban = t["CHUCVU"] + "- " + phongban;
        }
        var tennhanvien = t["CTEN"] + " (" + phongban + ")";
        var sel = ""; if (t["IUSER"] == id_user) { sel = "selected"; }
        str += "<option " + sel + " value='" + t["IUSER"] + "'>" + tennhanvien + "</option>";
    }
    return str;
}
function Option_DonVi(donvi, id_parent, level, id_donvi) {
    var str = "";
    if (id_parent == 0) {
        str = "<option value='0'>Tất cả đơn vị</option>";
    }
    var space = ""; for (var c = 0; c < level; c++) { space += "- - "; }
    var donvi_ = donvi.filter(x => x.IPARENT === id_parent);
    for (var i = 0; i < donvi_.length; i++) {
        var t = donvi_[i]; var sel = ""; if (id_donvi == t["IDONVI"]) { sel = "selected"; }
        str += "<option value='" + t["IDONVI"] + "'  " + sel + ">" + space + t["CTEN"] + "</option>";
        var donvi_child = donvi.filter(x => x.IPARENT === t["IDONVI"]);
        if (donvi_child.length > 0) {
            var level_next = level + 1;
            str += Option_DonVi(donvi, t["IDONVI"], level_next, id_donvi);
        }
    }
    return str;
}
function Option_CauHinh(list, id) {
    var str = "";
    for (var i = 0; i < list.length; i++) {
        var sel = ""; if (list[i]["ID"] == id) { sel = "selected"; }
        str += "<option " + sel + " value='" + list[i]["ID"] + "'>" + list[i]["CTEN"] + "</option>";
    }
    return str;
}
function Option_NhomBaoCao(list, id) {
    var str = "<option value=0>Tất cả</option>";
    if (list.length == 0 || list == "") {
        return str;
    }
    for (var i = 0; i < list.length; i++) {
        var t = list[i];
        var sel = ""; if (t["ID"] == id) { sel = "selected"; }
        str += "<option " + sel + " value='" + t["ID"] + "'>" + t["CTEN"] + "</option>";
    }
    return str;
}
function Option_TrangThaiBaoCao(id) {
    var str = "";
    var trangthai = ["Mới", "Đang cập nhật", "Đang chờ duyệt", "Yêu cầu sửa lại", "Đã duyệt", "Đã xuất bản"];
    for (var t = 0; t < trangthai.length; t++) {
        var sel = "";
        if (t == id) {
            sel = "selected";
        }
        str += "<option " + sel + " value='" + t + "'>" + trangthai[t] + "</option>";
    }
    return str;
}
function Option_TrangThaiMauBaoCao(id) {
    var str = "";
    var trangthai = ["Đang cập nhật", "Đã áp dụng", "Đã hủy áp dụng"];
    for (var t = 0; t < trangthai.length; t++) {
        var sel = "";
        if (t == id) {
            sel = "selected";
        }
        str += "<option " + sel + " value='" + t + "'>" + trangthai[t] + "</option>";
    }
    return str;
}