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

            // category:"",       
            // modal3: false,
            // is_delete:false,
            // is_edit:false,
            // is_add:false,            
            // is_dublicate:false,
            // inputNewCategory:"",
            // parentCategories:[],
            // currentCategory:"",
            // selectParentCategory:"",
            // currentParentCategory:"",
            // currentDeleter:"",
            // is_repeatcategory:false,
            // currentEDitCategory:{category_Name:"",parent_Category:"",index:""}
            
        };
        this.todoSearchBarcode = this.todoSearchBarcode.bind(this);
        this.plus = this.plus.bind(this);
        // this.handleCategoryChange = this.handleCategoryChange.bind(this);
        // this.handleParentCategoryChange = this.handleParentCategoryChange.bind(this);
        // // this.handleCategoryChangeSingle = this.handleCategoryChangeSingle.bind(this);
        // // this.handleParentCategoryChangeSingle = this.handleParentCategoryChangeSingle.bind(this);
        // this.saveChange = this.saveChange.bind(this);
        // this.todoAdd = this.todoAdd.bind(this);
    }

    async componentDidMount() {

        // let url =this.state.base_url + `Products/`;			
        // let response = await fetch(url);
        // let productlist = await response.json();
        let productslist = [
            { barcode:"2222",
             name:"product1",
             cost_Price:222,
             selling_Price:444,
             supplier_Name:"FFFF",
             category_Name:"aaa"},
             {
             barcode:"888",
             name:"product2",
             cost_Price:222,
             selling_Price:444,
             supplier_Name:"FFFF",
             category_Name:"aaa"},
             { barcode:"22242",
                name:"product3",
                cost_Price:222,
                selling_Price:444,
                supplier_Name:"kkk",
                category_Name:"aaa"
            }
            ]
            productslist.map(item => {
                item.edit = false;
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

    async todoSearchBarcode () {

        // let url = this.state.base_url + `Products/${this.state.searchBarcode}`;
        // let response = await fetch(url);
        // let productobject = await response.json();  
        let productobject= this.state.productslist[0];        
        console.log(productobject);

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
            is_dublicate:false
        })
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
                                <label htmlFor ="inlineFormCustomSelectPref">Parent Category</label>
                                <select 
                                    className="custom-select my-1 mr-sm-2" 
                                    id="inlineFormCustomSelectPref"
                                    onClick= {this.setCategory}
                                >
                                    <option selected disabled>Choose...</option>
                                    <option value="null"> - </option>
                                    { 
                                        this.state.parentCategories.map(item => {
                                            {i++};
                                            return(
                                                <option key = {i} value={item}>{item}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword5">Category</label>
                                <input 
                                    type="text" 
                                    id="inputPassword5" 
                                    className="form-control" 
                                    aria-describedby="passwordHelpBlock"
                                    onChange = {this.handleInputNewCategory}
                                    value = {this.state.inputNewCategory}
                                    placeholder = "Category"
                                /> 
                            </div>
                            {
                                this.state.is_dublicate ?
                                <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                                    Your must choose Parent Category or the Category name already exists!
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
                    <table  className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Barcode</th>
                            <th scope="col">Name</th>
                            <th scope="col">Cost Price</th>
                            <th scope="col">Selling Price</th>
                            <th scope="col">Supplier</th>
                            <th scope="col">Category</th>
                        </tr>
                    </thead>
                    <tbody className = "mainlisthov">                        
                    { this.state.productslist.map(item=>{
                    
                            console.log(item);
                            i++
                            return (
                                <tr key={i} >                                           
                                    <td>
                                        {item.barcode}
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.cost_Price}
                                    </td>
                                    <td>
                                        {item.selling_Price}
                                    </td>
                                    <td>
                                        {item.supplier_Name}
                                    </td>                               
                                    <td>
                                        {item.category_Name}
                                    </td>
                                    <button>Edit</button>               
                                    <button>Delete</button>                         
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