using PRODUCT_MANAGEMENT.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace PRODUCT_MANAGEMENT.DataAccess
{
    public class DataAccessSearch
    {
        private const string _coneectionString
            = @"Data Source=DESKTOP-6NUHAOM\DROSQL;Initial Catalog=Supermarket_DB;Integrated Security=True";

        private SqlConnection _connnection;

        public DataAccessSearch()
        {
            _connnection = new SqlConnection(_coneectionString);
        }

        public List<ProductsInBW> Search(ProductsInBW product)
        {
            List<ProductsInBW> items = new List<ProductsInBW>();

            string Barcode = product.Barcode.Trim() == "null" ? "null" : product.Barcode.Trim();
            string Product_Name = product.Product_Name.Trim() == "null" ? "null" : product.Product_Name.Trim();
            string Category_Name = product.Category_Name.Trim() == "null" ? "null" : product.Category_Name.Trim();
            string Supplier_Name = product.Supplier_Name.Trim() == "null" ? "null" : product.Supplier_Name.Trim();

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;

                    if (product.BW_Name == "W")
                    {
                        cmd.CommandText = $"EXEC SearchInWarehouse {Barcode},{Product_Name},{Category_Name},{Supplier_Name}";
                    }
                    else if (product.BW_Name == "B")
                    {
                        cmd.CommandText = $"EXEC SearchInBranch {Barcode},{Product_Name},{Category_Name},{Supplier_Name}";
                    }
                    else throw new System.InvalidOperationException("Something gone wrong");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int i = 0;
                            var item = new ProductsInBW();

                            item.Barcode = reader.GetString(i++).Trim();
                            item.Cost_Price = reader.GetDecimal(i++);
                            item.Selling_Price = reader.GetDecimal(i++);
                            item.Supplier_Name = reader.GetString(i++);
                            item.Product_Name = reader.GetString(i++);
                            item.Category_Name = reader.GetString(i++);
                            item.BW_Name = reader.GetString(i++);
                            item.Count = reader.GetInt32(i++);

                            items.Add(item);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            finally
            {
                CloseConnection();
            }

            return items;
        }

        private void OpenConnection()
        {
            _connnection.Open();
        }

        private void CloseConnection()
        {
            _connnection.Close();
        }
    }
}
