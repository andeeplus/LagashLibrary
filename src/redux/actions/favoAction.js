import DatabaseApi from '../../../src/services/dbApi'

  export function setFavo(userId){

      return async function(dispatch){

        const getFavLabelPromise = DatabaseApi.getDocumentById('labelFav',userId)
        const getFavArtistPromise = DatabaseApi.getDocumentById('artistFav',userId)
        const getFavReleasePromise = DatabaseApi.getDocumentById('releaseFav',userId)
        const getFavMasterPromise = DatabaseApi.getDocumentById('masterFav',userId)
    
        let [labels, artists, releases, masters] = await Promise.all([getFavLabelPromise, getFavArtistPromise, getFavReleasePromise, getFavMasterPromise])
        
        let labelId = []
        let artistId = []
        let releaseId = []
        let masterId = []

        labels !== null && delete labels.id; labelId = Object.keys(labels)
        artists !== null && delete artists.id; artistId = Object.keys(artists)
        releases !== null && delete releases.id; releaseId = Object.keys(releases)
        masters !== null  && delete masters.id; masterId = Object.keys(masters)
        

        if(!labels || !artists || !releases || !masters){ 
          dispatch({type: 'SET_FAVO_EMPTY', 
                    favourites:{},
                    favoIds:{},
                  })
        } else {
          dispatch({type: 'SET_FAVO', 
                    favourites: {labels, artists, releases, masters},
                    favoIds: {labelId, artistId, releaseId, masterId }
                  })
        }
    }
  }