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
            supplierobj:false,
            is_searchsupplier:false,
            supplier:"",       
            modal3: false,
            is_delete:false,
            is_edit:false,
            addsituation:false,
            is_dublicate:false,
            is_wrongsupplier:false,
            is_add:false,
            currentEditer:"",
            currentDeleter:"",
            inputNewSupplier:"",
            is_repeatsupplier:false,
            currentEDitSupplier:{name:"",index:""},
            supplierslist:[]
        };
        this.SupplierSearch = this.SupplierSearch.bind(this);
        this.handleSupplierChange = this.handleSupplierChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.todoSave = this.todoSave.bind(this);
        this.todoAdd = this.todoAdd.bind(this);
    }

    async componentDidMount() {

        let url =this.state.base_url + `Suppliers/`;			
        let response = await fetch(url);
        let supplierslist = await response.json();
        
        supplierslist.map(item => {
            item.edit = false;
            item.index = supplierslist.indexOf(item) + 1;
            return item;
        })
        this.setState({
            supplierslist
        })
    }

    async componentDidUpdate() {

        let url =this.state.base_url + `Suppliers/`;			
        let response = await fetch(url);
        let suppliernewobject = await response.json();
        
        suppliernewobject.map(item => {
            this.state.currentEDitSupplier.name === item.company_Name ?              
            item.edit = true : item.edit = false
            item.index = suppliernewobject.indexOf(item) + 1;
            return item;
        })
        
        if(JSON.stringify(suppliernewobject) !== JSON.stringify(this.state.supplierslist)){
            this.setState({
                supplierslist:suppliernewobject
            })
        }
    }

    handleInputSupplier = (e) => {
		this.setState({
		  supplier:e.target.value
        });
    } 
    
    handleSupplierChange (e) {

        let is_repeatsupplier = false;
        let supplierslist = this.state.supplierslist;
        supplierslist.map(item => {
            if(e.target.value === item.company_Name){
                is_repeatsupplier = true;
            }
            return item;
        })
        this.setState({
            currentEditer:e.target.value,
            is_repeatsupplier
        })
    }

    handleInputNewSupplier = (e) => {
        this.setState({
            inputNewSupplier:e.target.value
        })
    }

    async SupplierSearch(){

        if(this.state.supplier.trim() !== ""){

            let url = this.state.base_url + `Suppliers/${this.state.supplier}`;            
            let response = await fetch(url);
            let supplierobj = await response.json();          
                        
            if(!supplierobj){
                this.setState({
                    supplierobj:false,
                    is_searchsupplier:false,
                    is_dublicate:false,
                    is_wrongsupplier:true,
                });
            }else {

                supplierobj = this.state.supplierslist.filter(item => {
                    return item.company_Name === supplierobj[0].company_Name
                    // return item.company_Name === this.state.supplier;
                })

                this.setState({
                    supplierobj,
                    is_wrongsupplier:false,
                    supplier:"",
                    is_searchsupplier:true,
                    is_dublicate:false
                })
                console.log(this.state.supplierobj); 
            }	
        }else{
            this.setState({
                supplierobj:false,
                is_searchsupplier:false,
                is_dublicate:false
            });
        }
        console.log(this.state.supplierobj); 
    }

    todoSave(index) {
        if(!this.state.is_repeatsupplier){
            let supplierslist = this.state.supplierslist;
            supplierslist.map(item => {
            if(item.index === index){
                item.edit = !item.edit;
            }
                return item;
            })
            this.setState({
                supplierslist,
                modal3: !this.state.modal3,
                is_edit:true
            });
        }
        
    }

    todoEdit = (company) => {

        console.log(company)
        let supplierslist = this.state.supplierslist;
        let currentEDitSupplier;
        let supplierobj = this.state.supplierobj
        
        if(this.state.is_searchsupplier){
            supplierobj[0].edit = true;
            currentEDitSupplier= {name:company,index:supplierobj[0].index}
        }else{
            supplierslist.map(item => {
                if(item.company_Name === company){
                    item.edit = !item.edit;
                    currentEDitSupplier= {name:company,index:item.index}
                }
                  return item;
              })
        }        
        
        this.setState({
            supplierslist,
            supplierobj,
            currentEDitSupplier,
            currentEditer:company
            
        });
    }

    todoDelete = (name) => {
        this.setState({
            modal3: !this.state.modal3,
            is_delete:true,
            currentDeleter:name,
            currentEDitSupplier:{name,index:""}
          });
    }

    cancelChange = () =>{

        let supplierslist = this.state.supplierslist;
        let supplierobj = this.state.supplierobj;
        let currentEDitSupplier = this.state.currentEDitSupplier;

        if(this.state.is_searchsupplier){
            console.log(currentEDitSupplier)
            supplierobj[0].company_Name = this.state.currentEDitSupplier.name;
            supplierobj[0].edit = false;
            console.log(supplierobj)
        }else{
            supplierslist.map(item => {
                if (item.index === currentEDitSupplier.index) {
                    item.company_Name = currentEDitSupplier.name;
                }
                return item;
            })
        }
        currentEDitSupplier = {name:"",index:""};
        this.setState({
            supplierslist,
            modal3: !this.state.modal3,
            currentEDitSupplier,
            supplierobj,
            is_delete:false

        });
    }

    
   async saveChange() {

        let settings;
        let response;
        let url;
        let supplierslist = this.state.supplierslist;
        let supplierobj = this.state.supplierobj;
        let currentDeleter = this.state.currentDeleter;
        let is_dublicate = this.state.is_dublicate;

        if(this.state.is_delete){           

            url = this.state.base_url + `Suppliers/${currentDeleter}`;
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
                is_searchsupplier:false,
                supplier:"",
                supplierslist,
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

            if(this.state.is_searchsupplier){
                let supplierobj = this.state.supplierobj;
                supplierobj[0].edit = false;
                supplierobj[0].company_Name = this.state.currentEditer;
            }
            this.setState({
                supplierobj
            })

        }else if(this.state.is_add){
            
            let newsupplier = {company_Name: this.state.inputNewSupplier}    
            url = this.state.base_url + 'Suppliers';
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
                body: JSON.stringify (newsupplier)
            };                    
            response = await fetch(url,settings);
            
            

            this.setState({                    
                addsituation:false,
                is_dublicate,
                inputNewSupplier:"",
                supplierslist
            })            
        }
        

        this.setState({
            modal3: !this.state.modal3,
            supplierslist,
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
        let supplierslist = this.state.supplierslist;
        is_dublicate = supplierslist.some(item => {
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
                        value = {this.state.supplier}
                        onChange = {this.handleInputSupplier}
                        />
                    <button onClick = {this.SupplierSearch}>Search</button>                    
                </div>
                {
                    this.state.is_wrongsupplier ?
                        <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                            Supplier name is wrong!
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
                                    <p className="text-success">
                                    <FaMinus className = "minus" onClick = {this.minus}/>
                                    </p>
                                </span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword5">Supplier</label>
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
                            <p className="text-success">
                            <FaPlus onClick = {this.plus}/>
                            </p>
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
                                   {this.state.supplierobj[0].index}
                                </td>
                                {
                                    !this.state.supplierobj[0].edit ? 
                                        <td className="pt-3-half">
                                            {this.state.supplierobj[0].company_Name}
                                        </td> 
                                    :
                                    <td className="pt-3-half" >
                                        {
                                            this.state.is_repeatsupplier ?
                                            <input 
                                                type="text" 
                                                value =  {this.state.currentEditer} 
                                                className="edited repeatsupp" 
                                                onChange = {(e) => {this.handleSupplierChange(e)}}  

                                            />
                                        :
                                            <input 
                                                type="text" 
                                                value =  {this.state.currentEditer} 
                                                className="edited" 
                                                onChange = {(e) => {this.handleSupplierChange(e)}}  
                                                />
                                        }
                                        
                                    </td>
                                }
                                {
                                    !this.state.supplierobj[0].edit ? 
                                    <td>
                                        <MDBBtn  color="primary" onClick ={(e) => {this.todoEdit(this.state.supplierobj[0].company_Name)}} >
                                            <FaEdit className="editicon"/>
                                            Edit</MDBBtn>
                                    </td>
                                    :
                                    <td>
                                        <MDBBtn 
                                        color="primary" 
                                        onClick={(e) => {this.todoSave(this.state.supplierobj[0].index)}}
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
                                                this.todoDelete(this.state.supplierobj[0].company_Name);
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
                            
                        }
                        </tbody>
                        </table>
                            :
                    
                        this.state.supplierslist.length > 0 ?
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
                                this.state.supplierslist.map(item=>{
                                   
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
                                                            onChange = {(e) => {this.handleSupplierChange(e)}}  

                                                        />
                                                   :
                                                        <input 
                                                            type="text" 
                                                            value =  {this.state.currentEditer} 
                                                            className="edited" 
                                                            onChange = {(e) => {this.handleSupplierChange(e)}}  
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
                                                    onClick={(e) => {this.todoSave(item.index)}}
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