using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using PRODUCT_MANAGEMENT.Models;

namespace PRODUCT_MANAGEMENT.DataAccess
{
    public class DataAccessSuppliers
    {
        
        private int rowsAffected { get; set; }
        public string ResultText { get; set; }

        public List<Suppliers> GetSuppliers ()
        {
            rowsAffected = 0;
            List<Suppliers> suppliers = new List<Suppliers>();
              

            DataTable dt = null;

            string sql = "SELECT Company_Name FROM Suppliers";

            using (SqlConnection cnn = new SqlConnection(AppSettings.ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(sql, cnn))
                {
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        dt = new DataTable();
                        da.Fill(dt);
                        if (dt.Rows.Count > 0)
                        {
                            suppliers= (from row in dt.AsEnumerable()
                                        select new Suppliers
                                        {

                                            Company_Name = row.Field<string>("Company_Name")
                                        }).ToList();

                            rowsAffected = suppliers.Count;

                            ResultText = "Rows Affected: " + rowsAffected.ToString();
                        }
                    }
                }
            }

            return suppliers;
        }
        

        public Suppliers InsertSuppliers(Suppliers suppliers)
        {
            rowsAffected = 0;

            string sql = "INSERT INTO [Suppliers](Company_Name)";
            sql += $" VALUES('{suppliers.Company_Name}')";

            try
            {
                using (SqlConnection cnn = new SqlConnection(AppSettings.ConnectionString))
                {

                    using (SqlCommand cmd = new SqlCommand(sql, cnn))
                    {

                        cmd.CommandType = CommandType.Text;

                        cnn.Open();

                        rowsAffected = cmd.ExecuteNonQuery();

                        ResultText = "Rows Affected: " + rowsAffected.ToString();
                    }
                }

                return suppliers;
            }
            catch (Exception ex)
            {
                ResultText = ex.ToString();

                throw (ex);
            }
        }


        public Suppliers UpdateSupplier (Suppliers old_name, Suppliers new_name)
        {
            string sql = string.Format("EXEC PutSupplier '{0}','{1}'", old_name.Company_Name, new_name.Company_Name);

            try
            {
                using (SqlConnection cnn = new SqlConnection(AppSettings.ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand(sql, cnn))
                    {
                        cnn.Open();

                        cmd.ExecuteNonQuery();
                    }
                }

                return old_name;
            }
            catch(Exception ex)
            {
                throw (ex);
            }
        }


        public string DeleteSuppliers(string company_name)
        {
            try
            {
                string sql = "DELETE FROM [Suppliers] WHERE Company_Name = '{0}'";
                StringBuilder errorMessages = new StringBuilder();
                using (SqlConnection connection = new SqlConnection(AppSettings.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand(string.Format(sql, company_name), connection))
                    {

                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                }

                return company_name;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}