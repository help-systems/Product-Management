import React from "react";
class TodoCategories extends React.Component {
    render() {      
        let i = 0;
        return(
            <div id="main">
            <div className = "search" id = "maininfo">               
                <input type="text" placeholder = "Category"/>                
                <button>Search</button>
            </div>
            <div>
            {this.props.categoryobject.length > 0 ?
                <table  className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Parent Category</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody className = "mainlisthov">                        
                { this.props.categoryobject.map(item=>{
                        console.log(item);
                        i++
                        return (
                            <tr key={i} >                                           
                                <td>
                                    {item.parent_Category}
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

export default TodoCategories;