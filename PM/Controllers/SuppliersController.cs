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
    public class SuppliersController : ControllerBase
    {
       
        private readonly ILogger<ProductsController> _logger;


        public SuppliersController(ILogger<ProductsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                DataAccessSuppliers suppliersDALDC = new DataAccessSuppliers();
                List<Suppliers> suppliers = suppliersDALDC.GetSuppliersAsGenericList();

                return Ok(suppliers);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

         [HttpGet("{company_name}")]
         public IActionResult GetByName (string company_name)
         {
            try
            {
                DataAccessSuppliers suppliersDALDC = new DataAccessSuppliers();
                var suppliers = suppliersDALDC.GetSuppliersAsGenericList().Where(x => x.Company_Name == company_name).ToList();

                if (suppliers.Count() == 0)
                    return NotFound();

                return Ok(suppliers);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
         }
      
        [HttpPost]
        public ActionResult Post(Suppliers suppliers)
        {
            try
            {
                DataAccessSuppliers suppliersDALDC = new DataAccessSuppliers();
                suppliersDALDC.InsertSuppliers(suppliers);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
        [HttpDelete("{company_name}")]
        public ActionResult Delete(string company_Name)
        {
            try
            {
                DataAccessSuppliers suppliersDALDC = new DataAccessSuppliers();
                suppliersDALDC.DeleteSuppliers(company_Name);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
         
           // ************************************* Help!!!!
         [HttpPut]
        public ActionResult Update([FromBody] Suppliers suppliers, string s1, string s2 )
        {
            try
            {
                DataAccessSuppliers suppliersDALDC = new DataAccessSuppliers();
                suppliersDALDC.UpdateSuppliers(suppliers,s1,s2);
            } 
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
        

    }
}