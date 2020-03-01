import React from 'react';
import './App.css';
import TodoMain from './components/TodoMain';
import TodoProducts from './components/TodoProducts';
import TodoSuppliers from './components/TodoSuppliers';
import TodoCategories from './components/TodoCategories';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pagelists:[true,false,false,false],
			maindata:[],
			base_url:"http://localhost:51560/",
			mainobject:{
				Barcode:"",
				Product_Name: "",
				Category_Name: "",
				Supplier_Name: "",
				BW_Name: ""			
			},
			BW_Name_error:false,
			supplierobject:{},
			categoryobject:{},
			productobject:{}

		}
		this.handlechangePage = this.handlechangePage.bind(this);
		this.MainSearch = this.MainSearch.bind(this);
	}
	
	async handlechangePage(e,index){
		let pagelists = this.state.pagelists;
		for (let i = 0; i < pagelists.length; i++) {
			i === index ?
				pagelists[i] = true:
				pagelists[i] = false			
		}

		if(pagelists[1]) {

			// let url =this.state.base_url + `Suppliers/Get/`;			
			// let response = await fetch(url);
			// let supplierobject = await response.json();
			let supplierobject = [{company_Name:"gsdgxdfg"},{company_Name:"koko"},{company_Name:"sfsfsf"}]
			this.setState({
				supplierobject
			})

		}
		if(pagelists[2]) {

			let url = this.state.base_url + `Categories/Get/`;			
			let response = await fetch(url);
			let categoryobject = await response.json();
			this.setState({
				categoryobject
			})

		}

		if(pagelists[3]) {

			let url = this.state.base_url + `Products/GetProducts/`;			
			let response = await fetch(url);
			let productobject = await response.json();
			this.setState({
				productobject
			})

		}

		this.setState({
			pagelists
		})
	}

	handleMainBarcode = (e) => {
		let mainobject = this.state.mainobject;
		mainobject.Barcode = e.target.value;
	
		this.setState({
		  mainobject
		});
	}
	
	handleMainProduct = (e) => {
		let mainobject = this.state.mainobject;
		mainobject.Product_Name = e.target.value;
	
		this.setState({
		  mainobject
		});
	}

	handleMainCategory = (e) => {
		let mainobject = this.state.mainobject;
		mainobject.Category_Name = e.target.value;
	
		this.setState({
		  mainobject
		});
	}

	handleMainSupplier = (e) => {
		let mainobject = this.state.mainobject;
		mainobject.Supplier_Name = e.target.value;
	
		this.setState({
		  mainobject
		});
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	async MainSearch(){

		let mainobject = this.state.mainobject;
		
		if(mainobject.Barcode==="") {mainobject.Barcode="null"}
		if(mainobject.Product_Name==="") {mainobject.Product_Name="null"}
		if(mainobject.Category_Name==="") {mainobject.Category_Name="null"}
		if(mainobject.Supplier_Name==="") {mainobject.Supplier_Name="null"}
	
		if(mainobject.BW_Name !==""){
			let url = this.state.base_url + `Search/Search/${JSON.stringify (mainobject)}`;
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
				body: `${mainobject}`
			};
			
			let response = await fetch(url,settings);
			let maindata = await response.json();

			this.setState({
				maindata,
				BW_Name_error:false
			})
				
		}else {
			this.setState({
				BW_Name_error:true
			})
		}
		

		this.setState({
			mainobject
		})

		
		
	}

	handleBW_Name = (e) => {
		let mainobject = this.state.mainobject;
		mainobject.BW_Name = e.target.value;
		this.setState({
			mainobject
		});
	  }


	render(){

		let pagelists = this.state.pagelists;
		// console.log(pagelists[0])
		return (
			<div  className="App">
				<div id="container">
					<div id="header">
						<div id="logo">
							<h1>Product management</h1>
						</div>
						<div id="menu">
							<ul>
								{ pagelists[0] ?
									<li onClick={(e) => this.handlechangePage(e, 0)} id = "currentpage">Homepage</li>
									:
									<li onClick={(e) => this.handlechangePage(e, 0)}>Homepage</li>					
							
								}
								{ pagelists[1] ?
									<li onClick={(e) => this.handlechangePage(e, 1)} id = "currentpage">Suppliers</li>
									:
									<li onClick={(e) => this.handlechangePage(e, 1)}>Suppliers</li>					
							
								}
								{ pagelists[2] ?
									<li onClick={(e) => this.handlechangePage(e, 2)} id = "currentpage">Categories</li>
									:
									<li onClick={(e) => this.handlechangePage(e, 2)}>Categories</li>					
							
								}
								{ pagelists[3] ?
									<li onClick={(e) => this.handlechangePage(e, 3)} id = "currentpage">Products</li>
									:
									<li onClick={(e) => this.handlechangePage(e, 3)}>Products</li>					
							
								}	
								<li>Log Out</li>
							</ul>
						</div>
					</div>
					{
						pagelists[0] ?
							<TodoMain 
								MainSearch = {this.MainSearch}
								handleMainBarcode = {this.handleMainBarcode}
								handleMainProduct = {this.handleMainProduct}
								handleMainCategory = {this.handleMainCategory}
								handleMainSupplier = {this.handleMainSupplier}
								mainobject = {this.state.mainobject}
								maindata = {this.state.maindata}
								handleBW_Name = {this.handleBW_Name}
								BW_Name_error = {this.state.BW_Name_error}
							/> 
						:
							pagelists[1] ?
								<TodoSuppliers
									supplierobject = {this.state.supplierobject}
								/> 
							:
								pagelists[2] ?
									< TodoCategories
									categoryobject = {this.state.categoryobject}
									/> 
								:
									<TodoProducts
										productobject = {this.state.productobject}
									/>
					}				
				</div>
			</div>
		   
		  );

	}
}


export default App;
