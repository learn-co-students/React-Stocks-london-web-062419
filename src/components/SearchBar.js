import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          checked={props.sortValue === "Alphabetically"}
          onChange={props.handleSort}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          checked={props.sortValue === "Price"}
          onChange={props.handleSort}
        />
        Price
      </label>
      <br />

      <label>
        <strong>Filter:</strong>
        <select onChange={props.handleFilter}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
<br/>
      <label>
        <strong>Search</strong>
        <form>
         <input type="text" placeholder="search" onChange={props.handleSearch} value={props.searchTerm} />
        </form>
      </label>
    </div>
  );
}


export default SearchBar;
