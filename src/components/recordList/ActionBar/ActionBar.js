import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

class ActionBar extends Component {

  linkTo(param,id) {
    switch(param) {
      case 'artist':
        return `/detail/artists/${id}`;
      case 'label':
        return `/detail/labels/${id}`;
      case 'master':
        return `/record/masters/${id}`;
      case 'release':
        return `/record/releases/${id}`;
      default:
        return `/record/releases/${id}`
    }
  }

  render() {
    
    const { id, type } = this.props

    return (

      <div className="list-card-action">
        <Link className="list-card-button" to={this.linkTo(type,id)}>
          <FontAwesomeIcon icon="link" />
        </Link>
        <button className="list-card-button"><FontAwesomeIcon icon="share-square" /></button>
        <button className="list-card-button"><FontAwesomeIcon icon="plus-circle" /></button>
        <button className="list-card-button" onClick={() => this.manageFavs(id)}><FontAwesomeIcon icon="heart" /></button>
      </div>

    );
  }
}


export default ActionBar;