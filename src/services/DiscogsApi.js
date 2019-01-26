import axios from 'axios'

export class DiscogsApi {

  static async getQuery (url) {
      return DiscogsApi._search(url)
    }

  static _search = async (url) => {

    try {
      let results = await axios({
           url: url,
           method: 'get',
           timeout: 8000,
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Discogs key=SjjOjqWnqWohCWnuPfro, secret=diyiYYaRVmAMBaqizxudyAhrBdHlVwbd',
               'Accept': 'application/vnd.discogs.v2.html+json'
           }
       })
   if (results.status === 200) {
       
   }    
       return results.data
   }
   catch (err) {
       console.error(err);
   }
  }

}




