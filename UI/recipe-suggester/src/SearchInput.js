import React from 'react';
import {Col, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';



class SearchInput extends React.Component{
    constructor(props){
      super(props);
      this.state = {searchTerm: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
      this.setState({searchTerm: event.target.value});
    }
  
    render(){
      return (
        <React.Fragment>
          <Col md="10" className="text-center">
            <Input type="text" placeholder="Search" value={this.state.searchTerm} onChange={this.handleChange}/>
          </Col>
          <Col md="2" className="text-center">
            <Link to={{pathname:'/search',search:'?name='+this.state.searchTerm}}>
              <Button color="primary">Search</Button>
            </Link>        
          </Col>
        </React.Fragment>
      );
    }
  }

  export default SearchInput;