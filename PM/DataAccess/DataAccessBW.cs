using PRODUCT_MANAGEMENT.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace PRODUCT_MANAGEMENT.DataAccess
{
    public class DataAccessBW
    {
        private SqlConnection _connnection;

        public DataAccessBW()
        {
            _connnection = new SqlConnection(AppSettings.ConnectionString);
        }

        public List<Branches> GetBranches()
        {
            List<Branches> items = new List<Branches>();

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = string.Format("EXEC GetBranches");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int i = 0;
                            var item = new Branches();

                            item.Branch_Name = reader.GetString(i++);

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


        public ProductsInBW InsertInBranch(ProductsInBW product)
        {
            var Barcode = product.Barcode;
            var Branch_name = product.BW_Name;
            var Count = product.Count;

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = string.Format("EXEC InsertInBranch '{0}','{1}','{2}'",Barcode,Branch_name,Count);

                    cmd.ExecuteNonQuery();                  
                }

                return product;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public ProductsInBW UpdateInBranch(ProductsInBW product)
        {
            var Barcode = product.Barcode;
            var Branch_Name = product.BW_Name;
            var Count = product.Count;

            string sql = string.Format("EXEC UpdateProductInBranch '{0}','{1}','{2}'",
                Barcode, Branch_Name, Count);

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;

                    cmd.CommandText = sql;

                    cmd.ExecuteNonQuery();
                }

                return product;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public ProductsInBW DeleteFromBranch(ProductsInBW product)
        {
            var Barcode = product.Barcode;
            var Branch_Name = product.BW_Name;

            string sql = string.Format("EXEC DeleteFromBranches '{0}','{1}'",
                Barcode, Branch_Name);

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;

                    cmd.CommandText = sql;

                    cmd.ExecuteNonQuery();
                }

                return product;
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }


        public List<Warehouses> GetWarehouses()
        {
            List<Warehouses> items = new List<Warehouses>();

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = string.Format("EXEC GetWarehouses");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int i = 0;
                            var item = new Warehouses();

                            item.Warehouse_Name = reader.GetString(i++);

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


        public ProductsInBW InsertInWarehouse(ProductsInBW product)
        {
            var Barcode = product.Barcode;
            var Warehouse_name = product.BW_Name;
            var Count = product.Count;
            var Date = product.Date;

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = string.Format("EXEC InsertInWarehouse '{0}','{1}','{2}','{3}'", Barcode, Warehouse_name, Count,Date);

                    cmd.ExecuteNonQuery();
                }

                return product;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public ProductsInBW UpdateInWarehouse(ProductsInBW product)
        {
            var Barcode = product.Barcode;
            var Warehouse_Name = product.BW_Name;
            var Count = product.Count;

            string sql = string.Format("EXEC UpdateProductInWarehouse '{0}','{1}','{2}'",
                Barcode, Warehouse_Name, Count);

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;

                    cmd.CommandText = sql;

                    cmd.ExecuteNonQuery();
                }

                return product;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public ProductsInBW DeleteFromWarehouse(ProductsInBW product)
        {
            var Barcode = product.Barcode;
            var Warehouse_Name = product.BW_Name;

            string sql = string.Format("EXEC DeleteFromWarehouses '{0}','{1}'",
                Barcode, Warehouse_Name);

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;

                    cmd.CommandText = sql;

                    cmd.ExecuteNonQuery();
                }

                return product;
            }
            catch (Exception ex)
            {
                throw (ex);
            }

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
