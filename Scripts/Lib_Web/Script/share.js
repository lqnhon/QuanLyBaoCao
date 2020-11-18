var base = {
    init: function () {
        //  alert(Read_('10*(10+100)/0'));
    },
    registerEvents: function () {

    },
    setDefaultForcusOption: function () {
        $('select').on('select2:select', function (e) {
            $(this).focus();
        });
        $('.select2-search__field').on('keyup', function (e) { if (e.keyCode == 13) $(this).focus(); })
    },
    checkedByValue: function (name, value) {
        var x = document.getElementsByName(name);
        for (var i = 0; i < x.length; i++) {
            if (x[i].value == value) {
                x[i].checked = true;
            }
        }
    },
    setDefaultKyBaoCao: function () {
        $('.option-kybaocao').val(null).trigger('change');
    },
    setDefaultDanhMucBaoCao: function () {
        $('.option-danhmuc').val(null).trigger('change');
    },
    setDefaultDonVi: function () {
        $('.option-donvi').val(null).trigger('change');
    },
    setDefaultTaiKhoan: function () {
        $('.option-taikhoan').val(null).trigger('change');
    },
    setDefaultTaiKhoanMultiple: function () {
        $('.option-multiple-taikhoan').val(null).trigger('change');
    },
    fomatValueByType: function (type, value) {
        switch (type) {
            case 12:
                return parseFloat(value);
                break;
            case 17:
                return base.formatMoney(parseFloat(value));
                break;
            case 14:
                var returns = value == "on" ? "chọn" : "bỏ chọn";
                return returns;
                break;
            default:
                var returns = !IsNullOrEmpty(value) ? value : "";
                return returns;
                break;
        }
    },
    formatOption: function (repo) {
        if (repo.loading) {
            if (repo.loading) return repo.name;
        }
        var markup = '<div>' + repo.name + '</div>';
        return markup;
    },
    formatOptionTaiKhoan: function (repo) {
        if (repo.loading) {
            if (repo.loading) return repo.name;
        }
        var chucvu = !IsNullOrEmpty(repo.chucvu) ? repo.chucvu + ": " : "";
        var phongban = !IsNullOrEmpty(repo.phongban) ? repo.phongban : "";
        var markup = '<div>' + chucvu + repo.name + '</div><div>' + phongban + '</div>';
        return markup;
    },
    formatCusSelection: function (repo) {
        return repo.text;
    },
    formatDate: function (jsonDateString) {
        if (jsonDateString == null) return "";
        var date = new Date(parseInt(jsonDateString.replace('/Date(', '')));
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return day + '/' + month + '/' + year;
    },
    formatDatetime: function (jsonDateString) {
        if (jsonDateString == null) return "";
        var date = new Date(parseInt(jsonDateString.replace('/Date(', '')));
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        var minutes = date.getMinutes().toString();
        minutes = minutes.length > 1 ? minutes : '0' + minutes;
        var hour = date.getHours().toString();
        hour = hour.length > 1 ? hour : '0' + hour;
        return hour + ':' + minutes + '  ' + day + '/' + month + '/' + year;
    },
    formatMoneyByID: function (value, id) {
        var val = 0;
        value = value.replaceAll(",", "");
        if (isNumeric(value)) {
            value = parseFloat(value);
            if (value != "")
                val = (value + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            else val = 0;
        }
        else val = 0;
        $("#" + id).val(val);
    },
    formatMoney: function (value) {
        if (value != "")
            return (value + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        else return 0;
    },
    loadOptionDonVi: function () {
        $('.option-donvi').select2({
            width: '100%',
            allowClear: true,
            placeholder: {
                id: "",
                placeholder: ""
            },
            ajax: {
                url: "/ThietLap/DonVi_Option_Json",
                dataType: "json",
                data: function (params) {
                    return {
                        key: params.term,
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    arrObj = [];
                    var lst = ArrayObj(data.result, 0, 0);
                    return {
                        results: $.map(lst, function (item) {
                            return {
                                text: item.Name,
                                ma: item.Code,
                                name: item.Name,
                                id: item.ID,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOptionDonVi,
            templateSelection: base.formatCusSelection
        });

    },
    loadOptionPhongBan: function (ip_id = "option-donvi") {
        $('.option-phongban').select2({
            width: '100%',
            allowClear: true,
            placeholder: {
                id: "",
                placeholder: ""
            },
            ajax: {
                url: Url_Action("ThietLap", "PhongBan_Option_Json"),
                dataType: 'text',
                data: function (params) {
                    return {
                        key: params.term,
                        donvi: $("." + ip_id).val(),
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    var lst = ParseToJson(data);
                    return {
                        results: $.map(lst.result, function (item) {
                            return {
                                text: item.Name,
                                ma: item.Code,
                                name: item.Name,
                                desc: item.Description,
                                id: item.ID,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOptionDonVi,
            templateSelection: base.formatCusSelection
        });
    },
    loadOptionChucVu: function () {
        $('.option-chucvu').select2({
            width: '100%',
            allowClear: true,
            placeholder: {
                id: "",
                placeholder: ""
            },
            ajax: {
                url: Url_Action("ThietLap", "ChucVu_Option_Json"),
                dataType: 'text',
                data: function (params) {
                    return {
                        key: params.term,
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    var lst = ParseToJson(data);
                    return {
                        results: $.map(lst.result, function (item) {
                            return {
                                text: item.Name,
                                name: item.Name,
                                id: item.ID,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOption,
            templateSelection: base.formatCusSelection
        });
    },
    loadOptionNam: function () {
        $('.option-nam').select2({
            width: '100%',
            allowClear: true,
            placeholder: {
                id: "",
                placeholder: ""
            },
            ajax: {
                url: Url_Action("Home", "Ajax_Load_Option_Nam"),
                dataType: 'text',
                data: function (params) {
                    return {
                        key: params.term,
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    var lst = ParseToJson(data);
                    return {
                        results: $.map(lst.result, function (item) {
                            return {
                                text: item.Name,
                                name: item.Name,
                                id: item.ID,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOption,
            templateSelection: base.formatCusSelection
        });
    },
    loadOptionThang: function () {
        $('.option-thang').select2({
            width: '100%',
            allowClear: true,
            placeholder: {
                id: "",
                placeholder: ""
            },
            ajax: {
                url: Url_Action("Home", "Ajax_Load_Option_Thang"),
                dataType: 'text',
                data: function (params) {
                    return {
                        key: params.term,
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    var lst = ParseToJson(data);
                    return {
                        results: $.map(lst.result, function (item) {
                            return {
                                text: item.Name,
                                name: item.Name,
                                id: item.ID,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOption,
            templateSelection: base.formatCusSelection
        });
    },
    loadOptionQuy: function () {
        $('.option-quy').select2({
            width: '100%',
            allowClear: true,
            placeholder: {
                id: "",
                placeholder: ""
            },
            ajax: {
                url: Url_Action("Home", "Ajax_Load_Option_Quy"),
                dataType: 'text',
                data: function (params) {
                    return {
                        key: params.term,
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    var lst = ParseToJson(data);
                    return {
                        results: $.map(lst.result, function (item) {
                            return {
                                text: item.Name,
                                name: item.Name,
                                id: item.ID,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOption,
            templateSelection: base.formatCusSelection
        });
    },
    loadOptionMauBaoCao: function () {
        $('.option-maubaocao').select2({
            width: '100%',
            allowClear: true,
            placeholder: "Chọn mẫu báo cáo",
            ajax: {
                url: "/Cauhinh/Maubaocao_Option_Json",
                dataType: 'json',
                data: function (params) {
                    return {
                        key: params.term,
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    var lst = data;
                    return {
                        results: $.map(lst.maubaocao, function (item) {
                            return {
                                text: item.CTEN,
                                name: item.CTEN,
                                id: item.ID_ENCR,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOption,
            templateSelection: base.formatCusSelection
        });
    },
    loadOptionTaiKhoan: function (model = "") {
        $('.option-taikhoan').select2({
            width: '100%',
            allowClear: true,
            placeholder: "Tìm kiếm tài khoản",
            dropdownParent: model,
            ajax: {
                url: "/ThietLap/Taikhoan_Option_Json",
                dataType: 'json',
                data: function (params) {
                    return {
                        key: params.term,
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    var lst = data;
                    return {
                        results: $.map(lst.taikhoan, function (item) {
                            return {
                                text: item.CTEN,
                                name: item.CTEN,
                                chucvu: item.CHUCVU,
                                phongban: item.PHONGBAN,
                                id: item.IUSER,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOptionTaiKhoan,
            templateSelection: base.formatCusSelection
        });
    },
    loadOptionMultipleTaiKhoan: function () {
        $('.option-multiple-taikhoan').select2({
            width: '100%',
            allowClear: true,
            placeholder: "Chọn tài khoản",
            multiple: true,
            ajax: {
                url: "/Thietlap/Taikhoan_Option_Json",
                dataType: 'json',
                data: function (params) {
                    return {
                        key: params.term,
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    var coquan = data.taikhoan;
                    return {
                        results: $.map(coquan, function (item) {
                            return {
                                text: item.CTEN,
                                name: item.CTEN,
                                chucvu: item.CHUCVU,
                                phongban: item.PHONGBAN,
                                id: item.IUSER,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOptionTaiKhoan,
            templateSelection: base.formatCusSelection
        });
    },
    loadCheckDonViMultiple: function (lstChecked) {
        $.ajax({
            url: "/Thietlap/Coquan_Json",
            type: 'GET',
            dataType: "json",
            success: function (data) {
                var coquan = data.coquan;
                var html = Render_Checbox_PhanCap(coquan, 0, 0);
                $("#check_ip").html(html);
                $(".div_1").show();
            }
        });
    },
    loadOptionKyBaoCao: function () {
        $('.option-kybaocao').select2({
            width: '100%',
            allowClear: true,
            placeholder: "Chọn kỳ báo cáo số liệu",
            ajax: {
                url: "/Cauhinh/Maubaocao_Ky_Option_Json",
                dataType: 'json',
                data: function (params) {
                    return {
                        key: params.term,
                        mauID: $(".option-maubaocao").val(),
                        page: params.page
                    };
                },
                processResults: function (data, page) {
                    var lst = data;
                    return {
                        results: $.map(lst.maubaocao, function (item) {
                            return {
                                text: item.KYBAOCAO,
                                name: item.KYBAOCAO,
                                id: item.ID,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOption,
            templateSelection: base.formatCusSelection
        });
    },
    loadOptionDanhMuc: function (list, id = 0) {
        var str = "";
        if (list != null) {
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                var sel = "";
                if (id == obj["ID"]) {
                    sel = "selected";
                }
                str += "<option " + sel + "  value=" + obj["ID"] + ">" + obj["CTEN"] + "</option>";
            }
        }
        return str;
    },
    loadOptionDanhMucByMucBaoCao: function (placeholder="Chọn danh mục") {
        $('.option-danhmuc').select2({
            width: '100%',
            allowClear: true,
            placeholder: placeholder,
            ajax: {
                url: "/Cauhinh/Danhmuc_by_maubaocao_option_json",
                dataType: 'json',
                data: function (params) {
                    return {
                        key: params.term,
                        page: params.page,
                        tempID: $('.option-maubaocao').val()
                    };
                },
                processResults: function (data, page) {
                    var lst = data;
                    arrObj = [];
                    arrObj = ArrayObj(lst.danhmuc, 0, 0);
                    return {
                        results: $.map(arrObj, function (item) {
                            return {
                                text: item.Name,
                                name: item.Name,
                                id: item.ID,
                            }
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: base.formatOption,
            templateSelection: base.formatCusSelection
        });
    }
}
base.init();