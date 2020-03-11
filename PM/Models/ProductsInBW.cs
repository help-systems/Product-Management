using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PRODUCT_MANAGEMENT.Models
{
    public class ProductsInBW
    {
        public string Barcode { get; set; }
        public decimal Cost_Price { get; set; }
        public decimal Selling_Price { get; set; }
        public string Supplier_Name { get; set; }
        public string Product_Name { get; set; }
        public string Category_Name { get; set; }
        public string BW_Name { get; set; }
        public int Count { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
