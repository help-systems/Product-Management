import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

class TodoSuppliers extends React.Component {
    constructor(props){
		super(props);
		this.state = {		
            base_url:"http://localhost:51560/",	
            supplierobj:{},
            supplier:"",           
            modal3: false
        };
        this.SupplierSearch = this.SupplierSearch.bind(this);
    }

    handleInputSupplier = (e) => {
		this.setState({
		  supplier:e.target.value
        });
       
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

    toggle = e => () => {
        let modalNumber = 'modal' + e
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      }
    
    render() {
        let i = 0;   
        return(            
            <div id="main">
                <div className = "search" id = "maininfo">
                    <input 
                        type="text" 
                        placeholder = "Supplier"
                        onChange = {this.handleInputSupplier}
                        />                    
                    <button onClick = {this.SupplierSearch}>Search</button>
                </div>
                <div>
                {this.props.supplierobject.length > 0 ?
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
                            { this.props.supplierobject.map(item=>{
                                    i++
                                    return (
                                        <tr key={i} >                                           
                                            <td>
                                                {i}
                                            </td>
                                            <td className="pt-3-half">
                                                {item.company_Name}
                                            </td>
                                            <td>
                                                <MDBBtn color="primary" onClick={this.toggle(3)}>Edit</MDBBtn>                                                 
                                            </td>
                                            <td>
                                                <MDBContainer>
                                                    <MDBBtn color="primary" onClick={this.toggle(3)}>Delete</MDBBtn>
                                                    <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} size="sm">
                                                        <MDBModalHeader toggle={this.toggle(3)}>Are you sure?</MDBModalHeader>
                                                        <MDBModalBody>
                                                    
                                                        </MDBModalBody>
                                                        <MDBModalFooter>
                                                        <MDBBtn color="secondary" size="sm" onClick={this.toggle(3)}>Close</MDBBtn>
                                                        <MDBBtn color="primary" size="sm">Save Changes</MDBBtn>
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