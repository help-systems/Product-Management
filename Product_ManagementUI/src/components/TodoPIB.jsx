import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever} from "react-icons/md";
import { FaFilter } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';


class TodoPIB extends React.Component {

    constructor(props){
		super(props);
		this.state = {		
            base_url:"http://localhost:51560/",	
            productslist:[],
            searchBarcode:"",
            barcodecount:0,
            currentDeleter:{
                barcode:"",
                BW_Name:""
            },
            selectBarcode:"", 
            selectBranch:"",
            productobject:false,
            addsituation:false,
            Barcodes:[],  
            Branches:[],   
            modal3: false,
            is_add:false,
            is_delete:false,  
            is_dublicate:false,
            is_edit:false,
            is_fillallinfo:false,
            is_searchBarcode:false,
            is_wrongBarcode:false,
            
            
            currentEDitProduct:{
                    barcode:"",
                    BW_Name:"",
                    count:"",
                    index:""
            }
            
        };

        this.todoSearchBarcode = this.todoSearchBarcode.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.todoAdd = this.todoAdd.bind(this);
    }

    async componentDidMount() {
      
        let mainobject = {
            BW_Name:"B",
            Barcode:"null",
            Product_Name: "null",
            Category_Name: "null",
            Supplier_Name: "null",			
			
        };
        let url = this.state.base_url + 'Search';
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
                body: JSON.stringify(mainobject)
            };
            let response = await fetch(url,settings);
			let productslist = await response.json();
            
        productslist.map(item => {
            item.edit = false;
            item.index = productslist.indexOf(item) + 1;
            return item;
        })

        url = this.state.base_url + 'Branches';
        response = await fetch(url);
        let Branches = await response.json();


        url = this.state.base_url + 'Products';
        response = await fetch(url);
        let Barcodes = await response.json();


