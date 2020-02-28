using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Net.Http;
using PRODUCT_MANAGEMENT.Models;
using PRODUCT_MANAGEMENT.DataAccess;

namespace PRODUCT_MANAGEMENT.Controllers
{
    [ApiController]
    [Route("[controller]/[Action]")]
    public class ProductsController : ControllerBase
    {

        private readonly ILogger<ProductsController> _logger;
        private readonly DataAccessProducts Data = new DataAccessProducts();

        public ProductsController(ILogger<ProductsController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public IActionResult GetProducts()
        {
            try
            {
                var product = Data.GetProducts();

                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet("{barcode}")]
        public IActionResult GetProducts(string barcode)
        {
            try
            {
                var product = Data.GetProducts().Where(x => x.Barcode == barcode).ToList();

                if (product.Count == 0)
                    return Ok(false);

                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPost("{products}")]
        public IActionResult PostProduct (Products products)
        {
            try
            {
                Data.InsertProduct(products);

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            
        }

        [HttpDelete("{barcode}")]
        public ActionResult Delete(string barcode)
        {
            try
            {
                Data.DeleteProduct(barcode);
            }
            catch
            {
                return BadRequest("somthing went wrong");
            }
            return Ok();
        }
        
        [HttpPut("{barcode}")]
        public ActionResult Update([FromBody]Products products)
        {
            try
            {
                DataAccessProducts DataAccessProducts = new DataAccessProducts();
                DataAccessProducts.UpdateProduct(products);

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            
        }

    }
}
