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
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {

        private readonly ILogger<ProductsController> _logger;
        private readonly DataAccessProducts Data = new DataAccessProducts();

        public ProductsController(ILogger<ProductsController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = Data.GetProducts().ToList();

                if (result.Count() == 0)
                {
                    return BadRequest();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet("{barcode}")]
        public IActionResult Get(string barcode)
        {
            try
            {
                var product = Data.GetProducts().Where(x => x.Barcode == barcode).ToList();

                if (product.Count() == 0)
                {
                    return Ok(false);
                }

                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPost]
        public IActionResult Post (Products products)
        {
            try
            {
                var result = Data.InsertProduct(products);

                if(result == null)
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            
        }

        [HttpPut]
        public IActionResult Put(Products products)
        {
            try
            {
                var result = Data.UpdateProduct(products);

                if(result == null)
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [HttpDelete("{barcode}")]
        public IActionResult Delete (string barcode)
        {
            try
            {
                var result = Data.DeleteProduct(barcode);

                if(result == null)
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch
            {
                return BadRequest("somthing went wrong");
            }
        }      
    }
}
