using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PRODUCT_MANAGEMENT.DataAccess;
using PRODUCT_MANAGEMENT.Models;

namespace PRODUCT_MANAGEMENT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAllHeaders")]
    public class SearchController : ControllerBase
    {
        private readonly DataAccessSearch Data = new DataAccessSearch();

        [HttpPost]
        public IActionResult Post (ProductsInBW product)
        {
            try
            {
                var result = Data.MainSearch(product).ToList();

                if (result.Count() == 0)
                {
                    return Ok(false);
                }

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}