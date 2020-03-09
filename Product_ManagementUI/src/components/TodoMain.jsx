import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFilter } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

class TodoMain extends React.Component {
    render() {
        let i = 0;      
        return(            
            <div id="main">
                <div className="radio form-check-inline">
                    <div className="form-check form-check-inline">                       
                        <input 
                            type="radio" 
                            value="W" 
                            name = "BW_Name"
                            className="form-check-input" 
                            id="materialInline1"
                            checked={this.props.mainobject.BW_Name === "W"} 
                            onChange={this.props.handleBW_Name}
                        />
                        <label className="form-check-label" htmlFor="materialInline1">Warehouse</label>             
                    </div>
                    <div className="form-check form-check-inline">                        
                        <input 
                            type="radio" 
                            value="B" 
                            name = "BW_Name" 
                            className="form-check-input" 
                            id="materialInline2"                               
                            checked={this.props.mainobject.BW_Name === "B"}  
                            onChange={this.props.handleBW_Name}
                        />
                        <label className="form-check-label" htmlFor="materialInline2">Branch</label>
                    </div>                    
                </div>
                <div>
                    {
                        this.props.BW_Name_error ?
                            <p className = "BW_Name_error">
                                Undefined Branch / Warehouse Name
                            </p>
                        :
                            ""
                        
                    }
                </div>                
                <div id = "maininfo">
                    <div>
                        <FaFilter/>
                    </div>
                    <input 
                        type = "text" 
                        value = {this.props.mainobject.Supplier_Name}
                        placeholder = "Supplier" 
                        onChange = {this.props.handleMainSupplier}

                    />
                    <input
                        type="text" 
                        value = {this.props.mainobject.Category_Name}                        
                        placeholder = "Category"
                        onChange = {this.props.handleMainCategory}

                    />
                    <input
                        type="text"
                        value = {this.props.mainobject.Product_Name} 
                        placeholder = "Product"
                        onChange = {this.props.handleMainProduct}

                     />
                    <input
                        type="text" 
                        value = {this.props.mainobject.Barcode}
                        placeholder = "Barcode"
                        onChange = {this.props.handleMainBarcode}

                    />
                    <button onClick = {this.props.MainSearch}>Search</button>
                </div>
                <div>                   
                    
                {this.props.maindata.length > 0 ?
                    <table  className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Barcode</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Supplier Name</th>
                            <th scope="col">Btranch / Warehouse Name</th>
                            <th scope="col">Cost Price</th>
                            <th scope="col">Selling Price</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Count</th>
                        </tr>
                    </thead>
                    <tbody className = "mainlisthov">                        
                    { this.props.maindata.map(item=>{
                            console.log(item);
                            i++
                            return (
                                <tr key={i} >                                           
                                    <td>
                                        {item.barcode}
                                    </td>
                                    <td>
                                        {item.product_Name}
                                    </td>
                                    <td>
                                        {item.supplier_Name}
                                    </td>
                                    <td>
                                        {item.bW_Name}
                                    </td>
                                    <td>
                                        {item.cost_Price}
                                    </td>
                                    <td>
                                        {item.selling_Price}
                                    </td>
                                    <td>
                                        {item.category_Name}
                                    </td>
                                    <td>
                                        {item.count}
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

export default TodoMain;