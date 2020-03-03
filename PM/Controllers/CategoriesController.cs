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

    public class CategoriesController : ControllerBase
    {       
        private readonly ILogger<ProductsController> _logger;
        private readonly DataAccessCategories Data = new DataAccessCategories();

        public CategoriesController(ILogger<ProductsController> logger)
        {
            _logger = logger;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = Data.GetCategoriers();

                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{category_name}")]
        public IActionResult Get (string category_name)
        {
            try
            {
                var result = Data.GetCategoriers().Where(x => x.Category_Name == category_name).ToList();

                if (result.Count() == 0)
                    return NotFound();

                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public ActionResult Post (Categories category)
        {
            try
            {
                Data.InsertCategories(category);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

           
        [HttpDelete("{category_name}")]
        public ActionResult Delete (string category_name)
        {
            try
            {
                Data.DeleteCategories(category_name);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
    }
}