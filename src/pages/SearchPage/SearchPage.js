import React, { Component } from 'react';
import RecordList from '../../components/recordList/RecordList'
import Loading from '../../components/Loading/Loading'
import {DiscogsApi} from '../../services/DiscogsApi'

const urlData = {
  rootUrl: 'https://api.discogs.com/database/',
  search: 'search?q=',
  pages: '&page=',
  perPages: '&per_page=',
}


class SearchPage extends Component {

  state = {
    page: 1,
    perPage: 20,
    loading: true,
    query: 'pitch down',
    results: []
  }

  async fetchData(query){

    const {rootUrl, search, pages, perPages} = urlData
    const {page, perPage} = this.state
    const url = `${rootUrl}${search}${query}${pages}${page}${perPages}${perPage}`

    const results = await DiscogsApi.getQuery(url)

    this.setState({results: results.results, query: this.props.match.params.query, loading:false})

  }

  componentDidMount() {
    const {query} = this.props.match.params

      query
      ? this.fetchData(query)
      : this.fetchData(this.state.query)

    
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.fetchData(this.props.match.params.query)
      
    }
  }

  changePage = (dir) => {
    let {page} = this.state
    
    dir === 'prev' && page <= 1 
    ? page = 1 
    : this.setState({page: page -1, loading: true},()=>{this.fetchData(this.state.query)});
    

    dir === 'next' 
    && this.setState({page: page +1, loading: true},()=>{this.fetchData(this.state.query)});

    window.scrollTo(0, 0)

    console.log(this.state.page)

  }


  render() {

    const {loading, results} = this.state
    
    return (
      loading
      ? <Loading />
      : <div className="pages-blocks">
        <div>
          <RecordList records={results} comingFrom={'searchPage'}/>
        </div>
        <div className="button-line-move">
          <button className="butt-move" onClick={() => this.changePage('prev')} type="button">
            Prev
          </button>
          <button className="butt-move" onClick={() => this.changePage('next')} type="button">
            Next
          </button>
        </div>
      </div>
    );
  }
}


export default SearchPage;