        this.setState({
            productslist,
            Branches,
            Barcodes
        })
    }

    
    handleInputSearchBarcode = (e) => {
		this.setState({
            searchBarcode:e.target.value
        });
    } 

    setBarcode = (e) => {
        this.setState({
            selectBarcode:e.target.value
        })
    }

    setBranch = (e) => {
        this.setState({
            selectBranch:e.target.value
        })
    }
    
    handleAddProductCount =(e) => {
        this.setState({
            barcodecount:e.target.value
        })
    }

    handleEditProductCount =(e) => {
        this.setState({
            barcodecount:e.target.value
        })
    }

 

    async todoSearchBarcode () {

        if(this.state.searchBarcode.trim() !== ""){
            let mainobject = {
                BW_Name:"B",
                Barcode:this.state.searchBarcode,
                Product_Name: "null",
                Category_Name: "null",
                Supplier_Name: "null",			
                
            };

            let url = this.state.base_url + 'Search';
            
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
                body: JSON.stringify(mainobject)
            };
            let response = await fetch(url,settings);
            let productobject = await response.json();
            let productslist = this.state.productslist;
            
            console.log(productobject)
            if(!productobject){
                this.setState({
                    productobject:{},
                    is_searchBarcode:false,
                    is_wrongBarcode:true
                });
            }else {
                console.log(this.state.searchBarcode)
                productobject = productslist.filter(item => {
                    return item.barcode === this.state.searchBarcode.trim()
                })
                console.log(productobject)
                this.setState({
                    productobject,
                    searchBarcode:"",
                    is_wrongBarcode:false,
                    is_searchBarcode:true
                })	
            }
        }else {
            this.setState({
                productobject:{},
                searchBarcode:"",
                is_dublicate:false,
                is_searchBarcode:false,
                is_wrongBarcode:false
            })
        }
        
    }

    async saveChange() {

        let settings;
        let response;
        let url;
        let productslist = this.state.productslist;
        let productobject = this.state.productobject;

        if(this.state.is_delete){
            
            
            let currentDeleter = this.state.currentDeleter;
            console.log(currentDeleter)

            url = this.state.base_url + `Branches`;
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
				body: JSON.stringify(currentDeleter)
			};
			
            response = await fetch(url,settings);
            console.log(currentDeleter)
            productslist = productslist.filter(item => {
                return item.barcode !== currentDeleter.barcode && item.bW_Name !== currentDeleter.BW_Name
            })
            this.setState({
                is_delete:false,
                is_searchBarcode:false,
                currentDeleter:{
                    barcode:"",
                    BW_Name:""
                }
            });

        }else if(this.state.is_edit) {
            console.log(this.state.currentEDitProduct)
            let editableproduct = {
                barcode:this.state.currentEDitProduct.barcode,
                BW_Name:this.state.currentEDitProduct.BW_Name,
                count: Number(this.state.barcodecount)
            };

                console.log(editableproduct);

            url = this.state.base_url + 'Branches';
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
				body: JSON.stringify(editableproduct)
			};
			
            response = await fetch(url,settings);

            
            if(this.state.is_searchBarcode){
                productobject = productslist.filter(item =>{
                    return item.barcode === editableproduct.barcode && item.bW_Name === editableproduct.bW_Name
                })
            }else{
                console.log(editableproduct);
                productslist.map(item => {
                    if(item.barcode === editableproduct.barcode && item.bW_Name === editableproduct.BW_Name){
                        item.count = editableproduct.count;
                        console.log(item);
                    }
                    return item;
                })
            }

        }else if (this.state.is_add){

            let newProduct = {
                    Barcode: this.state.selectBarcode,
                    BW_Name:this.state.selectBranch,
                    Count:Number(this.state.barcodecount)
                };  
            url = this.state.base_url + 'Branches';
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
                body: JSON.stringify (newProduct)
            };                    
            response = await fetch(url,settings);        
            newProduct = {
                barcode: this.state.selectBarcode,
                bW_Name:this.state.selectBranch,
                count:Number(this.state.barcodecount)
            }; 
            newProduct.edit = false;
            newProduct.index = 0;
            productslist.unshift(newProduct);
            productslist.map(item => {
                item.index++                
                return item;
                
            })

            this.setState({
                addsituation:false,
                productslist,
                barcodecount:0
            })
            
        }

        this.setState({
            modal3: !this.state.modal3,
            productslist,
            productobject,
            is_edit:false,
            is_add:false,
            is_dublicate:false,
            barcodecount:0,
            selectBarcode:"",
            currentEDitProduct:{
                barcode:"",
                BW_Name:"",
                count:"",
                index:""
            }
        });
    }

    cancelChange = () =>{

        let productslist = this.state.productslist;
        let productobject = this.state.productobject;
        let currentEDitProduct = this.state.currentEDitProduct;

        if(this.state.is_searchBarcode) {
            productobject.map(item => {
                if (item.index === currentEDitProduct.index) {
                    item.count = currentEDitProduct.count;       
                    
                }
                return item;
            })
           
        }else {
            productslist.map(item => {
                if (item.index === currentEDitProduct.index) {
                    item.count = currentEDitProduct.count;       
                    
                }
                return item;
            })

        }
        currentEDitProduct = {
                barcode:"",
                BW_Name:"",
                count:"",
                index:""
                
            };
        this.setState({
            productobject,
            productslist,
            modal3: !this.state.modal3,
            currentEDitProduct,
            is_delete:false,
            addsituation:true,
            barcodecount:0,
            selectBarcode:""

        });
    }

    plus= () => {
        this.setState({
            addsituation:true,
            is_dublicate:false,
        })
    }

    minus = () => {
        this.setState({
            addsituation:false,
            barcodecount:0,
            selectBarcode:"",
            selectBranch:"",
            is_dublicate:false,
            is_fillallinfo:false
        })
    }

    async todoAdd () {       

        let is_dublicate = this.state.is_dublicate;
        let productslist = this.state.productslist;
        
        if(this.state.selectBarcode !== "Choose..." && this.state.selectBarcode !== "" &&
          this.state.barcodecount >  0) {

            is_dublicate = productslist.some(item => {

                return item.barcode === this.state.selectBarcode && item.bW_Name === this.state.selectBranch;
            })

            if(!is_dublicate ){
                this.setState({
                    modal3: !this.state.modal3,
                    
                });
            }
            this.setState({
                is_add:true,
                is_fillallinfo:false,
                is_dublicate
            });

        }else {
            this.setState({
                addsituation:true,
                is_dublicate,                
                is_fillallinfo:true
            })
        } 
    }

    todoDelete = (barcode, BW_Name) => {
        console.log(BW_Name)
        this.setState({
            modal3: !this.state.modal3,
            is_delete:true,
            currentDeleter:{
                barcode,
                BW_Name
            }
          });
    }

    todoEdit = (index) => {
        

        let productslist = this.state.productslist;
        let currentEDitProduct = this.state.currentEDitProduct;
        let productobject = this.state.productobject;

        if(this.state.is_searchBarcode){
            productobject.map(item => {
            if(item.index === index){
                console.log(item)
                item.edit = true;
                currentEDitProduct= {
                    barcode:item.barcode,
                    count:item.count,
                    index:item.index,                
                    BW_Name:item.bW_Name,
                }
            }
                return item;
            })


        }else {
            productslist.map(item => {
                if(item.index === index){
                  console.log(item)
                    item.edit = true;
                    currentEDitProduct= {
                      barcode:item.barcode,
                      count:item.count,
                      index:item.index,                
                      BW_Name:item.bW_Name,
                  }
                }
                  return item;
            })
        }

        this.setState({
            productobject,
            productslist,
            currentEDitProduct,
            currentEditer:index,
            barcodecount:currentEDitProduct.count,
           
            
        });
        
    }

    todoSave(index) {

        let productslist = this.state.productslist;
        let productobject = this.state.productobject;

        if(this.state.is_searchBarcode){
            productobject.map(item => {
                if(item.index === index){
                    console.log(item)
                    item.edit = false;
                    console.log(item)
                }
                  return item;
              })
        }else{
            productslist.map(item => {
                if(item.index === index){
                    console.log(item)
                    item.edit = false;
                    console.log(item)
                }
                  return item;
              })
        }
        

        this.setState({           
            productslist,
            productobject,
            modal3: !this.state.modal3,
            is_edit:true
        });
    }

    toggle = e => () => {
        this.setState({
          modal3: !this.state.modal3         
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
                        placeholder = "Barcode"
                        value = {this.state.searchBarcode}
                        onChange = {this.handleInputSearchBarcode}
                    />
                    <button onClick = {this.todoSearchBarcode}>Search</button>
                </div>
                {
                this.state.is_wrongBarcode ?
                    <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                        Barcode is wrong!
                    </small>
                :
                    ""
                }
                <div  id="table" className="table-editable">

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
                            {
                                this.state.is_dublicate ?
                                <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                                    This Product already exist. You can update.
                                </small>
                                :
                                ""
                            } 
                           <div className="form-group">
                               <div>
                                    <label htmlFor ="inlineFormCustomSelectPref1">Barcode</label>
                                    <select 
                                        className="custom-select my-1 mr-sm-2" 
                                        id="inlineFormCustomSelectPref1"
                                        onClick= {this.setBarcode}
                                    >
                                        <option selected disabled>Choose...</option>
                                        { 
                                           
                                           this.state.Barcodes.map(item => {
                                                return(
                                                    <option key = {item.barcode} value={item.barcode}>{item.barcode}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword2">Count</label>
                                    <input 
                                        type="number" 
                                        id="inputPassword2" 
                                        className="form-control" 
                                        aria-describedby="passwordHelpBlock"
                                        onChange = {this.handleAddProductCount}
                                        value = {this.state.barcodecount}
                                        placeholder = "Count"
                                    /> 
                                    </div>
                                <div>
                                    <label htmlFor ="inlineFormCustomSelectPref2">Branch Name</label>
                                    <select 
                                        className="custom-select my-1 mr-sm-2" 
                                        id="inlineFormCustomSelectPref2"
                                        onClick= {this.setBranch}
                                    >
                                        <option selected disabled>Choose...</option>
                                        { 
                                            this.state.Branches.map(item => {
                                                return(
                                                    <option key = {item.branch_Name} value={item.branch_Name}>{item.branch_Name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                
                            </div> 
                            {
                                this.state.is_fillallinfo ?
                                <small id="passwordHelpBlock" className="form-text text-muted is_duplicate">
                                Input Fields Incomplete!
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
                    <div>
                    {
                        this.state.productobject.length > 0 ?

                        <table className="table table-bordered table-responsive-md table-striped text-center">
                                
                            <thead>
                                <tr>
                                    <th className="text-center">Barcode</th>
                                    <th className="text-center">Branch Name</th>
                                    <th className="text-center">Count</th>
                                    <th className="text-center">Edit</th>
                                    <th className="text-center">Remove</th>
                                </tr>
                            </thead>
                            <tbody className = "mainlisthov">
                        { 
                        this.state.productobject.map (item => {
                            return(
                                <tr key = {i++}>
                                <>
                                        <td className="pt-3-half">
                                            {item.barcode}
                                        </td>
                                        <td className="pt-3-half">
                                            {item.bW_Name}
                                        </td>
                                    </>
                                    {
                                    !item.edit ? 
                                    <>
                                            <td className="pt-3-half">
                                                {item.count}
                                            </td>
                                            <td>
                                            <MDBBtn  color="primary" onClick ={(e) => {this.todoEdit(item.index)}} >
                                                <FaEdit className="editicon"/>
                                                Edit
                                                </MDBBtn>
                                            </td>
                                        </>
                                            :
                                        <>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    value =  {this.state.barcodecount} 
                                                    className="edited" 
                                                    onChange = {this.handleEditProductCount} 
                                                />
                                            </td>
                                            <td>
                                            <MDBBtn 
                                                color="primary" 
                                                onClick={(e) => {this.todoSave(item.index)}}
                                                >
                                                    <FaSave className="editicon"/>
                                                    Save
                                                </MDBBtn>
                                            </td>
                                        </>
                                    }
                                    <td>
                                        <MDBContainer>
                                            <MDBBtn  
                                                className = "deletebutton"
                                                color="primary" 
                                                onClick={(e)=>{
                                                    this.todoDelete(item.barcode,item.bW_Name);
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
                    this.state.productslist.length > 0 ?
                    <table  className="table table-bordered table-responsive-md table-striped text-center">
                    <thead>
                        <tr>
                            <th className="text-center">Barcode</th>
                            <th className="text-center">Branch Name</th>
                            <th className="text-center">Count</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody className = "mainlisthov">                        
                    { this.state.productslist.map(item=>{
                    
                            return (
                                <tr key={i++} >
                                   <td className="pt-3-half">
                                        {item.barcode}
                                    </td>
                                    <td className="pt-3-half">
                                        {item.bW_Name}
                                    </td>
                                {
                                    !item.edit? 
                                    <>
                                        <td className="pt-3-half">
                                            {item.count}
                                        </td>
                                        <td>
                                        <MDBBtn  color="primary" onClick ={(e) => {this.todoEdit(item.index)}} >
                                            <FaEdit className="editicon"/>
                                            Edit
                                            </MDBBtn>
                                        </td>
                                    </>
                                        :
                                    <>
                                        <td>
                                            <input 
                                                type="number" 
                                                value =  {this.state.barcodecount} 
                                                className="edited" 
                                                onChange = {this.handleEditProductCount} 
                                            />
                                        </td>
                                        <td>
                                        <MDBBtn 
                                            color="primary" 
                                            onClick={(e) => {this.todoSave(item.index)}}
                                            >
                                                <FaSave className="editicon"/>
                                                Save
                                            </MDBBtn>
                                        </td>
                                    </>
                                    }               
                                     <td>
                                        <MDBContainer>
                                            <MDBBtn  
                                                className = "deletebutton"
                                                color="primary" 
                                                onClick={(e)=>{
                                                    this.todoDelete(item.barcode,item.bW_Name);
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
            </div>
            
        );
    }
}

export default TodoPIB;