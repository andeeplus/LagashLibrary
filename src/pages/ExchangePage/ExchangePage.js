import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExchangeTab from '../../components/exchange/ExchangeTab/ExchangeTab'

class ExchangePage extends Component {

  render() {
    
    return (
      this.props.exchangeItems&&
      <div>
        <ExchangeTab page={true} exchangeItems={this.props.exchangeItems}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exchangeItems: state.exchangeReducer.exchangeItems
  }
}


export default connect(mapStateToProps)(ExchangePage);