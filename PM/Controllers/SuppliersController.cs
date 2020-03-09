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
    public class SuppliersController : ControllerBase
    {

        private readonly ILogger<ProductsController> _logger;
        private readonly DataAccessSuppliers Data = new DataAccessSuppliers();

        public SuppliersController(ILogger<ProductsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = Data.GetSuppliers().ToList();

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


        [HttpGet("{company_name}")]
        public IActionResult Get(string company_name)
        {
            try
            {
                var result = Data.GetSuppliers().Where(x => x.Company_Name == company_name).ToList();

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


        [HttpPost]
        public IActionResult Post(Suppliers suppliers)
        {
            try
            {
                var result = Data.InsertSuppliers(suppliers);

                if (result == null)
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


        [HttpPut]
        public IActionResult Put(List<Suppliers> supplier)
        {
            try
            {
                var result = Data.UpdateSupplier(supplier[0], supplier[1]);
                
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


        [HttpDelete("{company_Name}")]
        public IActionResult Delete(string company_Name)
        {
            try
            {
                var result = Data.DeleteSuppliers(company_Name);

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
    }
}