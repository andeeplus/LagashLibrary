import React, { Component } from 'react';
import RecordCard from '../recordList/RecordCard/RecordCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter} from 'react-router'
import { connect } from 'react-redux';

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
    }
  }
 

  render () {

    const {records, comingFrom} = this.props
    const year = isNaN(records.year) ? records.year : records.year.toString()
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
                  year={year}
                  type={
                    records.type
                    ? records.type
                    : 'release'
                  }
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



const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default withRouter(connect(mapStateToProps)(RecordList));


