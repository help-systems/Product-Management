import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever} from "react-icons/md";
import { FaFilter } from 'react-icons/fa';

class TodoProducts extends React.Component {

    constructor(props){
		super(props);
		this.state = {		
            base_url:"http://localhost:51560/",	
            productslist:[],
            searchBarcode:"",
            productobject:{},
            is_searchBarcode:false,
            is_wrongBarcode:false,
            addsituation:false,
            newBarcode:"",
            newProduct:"",
            newcost_Price:0,
            newselling_Price:0,
            selectsupplier_Name:"",
            selectcategory_Name:"",
            supplierNames:[],
            categoriesNames:[],
            is_dublicate:false,
            is_fillallinfo:false,
            currentDeleter:"",
            // category:"",       
            modal3: false,
            is_delete:false,
            is_edit:false,
            is_add:false,   
            // inputNewProduct:"",
            // parentCategories:[],
            // currentCategory:"",
            
            // is_repeatcategory:false,
            currentEDitProduct:{
                    barcode:"",
                    name:"",
                    index:"",
                    cost_Price:"",
                    selling_Price:"",
                    supplier_Name:"",
                    category_Name:""
                }
            
        };
        this.todoSearchBarcode = this.todoSearchBarcode.bind(this);
        this.plus = this.plus.bind(this);
        // this.handleCategoryChange = this.handleCategoryChange.bind(this);
        // this.handleParentCategoryChange = this.handleParentCategoryChange.bind(this);
        // // this.handleCategoryChangeSingle = this.handleCategoryChangeSingle.bind(this);
        // // this.handleParentCategoryChangeSingle = this.handleParentCategoryChangeSingle.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.todoAdd = this.todoAdd.bind(this);
    }

    async componentDidMount() {

        let url =this.state.base_url + `Products/`;			
        let response = await fetch(url);
        let productslist = await response.json();
        // let productslist = [
        //     { barcode:"2222",
        //      name:"product1",
        //      cost_Price:222,
        //      selling_Price:444,
        //      supplier_Name:"FFFF",
        //      category_Name:"aaa"},
        //      {
        //      barcode:"888",
        //      name:"product2",
        //      cost_Price:222,
        //      selling_Price:444,
        //      supplier_Name:"FFFF",
        //      category_Name:"aaa"},
        //      { barcode:"22242",
        //         name:"product3",
        //         cost_Price:222,
        //         selling_Price:444,
        //         supplier_Name:"kkk",
        //         category_Name:"aaa"
        //     }
        //     ]
            productslist.map(item => {
                item.edit = false;
                item.index = productslist.indexOf(item) + 1;
                return item;
            })

        this.setState({
            productslist
        })
    }

    async componentDidUpdate() {

        let url =this.state.base_url + `Products/`;			
        let response = await fetch(url);
        let productslist = await response.json();
       
        productslist.map(item => {
            this.state.currentEDitProduct.barcode === item.barcode ?              
            item.edit = true : item.edit = false;
            item.index = productslist.indexOf(item) + 1;
            return item;
        })

        this.setState({
            productslist
        })

    }

    handleInputSearchBarcode = (e) => {
		this.setState({
            searchBarcode:e.target.value
        });
    } 
    handleInputNewBarcode = (e) => {
        this.setState({
            newBarcode:e.target.value
        })
    }

    handleInputNewProduct = (e) => {
        this.setState({
            newProduct:e.target.value
        })
    }

    handleInputNewCostPrice = (e) => {
        this.setState({
            newcost_Price:e.target.value
        })
    }

    handleInputNewSellPrice = (e) => {
        this.setState({
            newselling_Price:e.target.value
        })
    }

    setSupplier =(e) => {
        this.setState({
            selectsupplier_Name:e.target.value
        })
    }

    setCategory =(e) => {
        this.setState({
            selectcategory_Name:e.target.value
        })
    }

    async todoSearchBarcode () {

        // let url = this.state.base_url + `Products/${this.state.searchBarcode}`;
        // let response = await fetch(url);
        // let productobject = await response.json();  
        let productobject= this.state.productslist[0];        
        // console.log(productobject);

        if(!productobject){
            this.setState({
                productobject:{},
                is_searchBarcode:false,
                is_wrongBarcode:true
            });
        }else {
            // productobject = productobject[0];
            productobject = this.state.productslist[0];
            productobject.edit = false;

            this.setState({
                productobject,
                searchBarcode:"",
                is_wrongBarcode:false,
                is_searchBarcode:true
            })	
        }
    }

