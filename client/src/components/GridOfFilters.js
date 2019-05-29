import React from 'react';
import FilterPicture from './FilterPicture';
import filter1 from './resources/filter1.png'
import filter2 from './resources/filter2.png'
import filter3 from './resources/filter3.png'
import filter4 from './resources/filter4.png'
import filter5 from './resources/filter5.png'
import filter6 from './resources/filter6.png'
import filter7 from './resources/filter7.png'
import filter8 from './resources/filter8.png'

class GridOfFilters extends React.Component {

  render() {
    return (
      <div className="gridFilters" id={this.props.id}>
        <div>
            <FilterPicture src={filter1} handleClick={this.props.handleClick}/>
            <FilterPicture src={filter2} handleClick={this.props.handleClick}/>
            <FilterPicture src={filter3} handleClick={this.props.handleClick}/>
            <FilterPicture src={filter4} handleClick={this.props.handleClick}/>
        </div>
        <div>
            <FilterPicture src={filter5} handleClick={this.props.handleClick}/>
            <FilterPicture src={filter6} handleClick={this.props.handleClick}/>
            <FilterPicture src={filter7} handleClick={this.props.handleClick}/>
            <FilterPicture src={filter8} handleClick={this.props.handleClick}/>
        </div>
      </div>
    );
  }
  }

export default GridOfFilters;