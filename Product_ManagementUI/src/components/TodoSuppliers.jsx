import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever} from "react-icons/md";

import 'mdbreact/dist/css/mdb.css';

class TodoSuppliers extends React.Component {
    constructor(props){
		super(props);
		this.state = {		
            base_url:"http://localhost:51560/",	
            supplierobj:{},
            is_searchsupplier:false,
            supplier:"",       
            modal3: false,
            is_delete:false,
            is_edit:false,
            addsituation:false,
            is_dublicate:false,
            is_add:false,
            currentEditer:"",
            currentDeleter:"",
            inputNewSupplier:"",
            is_repeatsupplier:false,
            currentEDitSupplier:{name:"",index:""},
            supplierobject:[]
        };
        this.SupplierSearch = this.SupplierSearch.bind(this);
        this.handleSupplierChange = this.handleSupplierChange.bind(this);
        // this.handleSupplierChangeSingle = this.handleSupplierChangeSingle.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.todoSave = this.todoSave.bind(this);
        this.todoAdd = this.todoAdd.bind(this);
    }

    async componentDidMount() {

        let url =this.state.base_url + `Suppliers/`;			
        let response = await fetch(url);
        let supplierobject = await response.json();
        // let supplierobject = [{company_Name:"gsdgxdfg"},{company_Name:"koko"},{company_Name:"sfsfsf"},{company_Name:"BBBBBB"}]
        let i = 1;
        supplierobject.map(item => {
            item.edit = false;
            item.index = i;
            i++
            return item;
        })
        this.setState({
            supplierobject
        })
    }

    handleInputSupplier = (e) => {
		this.setState({
		  supplier:e.target.value
        });
    } 
    
    handleSupplierChange (index,e) {

        let is_repeatsupplier = this.state.is_repeatsupplier;
        this.setState({
            currentEditer:e.target.value
        })
    }

    handleSupplierChangeSingle =(e) => {
        this.setState({
            currentEditer:e.target.value
        })
    }

    handleInputNewSupplier = (e) => {
        this.setState({
            inputNewSupplier:e.target.value
        })
    }

    async SupplierSearch(){    
        let url = this.state.base_url + `Suppliers/${this.state.supplier}`;
        
        let response = await fetch(url);
        let supplierobj = await response.json();
        console.log(supplierobj);
        supplierobj = supplierobj[0];
        supplierobj.edit = false;

        this.setState({
            supplierobj,
            supplier:"",
            is_searchsupplier:true
        })		
    }

    todoSave(index,e) {

        let supplierobject = this.state.supplierobject;
        supplierobject.map(item => {
          if(item.index === index){
              item.edit = !item.edit;
          }
            return item;
        })
        this.setState({
            supplierobject,
            modal3: !this.state.modal3,
            is_edit:true
        });
    }

    todoSaveSingle = (e) => {
        let supplierobj = this.state.supplierobj;
        supplierobj.edit = !supplierobj.edit
       
        this.setState({
            supplierobj,
            modal3: !this.state.modal3,
            is_edit:true
        });
    }

    todoEdit = (company) => {

        let supplierobject = this.state.supplierobject;
        let currentEDitSupplier;
        supplierobject.map(item => {
          if(item.company_Name === company){
              console.log(item.company_Name)
              item.edit = !item.edit;
              currentEDitSupplier= {name:company,index:item.index}
          }
            return item;
        })
        this.setState({
            supplierobject,
            currentEDitSupplier,
            currentEditer:company
            
        });
    }
    
    todoEditSingle= (company) => {
        
        let supplierobj = this.state.supplierobj;
        supplierobj.edit = !supplierobj.edit;
        let currentEDitSupplier  = {name:company,index:""};
     
        this.setState({
            supplierobj,
            currentEDitSupplier,
            currentEditer:company
            
        });
    }

    todoDelete = (name) => {
        this.setState({
            modal3: !this.state.modal3,
            is_delete:true,
            currentDeleter:name
          });
    }

