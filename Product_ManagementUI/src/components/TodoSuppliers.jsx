import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import { FaPlus } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever} from "react-icons/md";

import 'mdbreact/dist/css/mdb.css';

class TodoSuppliers extends React.Component {
    constructor(props){
		super(props);
		this.state = {		
            base_url:"http://localhost:51560/",	
            supplierobj:{},
            supplier:"",       
            modal3: false,
            is_delete:false,
            addsituation:false,
            currentDeleter:"",
            is_repeatsupplier:false,
            currentEDitSupplier:{name:"",index:""},
            supplierobject:[]
        };
        this.SupplierSearch = this.SupplierSearch.bind(this);
        this.handleSupplierChange = this.handleSupplierChange.bind(this);
    }

    componentDidMount() {
        // let url =this.state.base_url + `Suppliers/Get/`;			
        // let response = await fetch(url);
        // let supplierobject = await response.json();
        let supplierobject = [{company_Name:"gsdgxdfg"},{company_Name:"koko"},{company_Name:"sfsfsf"},{company_Name:"BBBBBB"}]
        let i = 1;
        supplierobject.map(item => {
            item.edit = false;
            item.index = i;
            i++
            return item;
        })
        console.log(supplierobject)
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

        console.log(e.target.value)
        let newname = e.target.value;
        let supplierobject =  this.state.supplierobject;
        let is_repeatsupplier = this.state.is_repeatsupplier;

        supplierobject.map(item=>{
            if(item.index !== index) {
                return item;                
            }    
            item.company_Name = newname;
            if(newname === item.company_Name){
                is_repeatsupplier = true;
            }            
            return item;
        });

        this.setState({
            supplierobject
        })
    }

    async SupplierSearch(){    
        let url = this.state.base_url + `Suppliers/GetByName/${this.state.supplier}`;
        
        let response = await fetch(url);
        let supplierobj = await response.json();
        console.log(supplierobj);

        // this.setState({
        // 	supplierobj
        // })		
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
            modal3: !this.state.modal3
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
            currentEDitSupplier
            
        });
    }
    
    todoDelete = (name) => {
        this.setState({
            modal3: !this.state.modal3,
            is_delete:true,
            currentDeleter:name
          });
    }

    cancelChange = (e) =>{
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
            is_delete:false
        });
    }
    
    saveChange = () => {

        if(this.state.is_delete){
            let supplierobject = this.state.supplierobject;
            supplierobject =  supplierobject.filter(item => {
                if (item.company_Name !== this.state.currentDeleter) {
                    console.log(item.company_Name,"   ",this.state.currentDeleter)
                    return item;
                }
            })
            this.setState({
                is_delete:false,
                currentDeleter:"",
                supplierobject
            });
        }
        let supplierobject = this.state.supplierobject;
        supplierobject.map(item => {
            if(item.index !== this.state.currentEDitSupplier.index){
                return item;                
            }
            if(item.company_Name.trim() === ""){
                item.company_Name = this.state.currentEDitSupplier.name;
            }
            return item;
        })

        this.setState({
            modal3: !this.state.modal3,
            supplierobject
        });
    }

    todoAdd = ()=> {
        console.log("Hiiiiii")
        this.setState({
            addsituation:true
        })
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
                        <div>
                        <table className="table table-bordered table-responsive-md table-striped text-center">
                            <thead>
                                <tr>
                                    <th className="text-center">New Supplier Name</th>
                                </tr>
                            </thead>
                            <tbody className = "mainlisthov">
                                <tr>
                                    <td>
                                        <input type="text"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button>ADD</button>
                        </div>
                        </div>
                        :
                        <span className="table-add float-right mb-3 mr-2">
                            <a href="#!" className="text-success">
                            <FaPlus onClick = {this.todoAdd}/>
                            </a>
                         </span>

                    }
                    
                {this.state.supplierobject.length > 0 ?
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
                                                            value =  {item.company_Name} 
                                                            className="editedSuppier repeatsupp" 
                                                            onChange = {(e) => {this.handleSupplierChange(item.index,e)}}  

                                                        />
                                                   :
                                                        <input 
                                                            type="text" 
                                                            value =  {item.company_Name} 
                                                            className="editedSuppier" 
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
                                                                    this.cancelChange(true);                                                                
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