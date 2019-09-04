import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

const URL = " http://localhost:3000/stocks";

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    sortValue: "",
    filterType: "",
    searchTerm: ""
  };

  fetchStocks = () => {
    fetch(URL)
      .then(resp => resp.json())
      .then(stocks => {
        this.setState({
          stocks: stocks
        });
      });
  };

  componentDidMount() {
    this.fetchStocks();
  }

  addStocks = stock => {
    if (!this.state.portfolio.includes(stock)) {
      this.setState({
        portfolio: [...this.state.portfolio, stock]
      });
    }
  };

  removeStock = stock => {
    this.setState({
      portfolio: this.state.portfolio.filter(
        sellStock => sellStock.id !== stock.id
      )
    });
  };

  handleSearch = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  // handleChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  handleSort = event => {
    this.setState({
      sortValue: event.target.value
    });
  };

  handleFilter = event => {
    this.setState({
      filterType: event.target.value
    });
  };

  // sortAndFilterStocks = () => {
  // //   if(this.state.sortValue === "Alphabetically"){
  // //     return this.state.stocks.sort((a, b) => a.name.localeCompare(b.name))
  // //   } else if (this.state.sortValue === "Price"){
  // //     return this.state.stocks.sort((a, b) => a.price - b.price)
  // //   } else if (this.state.filterType){
  // //     return this.state.stocks.filter(stock => stock.type === this.state.filterType)
  // //   } else if( this.state.searchTerm){
  // //     return this.state.stocks.filter(stock => stock.name.toLocaleLowerCase().includes(this.state.searchTerm.toLocaleLowerCase())  )

  // //   }
  // //   else {
  // //     return this.state.stocks
  // //   }
  // // };

 sortAndFilterStocks = () => {
   return this.sortStocks(this.filterStocks())
}

  filterStocks = () => {
    if(this.state.filterType === ""){
      return this.state.stocks}
      else { 
      return this.state.stocks.filter(stock => stock.type === this.state.filterType)
    }
  }

  sortStocks = (filterStockArray) => {
    switch (this.state.sortValue) {
      
      case "Alphabetically":
        return filterStockArray.sort((a, b) => a.name.localeCompare(b.name) )
      
        case "Price":
          return filterStockArray.sort((a, b) => a.price - b.price )

        default: 
        return filterStockArray
       
    }
  }

 


  render() {
    return (
      <div>
        <SearchBar
          handleSort={this.handleSort}
          sortValue={this.state.sortValue}
          handleFilter={this.handleFilter}
          filterType={this.state.filterType}
          handleSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.sortAndFilterStocks()}
              
              addStocks={this.addStocks}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={this.state.portfolio}
              removeStock={this.removeStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
