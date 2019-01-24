import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


class PrivateRoute extends Component {
  render() {
    const { user, componentAdmin, componentUser } = this.props;
    const ComponentUser = componentUser;
    const ComponentAdmin = componentAdmin;

    return (
      <Route render={(props) => (
        user ? 
          (user.profile === "admin" ? <ComponentAdmin {...this.props} /> : <ComponentUser {...this.props} />): 
          <Redirect to='/signup' />
      )} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(PrivateRoute);