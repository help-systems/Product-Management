import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever} from "react-icons/md";
import { FaFilter } from 'react-icons/fa';

class TodoCategories extends React.Component {

    constructor(props){
		super(props);
		this.state = {		
            base_url:"http://localhost:51560/",	
            categoryobject:[],
            categoryobj:{},
            is_searchcategory:false,
            category:"",       
            modal3: false,
            is_delete:false,
            is_edit:true,
            inputNewCategory:"",
            addsituation:false,
            currentCategory:"",
            selectParentCategory:"",
            currentParentCategory:"",
            currentDeleter:"",
            is_repeatcategory:false,
            currentEDitCategory:{category_Name:"",parent_Category:"",index:""},
            
        };
        this.CategorySearch = this.CategorySearch.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleParentCategoryChange = this.handleParentCategoryChange.bind(this);
        this.handleCategoryChangeSingle = this.handleCategoryChangeSingle.bind(this);
        this.handleParentCategoryChangeSingle = this.handleParentCategoryChangeSingle.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

    async componentDidMount() {

        // let url =this.state.base_url + `Categories/Get/`;			
        // let response = await fetch(url);
        // let categoryobject = await response.json();
        let categoryobject = [{parent_Category:"gsdgxdfg",category_Name:"wine"},{parent_Category:"koko",category_Name:"aaa"},{parent_Category:"sfsfsf",category_Name:"bbb"},{parent_Category:"BBBBBB",category_Name:"ccc"}]
        let i = 1;
        categoryobject.map(item => {
            item.edit = false;
            item.index = i;
            i++
            return item;
        })
        console.log(categoryobject)
        this.setState({
            categoryobject
        })
    }

    handleInputCategory = (e) => {
		this.setState({
		  category:e.target.value
        });
    } 

    handleCategoryChange (index,e) {

        let is_repeatcategory = this.state.is_repeatcategory;
        this.setState({
            currentCategory:e.target.value
        })
    }

    handleParentCategoryChange (index,e) {

        let is_repeatcategory = this.state.is_repeatcategory;
        this.setState({
            currentParentCategory:e.target.value
        })
    }

    handleCategoryChangeSingle(e){
        this.setState({
            currentCategory:e.target.value
        })
    }

    handleParentCategoryChangeSingle(e){

        this.setState({
            currentParentCategory:e.target.value
        })
    }

    async CategorySearch(){    
        let url = this.state.base_url + `Category/GetByName/${this.state.category}`;//poxel
        
        let response = await fetch(url);
        let categoryobj = await response.json();
        categoryobj = categoryobj[0];
        console.log(categoryobj);
        categoryobj.edit = false;

        this.setState({
            categoryobj,
            category:"",
            is_searchCategory:true
        })		
    }

    todoSave(index,e) {

        let categoryobject = this.state.categoryobject;
        categoryobject.map(item => {
          if(item.index === index){
              item.edit = !item.edit;
          }
            return item;
        })
        this.setState({
            categoryobject,
            modal3: !this.state.modal3,
            is_edit:true
        });
    }

    todoSaveSingle = (e) => {
        let categoryobj = this.state.categoryobj;
        categoryobj.edit = !categoryobj.edit
       
        this.setState({
            categoryobj,
            modal3: !this.state.modal3,
            is_edit:true
        });
    }

    todoEdit = (category,parentCategory) => {

        let categoryobject = this.state.categoryobject;
        let currentEDitCategory;
        categoryobject.map(item => {
          if(item.category_Name === category){
              console.log(item.category_Name)
              item.edit = !item.edit;
              currentEDitCategory= {
                category_Name:category,
                parent_Category:parentCategory,
                index:item.index
            }
          }
            return item;
        })
        this.setState({
            categoryobject,
            currentEDitCategory,
            currentCategory:category,
            currentParentCategory:parentCategory
            
        });
    }

    todoEditSingle= (category,parentCategory) => {
        
        let categoryobj = this.state.categoryobj;
        categoryobj.edit = !categoryobj.edit;
        let currentEDitCategory= {
            category_Name:category,
            parent_Category:parentCategory,
            index:""
        }
        this.setState({
            categoryobj,
            currentEDitCategory,
            currentCategory:category,
            currentParentCategory:parentCategory
            
        });
    }

    todoDelete = (category) => {
        this.setState({
            modal3: !this.state.modal3,
            is_delete:true,
            currentDeleter:category
          });
    }

    cancelChange = () =>{
        let categoryobject = this.state.categoryobject;
        let currentEDitCategory = this.state.currentEDitCategory;

        categoryobject.map(item => {
            if (item.index === currentEDitCategory.index) {
                item.category_Name = currentEDitCategory.category_Name;
                item.parent_Category = currentEDitCategory.parent_Category;

            }
            return item;
        })
        currentEDitCategory = {
            category_Name:"",
            parent_Category:"",
            index:""
        };
        this.setState({
            categoryobject,
            modal3: !this.state.modal3,
            currentEDitCategory,
            is_delete:false
        });
    }

    cancelChangeSingle = () =>{

        let categoryobj = this.state.categoryobj;
        let currentEDitCategory = this.state.currentEDitCategory;
        categoryobj.category_Name = currentEDitCategory.category_Name;
        categoryobj.parent_Category = currentEDitCategory.parent_Category;
        
        currentEDitCategory = {
            category_Name:"",
            parent_Category:"",
            index:""
        };
        this.setState({
            categoryobj,
            modal3: !this.state.modal3,
            currentEDitCategory,
            is_delete:false
        });
    }

    async saveChange() {

        let settings;
        let response;
        let url;

        if(this.state.is_delete){
            let categoryobject = this.state.categoryobject;
            let currentDeleter = this.state.currentDeleter;

            // url = this.state.base_url + `Suppliers?company_Name=${currentDeleter}`;///poxel
			// settings = {
			// 	method: "DELETE",
			// 	headers: {
			// 		Accept: 'application/json',
			// 		'Content-Type': 'application/json',

			// 		'Access-Control-Allow-Origin': '*',
			// 		'Access-Control-Allow-Credentials': true,
			// 		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
			// 		'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
			// 	},
			// 	body: `${currentDeleter}`
			// };
			
            // response = await fetch(url,settings);
            
            categoryobject =  categoryobject.filter(item => {
                if (item.category_Name !== this.state.currentDeleter) {
                    return item;
                }
            })
            console.log(categoryobject)

            // let categoryobj = this.state.categoryobj;

            // if(this.state.is_searchcategory){
            //     categoryobj.company_Name = this.state.currentCategory
            // }

            this.setState({
                is_delete:false,
                is_searchcategory:false,
                category:"",
                categoryobject,
                categoryobj:{},
                currentDeleter:""
            });
        }else if(this.state.is_edit) {
            // let suppobj = [
            //     {
            //         company_Name: this.state.currentEDitCategory.name
            //     },
            //     {
            //         company_Name:this.state.currentCategory
            //     }]

            //     console.log(suppobj);

            // url = this.state.base_url + 'Suppliers';
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
			// 	body: JSON.stringify(suppobj)
			// };
			
            // response = await fetch(url,settings);

        }

        let categoryobject = this.state.categoryobject;

        categoryobject.map(item => {
            if(item.index !== this.state.currentEDitCategory.index){
                return item;
            }
            if(this.state.currentCategory.trim() === ""){
                item.category_Name = this.state.currentEDitCategory.category_Name;
            }else {
                item.category_Name = this.state.currentCategory;
            }    
            if(this.state.currentParentCategory.trim() === ""){
                item.parent_Category = this.state.currentEDitCategory.parent_Category;
            }else {
                item.parent_Category = this.state.currentParentCategory;
            }         
            return item;
        })
        
        let categoryobj = this.state.categoryobj;

        if(this.state.is_searchcategory){
            categoryobj.category_Name = this.state.currentCategory;
            categoryobj.parent_Category= this.state.currentParentCategory;

        }

        this.setState({
            modal3: !this.state.modal3,
            categoryobject,
            categoryobj,
            is_edit:false
        });
    }


    plus = () => {
        this.setState({
            addsituation:true
        })
    }

    minus = () => {
        this.setState({
            addsituation:false,
            inputNewCategory:"",
            selectParentCategory:""
        })
    }
    async todoAdd () {

        if(this.state.inputNewCategory.trim() !== "" && this.state.selectParentCategory !== "Select Parent" ||this.state.selectParentCategory !== "" ){

            // let url = this.state.base_url + `Search/Search/${JSON.stringify ()}`;
            // 	let settings = {
            // 		method: "POST",
            // 		headers: {
            // 			Accept: 'application/json',
            // 			'Content-Type': 'application/json',

            // 			'Access-Control-Allow-Origin': '*',
            // 			'Access-Control-Allow-Credentials': true,
            // 			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
            // 			'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
            // 		},
            // 		body: `${}`
            // 	};
                
            // 	let response = await fetch(url,settings);
            // 	let maindata = await response.json();

        }

        
        this.setState({
            addsituation:false,
            inputNewCategory:"",
            selectParentCategory:""
        })
    }

    setCategory = (e) => {
        this.setState({
            selectParentCategory:e.target.value
        })
    }

    toggle = e => () => {
        this.setState({
          modal3: !this.state.modal3,
         
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
                    placeholder = "Category"
                    onChange = {this.handleInputCategory}
                    />
                <button onClick = {this.CategorySearch}>Search</button>
            </div>
            <div id="table" className="table-editable">
            {
                this.state.addsituation ?
                <div>
                    <span className="table-add float-right mb-3 mr-2">
                        <a href="#" className="text-success">
                        <FaMinus className = "minus" onClick = {this.minus}/>
                        </a>
                    </span>
                    <table className="table table-bordered table-responsive-md table-striped text-center">
                        <thead>
                            <tr>
                                <th className="text-center">Parent Category</th>
                                <th className="text-center">New Category Name</th>
                            </tr>
                        </thead>
                        <tbody className = "mainlisthov">
                            <tr>
                                <td>
                                    <select name="" id="" onClick= {this.setCategory}>
                                    <option selected disabled >
                                        Select Parent
                                    </option >
                                    <option value="null"> - </option>
                                        { 
                                            this.state.categoryobject.map(item => {
                                                {i++};
                                                return(
                                                   <option key = {i} value={item.parent_Category}>{item.parent_Category}</option>
                                                );
                                            })
                                        }
                                        
                                    </select>
                                </td>
                                <td>
                                    <input 
                                    type="text"                                    
                                    onChange = {(e)=> {this.handleInputNewCategory(e)}}
                                    value = {this.state.inputNewCategory}    
                                />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button  onClick = {this.todoAdd}>ADD</button>
                    </div>
                </div>
                :
                <span className="table-add float-right mb-3 mr-2">
                    <a href="#" className="text-success">
                    <FaPlus onClick = {this.plus}/>
                    </a>
                </span>

            }
            {
                
                this.state.is_searchcategory?

                <table className="table table-bordered table-responsive-md table-striped text-center">
                        
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Parent Category</th>
                            <th className="text-center">Categori Name</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody className = "mainlisthov">
                {
                    <tr>
                        <td>
                            #
                        </td>
                        {
                            !this.state.categoryobj.edit ? 
                            <>
                            <td className="pt-3-half">
                                {this.state.categoryobj.parent_Category}
                            </td> 
                            <td className="pt-3-half">
                                {this.state.categoryobj.category_Name}
                            </td> 
                            </>
                            :
                            <>
                            <td className="pt-3-half" >
                                <input 
                                    type="text" 
                                    value =  {this.state.currentParentCategory} 
                                    className="edited" 
                                    onChange = {(e) => {this.handleParentCategoryChangeSingle(e)}}  
                                />
                            </td>
                            <td className="pt-3-half" >
                            {
                                this.state.is_repeatcategory ?
                                <input 
                                    type="text" 
                                    value =  {this.state.currentCategory} 
                                    className="edited repeatsupp" 
                                    onChange = {(e) => {this.handleCategoryChangeSingle(e)}}  

                                />
                            :
                                <input 
                                    type="text" 
                                    value =  {this.state.currentCategory} 
                                    className="edited" 
                                    onChange = {(e) => {this.handleCategoryChangeSingle(e)}}  
                                    />
                            }
                            
                        </td>
                        </>
                        }
                        {
                            !this.state.categoryobj.edit ? 
                            <td>
                                <MDBBtn  color="primary" onClick ={(e) => {this.todoEditSingle(this.state.categoryobj.category_Name,this.state.categoryobj.parent_ategory)}} >
                                    <FaEdit className="editicon"/>
                                    Edit</MDBBtn>
                            </td>
                            :
                            <td>
                                <MDBBtn 
                                color="primary" 
                                onClick={(e) => {this.todoSaveSingle(e)}}
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
                                        this.todoDelete(this.state.categoryobj.category_Name);
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
                                                this.cancelChangeSingle();                                                                
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
                    
                }
                </tbody>
                </table>

                :          

                this.state.categoryobject.length > 0 ?
                   <table className="table table-bordered table-responsive-md table-striped text-center">                        
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Parent Category</th>
                            <th className="text-center">Category Name</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody className = "mainlisthov">
                    { 
                        this.state.categoryobject.map(item=>{
                           
                            return (
                                <tr key={item.index} >
                                    <td>
                                        {item.index}
                                    </td>
                                    {
                                        !item.edit ? 
                                        <>
                                            <td className="pt-3-half">
                                                {item.parent_Category}
                                            </td> 
                                            <td className="pt-3-half">
                                                {item.category_Name}
                                            </td> 
                                        </>
                                        :
                                        <>
                                            <td className="pt-3-half" >                                           
                                                <input 
                                                    type="text" 
                                                    value =  {this.state.currentParentCategory} 
                                                    className="edited" 
                                                    onChange = {(e) => {this.handleParentCategoryChange(item.index,e)}}  
                                                />                                         
                                            </td>
                                            <td className="pt-3-half" >
                                            {
                                                this.state.is_repeatcategory ?
                                                    <input 
                                                        type="text" 
                                                        value =  {this.state.currentCategory} 
                                                        className="edited repeatsupp" 
                                                        onChange = {(e) => {this.handleCategoryChange(item.index,e)}}  

                                                    />
                                            :
                                                    <input 
                                                        type="text" 
                                                        value =  {this.state.currentCategory} 
                                                        className="edited" 
                                                        onChange = {(e) => {this.handleCategoryChange(item.index,e)}}  
                                                    />
                                            }
                                            </td>
                                        </>
                                    }
                                    {
                                        !item.edit ? 
                                        <td>
                                            <MDBBtn  color="primary" onClick ={(e) => {this.todoEdit(item.category_Name,item.parent_Category)}} >
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
                                                    this.todoDelete(item.category_Name);
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

export default TodoCategories;