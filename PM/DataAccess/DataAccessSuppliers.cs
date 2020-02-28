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

         public List<Suppliers> GetSuppliersAsGenericList()
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

        

        public void InsertSuppliers(Suppliers suppliers)
        {
            rowsAffected = 0;

            // Create SQL statement to submit
            string sql = "INSERT INTO [Suppliers]( Company_Name)";
            sql += $" VALUES(  '{suppliers.Company_Name}')";

            try
            {
                using (SqlConnection cnn = new SqlConnection(AppSettings.ConnectionString))
                {
                    // Create command object in using block for automatic disposal
                    using (SqlCommand cmd = new SqlCommand(sql, cnn))
                    {
                        // Set CommandType
                        cmd.CommandType = CommandType.Text;
                        // Open the connection
                        cnn.Open();
                        // Execute the INSERT statement
                        rowsAffected = cmd.ExecuteNonQuery();

                        ResultText = "Rows Affected: " + rowsAffected.ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                ResultText = ex.ToString();
            }
        }
         public void DeleteSuppliers(string company_name)
        {
            string sql="DELETE FROM [Suppliers] WHERE Company_Name = '{0}'";
            StringBuilder errorMessages = new StringBuilder();
            using (SqlConnection connection=new SqlConnection(AppSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(string.Format(sql,company_name),connection))
                {
                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                    catch(SqlException ex)
                    {
                        for (int i = 0; i < ex.Errors.Count; i++)
                        {
                             errorMessages.Append("Index #" + i + "\n" +
                            "Message: " + ex.Errors[i].Message + "\n" +
                            "LineNumber: " + ex.Errors[i].LineNumber + "\n" +
                            "Source: " + ex.Errors[i].Source + "\n" +
                            "Procedure: " + ex.Errors[i].Procedure + "\n");
                        }
                        Console.WriteLine(errorMessages.ToString());
                    }
                }
            }
            
        }

/////////////////////////////////////////////////////////////////////////////////////
        public void UpdateSuppliers(Suppliers supplier, string s1, string s2)
        {   
            string sql = "EXEC UpdateSuppliers 's1' , 's2'" ;
            StringBuilder errorMessages = new StringBuilder();
            using (SqlConnection connection = new SqlConnection(AppSettings.ConnectionString))
            {
                using (SqlCommand command= new SqlCommand(sql, connection))
                {
                    try
                    {
                        command.CommandType = CommandType.Text;
                        connection.Open();    
                        command.Parameters.Add("@s2",SqlDbType.VarChar).Value=supplier.Company_Name;
                        command.ExecuteNonQuery();
                    }
                    catch(SqlException ex)
                    {
                        for (int i = 0; i < ex.Errors.Count; i++)
                        {
                             errorMessages.Append("Index #" + i + "\n" +
                            "Message: " + ex.Errors[i].Message + "\n" +
                            "LineNumber: " + ex.Errors[i].LineNumber + "\n" +
                            "Source: " + ex.Errors[i].Source + "\n" +
                            "Procedure: " + ex.Errors[i].Procedure + "\n");
                        }
                        Console.WriteLine(errorMessages.ToString());
                    }
                    
                }
            }
        }
    }
}