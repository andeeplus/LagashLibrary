import React, { Component } from 'react';
import RecordCard from '../recordList/RecordCard/RecordCard'
// import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter} from 'react-router'


class RecordList extends Component {


  titleId(){

    switch (this.props.match.path) {
      case '/detail/artists/:artist':
        return ['Discography', 'music']
      case '/detail/labels/:label':
        return ['Releases', 'music']
      case '/search-page/:query':
        return ['Results', 'search']
      case '/search':
        return ['Results', 'search']
      default:
        console.log('Something bad happened')
    }
  }

  render () {

    const {records, comingFrom} = this.props
    
    return (

      <React.Fragment>
      { comingFrom &&
        <h1 className="page-h1">
        <FontAwesomeIcon icon={this.titleId()[1]} /> 
        {this.titleId()[0]}
        </h1>
      }

      <div className='RecordList'>
        {records && records.map(records => {
            return (
              <div key={records.id} className='RecordList-item'>
                <RecordCard
                  id={records.id}
                  artist={records.artist}
                  title={records.title}
                  label={records.label}
                  style={records.style}
                  genre={records.genre}
                  format={records.format = []}
                  country={records.country}
                  catno={records.catno}
                  cover_image={
                    comingFrom === 'pageDetail' 
                    ? records.thumb : records.cover_image}
                  year={records.year}
                  type={records.type}
                  comingFrom={comingFrom}
                />
              </div>
            )
          })
        }
      </div>
      </React.Fragment>
    )
  }
}



export default withRouter(RecordList)

