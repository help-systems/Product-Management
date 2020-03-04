using PRODUCT_MANAGEMENT.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRODUCT_MANAGEMENT.DataAccess
{
    public class DataAccessPIB
    {
        private int rowsAffected { get; set; }
        public string ResultText { get; set; }
        
        public List<ProductsInBranches> GetProductsInBranchesList()
        {
            rowsAffected = 0;
            List<ProductsInBranches> pib = new List<ProductsInBranches>();
            DataTable dt = null;

            string sql = "SELECT Product_code, Branch_name, Count FROM Products_in_Branches";

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
                            pib= (from row in dt.AsEnumerable()
                            select new ProductsInBranches
                            {
                                Quantity= row.Field<int>("Count"),
                                Product_code= row.Field<string>("Product_code").Trim(),
                                Branch_name= row.Field<string>("Branch_name")
                            }).ToList();

                            rowsAffected =pib.Count;
                            ResultText = "Rows Affected: " + rowsAffected.ToString();
                        }
                    }
                }
            }
            return pib;
        }
         public void InsertProductInBranch(ProductsInBranches pib)
        {
            rowsAffected = 0;
            // table Products_in_Branches
            //[Product_code]
            //[Branch_name]
            //[Count] 
           
            string sql = "INSERT INTO [Products_in_Branches] (Product_code,Branch_name, Count)";
            sql += $" VALUES( '{pib.Product_code}','{pib.Branch_name}',{ pib.Quantity})";

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
            }
            catch (Exception ex)
            {
                ResultText = ex.ToString();
            }
        }

        public void DeleteProductInBranches(string product_code)
        {   
            // table Products_in_Branches
            //[Product_code]
            //[Branch_name]
            //[Count] 
            string sql="DELETE FROM [Products_in_Branches] WHERE Product_code = '{0}'";
            StringBuilder errorMessages = new StringBuilder();
            using (SqlConnection connection=new SqlConnection(AppSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(string.Format(sql,product_code),connection))
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
         public void UpdateProductsInBranches(ProductsInBranches pib)
        {   
            // table Products_in_Branches
            //[Product_code]
            //[Branch_name]
            //[Count] 
            string sql="UPDATE [Products_in_Branches] " +
                       "SET Product_code = @Product_code, Branch_name = @Branch_name, Count=@Count "+
                       "Where Product_code=@Product_code";
            StringBuilder errorMessages = new StringBuilder();
            using (SqlConnection connection = new SqlConnection(AppSettings.ConnectionString))
            {
                using (SqlCommand command= new SqlCommand(sql, connection))
                {
                    try
                    {
                        command.CommandType = CommandType.Text;
                        connection.Open();    
                       
                        command.Parameters.Add("@Product_code", SqlDbType.Char).Value=pib.Product_code;
                        command.Parameters.Add("@Branch_name", SqlDbType.VarChar).Value=pib.Branch_name;
                        command.Parameters.Add("@Count",SqlDbType.Int).Value=pib.Quantity;
                        
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
