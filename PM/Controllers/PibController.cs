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
namespace AdonetCrud.Controllers
{
    [ApiController]
    [Route("[controller]/[Action]")]
    public class PibController: ControllerBase
    {
        
        private readonly ILogger<PibController> _logger;


        public PibController(ILogger<PibController> logger)
        {
            _logger = logger;
        }
        [HttpGet]
        public IEnumerable<ProductsInBranches> Get()
        {
            DataAccessPIB da = new DataAccessPIB();
            List<ProductsInBranches> pib = da.GetProductsInBranchesList();
            return pib;
        }

        [HttpGet("{product_code}")]
        public ActionResult<ProductsInBranches> GetByCode(string product_code)
        {
           DataAccessPIB products_In_BranchesDA = new DataAccessPIB();
           var products_In_Branches = products_In_BranchesDA.GetProductsInBranchesList().Where(x => x.Product_code.Trim() == product_code);

            if (products_In_Branches== null) 
            return NotFound();
            return Ok(products_In_Branches);
            
        }
        [HttpPost]
        public ActionResult PostProductInBranch(ProductsInBranches pib)
        {
            try
            {
                DataAccessPIB da = new DataAccessPIB();
                da.InsertIntoBranch(pib);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
        [HttpDelete("{product_code}")]
        public ActionResult DeleteProductInBranches([FromBody] ProductsInBranches products_In_Branches, string product_code )
        {
            try
            {
                DataAccessPIB da = new DataAccessPIB();
                da.DeleteProductInBranches(product_code);
            } 
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }

     

    
    }
}