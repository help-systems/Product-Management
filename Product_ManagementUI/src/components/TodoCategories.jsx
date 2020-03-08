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
            is_edit:false,
            is_add:false,
            is_wrongcategory:false,
            is_dublicate:false,
            inputNewCategory:"",
            parentCategories:[],
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
        // this.handleCategoryChangeSingle = this.handleCategoryChangeSingle.bind(this);
        // this.handleParentCategoryChangeSingle = this.handleParentCategoryChangeSingle.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.todoAdd = this.todoAdd.bind(this);
    }

    async componentDidMount() {

        // let url =this.state.base_url + `Categories/`;			
        // let response = await fetch(url);
        // let categoryobject = await response.json();
        let categoryobject = [{parent_Category:null,category_Name:"wine"},{parent_Category:"wine",category_Name:"aaa"},{parent_Category:"sfsfsf",category_Name:"bbb"},{parent_Category:"BBBBBB",category_Name:"ccc"}]
        categoryobject.map(item => {
            if(item.parent_Category === null) {
                item.parent_Category = "-";
            }
            for (let i = 0; i < categoryobject.length; i++) {
                if(item.category_Name === categoryobject[i].parent_Category){
                    item.is_editable = false;
                    break;
                }
                item.is_editable = true;
            }

            item.edit = false;
            item.index = categoryobject.indexOf(item) + 1;
            return item;
        })

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

    handleCategoryChangeSingle = (e) => {
        this.setState({
            currentCategory:e.target.value
        })
    }

    handleParentCategoryChangeSingle = (e) =>{

        this.setState({
            currentParentCategory:e.target.value
        })
    }
    
    handleInputNewCategory = (e) => {
        this.setState({
            inputNewCategory:e.target.value
        })
    }
    
    async CategorySearch(){    
        
        if(this.state.category.trim()!==""){
            let url = this.state.base_url + `Categories/${this.state.category}`;
            
            let response = await fetch(url);
            let categoryobj = await response.json();  
            // let categoryobj= this.state.categoryobject[0];        
            console.log(categoryobj);

            if(!categoryobj){
                this.setState({
                    categoryobj:{},
                    is_searchcategory:false,
                    is_dublicate:false,
                    is_wrongcategory:true,
                });
            }else {
                categoryobj = categoryobj[0];
                categoryobj.edit = false;

                this.setState({
                    categoryobj,
                    category:"",
                    is_wrongcategory:false,
                    is_searchcategory:true,
                    is_dublicate:false
                })	
            }	
        }
        else{
            this.setState({
                categoryobj:{},
                is_searchcategory:false,
                is_dublicate:false
            });
        }	
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
        let categoryobject = this.state.categoryobject;
        let is_dublicate = this.state.is_dublicate;

        if(this.state.is_delete){
            
            
            let currentDeleter = this.state.currentDeleter;

            url = this.state.base_url + `Categories/${currentDeleter}`;
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
            
            categoryobject =  categoryobject.filter(item => {
                if (item.category_Name !== currentDeleter) {
                    return item;
                }
            })
            console.log(categoryobject)  

            this.setState({
                is_delete:false,
                is_searchcategory:false,
                category:"",
                categoryobject:categoryobject,
                categoryobj:{},
                currentDeleter:""
            });

        }else if(this.state.is_edit) {

            let editablecategory = [
                {
                    company_Name: this.state.currentEDitCategory.name
                },
                {
                    company_Name:this.state.currentCategory
                }];

                console.log(editablecategory);

            url = this.state.base_url + 'Categories';
			settings = {
				method: "PUT",
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',

					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
					'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
				},
				body: JSON.stringify(editablecategory)
			};
			
            response = await fetch(url,settings);

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

        }else if (this.state.is_add){

            let newcategory = {category_Name: this.state.inputNewCategory,parent_Category:this.state.selectParentCategory}    
            url = this.state.base_url + 'Categories';
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
                body: JSON.stringify (newcategory)
            };                    
            response = await fetch(url,settings);

            if(newcategory.parent_Category === "null"){
                newcategory.parent_Category = "-";
            }
            newcategory.edit = false;
            newcategory.index = 0;
            categoryobject.unshift(newcategory); 
           
            categoryobject.map(item => {
                item.index++;
                for (let i = 0; i < categoryobject.length; i++) {
                    if(item.category_Name === categoryobject[i].parent_Category){
                        item.is_editable = false;
                        break;
                    }
                    item.is_editable = true;
                }
                return item;
            })

            this.setState({
                addsituation:false,
                is_dublicate,
                categoryobject
            })
            
        }      
        
        
        let categoryobj = this.state.categoryobj;

        if(this.state.is_searchcategory){
            categoryobj.category_Name = this.state.currentCategory;
            categoryobj.parent_Category= this.state.currentParentCategory;

        }

        this.setState({
            modal3: !this.state.modal3,
            categoryobject,
            categoryobj,
            is_edit:false,
            is_add:false,
            is_dublicate:false,
            currentCategory:"",
            currentParentCategory:"",
            inputNewCategory:"",
            currentEDitCategory:{category_Name:"",parent_Category:"",index:""}
        });
    }


    plus = () => {
        let categoryobject = this.state.categoryobject;
        let parentCategories = [...new Set(categoryobject.map(item => item.category_Name))];
        console.log(parentCategories)
        parentCategories = parentCategories.filter(item => {
            return item !== "-";
        })
        this.setState({
            addsituation:true,
            is_dublicate:false,
            parentCategories
        })
    }

    minus = () => {
        this.setState({
            addsituation:false,
            inputNewCategory:"",
            selectParentCategory:"",
            is_dublicate:false
        })
    }

    async todoAdd () {       

        let is_dublicate = this.state.is_dublicate;
        let categoryobject = this.state.categoryobject;
        is_dublicate = categoryobject.some(item => {
            return item.category_Name === this.state.inputNewCategory;
        })
        if(!is_dublicate && 
          this.state.selectParentCategory !== "Choose..." && this.state.selectParentCategory !== "" &&
          this.state.inputNewCategory.trim() !== "") {

            this.setState({
                modal3: !this.state.modal3,
                is_add:true,
                is_dublicate
            }); 
        }else {
            this.setState({
                addsituation:true,
                is_dublicate:true
            })
        } 
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
                        value = {this.state.category}
                        onChange = {this.handleInputCategory}
                    />
                    <button onClick = {this.CategorySearch}>Search</button>
                </div>
            {
                this.state.is_wrongcategory ?
                    <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                        Category name is wrong!
                    </small>
                :
                    ""
            }
            <div id="table" className="table-editable">
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
                        <td className="pt-3-half">
                            {this.state.categoryobj.parent_Category}
                        </td> 
                        { !this.state.categoryobj.edit ? 
                            <td className="pt-3-half">
                                {this.state.categoryobj.category_Name}
                            </td>                             
                            :
                            
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
                <table key = "allcategory " className="table table-bordered table-responsive-md table-striped text-center">                        
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Parent Category</th>
                            <th className="text-center">Category Name</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody key = "allcategory_body" className = "mainlisthov">
                    { 
                        this.state.categoryobject.map(item=>{
                        
                            return (
                                <tr key={item.index} >
                                    <td>
                                        {item.index}
                                    </td>
                                        <td className="pt-3-half">
                                            {item.parent_Category}
                                        </td> 
                                        {!item.edit ? 
                                        <td className="pt-3-half">
                                            {item.category_Name}
                                        </td> 
                                       
                                        : 
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
                                    
                                    }
                                    {
                                        item.is_editable ?
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
                                        
                                        :

                                        <td>
                                            <MDBBtn  color="primary">
                                                <FaEdit className="editicon"/>
                                                Not Editable
                                            </MDBBtn>
                                        </td>
                                        
                                    }
                                    {
                                        item.is_editable ?
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
                                        :
                                        <td>
                                            <MDBBtn  color="primary" className = "deletebutton">
                                                <FaEdit className="editicon"/>
                                                Not Deletable
                                            </MDBBtn>
                                        </td>
                                    }
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