import React from "react";
class TodoSuppliers extends React.Component {
    constructor(props){
		super(props);
		this.state = {			
            supplierobj:{},
            supplier:""
        };
        this.SupplierSearch = this.SupplierSearch.bind(this);
    }

    handleInputSupplier = (e) => {
		this.setState({
		  supplier:e.target.value
        });
       
	}

    async SupplierSearch(){
			let url = `http://localhost:51560/Suppliers/GetByName/${this.state.supplier}`;
			
			let response = await fetch(url);
			let supplierobj = await response.json();
			console.log(supplierobj);

			// this.setState({
			// 	supplierobj
			// })

		
		
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
                            <table  className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Supplier Name</th>
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
                                            <td>
                                                {item.company_Name}
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

export default TodoSuppliers;