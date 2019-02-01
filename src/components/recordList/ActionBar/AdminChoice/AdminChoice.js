import React, { Component } from 'react';
import DatabaseApi from '../../../../services/dbApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class AdminChoice extends Component {

  addDocumentToSelection(){
    const {actionProps} = this.props
    const userId = actionProps.user.id
    delete actionProps.artist
    delete actionProps.user
    const addToSelection = {[actionProps.id]: {...actionProps}, userId }
    DatabaseApi.createDocumentWithId('selections', {...addToSelection}, 'hotNow')
  }

  render() {
    return (
      <div>
      <button onClick={() => this.addDocumentToSelection()} className="list-card-button-on">
      <FontAwesomeIcon icon="plus-circle" /></button>
      </div>
    );
  }
}

export default AdminChoice;