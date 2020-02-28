using System;

namespace PRODUCT_MANAGEMENT.Models
{
    public class Products
     {
        public string Barcode { get; set; }
        public decimal Cost_Price { get; set; }
        public decimal Selling_Price { get; set; }
        public string Supplier_Name { get; set; }
        public string Name { get; set; }
        public string Category_Name{ get; set; } 
    }
}
