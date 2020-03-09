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


        public Products InsertProduct(Products product)
        {
            try
            {
                var barcode = product.Barcode;
                var cost_price = product.Cost_Price;
                var selling_price = product.Selling_Price;
                var supplier_name = product.Supplier_Name;
                var name = product.Name;
                var category_name = product.Category_Name;

                string sql = string.Format(
                    "INSERT INTO [Products] ( Barcode, Cost_Price, Selling_Price, Supplier_Name, Name, Category_Name)" +
                    "values ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')",
                        barcode, cost_price, selling_price, supplier_name, name, category_name);


                using (SqlConnection connection = new SqlConnection(AppSettings.ConnectionString))
                {
                    connection.Open();


                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = connection;

                        cmd.CommandText = string.Format(
                            "INSERT INTO [Products] ( Barcode, Cost_Price, Selling_Price, Supplier_Name, Name, Category_Name)" +
                            "values ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')",
                                barcode, cost_price, selling_price, supplier_name, name, category_name);

                        cmd.ExecuteNonQuery();
                    };
                }

                return product;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public List<Products> GetProducts()
        {
            rowsAffected = 0;
            List<Products> products = new List<Products>();

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

        
        public string DeleteProduct(string barcode)
        {
            try
            {
                string sql = "DELETE  FROM [Products] WHERE Barcode = '{0}'";
                StringBuilder errorMessages = new StringBuilder();
                using (SqlConnection connection = new SqlConnection(AppSettings.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand(string.Format(sql, barcode), connection))
                    {
                        try
                        {
                            connection.Open();
                            command.ExecuteNonQuery();
                        }
                        catch (SqlException ex)
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

                return barcode;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public Products UpdateProduct(Products product)
        {
            try
            {
                string sql = "UPDATE [Products] " +
                           "SET Cost_Price = @Cost_Price, Selling_Price = @Selling_Price, Supplier_Name = @Supplier_Name, Name=@Name, Category_Name=@Category_Name" +
                           "Where Barcode=@Barcode";

                StringBuilder errorMessages = new StringBuilder();

                using (SqlConnection connection = new SqlConnection(AppSettings.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.CommandType = CommandType.Text;
                        connection.Open();
                        command.Parameters.Add("@Barcode", SqlDbType.Char).Value = product.Barcode;
                        command.Parameters.Add("@Cost_Price", SqlDbType.VarChar).Value = product.Cost_Price;
                        command.Parameters.Add("@Selling_Price", SqlDbType.VarChar).Value = product.Selling_Price;
                        command.Parameters.Add("@Supplier_Name", SqlDbType.VarChar).Value = product.Supplier_Name;
                        command.Parameters.Add("@Name", SqlDbType.VarChar).Value = product.Name;
                        command.Parameters.Add("@Category_Name", SqlDbType.VarChar).Value = product.Category_Name;

                        command.ExecuteNonQuery();
                    }
                }

                return product;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}