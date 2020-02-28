using PRODUCT_MANAGEMENT.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace PRODUCT_MANAGEMENT.DataAccess
{
    public class DataAccessProducts
    {
        private int rowsAffected { get; set; }
        public string ResultText { get; set; }
        
        public void InsertProduct(Products product)
        {
            var barcode = product.Barcode;
            var cost_price = product.Cost_Price;
            var selling_price = product.Selling_Price;
            var supplier_name = product.Supplier_Name;
            var name = product.Name;
            var category_name = product.Category_Name;

            rowsAffected = 0;
            string sql = string.Format(
                "INSERT INTO [Products] ( Barcode, Cost_Price, Selling_Price, Supplier_Name, Name, Category_Name)" +
                "values ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')", 
                    barcode, cost_price, selling_price, supplier_name, name, category_name);


            using (SqlConnection cnn = new SqlConnection(AppSettings.ConnectionString))
            {
                using (SqlDataAdapter da = new SqlDataAdapter(sql, cnn))
                {
                    
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    using (SqlCommandBuilder builder = new SqlCommandBuilder(da))
                    {
                         
                        da.InsertCommand = builder.GetInsertCommand();
                        rowsAffected = da.Update(dt);

                        ResultText = "Rows Affected: " + rowsAffected.ToString();
                    }
                }
                // using (SqlCommand cmd = new SqlCommand(sql, cnn))
                //     {
                  
                //         cmd.CommandType = CommandType.Text;
                    
                //         rowsAffected = cmd.ExecuteNonQuery();

                //         ResultText = "Rows Affected: " + rowsAffected.ToString();
                //     }
            }
        }

        public List<Products> GetProducts()
        {
            rowsAffected = 0;
            List<Products> products = new List<Products>();
               //     [Barcode]
                //   ,[Cost_Price]
                //   ,[Selling_Price]
                //   ,[Supplier_Name]
                //   ,[Name]
                //   ,[Category_Name]

            DataTable dt = null;

            string sql = "SELECT Barcode, Cost_Price, Selling_Price, Supplier_Name , Name, Category_Name FROM Products";

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
                            products = (from row in dt.AsEnumerable()
                                        select new Products
                                        {
                            //     SELECT TOP (1000) Barcode,
                            //   Cost_Price,
                            //   Selling_Price,
                            //   Supplier_Name,
                            //   Name,
                            //   Category_Name
                                            
                                            Barcode = row.Field<string>("Barcode").Trim(),
                                            Cost_Price = row.Field<decimal>("Cost_Price"),
                                            Selling_Price = row.Field<decimal>("Selling_Price"),
                                            Supplier_Name = row.Field<string>("Supplier_Name"),
                                            Name = row.Field<string>("Name"),
                                            Category_Name = row.Field<string>("Category_Name")
                                        }).ToList();

                            rowsAffected = products.Count;

                            ResultText = "Rows Affected: " + rowsAffected.ToString();
                        }
                    }
                }
            }

            return products;
        }

        
         public void DeleteProduct(string barcode)
        {
            string sql="DELETE  FROM [Products] WHERE Barcode = '{0}'";
            StringBuilder errorMessages = new StringBuilder();
            using (SqlConnection connection=new SqlConnection(AppSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(string.Format(sql,barcode),connection))
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
        public void UpdateProduct(Products products)

        {   
              //     SELECT TOP (1000) Barcode,
             //   Cost_Price,
            //   Selling_Price,
           //   Supplier_Name,
          //   Name,
         //   Category_Name
            string sql="UPDATE [Products] " +
                       "SET Cost_Price = @Cost_Price, Selling_Price = @Selling_Price, Supplier_Name = @Supplier_Name, Name=@Name, Category_Name=@Category_Name"+ 
                       "Where Barcode=@Barcode";
            StringBuilder errorMessages = new StringBuilder();
            using (SqlConnection connection = new SqlConnection(AppSettings.ConnectionString))
            {
                using (SqlCommand command= new SqlCommand(sql, connection))
                {
                    try
                    {
                        command.CommandType = CommandType.Text;
                        connection.Open();    
                        command.Parameters.Add("@Barcode",SqlDbType.Char).Value=products.Barcode;
                        command.Parameters.Add("@Cost_Price", SqlDbType.VarChar).Value=products.Cost_Price;
                        command.Parameters.Add("@Selling_Price", SqlDbType.VarChar).Value=products.Selling_Price;
                        command.Parameters.Add("@Supplier_Name", SqlDbType.VarChar).Value=products.Supplier_Name;
                        command.Parameters.Add("@Name", SqlDbType.VarChar).Value=products.Name;
                        command.Parameters.Add("@Category_Name", SqlDbType.VarChar).Value=products.Category_Name;

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