    cancelChange = () =>{
        let supplierobject = this.state.supplierobject;
        let currentEDitSupplier = this.state.currentEDitSupplier;

        supplierobject.map(item => {
            if (item.index === currentEDitSupplier.index) {
                item.company_Name = currentEDitSupplier.name;
            }
            return item;
        })
        currentEDitSupplier = {name:"",index:""};
        this.setState({
            supplierobject,
            modal3: !this.state.modal3,
            currentEDitSupplier,
            is_delete:false,
            addsituation:true

        });
    }

    cancelChangeSingle = () =>{

        let supplierobj = this.state.supplierobj;
        let currentEDitSupplier = this.state.currentEDitSupplier;
        supplierobj.company_Name = currentEDitSupplier.name;
        
        currentEDitSupplier = {name:"",index:""};
        this.setState({
            supplierobj,
            modal3: !this.state.modal3,
            currentEDitSupplier,
            is_delete:false,
            inputNewSupplier:""
        });
    }
    
   async saveChange() {

        let settings;
        let response;
        let url;
        let supplierobject = this.state.supplierobject;
        let supplierobj = this.state.supplierobj;
        let currentDeleter = this.state.currentDeleter;
        let is_dublicate = this.state.is_dublicate;

        if(this.state.is_delete){           

            url = this.state.base_url + `Suppliers?company_Name=${currentDeleter}`;
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
            
            supplierobject =  supplierobject.filter(item => {
                if (item.company_Name !== this.state.currentDeleter) {
                    return item;
                }
            })

            this.setState({
                is_delete:false,
                is_searchsupplier:false,
                supplier:"",
                supplierobject,
                supplierobj:{},
                currentDeleter:""
            });

        }else if(this.state.is_edit) {

            let suppobj = [
                {
                    company_Name: this.state.currentEDitSupplier.name
                },
                {
                    company_Name:this.state.currentEditer
                }];
            url = this.state.base_url + 'Suppliers';
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
				body: JSON.stringify(suppobj)
			};
			
            response = await fetch(url,settings);

            supplierobject.map(item => {

                if(item.index !== this.state.currentEDitSupplier.index){
                    return item;
                }
                if(this.state.currentEditer.trim() === ""){
                    item.company_Name = this.state.currentEDitSupplier.name;
                }else {
                    item.company_Name = this.state.currentEditer;
                }           
                return item;
            })
            
           
    
            if(this.state.is_searchsupplier){
                supplierobj.company_Name = this.state.currentEditer
            }

        }else if(this.state.is_add){

            console.log(this.state.inputNewSupplier)
            console.log( this.state.inputNewSupplier)
            
            let newsupplier = {company_Name: this.state.inputNewSupplier}    
            let url = this.state.base_url + 'Suppliers';
            let settings = {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
                    'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
                },
                body: JSON.stringify (newsupplier)
            };                    
            let response = await fetch(url,settings);
            newsupplier.edit = false;
            newsupplier.index = 1;  
            console.log( newsupplier);
            supplierobject.unshift(newsupplier); 
            console.log(supplierobject)