    async saveChange() {

        let settings;
        let response;
        let url;
        let productslist = this.state.productslist;
        let is_dublicate = this.state.is_dublicate;

        if(this.state.is_delete){
            
            
            let currentDeleter = this.state.currentDeleter;

            url = this.state.base_url + `Products/${currentDeleter}`;
			settings = {
				method: "DELETE",
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',

					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
					'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
				},
				body: `${currentDeleter}`
			};
			
            response = await fetch(url,settings);

            this.setState({
                is_delete:false,
                is_searchBarcode:false,
                // category:"",
                // categoryobj:{},
                currentDeleter:""
            });

        }else if(this.state.is_edit) {

            // let editablecategory = [
            //     {
            //         company_Name: this.state.currentEDitCategory.name
            //     },
            //     {
            //         company_Name:this.state.currentCategory
            //     }];

            //     console.log(editablecategory);

            // url = this.state.base_url + 'Categories';
			// settings = {
			// 	method: "PUT",
			// 	headers: {
			// 		Accept: 'application/json',
			// 		'Content-Type': 'application/json',

			// 		'Access-Control-Allow-Origin': '*',
			// 		'Access-Control-Allow-Credentials': true,
			// 		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
			// 		'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
			// 	},
			// 	body: JSON.stringify(editablecategory)
			// };
			
            // response = await fetch(url,settings);

            // categoryobject.map(item => {
            //     if(item.index !== this.state.currentEDitCategory.index){
            //         return item;
            //     }
            //     if(this.state.currentCategory.trim() === ""){
            //         item.category_Name = this.state.currentEDitCategory.category_Name;
            //     }else {
            //         item.category_Name = this.state.currentCategory;
            //     }    
            //     if(this.state.currentParentCategory.trim() === ""){
            //         item.parent_Category = this.state.currentEDitCategory.parent_Category;
            //     }else {
            //         item.parent_Category = this.state.currentParentCategory;
            //     }         
            //     return item;
            // })

        }else if (this.state.is_add){

            let newProduct = {
                    Barcode: this.state.newBarcode,
                    Cost_Price:this.state.newcost_Price,
                    Selling_Price: this.state.newselling_Price,
                    Supplier_Name: this.state.selectsupplier_Name,
                    Name: this.state.newProduct,
                    Category_Name: this.state.selectcategory_Name
                }    
            url = this.state.base_url + 'Products';
            settings = {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
                    'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
                },
                body: JSON.stringify (newProduct)
            };                    
            response = await fetch(url,settings);        
            

