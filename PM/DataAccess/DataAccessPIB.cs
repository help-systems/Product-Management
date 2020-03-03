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
<<<<<<< HEAD
        private int rowsAffected { get; set; }
        public string ResultText { get; set; }

        public List<ProductsInBranches> GetProductsInBranchesList()
=======
        public class DataAccessCategories
>>>>>>> upstream/master
        {
            private int rowsAffected { get; set; }
            public string ResultText { get; set; }


            public void InsertIntoBranch(ProductsInBranches pib)
            {
                rowsAffected = 0;

                // Create SQL statement to submit
                string sql = "INSERT INTO [Categories](Parent_Category,Category_Name )";
                sql += $" VALUES( '{pib.Product_code}','{pib.Branch_name}', '{pib.Quantity}')";

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

        }
<<<<<<< HEAD
        public void InsertIntoBranch(ProductsInBranches pib)
        {
            rowsAffected = 0;
            string sql = "INSERT INTO [Categories](Parent_Category,Category_Name )";
            sql += $" VALUES( '{pib.Product_code}','{pib.Branch_name}', '{pib.Quantity}')";

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
    }
}
=======
    }
}
>>>>>>> upstream/master
