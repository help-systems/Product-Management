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

    public class CategoriesController : ControllerBase
    {
        
        private readonly ILogger<ProductsController> _logger;

        public CategoriesController(ILogger<ProductsController> logger)
        {
            _logger = logger;
        }
        
         [HttpGet]
         public IEnumerable<Categories> Get()
         {
            DataAccessCategories DataAccessCategories = new DataAccessCategories();
            List<Categories> categories = DataAccessCategories.GetCategoriersAsGenericList();
            return categories;
         }
         [HttpGet("{category_name}")]
            public ActionResult<Categories> GetByName(string category_name)
          {
            DataAccessCategories DataAccessCategories = new DataAccessCategories();
           var categories = DataAccessCategories.GetCategoriersAsGenericList().Where(x => x.Category_Name == category_name);

            if (categories== null) 
            return NotFound();
            return Ok(categories);
            
         }
        [HttpPost]
        public ActionResult PostCategory(Categories category)
        {
            try
            {
                DataAccessCategories DataAccessCategories = new DataAccessCategories();
                DataAccessCategories.InsertCategories(category);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
        [HttpDelete("{category_name}")]
        public ActionResult Delete(string category_name)
        {
            try
            {
               DataAccessCategories DataAccessCategories = new DataAccessCategories();
                DataAccessCategories.DeleteCategories(category_name);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }

     

    }
}