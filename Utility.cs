using EsbUsers.Sso;
using QuanLyBaoCao.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace QuanLyBaoCao
{
    public class Utility
    {
        public static string formatCurrency(string rs)
        {
            string result = "";
            try
            {
                Int64 value;
                if(Int64.TryParse(rs, out value)){  }   
                else
                {
                    value = 0;
                }    
                result = value.ToString("#,#", CultureInfo.InvariantCulture);
                if (string.IsNullOrEmpty(result))
                {
                    result = "0";
                }
            }
            catch (Exception ex)
            { result = "0"; }
            return result;
        }
        public static bool checkLogin()
        {
            //if (ClientSso.Ins.CurrentSessionLoginInfo != null)
            //{
            //    ClientSso.Ins.XacThucNguoiDung();
            //    var user = ClientSso.Ins.CurrentSessionLoginInfo;
            //    ViewBag.KetQua = user.HoVaTen;
            //}
            //else
            //{
            //    return Redirect("/Home/Login/");
            //}

            bool isCheckLogin = true;
            Login c = (Login)System.Web.HttpContext.Current.Session["IsLogin"];
            if (c == null)
            {
                if (ClientSso.Ins.CurrentSessionLoginInfo != null)
                {
                    //ClientSso.Ins.XacThucNguoiDung();
                    var user = ClientSso.Ins.CurrentSessionLoginInfo;                    
                    isCheckLogin = true;
                }
                else
                {
                    isCheckLogin = false;
                }
            }
            return isCheckLogin;
        }
        public static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        public static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
    }
}