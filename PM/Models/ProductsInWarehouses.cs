using System;

namespace PRODUCT_MANAGEMENT.Models
{
    public class ProductsInWarehouses
    {
        public string Product_code { get; set; }
        public string Warehouse_name { get; set; }
        public DateTime Date_ { get; set; }
        public long Quantity { get; set; }
    }
}