            this.setState({                    
                addsituation:false,
                is_dublicate,
                inputNewSupplier:"",
                supplierobject
            })            
        }
        

        this.setState({
            modal3: !this.state.modal3,
            supplierobject,
            supplierobj,
            is_edit:false,
            is_add:false,
            is_dublicate:false,
            currentEditer:"",
            currentEDitSupplier:{name:"",index:""}
        });
    }

    plus = () => {
        this.setState({
            addsituation:true,
            is_dublicate:false
        })
    }

    minus = () => {
        this.setState({
            addsituation:false,
            inputNewSupplier:"",
            is_dublicate:false
        })
    }

    async todoAdd () {

        let is_dublicate = this.state.is_dublicate;
        let supplierobject = this.state.supplierobject;
        is_dublicate = supplierobject.some(item => {
            return item.company_Name === this.state.inputNewSupplier;
        })
        if(!is_dublicate && this.state.inputNewSupplier.trim() !== ""){
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

    toggle = e => () => {
        this.setState({
          modal3: !this.state.modal3,
         
        });
    }
    
    render() {
        return(
            <div id="main" className="card-body card">
                <div className = "search" id = "maininfo">
                    <input 
                        type="text" 
                        placeholder = "Supplier"
                        onChange = {this.handleInputSupplier}
                        />
                    <button onClick = {this.SupplierSearch}>Search</button>
                </div>
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
                                <label for="inputPassword5">Supplier</label>
                                <input 
                                    type="text" 
                                    id="inputPassword5" 
                                    className="form-control" 
                                    aria-describedby="passwordHelpBlock"
                                    onChange = {(e)=> {this.handleInputNewSupplier(e)}}
                                    value = {this.state.inputNewSupplier}
                                    placeholder = "Supplier"
                                /> 
                            </div>
                            {
                                this.state.is_dublicate ?
                                <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                                    The Supplier name already exists!
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
                        this.state.is_searchsupplier ?

                        <table className="table table-bordered table-responsive-md table-striped text-center">
                                
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Supplier Name</th>
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
                                    !this.state.supplierobj.edit ? 
                                    <td className="pt-3-half">
                                        {this.state.supplierobj.company_Name}
                                    </td> 
                                    :
                                    <td className="pt-3-half" >
                                        {
                                            this.state.is_repeatsupplier ?
                                            <input 
                                                type="text" 
                                                value =  {this.state.currentEditer} 
                                                className="edited repeatsupp" 
                                                onChange = {(e) => {this.handleSupplierChangeSingle(e)}}  

                                            />
                                        :
                                            <input 
                                                type="text" 
                                                value =  {this.state.currentEditer} 
                                                className="edited" 
                                                onChange = {(e) => {this.handleSupplierChangeSingle(e)}}  
                                                />
                                        }
                                        
                                    </td>
                                }
                                {
                                    !this.state.supplierobj.edit ? 
                                    <td>
                                        <MDBBtn  color="primary" onClick ={(e) => {this.todoEditSingle(this.state.supplierobj.company_Name)}} >
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
                                                this.todoDelete(this.state.supplierobj.company_Name);
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
                    
                        this.state.supplierobject.length > 0 ?
                           <table className="table table-bordered table-responsive-md table-striped text-center">
                                
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Supplier Name</th>
                                    <th className="text-center">Edit</th>
                                    <th className="text-center">Remove</th>
                                </tr>
                            </thead>
                            <tbody className = "mainlisthov">
                            { 
                                this.state.supplierobject.map(item=>{
                                   
                                    return (
                                        <tr key={item.company_Name} >
                                            <td>
                                                {item.index}
                                            </td>
                                            {
                                                !item.edit ? 
                                                <td className="pt-3-half">
                                                    {item.company_Name}
                                                </td> 
                                                :
                                                <td className="pt-3-half" >
                                                   {
                                                       this.state.is_repeatsupplier ?
                                                        <input 
                                                            type="text" 
                                                            value =  {this.state.currentEditer} 
                                                            className="edited repeatsupp" 
                                                            onChange = {(e) => {this.handleSupplierChange(item.index,e)}}  

                                                        />
                                                   :
                                                        <input 
                                                            type="text" 
                                                            value =  {this.state.currentEditer} 
                                                            className="edited" 
                                                            onChange = {(e) => {this.handleSupplierChange(item.index,e)}}  
                                                         />
                                                   }
                                                   
                                                </td>
                                            }
                                            {
                                                !item.edit ? 
                                                <td>
                                                    <MDBBtn  color="primary" onClick ={(e) => {this.todoEdit(item.company_Name)}} >
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
                                                            this.todoDelete(item.company_Name);
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

export default TodoSuppliers;