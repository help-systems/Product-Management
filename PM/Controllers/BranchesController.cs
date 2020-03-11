using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRODUCT_MANAGEMENT.DataAccess;
using PRODUCT_MANAGEMENT.Models;

namespace PRODUCT_MANAGEMENT.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        private readonly DataAccessBW Data = new DataAccessBW();

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = Data.GetBranches().ToList();

                if (result.Count() == 0)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPost]
        public IActionResult Post(ProductsInBW product)
        {
            try
            {
                var result = Data.InsertInBranch(product);

                if(result == null)
                {
                    return BadRequest();
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPut]
        public IActionResult Put(ProductsInBW product)
        {
            try
            {
                var result = Data.UpdateInBranch(product);

                if (result == null)
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


        [HttpDelete]
        public IActionResult Delete(ProductsInBW product)
        {
            try
            {
                var result = Data.DeleteFromBranch(product);

                if (result == null)
                {
                    return BadRequest();
                }

                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}