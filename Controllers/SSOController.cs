﻿using EsbUsers.Sso;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyBaoCao.Controllers
{
    public class SSOController : Controller
    {
        // GET: SSO
        public ActionResult Index() // Trang mặc định
        {
            if (ClientSso.Ins.CurrentSessionLoginInfo != null)
            {
                ClientSso.Ins.XacThucNguoiDung();
                var user = ClientSso.Ins.CurrentSessionLoginInfo;
                ViewBag.KetQua = user.HoVaTen;
            }
            else
            {
                return Redirect("/sso/Login/");
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
    }
}