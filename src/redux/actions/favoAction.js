import DatabaseApi from '../../../src/services/dbApi'

  export function setFavo(userId){

      return async function(dispatch){

        const getFavLabelPromise = DatabaseApi.getFavouriteById('labelFav',userId)
        const getFavArtistPromise = DatabaseApi.getFavouriteById('artistFav',userId)
        const getFavReleasePromise = DatabaseApi.getFavouriteById('releaseFav',userId)
        const getFavMasterPromise = DatabaseApi.getFavouriteById('masterFav',userId)
    
        let [labels, artists, releases, masters] = await Promise.all([getFavLabelPromise, getFavArtistPromise, getFavReleasePromise, getFavMasterPromise])
        
        let labelId;
        let artistId;
        let releaseId;
        let masterId;

        if (labels !== null ) {
          delete labels.id; 
          labelId = Object.keys(labels)
        } else {labelId = []} 

        if (artists !== null ) {
          delete artists.id; 
          artistId = Object.keys(artists)
        } else {artistId = []} 

        if (releases !== null ) {
          delete releases.id; 
          releaseId = Object.keys(releases)
        } else {releaseId = []} 

        if (masters !== null ) {
          delete masters.id; 
          masterId = Object.keys(masters)
        } else {masterId = []} 
        

        if(!labels && !artists && !releases && !masters){ 
          
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