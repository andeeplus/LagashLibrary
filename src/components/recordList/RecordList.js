import React, { Component } from 'react';
import RecordCard from '../recordList/RecordCard/RecordCard'
import { withRouter} from 'react-router'
import { connect } from 'react-redux';
import PageTitle from '../htmlElements/PageTitle'



class RecordList extends Component {

  titleId = () => {

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

    const {records, cardType} = this.props
    console.log(records)
    return (

      <React.Fragment>
      { cardType && <PageTitle titleProps={this.titleId}/> }

      <div className='RecordList'>
        {records && records.map((records,index) => {
            return (
              <div key={records.id+index} className='RecordList-item'>
                <RecordCard card={{
                  id:records.id,
                  artist:records.artist,
                  title:records.title,
                  label:records.label,
                  style:records.style,
                  genre:records.genre,
                  format:records.format || [],
                  country:records.country,
                  catno:records.catno,
                  cover_image: cardType === 'small' ? records.thumb : records.cover_image,
                  year:records.year,
                  type: records.type ? records.type : 'release',
                  cardType:cardType
                  }}/>
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


