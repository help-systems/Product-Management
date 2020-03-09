using PRODUCT_MANAGEMENT.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace PRODUCT_MANAGEMENT.DataAccess
{
    public class DataAccessCategories
    {
        private int rowsAffected { get; set; }
        public string ResultText { get; set; }


        public List<Categories> GetCategoriers ()
        {
            rowsAffected = 0;
            List<Categories> categories = new List<Categories>();
              

            DataTable dt = null;

            string sql = "SELECT Parent_Category, Category_Name FROM Categories";

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
                            categories= (from row in dt.AsEnumerable()
                                        select new Categories
                                        {

                                            Parent_Category = row.Field<string>("Parent_Category"),
                                            Category_Name = row.Field<string>("Category_Name")
                                        }).ToList();

                            rowsAffected = categories.Count;
                            ResultText = "Rows Affected: " + rowsAffected.ToString();
                        }
                    }
                }
            }
            return categories;
        }


        public Categories InsertCategories(Categories category)
        {
            rowsAffected = 0;

            string sql = string.Format("INSERT INTO Categories (Parent_Category,Category_Name) VALUES ('{0}','{1}')",
                category.Parent_Category, category.Category_Name);

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

                return category;
            }
            catch (Exception ex)
            {
                ResultText = ex.ToString();

                throw (ex);
            }
        }


        public Categories UpdateCategory (Categories category)
        {
            var Parent_Name = category.Parent_Category;
            var NewCategoryName = category.NewCategoryName;
            var OldCategoryName = category.Category_Name;

            string sql = string.Format("EXEC PutCategory '{0}','{1}','{2}'", 
                Parent_Name, NewCategoryName, OldCategoryName);

            try
            {
                using (SqlConnection cnn = new SqlConnection(AppSettings.ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand(sql, cnn))
                    {
                        cmd.CommandType = CommandType.Text;
                        cnn.Open();
                        rowsAffected = cmd.ExecuteNonQuery();
                    }
                }

                return category;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        
        public string DeleteCategories(string category_name)
        {
            string sql = "DELETE FROM [Categories] WHERE Category_Name = '{0}'";
            StringBuilder errorMessages = new StringBuilder();

            try
            {
                using (SqlConnection connection = new SqlConnection(AppSettings.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand(string.Format(sql, category_name), connection))
                    {
                        
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                }

                return category_name;
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

                throw (ex);
            }
        }
    }
}