            this.setState({
                addsituation:false,
                is_dublicate,
                productslist
            })
            
        }      
        
        
        // let categoryobj = this.state.categoryobj;

        // if(this.state.is_searchcategory){
        //     categoryobj.category_Name = this.state.currentCategory;
        //     categoryobj.parent_Category= this.state.currentParentCategory;

        // }

        this.setState({
            modal3: !this.state.modal3,
            productslist,
            // productobject,
            is_edit:false,
            is_add:false,
            is_dublicate:false,
            // currentCategory:"",
            // currentParentCategory:"",
            newBarcode:"",
            newProduct:"",
            newcost_Price:0,
            newselling_Price:0,
            selectsupplier_Name:"",
            selectcategory_Name:"",
            // currentEDitCategory:{category_Name:"",parent_Category:"",index:""}
        });
    }

    cancelChange = () =>{
        let productslist = this.state.productslist;
        let currentEDitProduct = this.state.currentEDitProduct;

        productslist.map(item => {
            if (item.index === currentEDitProduct.index) {
                item.barcode = currentEDitProduct.barcode;
                item.name = currentEDitProduct.name;
                item.cost_Price = currentEDitProduct.cost_Price;
                item.selling_Price = currentEDitProduct.selling_Price;
                item.supplier_Name = currentEDitProduct.supplier_Name;
                item.category_Name = currentEDitProduct.category_Name;
                
            }
            return item;
        })
        currentEDitProduct = {
                barcode:"",
                name:"",
                index:"",
                cost_Price:"",
                selling_Price:"",
                supplier_Name:"",
                category_Name:""
            };
        this.setState({
            productslist,
            modal3: !this.state.modal3,
            currentEDitProduct,
            is_delete:false,
            addsituation:true

        });
    }

    async plus() {

        let url1 =this.state.base_url + `Categories/`;			
        let response1 = await fetch(url1);
        let categoriesNames = await response1.json();

        let url2 =this.state.base_url + `Suppliers/`;			
        let response2 = await fetch(url2);
        let supplierNames = await response2.json();

        let productslist = this.state.productslist;
        categoriesNames = [...new Set(categoriesNames.map(item => item.category_Name))];
        supplierNames = [...new Set(supplierNames.map(item => item.company_Name))];
        
        // parentCategories = parentCategories.filter(item => {
        //     return item !== "-";
        // })
        this.setState({
            addsituation:true,
            is_dublicate:false,
            categoriesNames,
            supplierNames
        })
    }

    minus = () => {
        this.setState({
            addsituation:false,
            newBarcode:"",
            newProduct:"",
            newcost_Price:0,
            newselling_Price:0,
            selectsupplier_Name:"",
            selectcategory_Name:"",
            is_dublicate:false,
            is_fillallinfo:false
        })
    }

    async todoAdd () {       

        let is_dublicate = this.state.is_dublicate;
        let productslist = this.state.productslist;
        is_dublicate = productslist.some(item => {
            return item.barcode === this.state.newBarcode;
        })
        if(!is_dublicate ){
            this.setState({
                is_dublicate
            });
        }
        if(this.state.selectsupplier_Name !== "Choose..." && this.state.selectsupplier_Name !== "" &&
          this.state.selectcategory_Name !== "Choose..." && this.state.selectcategory_Name !== "" &&
          this.state.newBarcode.trim() !== "" && this.state.newProduct.trim() !== "") {

            this.setState({
                modal3: !this.state.modal3,
                is_add:true,
                is_fillallinfo:false
            }); 
        }else {
            this.setState({
                addsituation:true,
                is_dublicate,                
                is_fillallinfo:true
            })
        } 
    }

    todoDelete = (barcode) => {
        this.setState({
            modal3: !this.state.modal3,
            is_delete:true,
            currentDeleter:barcode
          });
    }

    todoEdit = (barcode) => {

        let productslist = this.state.productslist;
        let currentEDitProduct = this.state.currentEDitProduct;
        productslist.map(item => {
          if(item.barcode === barcode){

              item.edit = !item.edit;
              currentEDitProduct= {
                barcode:item.barcode,
                name:item.name,
                cost_Price:item.cost_Price,
                selling_Price:item.selling_Price,
                supplier_Name:item.supplier_Name,
                category_Name:item.category_Name,
                index:item.index}
          }
            return item;
        })

        this.setState({
            productslist,
            currentEDitProduct,
            currentEditer:barcode
            
        });
    }

    toggle = e => () => {
        this.setState({
          modal3: !this.state.modal3         
        });
    }

    render() {  
        let i = 0;    
        return(
            
            <div id="main" className="card-body card">
                 <div className = "search" id = "maininfo">
                    <div>
                        <FaFilter/>
                    </div>
                    <input 
                        type="text" 
                        placeholder = "Barcode"
                        value = {this.state.searchBarcode}
                        onChange = {this.handleInputSearchBarcode}
                    />
                    <button onClick = {this.todoSearchBarcode}>Search</button>
                </div>
                {
                this.state.is_wrongBarcode ?
                    <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                        Barcode is wrong!
                    </small>
                :
                    ""
                }
                <div  id="table" className="table-editable">

                    {
                        this.state.addsituation ?
                        <div id = "addnewvalues">
                            <div id = "FaMinus">
                                <span className="table-add float-right mb-3 mr-2">
                                    <a href="#" className="text-success">
                                    <FaMinus className = "minus" onClick = {this.minus}/>
                                    </a>
                                </span>
                            </div>
                            <div className="form-group">
                                <div className="form-group">
                                    <label htmlFor="inputPassword1">New Barcode</label>
                                    <input 
                                        type="text" 
                                        maxLength = "14"
                                        id="inputPassword1" 
                                        className="form-control" 
                                        aria-describedby="passwordHelpBlock"
                                        onChange = {this.handleInputNewBarcode}
                                        value = {this.state.newBarcode}
                                        placeholder = "Barcode"
                                    /> 
                                </div>
                                {
                                    this.state.is_dublicate ?
                                    <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                                    The Barcode already exists!
                                    </small>
                                    :
                                    ""
                                } 
                                <div className="form-group">
                                    <label htmlFor="inputPassword2">New Product</label>
                                    <input 
                                        type="text" 
                                        id="inputPassword2" 
                                        className="form-control" 
                                        aria-describedby="passwordHelpBlock"
                                        onChange = {this.handleInputNewProduct}
                                        value = {this.state.newProduct}
                                        placeholder = "Product"
                                    /> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword3">Cost Price</label>
                                    <input 
                                        type="number" 
                                        min = "0.00"
                                        step = "0.0001"
                                        id="inputPassword3" 
                                        className="form-control" 
                                        aria-describedby="passwordHelpBlock"
                                        onChange = {this.handleInputNewCostPrice}
                                        value = {this.state.newcost_Price}
                                        placeholder = "Cost Price"
                                    /> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword4">Selling Price</label>
                                    <input 
                                        type="number" 
                                        min = "0.00"
                                        step = "0.0001"
                                        id="inputPassword4" 
                                        className="form-control" 
                                        aria-describedby="passwordHelpBlock"
                                        onChange = {this.handleInputNewSellPrice}
                                        value = {this.state.newselling_Price}
                                        placeholder = "Selling Price"
                                    /> 
                                </div>
                                <div>
                                    <label htmlFor ="inlineFormCustomSelectPref">Supplier Name</label>
                                    <select 
                                        className="custom-select my-1 mr-sm-2" 
                                        id="inlineFormCustomSelectPref"
                                        onClick= {this.setSupplier}
                                    >
                                        <option selected disabled>Choose...</option>
                                        { 
                                            this.state.supplierNames.map(item => {
                                                {i++};
                                                return(
                                                    <option key = {i} value={item}>{item}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor ="inlineFormCustomSelectPref">Category Name</label>
                                    <select 
                                        className="custom-select my-1 mr-sm-2" 
                                        id="inlineFormCustomSelectPref"
                                        onClick= {this.setCategory}
                                    >
                                        <option selected disabled>Choose...</option>
                                        <option value="null"> - </option>
                                        { 
                                            this.state.categoriesNames.map(item => {
                                                {i++};
                                                return(
                                                    <option key = {i} value={item}>{item}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                
                            </div> 
                            {
                                this.state.is_fillallinfo ?
                                <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                                Input Fields Incomplete!
                                </small>
                                :
                                ""
                            }                            
                            <div>
                                <MDBBtn 
                                    color="primary" 
                                    onClick={this.todoAdd}
                                    >
                                        ADD
                                </MDBBtn> 
                            </div>
                        </div>
                        :
                        <span className="table-add float-right mb-3 mr-2">
                            <a href="#" className="text-success">
                            <FaPlus onClick = {this.plus}/>
                            </a>
                        </span>
                    }
                    { this.state.productslist.length > 0 ?
                    <table  className="table table-bordered table-responsive-md table-striped text-center">
                    <thead>
                        <tr>
                            <th className="text-center">Barcode</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Cost Price</th>
                            <th className="text-center">Selling Price</th>
                            <th className="text-center">Supplier</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody className = "mainlisthov">                        
                    { this.state.productslist.map(item=>{
                    
                            // console.log(item);
                            i++
                            return (
                                <tr key={i} >                                           
                                    <td className="pt-3-half">
                                        {item.barcode}
                                    </td>
                                    <td className="pt-3-half">
                                        {item.name}
                                    </td>
                                    <td className="pt-3-half">
                                        {item.cost_Price}
                                    </td>
                                    <td className="pt-3-half">
                                        {item.selling_Price}
                                    </td>
                                    <td className="pt-3-half">
                                        {item.supplier_Name}
                                    </td>                               
                                    <td className="pt-3-half">
                                        {item.category_Name}
                                    </td>
                                    {
                                        !item.edit ? 
                                        <td>
                                            <MDBBtn  color="primary" onClick ={(e) => {this.todoEdit(item.barcode)}} >
                                                <FaEdit className="editicon"/>
                                                Edit</MDBBtn>
                                        </td>
                                        :
                                        <td>
                                            <MDBBtn 
                                            color="primary" 
                                            onClick={(e) => {this.todoSave(item.index,e)}}
                                            >
                                                Save
                                            </MDBBtn>
                                        </td>
                                    }               
                                     <td>
                                        <MDBContainer>
                                            <MDBBtn  
                                                className = "deletebutton"
                                                color="primary" 
                                                onClick={(e)=>{
                                                    this.todoDelete(item.barcode);
                                                }}
                                            >
                                                <MdDeleteForever className = "deleteicon"/>
                                                Delete
                                            </MDBBtn>
                                            <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} size="sm">
                                                <MDBModalHeader toggle={this.toggle(3)}>Are you sure?</MDBModalHeader>
                                                <MDBModalBody>
                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <MDBBtn 
                                                        color="secondary" 
                                                        size="sm" 
                                                        onClick={() => {
                                                            this.cancelChange();                                                                
                                                        }}
                                                    >
                                                        Close
                                                    </MDBBtn>
                                                    <MDBBtn 
                                                        color="primary" 
                                                        size="sm" 
                                                        onClick={this.saveChange}
                                                    >
                                                        Save Changes
                                                    </MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>
                                        </MDBContainer>
                                    </td>                        
                                </tr>
                            );                              
                            
                        })
                    }
                    </tbody>
                    </table>
                    : 
                    <div>
                    </div>
                    }
                </div>
            </div>
            
        );
    }
}

export default TodoProducts;