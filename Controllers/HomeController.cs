using Aspose.Cells;
using Aspose.Words;
using EsbUsers.Sso;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using QuanLyBaoCao.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace QuanLyBaoCao.Controllers
{
    public class HomeController : Controller
    {        
        public void refeshSession(){
            try
            {
                Login c = (Login)System.Web.HttpContext.Current.Session["IsLogin"];
                Session["IsLogin"] = c;
            }
            catch(Exception ex) { }
        }
        public ActionResult Default() // Trang mặc định
        {
            if (ClientSso.Ins.CurrentSessionLoginInfo != null)
            {
                ClientSso.Ins.XacThucNguoiDung();
                var user = ClientSso.Ins.CurrentSessionLoginInfo;
                
            }
            else
            {
                return Redirect("/Home/Login/");
            }
            return View();
        }
        public ActionResult login() // Trang đăng nhập sso
        {
            if (UriUtil.RequestId.Equals(ClientSso.ReqStatus.LOGIN_SSO) || UriUtil.RequestId.Equals(ClientSso.ReqStatus.TOKEN_SSO))
            {
                if (ClientSso.Ins.CurrentSessionLoginInfo != null)
                {
                    return Redirect("/");
                    //Todo: Bổ sung xác thực riêng cho phần mềm tích hợp
                }
            }
            else// TH gọi kiểm tra xác thực
            {
                ClientSso.Ins.XacThucNguoiDung();
            }
            return View();
        }
        public ActionResult Index()
        {
            //var ii = new QVCore4QLC2.KTTH.XuatDuLieu();
            //DataSet ds1 = ii.QLNS_IV7_LoadNK(2019);
            bool isLogin = Utility.checkLogin();
            if (isLogin)
            {
                QVCore4QLC2.KTTH.DanhMuc_Chon dm = new QVCore4QLC2.KTTH.DanhMuc_Chon();
                DataTable dt = dm.DonViC();
                return View(dt);
            }
            else
            {
                if (ClientSso.Ins.CurrentSessionLoginInfo != null)
                {
                    var user = ClientSso.Ins.CurrentSessionLoginInfo;
                    Login c = new Login();
                    c.User = user.HoVaTen;
                    Session["IsLogin"] = c;

                    QVCore4QLC2.KTTH.DanhMuc_Chon dm = new QVCore4QLC2.KTTH.DanhMuc_Chon();
                    DataTable dt = dm.DonViC();
                    return View(dt);
                }
                else
                {
                    return Redirect("/Home/Login/");
                }
            }
        }
        public JToken Logout()
        {
            Session["IsLogin"] = null;
            ClientSso.Ins.DangXuat(ClientSso.LoginType.SSO);
            return JToken.FromObject("");

        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public JToken SystemHT(string type)
        {
            bool isLogin = Utility.checkLogin();
            QVCore4QLC2.KTTH.HeThong dm = new QVCore4QLC2.KTTH.HeThong();
            DataTable dtResult = new DataTable();
            List<string> head = new List<string>();
            List<string> prop = new List<string>();
            try
            {
                refeshSession();
                #region Load He thong
                if (type == "HTDonviCap1")
                {
                    dtResult = dm.QLNS_DVDTC1_getlist(2019, "1007201");
                    
                    //
                    head.Add("TT");
                    prop.Add("STT");
                    head.Add("Mã");
                    prop.Add("Ma");
                    head.Add("Tên");
                    prop.Add("Ten");
                    head.Add("Mã đơn vị so sánh");
                    prop.Add("DVSS");
                    //
                    prop.Add("Ma");
                }                
                #endregion
            }
            catch (Exception ex) { }
            return JToken.FromObject(new { head = head, prop = prop, body = dtResult, islogin = isLogin });
        }
        public JToken SelectSystemHT()
        {
            bool isLogin = Utility.checkLogin();
            QVCore4QLC2.KTTH.HeThong dm = new QVCore4QLC2.KTTH.HeThong();
            DataTable dtResult = new DataTable();
            List<string> head = new List<string>();
            List<string> prop = new List<string>();
            try
            {
                refeshSession();

                    dtResult = dm.QLNS_CHON_DVI("", "");

                    //
                    head.Add("TT");
                    prop.Add("stt");
                    head.Add("Mã");
                    prop.Add("ma");
                    head.Add("Tên");
                    prop.Add("ten");
                    head.Add("Mã cha");
                    prop.Add("Ma1");
                    head.Add("Tên đơn vị cha");
                    prop.Add("Ten1");
                //
            }
            catch (Exception ex) { }
            return JToken.FromObject(new { head = head, prop = prop, body = dtResult, islogin = isLogin });
        }
        public JToken Input(string type, int Nam, string MaDV)
        {
            bool isLogin = Utility.checkLogin();
            QVCore4QLC2.KTTH.NhapDuLieu dm = new QVCore4QLC2.KTTH.NhapDuLieu();
            DataSet dsResult = new DataSet();
            List<List<string>> head = new List<List<string>>();
            List<List<string>> prop = new List<List<string>>();
            try
            {
                refeshSession();
                #region Load Danh Muc
                //TT99
                if (type == "B01BCTC_TT99")
                {
                    dsResult = dm.QLNS_III4_getlist(Nam, MaDV);
                    //
                    List<string> temphead = new List<string>();
                    List<string> tempprop = new List<string>();
                    temphead.Add("STT");
                    tempprop.Add("A1");
                    temphead.Add("Chỉ tiêu");
                    tempprop.Add("A2");
                    temphead.Add("Mã số");
                    tempprop.Add("A3");
                    temphead.Add("Thuyết minh");
                    tempprop.Add("A4");
                    temphead.Add("Số cuối năm");
                    tempprop.Add("A5");
                    temphead.Add("Số đầu năm");
                    tempprop.Add("A6");
                    //
                    tempprop.Add("h2");
                    head.Add(temphead);
                    prop.Add(tempprop);
                }
                else if(type == "B02BCTC_TT99")
                {
                    dsResult = dm.QLNS_III4_getlist(Nam, MaDV);
                    //
                    List<string> temphead = new List<string>();
                    List<string> tempprop = new List<string>();
                    temphead.Add("STT");
                    tempprop.Add("A1");
                    temphead.Add("Chỉ tiêu");
                    tempprop.Add("A2");
                    temphead.Add("Mã số");
                    tempprop.Add("A3");
                    temphead.Add("Thuyết minh");
                    tempprop.Add("A4");
                    temphead.Add("Năm nay");
                    tempprop.Add("A5");
                    temphead.Add("Năm trước");
                    tempprop.Add("A6");
                    //
                    tempprop.Add("h2");
                    head.Add(temphead);
                    prop.Add(tempprop);
                }
                else if (type == "B03BCTC_TT99")
                {
                    dsResult = dm.QLNS_III4_getlist(Nam, MaDV);
                    //
                    List<string> temphead = new List<string>();
                    List<string> tempprop = new List<string>();
                    temphead.Add("STT");
                    tempprop.Add("A1");
                    temphead.Add("Chỉ tiêu");
                    tempprop.Add("A2");
                    temphead.Add("Mã số");
                    tempprop.Add("A3");
                    temphead.Add("Thuyết minh");
                    tempprop.Add("A4");
                    temphead.Add("Năm nay");
                    tempprop.Add("A5");
                    temphead.Add("Năm trước");
                    tempprop.Add("A6");
                    //
                    tempprop.Add("h2");
                    head.Add(temphead);
                    prop.Add(tempprop);
                }
                else if (type == "B04BCTC_TT99")
                {
                    dsResult = dm.QLNS_III4_getlist(Nam, MaDV);
                }
                else if (type == "B01BSTT_TT99")
                {
                    dsResult = dm.QLNS_III4_getlist(Nam, MaDV);
                }
                //TT107
                if (type == "B01BCTC_TT107")
                {
                    dsResult = dm.QLNS_III5_getlist(Nam, MaDV);
                    //
                    List<string> temphead = new List<string>();
                    List<string> tempprop = new List<string>();
                    temphead.Add("STT");
                    tempprop.Add("A1");
                    temphead.Add("Chỉ tiêu");
                    tempprop.Add("A2");
                    temphead.Add("Mã số");
                    tempprop.Add("A3");
                    temphead.Add("Thuyết minh");
                    tempprop.Add("A4");
                    temphead.Add("Số cuối năm");
                    tempprop.Add("A5");
                    temphead.Add("Số đầu năm");
                    tempprop.Add("A6");
                    //
                    tempprop.Add("h2");
                    head.Add(temphead);
                    prop.Add(tempprop);
                }
                else if (type == "B02BCTC_TT107")
                {
                    dsResult = dm.QLNS_III5_getlist(Nam, MaDV);
                    //
                    List<string> temphead = new List<string>();
                    List<string> tempprop = new List<string>();
                    temphead.Add("STT");
                    tempprop.Add("A1");
                    temphead.Add("Chỉ tiêu");
                    tempprop.Add("A2");
                    temphead.Add("Mã số");
                    tempprop.Add("A3");
                    temphead.Add("Thuyết minh");
                    tempprop.Add("A4");
                    temphead.Add("Năm nay");
                    tempprop.Add("A5");
                    temphead.Add("Năm trước");
                    tempprop.Add("A6");
                    //
                    tempprop.Add("h2");
                    head.Add(temphead);
                    prop.Add(tempprop);
                }
                else if (type == "B03BCTC_TT107")
                {
                    dsResult = dm.QLNS_III5_getlist(Nam, MaDV);
                    //
                    List<string> temphead = new List<string>();
                    List<string> tempprop = new List<string>();
                    temphead.Add("STT");
                    tempprop.Add("A1");
                    temphead.Add("Chỉ tiêu");
                    tempprop.Add("A2");
                    temphead.Add("Mã số");
                    tempprop.Add("A3");
                    temphead.Add("Thuyết minh");
                    tempprop.Add("A4");
                    temphead.Add("Năm nay");
                    tempprop.Add("A5");
                    temphead.Add("Năm trước");
                    tempprop.Add("A6");
                    //
                    tempprop.Add("h2");
                    head.Add(temphead);
                    prop.Add(tempprop);
                }
                else if (type == "B04BCTC_TT107")
                {
                    dsResult = dm.QLNS_III5_getlist(Nam, MaDV);
                }
                else if (type == "B01BSTT_TT107")
                {
                    dsResult = dm.QLNS_III5_getlist(Nam, MaDV);
                }
                //TT107GT
                if (type == "B01BCTC_TT107GT")
                {
                    dsResult = dm.QLNS_III6_getlist(Nam, MaDV);
                    //
                    List<string> temphead = new List<string>();
                    List<string> tempprop = new List<string>();
                    temphead.Add("STT");
                    tempprop.Add("A1");
                    temphead.Add("Chỉ tiêu");
                    tempprop.Add("A2");
                    temphead.Add("Mã số");
                    tempprop.Add("A3");
                    temphead.Add("Thuyết minh");
                    tempprop.Add("A4");
                    temphead.Add("Số cuối năm");
                    tempprop.Add("A5");
                    temphead.Add("Số đầu năm");
                    tempprop.Add("A6");
                    //
                    tempprop.Add("h2");
                    head.Add(temphead);
                    prop.Add(tempprop);
                }
                else if (type == "B02BCTC_TT107GT")
                {
                    dsResult = dm.QLNS_III6_getlist(Nam, MaDV);
                    //
                    List<string> temphead = new List<string>();
                    List<string> tempprop = new List<string>();
                    temphead.Add("STT");
                    tempprop.Add("A1");
                    temphead.Add("Chỉ tiêu");
                    tempprop.Add("A2");
                    temphead.Add("Mã số");
                    tempprop.Add("A3");
                    temphead.Add("Thuyết minh");
                    tempprop.Add("A4");
                    temphead.Add("Năm nay");
                    tempprop.Add("A5");
                    temphead.Add("Năm trước");
                    tempprop.Add("A6");
                    //
                    tempprop.Add("h2");
                    head.Add(temphead);
                    prop.Add(tempprop);
                }
                else if (type == "B03BCTC_TT107GT")
                {
                    dsResult = dm.QLNS_III6_getlist(Nam, MaDV);
                    //
                    List<string> temphead = new List<string>();
                    List<string> tempprop = new List<string>();
                    temphead.Add("STT");
                    tempprop.Add("A1");
                    temphead.Add("Chỉ tiêu");
                    tempprop.Add("A2");
                    temphead.Add("Mã số");
                    tempprop.Add("A3");
                    temphead.Add("Thuyết minh");
                    tempprop.Add("A4");
                    temphead.Add("Năm nay");
                    tempprop.Add("A5");
                    temphead.Add("Năm trước");
                    tempprop.Add("A6");
                    //
                    tempprop.Add("h2");
                    head.Add(temphead);
                    prop.Add(tempprop);
                }
                else if (type == "B04BCTC_TT107GT")
                {
                    dsResult = dm.QLNS_III6_getlist(Nam, MaDV);
                }
                else if (type == "B01BSTT_TT107GT")
                {
                    dsResult = dm.QLNS_III6_getlist(Nam, MaDV);
                }
                #endregion
            }
            catch (Exception ex) { }
            return JToken.FromObject(new { head = head, prop = prop, body = dsResult, islogin = isLogin });
        }
        public JToken Categories(string type, int Nam, string MaDV, int Loai)
        {            
            bool isLogin = Utility.checkLogin();            
            QVCore4QLC2.KTTH.DanhMuc_Load dm = new QVCore4QLC2.KTTH.DanhMuc_Load();
            DataTable dtResult = new DataTable();            
            List<string> head = new List<string>();
            List<string> prop = new List<string>();
            try
            {
                refeshSession();
                #region Load Danh Muc
                if (type == "DMDonvi")
                {
                    dtResult = dm.DMDonvi(Nam, MaDV, Loai);                    
                    //
                    head.Add("ST");
                    prop.Add("Column1");
                    head.Add("Mã đơn");
                    prop.Add("MaDV");
                    head.Add("Tên đơn vị");
                    prop.Add("TenDV");
                    head.Add("DVTH");
                    prop.Add("TenRG");
                    head.Add("Năm");
                    prop.Add("Column3");
                    head.Add("Cấp");
                    prop.Add("cap");
                    head.Add("Cấp trên");
                    prop.Add("cap_tren");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMTaiKhoan")
                {
                    dtResult = dm.DMTaiKhoan(Nam, MaDV, Loai);
                    head.Add("ST");
                    prop.Add("Column1");
                    head.Add("Số hiệu");
                    prop.Add("SoHieuTK");
                    head.Add("Tên tài khoản");
                    prop.Add("TenTK");
                    head.Add("Loại TK");
                    prop.Add("LoaiTK");
                    head.Add("Số dư");
                    prop.Add("Sodu");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMNguonVon")
                {
                    dtResult = dm.DMNguonVon(Nam, MaDV, Loai);
                    head.Add("ST");
                    prop.Add("A2");
                    head.Add("Tên nguồn vốn");
                    prop.Add("A3");
                    head.Add("Mã");
                    prop.Add("A4");
                    //
                    prop.Add("A1");
                }
                else if (type == "DMLoaiKhoan")
                {
                    dtResult = dm.DMLoaiKhoan(Nam, MaDV, Loai);
                    head.Add("Loại");
                    prop.Add("Loai");
                    head.Add("Khoản");
                    prop.Add("Khoan");
                    head.Add("Tên loại khoản");
                    prop.Add("Ten");
                    head.Add("Năm");
                    prop.Add("Nam");
                    head.Add("T.Th");
                    prop.Add("TThai");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMNguonKP")
                {
                    dtResult = dm.DMNguonKP(Nam, MaDV, Loai);
                    head.Add("ST");
                    prop.Add("Column1");
                    head.Add("Mã NKP");
                    prop.Add("MaNKP");
                    head.Add("Tên NKP");
                    prop.Add("TenNKP");                    
                    head.Add("Tên rút gọn");
                    prop.Add("TenRG");
                    head.Add("Chi tiết");
                    prop.Add("ChiTiet");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMMuc")
                {
                    dtResult = dm.DMMuc(Nam, MaDV, Loai);
                    head.Add("Mục");
                    prop.Add("MUC");
                    head.Add("Tiểu");
                    prop.Add("TIEUMUC");
                    head.Add("Tên mục");
                    prop.Add("TEN");
                    head.Add("Loại");
                    prop.Add("LOAI");
                    head.Add("Năm");
                    prop.Add("NAM");
                    head.Add("T.th");
                    prop.Add("TTHAI");
                    //
                    prop.Add("id");
                }
                else if (type == "DMHDSN")
                {
                    dtResult = dm.DMHDSN(Nam, MaDV, Loai);
                    head.Add("ST");
                    prop.Add("A2");
                    head.Add("Mã HDSN");
                    prop.Add("A3");
                    head.Add("Tên HDSN");
                    prop.Add("A4");
                    head.Add("Tên rút bọn");
                    prop.Add("A5");
                    //
                    prop.Add("A1");                
                }
                else if (type == "DMQTPKHD")
                {
                    dtResult = dm.DMQTPKHD(Nam, MaDV, Loai);
                    head.Add("ST");
                    prop.Add("Column1");
                    head.Add("Chỉ");
                    prop.Add("ChiMuc");
                    head.Add("Tên chỉ tiêu");
                    prop.Add("TenCT");
                    head.Add("Mã số");
                    prop.Add("Maso");
                    //
                    prop.Add("A1");
                }
                else if (type == "DMTHTC")
                {
                    dtResult = dm.DMTHTC(Nam, MaDV, 0);
                    head.Add("ST");
                    prop.Add("Column1");
                    head.Add("Chỉ");
                    prop.Add("ChiMuc");
                    head.Add("Tên chỉ tiêu");
                    prop.Add("TenCT");
                    head.Add("Mã số");
                    prop.Add("Maso");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMKQHD")//chưa xong
                {
                    dtResult = dm.DMKQHD(Nam, MaDV, Loai);
                    head.Add("ST");
                    head.Add("Chỉ");
                    head.Add("Tên chỉ tiêu");                    
                    head.Add("Số liệu đầu năm");
                    head.Add("Mã");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMLCTTTT")//chưa xong
                {
                    dtResult = dm.DMLCTTTT(Nam, MaDV, Loai);
                    head.Add("ST");
                    head.Add("Chỉ");
                    head.Add("Tên chỉ tiêu");
                    head.Add("Năm nay");
                    head.Add("Mã");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMLCTTGT")//chưa xong
                {
                    dtResult = dm.DMLCTTGT(Nam, MaDV, Loai);
                    head.Add("ST");
                    head.Add("Chỉ");
                    head.Add("Tên chỉ tiêu");
                    head.Add("Năm nay");
                    head.Add("Mã");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMBCTC")//chưa xong
                {
                    dtResult = dm.DMBCTC(Nam, MaDV, Loai);
                    head.Add("ST");
                    head.Add("Chỉ");
                    head.Add("Tên chỉ tiêu");
                    head.Add("Năm nay");
                    head.Add("Mã");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMBSTT1")//chưa xong
                {
                    dtResult = dm.DMBSTT1(Nam, MaDV, Loai);
                    head.Add("ST");
                    head.Add("Chỉ");
                    head.Add("QHGG - Trong DKVT trung");
                    head.Add("QHGG - Trong DKVT cấp 1");
                    head.Add("QHGG - Trong DKVT cấp 2");
                    //
                    prop.Add("ID");
                }
                else if (type == "DMBSTT2")//chưa xong
                {
                    dtResult = dm.DMBSTT2(Nam, MaDV, Loai);
                    head.Add("ST");
                    head.Add("Chỉ");
                    head.Add("Tên chỉ tiêu");
                    head.Add("Năm nay");
                    head.Add("Mã");
                    //
                    prop.Add("ID");
                }
                #endregion
            }
            catch (Exception ex){   }
            return JToken.FromObject(new { head = head, prop = prop, body = dtResult, islogin = isLogin });
        }
        public JToken DashBoard(int yearHome)
        {
            bool isLogin = Utility.checkLogin();
            QVCore4QLC2.KTTH.Home dm = new QVCore4QLC2.KTTH.Home();
            DataTable dtResult = new DataTable();
            List<string> head = new List<string>();
            List<string> prop = new List<string>();
            try
            {
                refeshSession();
                dtResult = dm.QLNS_Home_getlist(yearHome, "1007201");
                    head.Add("ST");
                    prop.Add("STT");
                    head.Add("Mã");
                    prop.Add("Ma");
                    head.Add("Tên cơ quan");
                    prop.Add("Ten");
                    head.Add("Chi Tabmis");
                    prop.Add("Ctab");
                    head.Add("Chi kế toán");
                    prop.Add("Ckt");
                    head.Add("Chênh lệch");
                    prop.Add("Clech");
            }
            catch (Exception ex) { }
            return JToken.FromObject(new { head = head, prop = prop, body = dtResult, islogin = isLogin });
        }
        public JToken Data(string type, int Nam, string MaDVTH, string MaDV, int Loai)
        {
            bool isLogin = Utility.checkLogin();
            QVCore4QLC2.KTTH.SoLieu_Load dm = new QVCore4QLC2.KTTH.SoLieu_Load();
            DataTable dtResult = new DataTable();
            List<string> head = new List<string>();
            List<string> prop = new List<string>();
            try
            {
                refeshSession();
                #region Load Số Liệu
                if (type == "SLTHTC")
                {
                    dtResult = dm.THTC(MaDVTH, MaDV, Nam, Loai);
                    head.Add("ST");
                    prop.Add("A2");
                    head.Add("Chi");
                    prop.Add("A3");
                    head.Add("Tên chi tiêu");
                    prop.Add("A4");
                    head.Add("Thuyết");
                    prop.Add("A5");
                    head.Add("Số đầu năm");
                    prop.Add("A9");
                    head.Add("Số cuối năm");
                    prop.Add("A10");
                    head.Add("Mã");
                    prop.Add("A12");
                    //
                    prop.Add("A1");
                }
                else if (type == "SLKQHD")
                {
                    dtResult = dm.KQHD(MaDVTH, MaDV, Nam, Loai);
                    head.Add("ST");
                    prop.Add("A2");
                    head.Add("Chi");
                    prop.Add("A3");
                    head.Add("Tên chi tiêu");
                    prop.Add("A4");
                    head.Add("Số liệu đầu năm");
                    prop.Add("A9");
                    head.Add("Mã");
                    prop.Add("A12");
                    //
                    prop.Add("A1");
                }              
                else if (type == "SLLCTT_GT")
                {
                    dtResult = dm.LCTT_GT(MaDVTH, MaDV, Nam, Loai);
                    head.Add("ST");
                    prop.Add("A2");
                    head.Add("Chi");
                    prop.Add("A3");
                    head.Add("Tên chi tiêu");
                    prop.Add("A4");
                    head.Add("Năm nay");
                    prop.Add("A8");
                    head.Add("Mã");
                    prop.Add("A10");
                    //
                    prop.Add("A1");
                }
                else if (type == "SLTM_BCTC")
                {
                    dtResult = dm.TM_BCTC(MaDVTH, MaDV, Nam, Loai);
                    head.Add("ST");
                    prop.Add("A2");
                    head.Add("Chi");
                    prop.Add("A3");
                    head.Add("Tên chi tiêu");
                    prop.Add("A4");
                    head.Add("Năm nay");
                    prop.Add("A8");
                    head.Add("Mã");
                    prop.Add("A10");
                    //                    
                    prop.Add("A1");
                }
                else if (type == "SLBSTTTC_P2")
                {
                    dtResult = dm.BSTTTC_P2(MaDVTH, MaDV, Nam, Loai);
                    head.Add("ST");
                    prop.Add("A2");
                    head.Add("Chi");
                    prop.Add("A3");
                    head.Add("Tên chi tiêu");
                    prop.Add("A4");
                    head.Add("Năm nay");
                    prop.Add("A8");
                    head.Add("Mã");
                    prop.Add("A10");
                    //                    
                    prop.Add("A1");
                }
                else if (type == "SLQTTCCN")
                {
                    dtResult = dm.QTThuChi_View(MaDV, Nam, Loai);
                    head.Add("ST");
                    prop.Add("MaTT");
                    head.Add("Nội dung");
                    prop.Add("Noidung");
                    head.Add("Số liệu báo cáo");
                    prop.Add("SL1");
                    head.Add("Số liệu báo cáo được duyệt");
                    prop.Add("SL2");
                    head.Add("TĐ - Quỹ lương");
                    prop.Add("SL3");
                    head.Add("TĐ - Mua sắm,sửa");
                    prop.Add("SL4");
                    head.Add("TĐ - Trích lập quỹ");
                    prop.Add("SL5");
                    //
                    prop.Add("ID");
                }
                else if (type == "SLTDTPLP")
                {
                    dtResult = dm.TT137m1a_View(MaDV, Nam, Loai);
                    head.Add("ST");
                    prop.Add("MaTT");
                    head.Add("Nội dung");
                    prop.Add("Noidung");
                    head.Add("Tổng thu");
                    prop.Add("SL1");
                    head.Add("Số nộp NSNN");
                    prop.Add("SL2");
                    head.Add("Số được khấu trừ/ để lại");
                    prop.Add("SL3");
                    head.Add("DT - Số báo cáo");
                    prop.Add("SL4");
                    head.Add("DT - Xét duyệt");
                    prop.Add("SL5");
                    head.Add("DT - Số chênh lệch");
                    prop.Add("SL6");
                    head.Add("TH - Số báo cáo");
                    prop.Add("SL7");
                    head.Add("TH - Xét duyệt");
                    prop.Add("SL8");
                    head.Add("TH - Số chênh lệch");
                    prop.Add("SL9");
                    //
                    prop.Add("ID");
                }
                else if (type == "TT1372017BTC")
                {
                    dtResult = dm.TT137m1B_View(MaDV, Nam, Loai);
                    head.Add("ST");
                    prop.Add("A1");
                    head.Add("Nội dung");
                    prop.Add("A2");
                    head.Add("Số báo cáo");
                    prop.Add("A3");
                    head.Add("Số đối chiếu");
                    prop.Add("A4");
                    head.Add("Chênh lệch");
                    prop.Add("A5");
                    //
                    prop.Add("ID");
                }
                #endregion
            }
            catch (Exception ex) { }
            return JToken.FromObject(new { head = head, prop = prop, body = dtResult, islogin = isLogin });
        }
        
        private string pathExport_B01H(DataSet ds, CategoryModels obj)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/B01H.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "DVBC", "Nam", "Ngay" };
                string[] v_Value = new string[] { obj.TenDonVi, obj.Nam + "", obj.Ngay };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB02";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                //
                string nameExport = "B01H_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        
        private string pathExport_B04BCTC_TT99(DataSet ds, CategoryModels obj, string Type)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/"+ Type +"B04BCTC_TH.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "DVTH", "DVBC", "Nam", "Ngay", "Lap", "KS", "TT" };
                string[] v_Value = new string[] { "", "", obj.Nam + "", obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "DT1";
                ds.Tables[1].TableName = "DT2";
                ds.Tables[2].TableName = "DT3";
                ds.Tables[3].TableName = "DT4";
                ds.Tables[4].TableName = "DT5";
                ds.Tables[5].TableName = "DT6";
                ds.Tables[6].TableName = "DT7";
                ds.Tables[7].TableName = "DT8";
                ds.Tables[8].TableName = "DT9";
                ds.Tables[9].TableName = "DT10";
                ds.Tables[10].TableName = "DT11";
                ds.Tables[11].TableName = "DT12";
                ds.Tables[12].TableName = "DT13";
                ds.Tables[13].TableName = "DT14";
                ds.Tables[14].TableName = "DT15";
                ds.Tables[15].TableName = "DT16";
                ds.Tables[16].TableName = "DT17";
                ds.Tables[17].TableName = "DT18";
                ds.Tables[18].TableName = "DT19";
                ds.Tables[19].TableName = "DT20";
                ds.Tables[20].TableName = "DT21";
                ds.Tables[21].TableName = "DT22";
                ds.Tables[22].TableName = "DT23";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[1]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[2]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[3]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[4]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[5]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[6]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[7]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[8]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[9]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[10]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[11]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[12]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[13]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[14]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[15]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[16]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[17]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[18]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[19]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[20]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[21]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[22]);

                //
                string nameExport = Type + "B04BCTC_TH_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }        
        private string pathExport_F01_01_BCQT_Excel(DataSet ds, CategoryModels obj)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = string.Empty;
                if (obj.Chuong == "419")
                {
                    FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/KTTH_TRUY_QUY_419.xls");
                }
                else if (obj.Chuong == "421")
                {
                    FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/KTTH_TRUY_QUY_421.xls");
                }
                else if (obj.Chuong == "448")
                {
                    FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/KTTH_TRUY_QUY_448.xls");
                }
                else if (obj.Chuong == "505")
                {
                    FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/KTTH_TRUY_QUY_505.xls");
                }
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //

                Workbook workbook = new Workbook();
                workbook.Open(FileName);
                Worksheet worksheet = workbook.Worksheets[0];
                worksheet.Cells.ImportDataTable(ds.Tables[0], false, "A7");
                //
                string nameExport = "KTTH_TRUY_QUY"+ obj.Chuong +"_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xls";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                workbook.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_B03BCTC_TT99(DataSet ds, CategoryModels obj, string Type)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/"+ Type + "B03BCTC_TH.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "DVTH", "DVBC", "Nam", "Ngay", "Lap", "KS", "TT" };
                string[] v_Value = new string[] { "", "", obj.Nam + "", obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB03";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                //
                string nameExport = Type + "B03BCTC_TH_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_B02BCTC_TT99(DataSet ds, CategoryModels obj, string Type)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/"+ Type + "B02BCTC_TH.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "DVTH", "DVBC", "Nam", "Ngay", "Lap", "KS", "TT" };
                string[] v_Value = new string[] { "", "", obj.Nam + "", obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB02";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                //
                string nameExport = Type + "B02BCTC_TH_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_B01BCTC_TT99(DataSet ds, CategoryModels obj, string Type)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/"+ Type + "B01BCTC_TH.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "DVTH", "DVBC", "Nam", "Ngay", "Lap", "KS","TT" };
                string[] v_Value = new string[] { "", "", obj.Nam + "", obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB02b";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);                
                //
                string nameExport = Type + "B01BCTC_TH_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_B01BSTT_TT99(DataSet ds, CategoryModels obj, string type)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/"+ type +"B01BSTT.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "DVDT1", "DVKT1", "DVKT2", "DVKTCS", "Nam", "Ngay" };
                string[] v_Value = new string[] { "", "", "", "", obj.Nam + "", obj.Ngay };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB07";
                ds.Tables[1].TableName = "TB07b";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[1]);
                //
                string nameExport = type + "B01BSTT_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_B01BSTT(DataSet ds, CategoryModels obj, string Type)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/"+ Type + "B01BSTT.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "DVDT1", "DVKT1", "DVKT2", "DVKTCS", "Nam", "Ngay", "Lap", "KS", "TT" };
                string[] v_Value = new string[] { "", "", "", "", obj.Nam + "", obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB07";
                ds.Tables[1].TableName = "TB07b";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[1]);
                //
                string nameExport = Type + "B01BSTT_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_107B04BCTC(DataSet ds, CategoryModels obj)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/107B04BCTC.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "TenCQCT", "DVBC", "Nam", "Ngay", "Lap", "KS", "TT" };
                string[] v_Value = new string[] { "Sở tài chính", obj.TenDonVi, obj.Nam + "", obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB08_1";
                ds.Tables[1].TableName = "TB08_2";
                ds.Tables[2].TableName = "TB08_3";
                ds.Tables[3].TableName = "TB08_4";
                ds.Tables[4].TableName = "TB08_5";
                ds.Tables[5].TableName = "TB08_6";
                ds.Tables[6].TableName = "TB08_7";
                ds.Tables[7].TableName = "TB08_8";
                ds.Tables[8].TableName = "TB08_9";
                ds.Tables[9].TableName = "TB08_10";
                ds.Tables[10].TableName = "TB08_11";
                ds.Tables[11].TableName = "TB08_12";
                ds.Tables[12].TableName = "TB08_13";
                ds.Tables[13].TableName = "TB08_14";
                ds.Tables[14].TableName = "TB08_15";
                ds.Tables[15].TableName = "TB08_16";
                ds.Tables[16].TableName = "TB08_17";
                ds.Tables[17].TableName = "TB08_18";
                ds.Tables[18].TableName = "TB08_19";
                ds.Tables[19].TableName = "TB08_20";
                ds.Tables[20].TableName = "TB08_21";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[1]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[2]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[3]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[4]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[5]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[6]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[7]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[8]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[9]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[10]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[11]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[12]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[13]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[14]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[15]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[16]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[17]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[18]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[19]);
                doc.MailMerge.ExecuteWithRegions(ds.Tables[20]);
                //
                string nameExport = "107B04BCTC_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_107B03aBCTC(DataSet ds, CategoryModels obj)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/107B03aBCTC.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "TenDVCT", "DVBC", "Nam", "Ngay", "Lap", "KS", "TT", "DVT" };
                string[] v_Value = new string[] { "Sở tài chính", obj.TenDonVi, obj.Nam + "", obj.Ngay, "", "", "", "Đồng" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB05b";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                //
                string nameExport = "107B03aBCTC_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_107B03bBCTC(DataSet ds, CategoryModels obj)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/107B03bBCTC.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "TenDVCT", "DVBC", "Nam", "Ngay", "Lap", "KS", "TT" };
                string[] v_Value = new string[] { "Sở tài chính", obj.TenDonVi, obj.Nam + "", obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB05b";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                //
                string nameExport = "107B03bBCTC_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_107B02BCTC(DataSet ds, CategoryModels obj)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/107B02BCTC.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "TenCQCT", "DVBC", "Nam", "Ngay", "Lap", "KS", "TT" };
                string[] v_Value = new string[] { "Sở tài chính", obj.TenDonVi, obj.Nam + "", obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB04";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                //
                string nameExport = "107B02BCTC_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_107B01BCTC(DataSet ds, CategoryModels obj)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/107B01BCTC.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "TenCQCT", "DVBC", "Nam", "Ngay", "Lap", "KS", "TT" };
                string[] v_Value = new string[] { "Sở tài chính", obj.TenDonVi, obj.Nam + "" , obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB03";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                //
                string nameExport = "107B01BCTC_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        
        private string pathExport_Bieu4(DataSet ds, CategoryModels obj)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/61.Bieu04.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "DVBC", "Nam" };
                string[] v_Value = new string[] { obj.TenDonVi, obj.Nam + ""};
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB02b";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                //
                string nameExport = "61.Bieu04_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch (Exception ex)
            {
                path = "";
            }
            return path;
        }
        private string pathExport_107B01BCQT(DataSet ds, CategoryModels obj)
        {
            string path = string.Empty;
            try
            {
                refeshSession();
                string FileName = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/107B01BCQT.doc");
                if (!System.IO.File.Exists(FileName.Trim()))
                {
                    path = "";
                }
                //
                Document doc = new Document(FileName, Document.DetectFileFormat(FileName), "1234576");
                string[] v_Field = new string[] { "DVBC", "DVTH", "Nam", "Loai", "Khoan", "Ngay", "Lap", "KS", "TT" };
                string[] v_Value = new string[] { obj.TenDonVi, obj.MaDonVi, obj.Nam + "", obj.Loai + "", obj.Khoan, obj.Ngay, "", "", "" };
                doc.MailMerge.Execute(v_Field, v_Value);
                //                
                ds.Tables[0].TableName = "TB07";
                doc.MailMerge.ExecuteWithRegions(ds.Tables[0]);
                //
                string nameExport = "107B01BCQT_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".doc";                
                path = System.Web.HttpContext.Current.Server.MapPath("~/TemplateWord/FileContent/" + nameExport);
                //
                bool check = System.IO.File.Exists(path);
                doc.Save(path);
                check = System.IO.File.Exists(path);
                if (check == true)
                {
                    return nameExport;
                }
            }
            catch(Exception ex){
                path = "";
            }
            return path; 
        }
        public JToken Report(CategoryModels param)
        {
            bool isLogin = Utility.checkLogin();
            string path = string.Empty;
            string type = param.Type;
            QVCore4QLC2.KTTH.BaoCao107 dm = new QVCore4QLC2.KTTH.BaoCao107();
            QVCore4QLC2.KTTH.XuatDuLieu dm_Xuat = new QVCore4QLC2.KTTH.XuatDuLieu();
            DataSet dsReult = new DataSet();
            try
            {
                refeshSession();
                #region Load Số Liệu
                if (type == "107B01BCQT")
                {
                    DataTable dtResult = dm_Xuat.QLNS_IV2_Export_B01BCQT(param.MaDonVi, param.Nam, param.Ky, param.Nguon, param.Loai, param.Khoan);
                    dsReult.Tables.Add(dtResult.Copy());
                    path = pathExport_107B01BCQT(dsReult, param);
                }
                if (type == "Bieu4")
                {
                    DataTable dtResult = dm_Xuat.QLNS_IV2_Export_B4_TT61(param.MaDonVi, param.Nam, param.Ky, param.Nguon, param.Loai, param.Khoan);
                    dsReult.Tables.Add(dtResult.Copy());
                    path = pathExport_Bieu4(dsReult, param);
                }
                else if (type == "107B01BCTC")
                {
                    DataTable dtResult = dm_Xuat.QLNS_IV4_Export_B01BCTC(param.MaDonVi, param.Nam);
                    dsReult.Tables.Add(dtResult.Copy());
                    path = pathExport_107B01BCTC(dsReult, param);
                }
                else if (type == "107B02BCTC")
                {
                    DataTable dtResult = dm_Xuat.QLNS_IV4_Export_B01BCTC(param.MaDonVi, param.Nam);
                    path = pathExport_107B02BCTC(dsReult, param);
                }
                else if (type == "107B03aBCTC")
                {
                    DataTable dtResult = dm_Xuat.QLNS_IV4_Export_B03BCTC(param.MaDonVi, param.Nam);
                    dsReult.Tables.Add(dtResult.Copy());
                    path = pathExport_107B03aBCTC(dsReult, param);
                }
                else if (type == "107B03bBCTC")
                {
                    DataTable dtResult = dm_Xuat.QLNS_IV5_Export_B03BCTC(param.MaDonVi, param.Nam);
                    dsReult.Tables.Add(dtResult.Copy());
                    path = pathExport_107B03bBCTC(dsReult, param);
                }
                else if (type == "107B04BCTC")
                {
                    dsReult = dm.Export_B04bBCTC(param.MaDonViTH, param.MaDonVi, param.Nam, int.Parse(param.Loai));
                    path = pathExport_107B04BCTC(dsReult, param);
                }
                else if (type == "B01H")
                {
                    DataTable dtResult = dm_Xuat.QLNS_IV1_Export_B01H(param.MaDonVi, param.Nam, param.Quy);
                    dsReult.Tables.Add(dtResult.Copy());
                    path = pathExport_B01H(dsReult, param);
                }
                else if (type == "B01BSTT_TT99")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV3_Export_B01BSTT_1(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B01BSTT_TT99(dsReult, param, "99");
                }
                else if (type == "B01BSTT_TT99_2")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV3_Export_B01BSTT_2(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B01BSTT_TT99(dsReult, param, "99");
                }
                //
                else if (type == "B01BCTC_TT99")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV3_Export_B01BCTC(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B01BCTC_TT99(dsReult, param, "99");
                }
                else if (type == "B02BCTC_TT99")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV3_Export_B02BCTC(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B02BCTC_TT99(dsReult, param, "99");
                }
                else if (type == "B03BCTC_TT99")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV3_Export_B03BCTC(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B03BCTC_TT99(dsReult, param, "99");
                }
                else if (type == "B04BCTC_TT99")
                {
                    dsReult = dm_Xuat.QLNS_IV3_Export_B04BCTC(param.MaDonVi, param.Nam);
                    path = pathExport_B04BCTC_TT99(dsReult, param, "99");
                }                
                else if (type == "B01BSTT")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV3_Export_B01BSTT_1(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    DataTable dtResult2 = dm_Xuat.QLNS_IV3_Export_B01BSTT_2(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl2";
                    dsReult.Tables.Add(dtResult2.Copy());
                    path = pathExport_B01BSTT(dsReult, param, "99");
                }
                //
                else if (type == "B01BCTC_TT107")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV4_Export_B01BCTC(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B01BCTC_TT99(dsReult, param, "107");
                }
                else if (type == "B02BCTC_TT107")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV4_Export_B02BCTC(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B02BCTC_TT99(dsReult, param, "107");
                }
                else if (type == "B03BCTC_TT107")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV4_Export_B03BCTC(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B03BCTC_TT99(dsReult, param, "107");
                }
                else if (type == "B04BCTC_TT107")
                {
                    dsReult = dm_Xuat.QLNS_IV4_Export_B04BCTC(param.MaDonVi, param.Nam);
                    path = pathExport_B04BCTC_TT99(dsReult, param, "107");
                }
                else if (type == "B01BSTT_TT107")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV4_Export_B01BSTT_1(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    DataTable dtResult2 = dm_Xuat.QLNS_IV4_Export_B01BSTT_2(param.MaDonVi, param.Nam);
                    dtResult2.TableName = "tbl2";
                    dsReult.Tables.Add(dtResult2.Copy());
                    path = pathExport_B01BSTT(dsReult, param, "107");
                }
                //
                else if (type == "B01BCTC_TT107TG")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV5_Export_B01BCTC(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B01BCTC_TT99(dsReult, param, "107TG");
                }
                else if (type == "B02BCTC_TT107TG")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV5_Export_B02BCTC(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B02BCTC_TT99(dsReult, param, "107TG");
                }
                else if (type == "B03BCTC_TT107TG")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV5_Export_B03BCTC(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    path = pathExport_B03BCTC_TT99(dsReult, param, "107TG");
                }
                else if (type == "B04BCTC_TT107TG")
                {
                    dsReult = dm_Xuat.QLNS_IV5_Export_B04BCTC(param.MaDonVi, param.Nam);
                    path = pathExport_B04BCTC_TT99(dsReult, param, "107TG");
                }
                else if (type == "B01BSTT_TT107TG")
                {
                    DataTable dtResult1 = dm_Xuat.QLNS_IV5_Export_B01BSTT_1(param.MaDonVi, param.Nam);
                    dtResult1.TableName = "tbl1";
                    dsReult.Tables.Add(dtResult1.Copy());
                    DataTable dtResult2 = dm_Xuat.QLNS_IV5_Export_B01BSTT_2(param.MaDonVi, param.Nam);
                    dtResult2.TableName = "tbl2";
                    dsReult.Tables.Add(dtResult2.Copy());
                    path = pathExport_B01BSTT(dsReult, param, "107TG");
                }
                //
                else if (type == "F01_01_BCQT")
                {
                    DataTable dtResult = dm_Xuat.QLNS_IV6_Export_F01_01(param.MaDonVi, param.Nam, param.Chuong);
                    dsReult.Tables.Add(dtResult.Copy());
                    path = pathExport_F01_01_BCQT_Excel(dsReult, param);
                }
                
                #endregion
            }
            catch (Exception ex) {
                path = "";
            }
            return JToken.FromObject(new { path = path, islogin = isLogin});
        }
        [HttpPost]
        public string SaveSystem(CategoryModels obj)
        {
            //QVCore4QLC2.KTTH.NhapDuLieu dmq = new QVCore4QLC2.KTTH.NhapDuLieu();
            
            //
            string res = "Thành công !";
            refeshSession();
            QVCore4QLC2.KTTH.HeThong dm = new QVCore4QLC2.KTTH.HeThong();
            DataTable rs = dm.QLNS_DVDTC1_Addnew(obj.MaDonVi, obj.TenDonVi, 2019, 0, "", "");
            return res;
        }
        [HttpPost]
        public string SaveInput(CategoryModels obj)
        {
            string res = string.Empty;
            refeshSession();
            if (string.IsNullOrEmpty(obj.Id))
            {
                res = AddCategories(obj);
            }
            else
            {
                res = UpdateInput(obj);
            }
            return res;
        }
        [HttpPost]
        public string SaveCategories(CategoryModels obj)
        {            
            string res = string.Empty;
            refeshSession();
            if (string.IsNullOrEmpty(obj.Id))
            {
                res = AddCategories(obj);
            }
            else
            {
                res = UpdateCategories(obj);
            }
            return res;
        }
        private string AddCategories(CategoryModels obj)
        {            
            string res = string.Empty;
            QVCore4QLC2.KTTH.DanhMuc_Them dm = new QVCore4QLC2.KTTH.DanhMuc_Them();
            if (obj.Type == "DMTaiKhoan")
            {
                Guid GuidId = Guid.NewGuid();
                res = dm.DMTaiKhoanT(Guid.NewGuid(), obj.STT, obj.Ma, obj.Ten, obj.Loai, obj.SoDu, null, obj.Nam, obj.MaDonVi);
            }
            else if (obj.Type == "DMNguonKP")
            {
                res = dm.DMNguonKPT(Guid.NewGuid(), obj.STT, obj.Ma, obj.Ten, obj.TenRutGon, obj.ChiTiet, null, null, obj.Nam, obj.MaDonVi);
            }
            else if (obj.Type == "DMHDSN")
            {
                res = dm.DMHDSNT(Guid.NewGuid(), obj.STT, obj.Ma, obj.Ten, obj.TenRutGon, obj.Nam, obj.MaDonVi);
            }
            else if (obj.Type == "DMQTPKHD")
            {
                res = dm.DMQTPKHDT(Guid.NewGuid(), obj.STT, obj.ChiMuc, obj.Ten, null, obj.Nam, obj.MaDonVi, Guid.Empty, obj.MaSo);
            }
            else if (obj.Type == "DMTHTC")
            {
                res = dm.DMTHTCT(Guid.NewGuid(), obj.STT, obj.ChiMuc, obj.Ten, obj.Nam, obj.MaDonVi, Guid.Empty, obj.MaSo);
            }

            return res;
        }
        private string UpdateInput(CategoryModels obj)
        {
            string res = string.Empty;
            QVCore4QLC2.KTTH.NhapDuLieu dm = new QVCore4QLC2.KTTH.NhapDuLieu();
            if (obj.Type == "B01BCTC_TT99")
            {
                res = dm.QLNS_III7_1_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B02BCTC_TT99")
            {
                res = dm.QLNS_III7_2_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B03BCTC_TT99")
            {
                res = dm.QLNS_III7_3_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B04BCTC_TT99")
            {
                res = dm.QLNS_III7_4_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, obj.EN, obj.FN, obj.GN, obj.HN, obj.IN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B01BSTT_TT99" && obj.STT == 1)
            {
                res = dm.QLNS_III7_5_save1(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, obj.EN, obj.FN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B01BSTT_TT99" && obj.STT == 2)
            {
                res = dm.QLNS_III7_5_save2(obj.Nam, obj.MaDonVi, obj.CN, Guid.Parse(obj.Id));
            }
            //
            else if (obj.Type == "B01BCTC_TT107")
            {
                res = dm.QLNS_III8_1_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B02BCTC_TT107")
            {
                res = dm.QLNS_III8_2_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B03BCTC_TT107")
            {
                res = dm.QLNS_III8_3_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B04BCTC_TT107")
            {
                res = dm.QLNS_III8_4_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, obj.EN, obj.FN, obj.GN, obj.HN, obj.IN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B01BSTT_TT107" && obj.STT == 1)
            {
                res = dm.QLNS_III8_5_save1(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, obj.EN, obj.FN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B01BSTT_TT107" && obj.STT == 2)
            {
                res = dm.QLNS_III8_5_save2(obj.Nam, obj.MaDonVi, obj.CN, Guid.Parse(obj.Id));
            }
            //
            else if (obj.Type == "B01BCTC_TT107TG")
            {
                res = dm.QLNS_III9_1_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B02BCTC_TT107TG")
            {
                res = dm.QLNS_III9_2_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B03BCTC_TT107TG")
            {
                res = dm.QLNS_III9_3_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B04BCTC_TT107TG")
            {
                res = dm.QLNS_III9_4_save(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, obj.EN, obj.FN, obj.GN, obj.HN, obj.IN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B01BSTT_TT107TG" && obj.STT == 1)
            {
                res = dm.QLNS_III9_5_save1(obj.Nam, obj.MaDonVi, obj.CN, obj.DN, obj.EN, obj.FN, Guid.Parse(obj.Id));
            }
            else if (obj.Type == "B01BSTT_TT107TG" && obj.STT == 2)
            {
                res = dm.QLNS_III9_5_save2(obj.Nam, obj.MaDonVi, obj.CN, Guid.Parse(obj.Id));
            }
            return res;
        }
        private string UpdateCategories(CategoryModels obj)
        {            
            string res = string.Empty;
            QVCore4QLC2.KTTH.DanhMuc_Sua dm = new QVCore4QLC2.KTTH.DanhMuc_Sua();
            if (obj.Type == "DMTaiKhoan")
            {                
                res = dm.DMTaiKhoanS(Guid.Parse(obj.Id), obj.STT, obj.Ma, obj.Ten, obj.Loai, obj.SoDu, null, obj.Nam, obj.MaDonVi);
            }
            else if (obj.Type == "DMNguonKP")
            {
                res = dm.DMNguonKPS(Guid.Parse(obj.Id), obj.STT, obj.Ma, obj.Ten, obj.TenRutGon, obj.ChiTiet, Guid.Empty, null, obj.Nam, obj.MaDonVi);
            }
            else if (obj.Type == "DMHDSN")
            {
                res = dm.DMHDSNS(Guid.Parse(obj.Id), obj.STT, obj.Ma, obj.Ten, obj.TenRutGon, obj.Nam, obj.MaDonVi);
            }
            else if (obj.Type == "DMQTPKHD")
            {
                res = dm.DMQTPKHDS(Guid.Parse(obj.Id), obj.STT, obj.ChiMuc, obj.Ten, null, obj.Nam, obj.MaDonVi, Guid.Empty, obj.MaSo);
            }
            else if (obj.Type == "DMTHTC")
            {
                res = dm.DMTHTCS(Guid.Parse(obj.Id), obj.STT, obj.ChiMuc, obj.Ten, obj.Nam, obj.MaDonVi, Guid.Empty, obj.MaSo);
            }

            return res;
        }
        [HttpPost]
        public string DeleteSystem(CategoryModels obj)
        {
            string res = "Thành công !";
            refeshSession();
            QVCore4QLC2.KTTH.HeThong dm = new QVCore4QLC2.KTTH.HeThong();
                DataTable dt = dm.QLNS_DVDTC1_delete(2019, obj.MaDonVi);
            
            return res;
        }
        [HttpPost]
        public string DeleteCategories(CategoryModels obj)
        {            
            string res = string.Empty;
            refeshSession();
            QVCore4QLC2.KTTH.DanhMuc_Xoa dm = new QVCore4QLC2.KTTH.DanhMuc_Xoa();
            if (obj.Type == "DMTaiKhoan")
            {                
                res = dm.DMTaiKhoanX(Guid.Parse(obj.Id));
            }
            else if (obj.Type == "DMNguonKP")
            {
                res = dm.DMNguonKPX(Guid.Parse(obj.Id));
            }
            else if (obj.Type == "DMHDSN")
            {
                res = dm.DMHDSNX(Guid.Parse(obj.Id));
            }
            else if (obj.Type == "DMQTPKHD")
            {
                res = dm.DMQTPKHDX(Guid.Parse(obj.Id));
            }
            else if (obj.Type == "DMTHTC")
            {
                res = dm.DMTHTCX(Guid.Parse(obj.Id));
            }
            return res;
        }
        
        public JToken ListDataCombo1(string nguon, int nam)
        {
            var ii = new QVCore4QLC2.KTTH.XuatDuLieu();
            DataTable dt1 = ii.QLNS_IV7_LoadKH("010", nam);
            
            return JToken.FromObject(dt1);
        }
        [HttpPost]
        public JToken ListUnit(string keyWord)
        {
            QVCore4QLC2.KTTH.DanhMuc_Chon dm = new QVCore4QLC2.KTTH.DanhMuc_Chon();
            refeshSession();
            DataTable dt = dm.DonViC();
            DataTable dtResult = dt.Clone();
            string title = string.Empty;
            for(int i = 0;i < dt.Rows.Count;i++)
            {
                object val = dt.Rows[i]["ten"];
                if(val != null)
                {
                    title = dt.Rows[i]["ten"].ToString();
                    if (title.ToLower().Contains(keyWord.ToLower()))
                    {                        
                        dtResult.ImportRow(dt.Rows[i]);
                    }
                }    
            }    
            return JToken.FromObject(dtResult);
        }
        public JToken ObjUnit(string id)
        {
            QVCore4QLC2.KTTH.DanhMuc_Chon dm = new QVCore4QLC2.KTTH.DanhMuc_Chon();
            refeshSession();
            DataRow[] dr = dm.DonViC().Select("ma = '"+ id +"'");
            string MaDV = ""; string TenDV = "";
            if(dr.Length > 0)
            {
                MaDV = dr[0]["ma"].ToString();
                TenDV = dr[0]["ten"].ToString();
            }
            return JToken.FromObject(new { id = MaDV, title = TenDV });
        }
        [HttpPost]
        public int Login(Login lg)
        {
            var cs = new QVCore4QLC2.HeThong.Admin.QuanTriHeThong();
            int log = (int)cs.AD_User_Login(lg.User, lg.Pass);

            //
            if (UriUtil.RequestId.Equals(ClientSso.ReqStatus.LOGIN_SSO) || UriUtil.RequestId.Equals(ClientSso.ReqStatus.TOKEN_SSO))

            {
                if (ClientSso.Ins.CurrentSessionLoginInfo != null)
                {

                    //Todo: Bổ sung xác thực riêng cho phần mềm tích hợp
                    log = 99999;
                }
            }
            else// TH gọi kiểm tra xác thực
            {
                //ClientSso.Ins.XacThucNguoiDung();
                log = 0;
                Session["IsLogin"] = lg;
            }

            //
            if (log == 0)
            {
                Session["IsLogin"] = lg;
            }            
            return log;
        }
    }
}