import React from "react";
class TodoProducts extends React.Component {
    render() {  
        let i = 0;    
        return(
            
            <div id="main">
                <div className = "search" id = "maininfo">
                    <input type="text" placeholder = "Product"/>
                    <button>Search</button>
                </div>
                <div>
                {this.props.productobject.length > 0 ?
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
                { this.props.productobject.map(item=>{
                   
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