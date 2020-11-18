//$(document).ready(function () {
//    $('#example').ReportTable();
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

function LoadBaoCao(type) {
    document.getElementById('type_Report').value = type;
    if (type == "B01BSTT" || type == "B01BCTC_TT99" || type == "B02BCTC_TT99" || type == "B03BCTC_TT99" || type == "B04BCTC_TT99") {
        $('#InputModal_BaoCao99').modal('toggle');
    }
    else if (type == "B01BSTT_TT107" || type == "B01BCTC_TT107" || type == "B02BCTC_TT107" || type == "B03BCTC_TT107" || type == "B04BCTC_TT107") {
        $('#InputModal_BaoCao107').modal('toggle');
    }
    else if (type == "B01BSTT_TT107TG" || type == "B01BCTC_TT107TG" || type == "B02BCTC_TT107TG" || type == "B03BCTC_TT107TG" || type == "B04BCTC_TT107TG") {
        $('#InputModal_BaoCao107TG').modal('toggle');
    }
    var title = "";
    if (type == "107B01BCQT") {
        title = "Báo cáo quyết toán kinh phí hoạt động(Mẫu B01-BCQT)";
    }
    else if (type == "107B01BCTC") {
        title = "Báo cáo tình hình tài chính(Mẫu B01/BCTC)";
    }
    else if (type == "107B02BCTC") {
        title = "Báo cáo kết quả hoạt động(Mẫu B02/BCTC)";
    }
    else if (type == "107B03aBCTC") {
        title = "Báo cáo lưu chuyển tiền tệ (theo phương pháp gián tiếp)(Mẫu số B03a/BCTC)";
    }
    else if (type == "107B03bBCTC") {
        title = "Báo cáo lưu chuyển tiền tệ (theo phương pháp gián tiếp)(Mẫu số B03b/BCTC)";
    }
    else if (type == "107B04BCTC") {
        title = "Thuyết minh báo cáo tài chính (Mẫu B04/BCTC)";
    }
    else if (type == "B01H") {
        title = "Xuất B01-H";
    }
    //
    else if (type == "B01BSTT") {
        title = "Xuất B01/BSTT - TT9";
    }
    else if (type == "B01BCTC_TT99") {
        title = "Xuất B01/BCTC - TT99";
    }
    else if (type == "B02BCTC_TT99") {
        title = "Xuất B02/BCTC - TT99";
    }
    else if (type == "B03BCTC_TT99") {
        title = "Xuất B03/BCTC - TT99";
    }
    else if (type == "B04BCTC_TT99") {
        title = "Xuất B04/BCTC - TT99";
    }
    //
    else if (type == "B01BSTT_TT107") {
        title = "Xuất B01/BSTT - TT107";
    }
    else if (type == "B01BCTC_TT107") {
        title = "Xuất B01/BCTC - TT107";
    }
    else if (type == "B02BCTC_TT107") {
        title = "Xuất B02/BCTC - TT107";
    }
    else if (type == "B03BCTC_TT107") {
        title = "Xuất B03/BCTC - TT107";
    }
    else if (type == "B04BCTC_TT107") {
        title = "Xuất B04/BCTC - TT107";
    }
    //
    else if (type == "B01BSTT_TT107TG") {
        title = "Xuất B01/BSTT - TT107TG";
    }
    else if (type == "B01BCTC_TT107TG") {
        title = "Xuất B01/BCTC - TT107TG";
    }
    else if (type == "B02BCTC_TT107TG") {
        title = "Xuất B02/BCTC - TT107TG";
    }
    else if (type == "B03BCTC_TT107TG") {
        title = "Xuất B03/BCTC - TT107TG";
    }
    else if (type == "B04BCTC_TT107TG") {
        title = "Xuất B04/BCTC - TT107TG";
    }
    //
    else if (type == "F01_01_BCQT") {
        title = "Xuất F01-01-BCQT";
    }
    var page_url = "";
    page_url += "    <ol class=\"breadcrumb page-breadcrumb pull-left\">";
    page_url += "        <li><i class=\"fa fa-home\"></i>&nbsp;Trang chủ&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i>&nbsp;&nbsp;</li>";
    page_url += "        <li class=\"\">Báo cáo&nbsp;&nbsp;<i class=\"fa fa-angle-right\"></i> &nbsp;&nbsp;</li>";
    page_url += "        <li class=\"active\">" + title +"</li>";
    page_url += "    </ol>";
    $('#page-current-url').html(page_url);
    var html = '';
    html += "<div id=\"table_wrapper\">";
    html += DrawTableReport(type);
    html += "</div>";
    $('.page-content').html(html);
    //var obj = null;
    //var ma = document.getElementById('objUnit').value;
    //var ten = document.getElementById('objUnit').getAttribute('data-name');
    //if (ma.length != 0 && ten.length != 0) {
    //    obj = { id: ma, title: ten }
    //}
    //LoadReport("inputCodeUnit", obj);
    ////LoadReport("inputCodeUnitParent", null);    
    //$("#inputDate").datepicker({ format: 'dd-mm-yyyy' });  
}
function DrawTableReport() {
    var html = '';
    html += "        <table id=\"example\" class=\"display table table-bordered\" style =\"width:100%\">";
    html += "            <thead>";
    html += "                <tr>";
    html += "                   <th>STT</th>";
    html += "                   <th>Mã Số</th>";
    html += "                   <th>Tên Báo Cáo</th>";
    html += "                   <th>Thông Tư</th>";
    html += "                   <th></th>";
    html += "                </tr>";
    html += "            </thead>";
    html += "            <tbody>";      
    html += "                <tr>";
    html += "                   <td colspan=\"5\">I. <strong>Báo cáo theo thông tư 99/2018/TT-BTC đơn vị cấp dưới gửi</strong></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">1</td>";
    html += "                   <td class=\"text-center\">B01/BCTC-TH</td>";
    html += "                   <td>Báo cáo tình hình tài chính tổng hợp</td>";
    html += "                   <td class=\"text-center\">TT99</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B01BCTC_TT99')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">2</td>";
    html += "                   <td class=\"text-center\">B02/BCTC-TH</td>";
    html += "                   <td>Báo cáo tình hình hoạt động tổng hợp</td>";
    html += "                   <td class=\"text-center\">TT99</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B02BCTC_TT99')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">3</td>";
    html += "                   <td class=\"text-center\">B03/BCTC-TH</td>";
    html += "                   <td>Báo cáo lưu chuyển tiền tệ tổng hợp (theo phương pháp gián tiếp)</td>";
    html += "                   <td class=\"text-center\">TT99</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B03BCTC_TT99')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">4</td>";
    html += "                   <td class=\"text-center\">B04/BCTC-TH</td>";
    html += "                   <td>Thuyết minh báo cáo tài chính tổng hợp</td>";
    html += "                   <td class=\"text-center\">TT99</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B04BCTC_TT99')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">5</td>";
    html += "                   <td class=\"text-center\">B01/BSTT 01</td>";
    html += "                   <td>Báo cáo bổ sung thông tin tài chính</td>";
    html += "                   <td class=\"text-center\">TT99</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B01BSTT')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    //
    html += "                <tr>";
    html += "                   <td colspan=\"5\">II. <strong>Báo cáo theo thông tư 107/2017/TT-BTC theo phương pháp trực tiếp</strong></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">1</td>";
    html += "                   <td class=\"text-center\">B01/BCTC-TH</td>";
    html += "                   <td>Báo cáo tình hình tài chính tổng hợp</td>";
    html += "                   <td class=\"text-center\">TT107</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B01BCTC_TT107')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">2</td>";
    html += "                   <td class=\"text-center\">B02/BCTC-TH</td>";
    html += "                   <td>Báo cáo tình hình hoạt động tổng hợp</td>";
    html += "                   <td class=\"text-center\">TT107</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B02BCTC_TT107')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">3</td>";
    html += "                   <td class=\"text-center\">B03/BCTC-TH</td>";
    html += "                   <td>Báo cáo lưu chuyển tiền tệ tổng hợp (theo phương pháp trực tiếp)</td>";
    html += "                   <td class=\"text-center\">TT107</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B03BCTC_TT107')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">4</td>";
    html += "                   <td class=\"text-center\">B04/BCTC-TH</td>";
    html += "                   <td>Thuyết minh báo cáo tài chính tổng hợp</td>";
    html += "                   <td class=\"text-center\">TT107</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B04BCTC_TT107')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">5</td>";
    html += "                   <td class=\"text-center\">B01/BSTT 01</td>";
    html += "                   <td>Báo cáo bổ sung thông tin tài chính</td>";
    html += "                   <td class=\"text-center\">TT107</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B01BSTT_TT107')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td colspan=\"5\">III. <strong>Báo cáo theo thông tư 107/2017/TT-BTC theo phương pháp gián tiếp</strong></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">1</td>";
    html += "                   <td class=\"text-center\">B01/BCTC-TH</td>";
    html += "                   <td>Báo cáo tình hình tài chính tổng hợp</td>";
    html += "                   <td class=\"text-center\">TT107 GT</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B01BCTC_TT107TG')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">2</td>";
    html += "                   <td class=\"text-center\">B02/BCTC-TH</td>";
    html += "                   <td>Báo cáo tình hình hoạt động tổng hợp</td>";
    html += "                   <td class=\"text-center\">TT107 GT</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B02BCTC_TT107TG')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">3</td>";
    html += "                   <td class=\"text-center\">B03/BCTC-TH</td>";
    html += "                   <td>Báo cáo lưu chuyển tiền tệ tổng hợp (theo phương pháp gián tiếp)</td>";
    html += "                   <td class=\"text-center\">TT107 GT</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B03BCTC_TT107TG')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">4</td>";
    html += "                   <td class=\"text-center\">B04/BCTC-TH</td>";
    html += "                   <td>Thuyết minh báo cáo tài chính tổng hợp</td>";
    html += "                   <td class=\"text-center\">TT107 GT</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B04BCTC_TT107TG')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">5</td>";
    html += "                   <td class=\"text-center\">B01/BSTT 01</td>";
    html += "                   <td>Báo cáo bổ sung thông tin tài chính</td>";
    html += "                   <td class=\"text-center\">TT107 GT</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B01BSTT_TT107TG')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";    
    html += "                <tr>";
    html += "                   <td colspan=\"5\">IV. <strong>Báo cáo khác</strong></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">1</td>";
    html += "                   <td class=\"text-center\">B01H</td>";
    html += "                   <td>Biểu cân đối tài khoản</td>";
    html += "                   <td class=\"text-center\">TT99</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('B01H')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">2</td>";
    html += "                   <td class=\"text-center\">Biểu 4</td>";
    html += "                   <td>Biểu 4. Quyết toán thu chi</td>";
    html += "                   <td class=\"text-center\">TT61</td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('Bieu4')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    html += "                <tr>";
    html += "                   <td class=\"text-center\">3</td>";
    html += "                   <td class=\"text-center\">Biểu Mẫu Truy Quỹ (F01)</td>";
    html += "                   <td>Biểu mẫu Chi của các chương trong toàn tỉnh (419,421,448,505)</td>";
    html += "                   <td class=\"text-center\"></td>";
    html += "                   <td class=\"text-center\"><button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ReportModal\" onclick=\"UpdateGridReport('F01_01_BCQT')\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>";
    html += "                </tr>";
    //
    html += "            </tbody>";
    html += "        </table>";
    return html;
}
function DrawControlsReport(type) {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().length == 1 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1);
    var day = now.getDate().toString().length == 1 ? "0" + now.getDate() : now.getDate();
    var nowdate = day + "-" + month + "-" + year;
    html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-lg-12\">";
    html += "<div class=\"portlet box portlet-blue\">";
    html += "   <div class=\"portlet-header\">";
    html += "       <div class=\"caption\">";
    html += "           Xuất mẫu báo cáo";
    html += "       </div>";
    html += "   </div>";
    html += "<div class=\"portlet-body\">";
    html += "   <div class=\"form-body\" style=\"padding-bottom: 15px;\">";    
    html += "           <div class=\"form-group\">";
    html += "           <div class=\"row\">";
    html += "           <label for=\"inputYear\" class=\"col-md-1 control-label\"><strong>Năm</strong> <span class=\"require\">(*)</span></label>";
    html += "            <div class=\"col-md-1\">";
    html += "               <input type=\"number\" class=\"form-control\" id=\"inputYear\" value=" + year + " />";;
    html += "            </div>";
    html += "            <input id=\"inputCodeUnitParent\" class=\"form-control\" type=\"hidden\" value=\"1007201\" />";
    html += "            <label for=\"inputCodeUnit\" class=\"col-md-1 control-label\"><strong>Tên đơn vị</strong> <span class=\"require\">(*)</span></label>";
    html += "            <div class=\"col-md-4\">";
    html += "               <select id=\"inputCodeUnit\" class=\"form-control\"></select>";
    html += "            </div>";
    html += "            <label for=\"inputDate\" class=\"col-md-2 control-label\" style=\"text-align: end;\"><strong>Ngày báo cáo</strong></label>";
    html += "            <div class=\"col-md-2\">";
    html += "               <input id=\"inputDate\" class=\"form-control\" type=\"text\" value = \"" + nowdate + "\" />";
    html += "            </div>";
    html += "            </div>";
    html += "           <div class=\"row\" style=\"margin-top: 10px;\">";
    if (type == "F01_01_BCQT") {
        html += "            <label for=\"inputChuong\" class=\"col-md-1 control-label\"><strong>Chương</strong> </label>";
        html += "            <div class=\"col-md-1\">";
        html += "                       <select id=\"inputChuong\" class=\"form-control\">";
        html += "                           <option value='419'>419</option>";
        html += "                           <option value='421'>421</option>";
        html += "                           <option value='448'>448</option>";
        html += "                           <option value='505'>505</option>";
        html += "                       </select>";
        html += "            </div>";
    }
    else if (type == "B01H") {
        html += "            <label for=\"inputQuy\" class=\"col-md-1 control-label\"><strong>Quý</strong> </label>";
        html += "            <div class=\"col-md-2\">";
        html += "                       <select id=\"inputQuy\" class=\"form-control\">";
        html += "                           <option value='0'>0</option>";
        html += "                           <option value='1'>1</option>";
        html += "                           <option value='2'>2</option>";
        html += "                           <option value='3'>3</option>";
        html += "                           <option value='4'>4</option>";
        html += "                       </select>";
        html += "            </div>";

    }
    else if (type == "107B01BCQT") {
        html += "            <label for=\"inputKy\" class=\"col-md-1 control-label\"><strong>Kỳ</strong> </label>";
        html += "            <div class=\"col-md-1\">";
        html += "                       <select id=\"inputKy\" class=\"form-control\">";
        html += "                           <option value='0'>Năm</option>";
        html += "                           <option value='1'>Quý 1</option>";
        html += "                           <option value='2'>Quý 2</option>";
        html += "                           <option value='3'>Quý 3</option>";
        html += "                           <option value='4'>Quý 4</option>";
        html += "                           <option value='5'>6 tháng đầu năm</option>";
        html += "                           <option value='6'>6 tháng cuối năm</option>";
        html += "                       </select>";
        html += "                </div>";        

        html += "            <label for=\"inputNguon\" class=\"col-md-1 control-label\"><strong>Nguồn</strong> </label>";
        html += "            <div class=\"col-md-2\">";        
        html += "                       <select id=\"inputNguon\" class=\"form-control\">";
        html += "<option value='1'>01 - Nguồn vốn trong nước</option>";
        html += "<option value='2'>02 - Kinh phí hoàn thuế GTGT</option>";
        html += "<option value='11'>11 - Nguồn kinh phí thường xuyên</option>";
        html += "<option value='12'>12 - Chi không thường xuyên (12)</option>";
        html += "<option value='13'>13 - Chi thường xuyên (13)</option>";
        html += "<option value='14'>14 - Nguồn thực hiện cải cách tiền lương</option>";
        html += "<option value='15'>15 - Kinh phí hỗ trợ hoạt động sáng tạo tác phẩm,công trình văn hóa nghệ thuật</option>";
        html += "<option value='16'>16 - Kinh phí chương trình dự án đề tài</option>";
        html += "<option value='17'>17 - Kinh phí thực hiện chính sách</option>";
        html += "<option value='18'>18 - Kinh phí khám chữa bệnh cho trẻ em dưới 6 tuổi</option>";
        html += "<option value='19'>19 - Kinh phí khám chữa bệnh cho người nghèo</option>";
        html += "<option value='20'>20 - Kinh phí cắm mốc biên giới</option>";
        html += "<option value='21'>21 - Kinh phí hỗ trợ xây dựng văn bản pháp quy</option>";
        html += "<option value='22'>22 - Kinh phí giải báo chí quốc gia</option>";
        html += "<option value='28'>28 - Kinh phí giữ lại</option>";
        html += "<option value='29'>29 - Kinh phí thường xuyên khác</option>";
        html += "<option value='30'>30 - Nguồn kinh phí khác</option>";
        html += "<option value='31'>31 - Nguồn vốn đầu tư</option>";
        html += "<option value='41'>41 - Nguồn trái phiếu chính phủ</option>";
        html += "<option value='42'>42 - Nguồn đầu tư NSĐP 2</option>";
        html += "<option value='43'>43 - Nguồn đầu tư NSĐP 3</option>";
        html += "<option value='44'>44 - Nguồn đầu tư NSĐP 4</option>";
        html += "<option value='45'>45 - Nguồn đầu tư NSĐP 5</option>";
        html += "<option value='48'>48 - Nguồn đầu tư NSĐP 8</option>";
        html += "<option value='49'>49 - Nguồn vốn đầu tư khác</option>";
        html += "<option value='50'>50 - Nguồn vốn ngoài nước</option>";
        html += "<option value='51'>51 - Ngân hàng thế giới</option>";
        html += "<option value='52'>52 - Ghi thu, ghi chi vốn vay ngoài nước, viện trợ NSTW để đầu tư các chương trình, dự án.</option>";
        html += "<option value='53'>53 - Ghi thu, ghi chi vốn vay ngoài nước, viện trợ NSTW bổ sung có mục tiêu cho ngân sách địa phương</option>";
        html += "<option value='54'>54 - Ghi thu, ghi chi vốn vay ngoài nước, viện trợ của Chính phủ cho ngân sách địa phương vay lại</option>";
        html += "<option value='55'>55 - Ghi thu, ghi chi vốn viện trợ nước ngoài không hoàn lại để đầu tư các chương trình, dự án do trung ương quản lý</option>";
        html += "<option value='56'>56 - Ghi thu, ghi chi vốn viện trợ nước ngoài không hoàn lại bổ sung có mục tiêu cho ngân sách địa phương</option>";
        html += "<option value='57'>57 - Ghi thu, ghi chi vốn viện trợ nước ngoài không hoàn lại cho ngân sách địa phương vay lại</option>";
        html += "<option value='61'>61 - JAICA</option>";
        html += "<option value='66'>66 - JBIC</option>";
        html += "<option value='71'>71 - JBIC</option>";
        html += "<option value='98'>98 - Vốn ngoài nước</option>";
        html += "                       </select>";
        html += "                </div>";        
        html += "            <label for=\"inputNguon\" class=\"col-md-1 control-label\"><strong>Nguồn</strong> </label>";
        html += "            <div class=\"col-md-2\">";
        html += "                       <select id=\"inputLoai\" class=\"form-control\">";
        html += "<option value='011'>011 - Quốc phòng</option>";
        html += "<option value='012'>012 - Cơ yếu Chính phủ</option>";
        html += "<option value='013'>013 - Trung tâm nhiệt đới Việt Nga</option>";
        html += "<option value='014'>014 - Chuẩn bị động viên</option>";
        html += "                       </select>";
        html += "                </div>";        
        html += "            <label for=\"inputKhoan\" class=\"col-md-1 control-label\"><strong>Khoản</strong> </label>";
        html += "            <div class=\"col-md-1\">";
        html += "                       <input id=\"inputKhoan\" class=\"form-control\" type=\"text\" />";
        html += "                </div>";        
    }
    html += "            </div>";
    html += "            <div class=\"col-lg-12 text-center\">";
    html += "                <input type=\"hidden\" id=\"hdType\" value=\"0\" />";
    html += "                    <button class=\"btn btn-success\" onclick=\"ExportWord('" + type + "')\" style=\" margin-top:10px; \">";
    html += "                        Xuất báo cáo";
    html += "                    </button>";
    html += "            </div>";
    html += "            </div>";
    html += "</div>";
             
    html += "            </div>";
    html += "        </div>";
    return html;
}
function UpdateGridReport(type) {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().length == 1 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1);
    var day = now.getDate().toString().length == 1 ? "0" + now.getDate() : now.getDate();
    var nowdate = day + "-" + month + "-" + year;
    var html = "";
    html += "        <div class=\"modal-dialog\" role=\"document\">";
    html += "            <div class=\"modal-content\">";
    html += "                <div class=\"modal-header\">";
    html += "                    <h5 class=\"modal-title\">Xuất báo cáo</h5>";
    html += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
    html += "                        <span aria-hidden=\"true\">&times;</span>";
    html += "                    </button>";
    html += "                </div>";
    html += "                <div class=\"modal-body\">";
    if (type == "B01BSTT" || type == "B01BCTC_TT99" || type == "B02BCTC_TT99" || type == "B03BCTC_TT99" || type == "B04BCTC_TT99" ||
        type == "B01BSTT_TT107" || type == "B01BCTC_TT107" || type == "B02BCTC_TT107" || type == "B03BCTC_TT107" || type == "B04BCTC_TT107" ||
        type == "B01BSTT_TT107TG" || type == "B01BCTC_TT107TG" || type == "B02BCTC_TT107TG" || type == "B03BCTC_TT107TG" || type == "B04BCTC_TT107TG") {
        html += "           <div class=\"row\">";
        html += "            <input id=\"inputCodeUnitParent\" class=\"form-control\" type=\"hidden\" value=\"1007201\" />";
        html += "            <label for=\"inputCodeUnit\" class=\"col-md-2 control-label\"><strong>Đơn vị</strong> <span class=\"require\">(*)</span></label>";
        html += "            <div class=\"col-md-10\">";
        html += "               <select id=\"inputCodeUnit\" class=\"form-control\"></select>";
        html += "            </div>";
        html += "            </div>";
        //
        html += "           <div class=\"row\" style=\" margin-top: 5px; \">";
        html += "           <label for=\"inputYear\" class=\"col-md-2 control-label\"><strong>Năm</strong> <span class=\"require\">(*)</span></label>";
        html += "            <div class=\"col-md-2\">";
        html += "               <input type=\"number\" class=\"form-control\" id=\"inputYear\" value=" + year + " />";;
        html += "            </div>";
        html += "            <label for=\"inputDate\" class=\"col-md-3 control-label\" style=\"text-align: end;\"><strong>Ngày báo cáo</strong></label>";
        html += "            <div class=\"col-md-3\">";
        html += "               <input id=\"inputDate\" class=\"form-control\" type=\"text\" value = \"" + nowdate + "\" />";
        html += "            </div>";
        html += "            </div>";
    }
    else if (type == "F01_01_BCQT") {
        html += "           <div class=\"row\">";
        html += "               <input id=\"inputCodeUnitParent\" class=\"form-control\" type=\"hidden\" value=\"1007201\" />";
        html += "               <label for=\"inputCodeUnit\" class=\"col-md-2 control-label\"><strong>Đơn vị</strong> <span class=\"require\">(*)</span></label>";
        html += "               <div class=\"col-md-10\">";
        html += "                   <select id=\"inputCodeUnit\" class=\"form-control\"></select>";
        html += "               </div>";
        html += "            </div>";
        //
        html += "           <div class=\"row\" style=\" margin-top: 5px; \">";
        html += "               <label for=\"inputYear\" class=\"col-md-2 control-label\"><strong>Năm</strong> <span class=\"require\">(*)</span></label>";
        html += "               <div class=\"col-md-2\">";
        html += "                   <input type=\"number\" class=\"form-control\" id=\"inputYear\" value=" + year + " />";;
        html += "               </div>";
        html += "               <label for=\"inputDate\" class=\"col-md-2 control-label\"\"><strong>Ngày báo cáo</strong></label>";
        html += "               <div class=\"col-md-3\">";
        html += "                   <input id=\"inputDate\" class=\"form-control\" type=\"text\" value = \"" + nowdate + "\" />";
        html += "               </div>";
        html += "               <label style=\"padding-left: 0px; \" for=\"inputChuong\" class=\"col-md-1 control-label\"><strong>Chương</strong> </label>";
        html += "               <div class=\"col-md-2\">";
        html += "                       <select id=\"inputChuong\" class=\"form-control\">";
        html += "                           <option value='419'>419</option>";
        html += "                           <option value='421'>421</option>";
        html += "                           <option value='448'>448</option>";
        html += "                           <option value='505'>505</option>";
        html += "                       </select>";
        html += "               </div>";
        html += "            </div>";
    }
    else if (type == "B01H") {
        html += "           <div class=\"row\">";
        html += "               <input id=\"inputCodeUnitParent\" class=\"form-control\" type=\"hidden\" value=\"1007201\" />";
        html += "               <label for=\"inputCodeUnit\" class=\"col-md-2 control-label\"><strong>Đơn vị</strong> <span class=\"require\">(*)</span></label>";
        html += "               <div class=\"col-md-10\">";
        html += "                   <select id=\"inputCodeUnit\" class=\"form-control\"></select>";
        html += "               </div>";
        html += "            </div>";
        //
        html += "           <div class=\"row\" style=\" margin-top: 5px; \">";
        html += "               <label for=\"inputYear\" class=\"col-md-2 control-label\"><strong>Năm</strong> <span class=\"require\">(*)</span></label>";
        html += "               <div class=\"col-md-2\">";
        html += "                   <input type=\"number\" class=\"form-control\" id=\"inputYear\" value=" + year + " />";;
        html += "               </div>";
        html += "               <label for=\"inputDate\" class=\"col-md-2 control-label\" style=\"text-align: end;\"><strong>Ngày báo cáo</strong></label>";
        html += "               <div class=\"col-md-3\">";
        html += "                   <input id=\"inputDate\" class=\"form-control\" type=\"text\" value = \"" + nowdate + "\" />";
        html += "               </div>";
        html += "            <label for=\"inputQuy\" class=\"col-md-1 control-label\"><strong>Quý</strong> </label>";
        html += "            <div class=\"col-md-2\">";
        html += "                       <select id=\"inputQuy\" class=\"form-control\">";
        html += "                           <option value='0'>0</option>";
        html += "                           <option value='1'>1</option>";
        html += "                           <option value='2'>2</option>";
        html += "                           <option value='3'>3</option>";
        html += "                           <option value='4'>4</option>";
        html += "                       </select>";
        html += "            </div>";
        html += "            </div>";

    }
    else if (type == "Bieu4") {
        html += "           <div class=\"row\">";
        html += "            <input id=\"inputCodeUnitParent\" class=\"form-control\" type=\"hidden\" value=\"1007201\" />";
        html += "            <label for=\"inputCodeUnit\" class=\"col-md-2 control-label\"><strong>Đơn vị</strong> <span class=\"require\">(*)</span></label>";
        html += "            <div class=\"col-md-10\">";
        html += "               <select id=\"inputCodeUnit\" class=\"form-control\"></select>";
        html += "            </div>";
        html += "            </div>";
        //
        html += "           <div class=\"row\" style=\" margin-top: 5px; \">";
        html += "           <label for=\"inputYear\" class=\"col-md-2 control-label\"><strong>Năm</strong> <span class=\"require\">(*)</span></label>";
        html += "            <div class=\"col-md-2\">";
        html += "               <input type=\"number\" class=\"form-control\" id=\"inputYear\" value=" + year + " />";;
        html += "            </div>";
        html += "            <label for=\"inputDate\" class=\"col-md-2 control-label\" style=\"text-align: end;\"><strong>Ngày báo cáo</strong></label>";
        html += "            <div class=\"col-md-3\">";
        html += "               <input id=\"inputDate\" class=\"form-control\" type=\"text\" value = \"" + nowdate + "\" />";
        html += "            </div>";
        html += "            <label for=\"inputKy\" class=\"col-md-1 control-label\"><strong>Kỳ</strong> </label>";
        html += "            <div class=\"col-md-2\">";
        html += "                       <select id=\"inputKy\" class=\"form-control\">";
        html += "                           <option value='0'>Năm</option>";
        html += "                           <option value='1'>Quý 1</option>";
        html += "                           <option value='2'>Quý 2</option>";
        html += "                           <option value='3'>Quý 3</option>";
        html += "                           <option value='4'>Quý 4</option>";
        html += "                           <option value='5'>6 tháng đầu năm</option>";
        html += "                           <option value='6'>6 tháng cuối năm</option>";
        html += "                       </select>";
        html += "                </div>";
        html += "            </div>";
        //
        html += "           <div class=\"row\" style=\" margin-top: 5px; \">";

        html += "            <label for=\"inputNguon\" class=\"col-md-2 control-label\"><strong>Nguồn</strong> </label>";
        html += "            <div class=\"col-md-3\">";
        html += "                       <select id=\"inputNguon\" class=\"form-control\">";
        html += "<option value='1'>01 - Nguồn vốn trong nước</option>";
        html += "<option value='2'>02 - Kinh phí hoàn thuế GTGT</option>";
        html += "<option value='11'>11 - Nguồn kinh phí thường xuyên</option>";
        html += "<option value='12'>12 - Chi không thường xuyên (12)</option>";
        html += "<option value='13'>13 - Chi thường xuyên (13)</option>";
        html += "<option value='14'>14 - Nguồn thực hiện cải cách tiền lương</option>";
        html += "<option value='15'>15 - Kinh phí hỗ trợ hoạt động sáng tạo tác phẩm,công trình văn hóa nghệ thuật</option>";
        html += "<option value='16'>16 - Kinh phí chương trình dự án đề tài</option>";
        html += "<option value='17'>17 - Kinh phí thực hiện chính sách</option>";
        html += "<option value='18'>18 - Kinh phí khám chữa bệnh cho trẻ em dưới 6 tuổi</option>";
        html += "<option value='19'>19 - Kinh phí khám chữa bệnh cho người nghèo</option>";
        html += "<option value='20'>20 - Kinh phí cắm mốc biên giới</option>";
        html += "<option value='21'>21 - Kinh phí hỗ trợ xây dựng văn bản pháp quy</option>";
        html += "<option value='22'>22 - Kinh phí giải báo chí quốc gia</option>";
        html += "<option value='28'>28 - Kinh phí giữ lại</option>";
        html += "<option value='29'>29 - Kinh phí thường xuyên khác</option>";
        html += "<option value='30'>30 - Nguồn kinh phí khác</option>";
        html += "<option value='31'>31 - Nguồn vốn đầu tư</option>";
        html += "<option value='41'>41 - Nguồn trái phiếu chính phủ</option>";
        html += "<option value='42'>42 - Nguồn đầu tư NSĐP 2</option>";
        html += "<option value='43'>43 - Nguồn đầu tư NSĐP 3</option>";
        html += "<option value='44'>44 - Nguồn đầu tư NSĐP 4</option>";
        html += "<option value='45'>45 - Nguồn đầu tư NSĐP 5</option>";
        html += "<option value='48'>48 - Nguồn đầu tư NSĐP 8</option>";
        html += "<option value='49'>49 - Nguồn vốn đầu tư khác</option>";
        html += "<option value='50'>50 - Nguồn vốn ngoài nước</option>";
        html += "<option value='51'>51 - Ngân hàng thế giới</option>";
        html += "<option value='52'>52 - Ghi thu, ghi chi vốn vay ngoài nước, viện trợ NSTW để đầu tư các chương trình, dự án.</option>";
        html += "<option value='53'>53 - Ghi thu, ghi chi vốn vay ngoài nước, viện trợ NSTW bổ sung có mục tiêu cho ngân sách địa phương</option>";
        html += "<option value='54'>54 - Ghi thu, ghi chi vốn vay ngoài nước, viện trợ của Chính phủ cho ngân sách địa phương vay lại</option>";
        html += "<option value='55'>55 - Ghi thu, ghi chi vốn viện trợ nước ngoài không hoàn lại để đầu tư các chương trình, dự án do trung ương quản lý</option>";
        html += "<option value='56'>56 - Ghi thu, ghi chi vốn viện trợ nước ngoài không hoàn lại bổ sung có mục tiêu cho ngân sách địa phương</option>";
        html += "<option value='57'>57 - Ghi thu, ghi chi vốn viện trợ nước ngoài không hoàn lại cho ngân sách địa phương vay lại</option>";
        html += "<option value='61'>61 - JAICA</option>";
        html += "<option value='66'>66 - JBIC</option>";
        html += "<option value='71'>71 - JBIC</option>";
        html += "<option value='98'>98 - Vốn ngoài nước</option>";
        html += "                       </select>";
        html += "                </div>";
        html += "            <label for=\"inputNguon\" class=\"col-md-1 control-label\"><strong>Loại</strong> </label>";
        html += "            <div class=\"col-md-3\">";
        html += "                       <select id=\"inputLoai\" class=\"form-control\">";
        html += "<option value='011'>011 - Quốc phòng</option>";
        html += "<option value='012'>012 - Cơ yếu Chính phủ</option>";
        html += "<option value='013'>013 - Trung tâm nhiệt đới Việt Nga</option>";
        html += "<option value='014'>014 - Chuẩn bị động viên</option>";
        html += "                       </select>";
        html += "                </div>";
        html += "            <label for=\"inputKhoan\" class=\"col-md-1 control-label\"><strong>Khoản</strong> </label>";
        html += "            <div class=\"col-md-2\">";
        html += "                       <input id=\"inputKhoan\" class=\"form-control\" type=\"text\" />";
        html += "                </div>"; 
        html += "                </div>"; 
    }
    html += "                </div>";
    html += "                <div class=\"modal-footer\">";
    html += "                <input type=\"hidden\" id=\"hdType\" value=\"0\" />";
    html += "                    <button type=\"button\" class=\"btn btn-success\" onclick=\"ExportWord('" + type + "')\">Xuất báo cáo</button>";
    html += "                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Đóng</button>";
    html += "                </div>";
    html += "            </div>";
    html += "        </div>";
    //$.ajax({
    //    type: 'GET',
    //    url: '/Home/ObjUnit?id=' + obj.maDonVi
    //}).then(function (data) {
    //    var objTemp = JSON.parse(data);
    //    
    //    LoadUnit("txtMDV", objTemp);
    //});
    $('#ReportModal').html(html);
    var obj = null;
    var ma = document.getElementById('objUnit').value;
    var ten = document.getElementById('objUnit').getAttribute('data-name');
    if (ma.length != 0 && ten.length != 0) {
        obj = { id: ma, title: ten }
    }
    LoadReport("inputCodeUnit", obj);
    //LoadReport("inputCodeUnitParent", null);    
    $("#inputDate").datepicker({ format: 'dd-mm-yyyy' });  
}
function ExportWord(type) {    
    document.getElementById("type_Report").value = type;
    var MaDVTH = document.getElementById("inputCodeUnitParent").value;
    var MaDV = document.getElementById("inputCodeUnit").value;
    var Nam = document.getElementById("inputYear").value;
    var Ngay = document.getElementById("inputDate").value;
    //
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
    if (Ngay.length == 0) {
        alert("Yêu cầu nhập Ngày báo cáo !");
        return;
    }   
    var html = '';
    var obj;
    if (type == "107B01BCQT") {
        obj = {
            type: document.getElementById("type_Report").value,
            nam: document.getElementById("inputYear").value,
            loai: document.getElementById("hdType").value,
            maDonViTH: document.getElementById("inputCodeUnitParent").value,
            maDonVi: document.getElementById("inputCodeUnit").value,
            tenDonVi: document.getElementById("select2-inputCodeUnit-container").textContent.trim(),
            ngay: document.getElementById("inputDate").value,
            Ky: document.getElementById("inputKy").value,
            Nguon: document.getElementById("inputNguon").value,
            Loai: document.getElementById("inputLoai").value,
            khoan: document.getElementById("inputKhoan").value,
        }
    }
    else if (type == "Bieu4") {
        obj = {
            type: document.getElementById("type_Report").value,
            nam: document.getElementById("inputYear").value,
            loai: document.getElementById("hdType").value,
            maDonViTH: document.getElementById("inputCodeUnitParent").value,
            maDonVi: document.getElementById("inputCodeUnit").value,
            tenDonVi: document.getElementById("select2-inputCodeUnit-container").textContent.trim(),
            ngay: document.getElementById("inputDate").value,
            Ky: document.getElementById("inputKy").value,
            Nguon: document.getElementById("inputNguon").value,
            Loai: document.getElementById("inputLoai").value,
            khoan: document.getElementById("inputKhoan").value,
        }
    }
    else if (type == "B01H") {
        obj = {
            type: document.getElementById("type_Report").value,
            nam: document.getElementById("inputYear").value,
            quy: document.getElementById("inputQuy").value,
            loai: document.getElementById("hdType").value,
            maDonViTH: document.getElementById("inputCodeUnitParent").value,
            maDonVi: document.getElementById("inputCodeUnit").value,
            tenDonVi: document.getElementById("select2-inputCodeUnit-container").textContent.trim(),
            ngay: document.getElementById("inputDate").value,
        }
    }
    else if (type == "F01_01_BCQT") {
        obj = {
            type: document.getElementById("type_Report").value,
            nam: document.getElementById("inputYear").value,
            chuong: document.getElementById("inputChuong").value,
            loai: document.getElementById("hdType").value,
            maDonViTH: document.getElementById("inputCodeUnitParent").value,
            maDonVi: document.getElementById("inputCodeUnit").value,
            tenDonVi: document.getElementById("select2-inputCodeUnit-container").textContent.trim(),
            ngay: document.getElementById("inputDate").value,
        }
    }    
    else {
        obj = {
            type: document.getElementById("type_Report").value,
            nam: document.getElementById("inputYear").value,
            loai: document.getElementById("hdType").value,
            maDonViTH: document.getElementById("inputCodeUnitParent").value,
            maDonVi: document.getElementById("inputCodeUnit").value,
            tenDonVi: document.getElementById("select2-inputCodeUnit-container").textContent.trim(),
            ngay: document.getElementById("inputDate").value,
        }
    }
    $.post('/Home/Report', obj, function (data, status) {
        var obj = JSON.parse(data)
        var path = obj.path;
        var islogin = obj.islogin;
        if (islogin == false)
            window.location.href = "/Home/Login"
        if(data.length > 0)
            window.location.href = "/TemplateWord/FileContent/" + path;
    }).fail(function (ajaxContext) {
        alert("Status : " + ajaxContext.status + ", Status Text : " + ajaxContext.statusText);
    }); 
}
//
function changeNguon() {

    $.get('/Home/ListDataCombo1?nguon=' + document.getElementById('inputNguon').value + '&nam=' + document.getElementById('inputYear').value, function (data, status) {
        console.log(data)
    }).fail(function (ajaxContext) {
        alert("Status : " + ajaxContext.status + ", Status Text : " + ajaxContext.statusText);
    }); 
}
function LoadReport(name, obj) {
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
