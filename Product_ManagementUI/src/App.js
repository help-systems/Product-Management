import React from 'react';
import './App.css';
import TodoMain from './components/TodoMain';
import TodoProducts from './components/TodoProducts';
import TodoSuppliers from './components/TodoSuppliers';
import TodoCategories from './components/TodoCategories';
import TodoPIB from './components/TodoPIB';
import TodoPIW from './components/TodoPIW';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pagelists:[true,false,false,false,false,false],
			maindata:[],
			is_showBW:false,
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
	
	handlechangePage(index){
		let pagelists = this.state.pagelists;

		for (let i = 0; i < pagelists.length; i++) {
			i === index ?
				pagelists[i] = true
				:
				pagelists[i] = false			
		}
		if(index < 4){
			this.setState({
				is_showBW:false
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

		if(mainobject.BW_Name !==""){
			if(mainobject.Barcode==="") {mainobject.Barcode="null"}
			if(mainobject.Product_Name==="") {mainobject.Product_Name="null"}
			if(mainobject.Category_Name==="") {mainobject.Category_Name="null"}
			if(mainobject.Supplier_Name==="") {mainobject.Supplier_Name="null"}
			
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
			if(mainobject.Barcode==="null") {mainobject.Barcode=""}
			if(mainobject.Product_Name==="null") {mainobject.Product_Name=""}
			if(mainobject.Category_Name==="null") {mainobject.Category_Name=""}
			if(mainobject.Supplier_Name==="null") {mainobject.Supplier_Name=""}
			let response = await fetch(url,settings);
			let maindata = await response.json();

			this.setState({
				maindata,
				BW_Name_error:false,
				mainobject
			})
				
		}else {
			this.setState({
				BW_Name_error:true
			})
		}		
	}

	handleBW_Name = (e) => {
		let mainobject = this.state.mainobject;
		mainobject.BW_Name = e.target.value;
		this.setState({
			mainobject
		});
	}

	toshow_BW = () => {
		this.setState({
			is_showBW:!this.state.is_showBW

		})
	}


	render(){

		let pagelists = this.state.pagelists;
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
									<li onClick={(e) => this.handlechangePage(0)} id = "currentpage">Homepage</li>
									:
									<li onClick={(e) => this.handlechangePage(0)}>Homepage</li>					
							
								}
								{ pagelists[1] ?
									<li onClick={(e) => this.handlechangePage(1)} id = "currentpage">Suppliers</li>
									:
									<li onClick={(e) => this.handlechangePage(1)}>Suppliers</li>					
							
								}
								{ pagelists[2] ?
									<li onClick={(e) => this.handlechangePage(2)} id = "currentpage">Categories</li>
									:
									<li onClick={(e) => this.handlechangePage(2)}>Categories</li>					
							
								}
								{ pagelists[3] ?
									
										<li 
											onClick={(e) => {
												this.handlechangePage(3);
												this.toshow_BW();
												}												
											} 
											id = "currentpage">
												Products
										</li>
										
									:
									this.state.is_showBW ? 
										<li 
											onClick={(e) => {
												this.toshow_BW();
												}												
											} 
											id = "currentpage">
												Products
										</li>
										:
										<li onClick={(e) => {
											this.handlechangePage(3);
											this.toshow_BW();
											}												
										} 
										>
											Products
										</li>
								}
								{
									this.state.is_showBW ?
									<>
										{
											pagelists[4] ?
											<li className = "produc_BW showBW" onClick={(e) => this.handlechangePage(4)}>Product in Branch</li>
											:
											<li className = "produc_BW" onClick={(e) => this.handlechangePage(4)}>Product in Branch</li>
										}
										{
											pagelists[5] ?
											<li className = "produc_BW showBW" onClick={(e) => this.handlechangePage(5)}>Product in Warehouse</li>
											:
											<li className = "produc_BW" onClick={(e) => this.handlechangePage(5)}>Product in Warehouse</li>
										}
									</> 
									:
									""
								
														
							
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
								pagelists[3] ?
									<TodoProducts/>
									: 
									pagelists[4] ?
										< TodoPIB />
										:
										<TodoPIW />

					}				
				</div>
			</div>
		   
		  );

	}
}


export default App;
