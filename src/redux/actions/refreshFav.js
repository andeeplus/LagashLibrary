import  DatabaseApi from '../../services/dbApi'

export const refreshFav = (user, actionType, actionProps, favourites, favoIds) => {

  const { id, cover_image = '', title = '', year = '', catno = '', type = '', artist = '' } = actionProps

  return (dispatch) => {
    
    if(actionType === 'REMOVE'){

      switch(type){
        case 'label':
          DatabaseApi.removeItemFromDoc('labelFav', user.id, id)
          delete favourites.labels[id]; 
          favoIds.labelId.splice(favoIds.labelId.indexOf(id.toString()),1)
        break;

        case 'artist':
          DatabaseApi.removeItemFromDoc('artistFav', user.id, id)
          delete favourites.artists[id]
          favoIds.artistId.splice(favoIds.artistId.indexOf(id.toString()),1)
        break;

        case 'release':
          DatabaseApi.removeItemFromDoc('releaseFav', user.id, id)
          delete favourites.releases[id]
          favoIds.releaseId.splice(favoIds.releaseId.indexOf(id.toString()),1)
        break;

        case 'master':
          DatabaseApi.removeItemFromDoc('masterFav', user.id, id)
          delete favourites.masters[id]
          favoIds.masterId.splice(favoIds.masterId.indexOf(id.toString()),1)
        break;

        default:
      }
    } else if(actionType === 'ADD'){
      console.log(artist, title)
      switch(type){

        case 'label':
          const labelFav = {cover_image, id, title, type}
          DatabaseApi.updateDocument('labelFav', {[id]:labelFav}, user.id)
          favourites.labels[id] = labelFav
          favoIds.labelId.push(id.toString())
        break;

        case 'artist':
          const artistFav = {artist: title, cover_image, id, type} 
          DatabaseApi.updateDocument('artistFav', {[id]:artistFav}, user.id)
          favourites.artists[id] = artistFav
          favoIds.artistId.push(id.toString())
        break;

        case 'release':
          const releaseFav = {cover_image, id, title: (artist,title), type, year, catno}
          DatabaseApi.updateDocument('releaseFav', {[id]:releaseFav}, user.id)
          favourites.releases[id] = releaseFav
          favoIds.releaseId.push(id.toString())
        break;

        case 'master':
          const masterFav = {artist, cover_image, id, title, type, year, catno}
          DatabaseApi.updateDocument('masterFav', {[id]:masterFav}, user.id)
          favourites.masters[id] = masterFav
          favoIds.masterId.push(id.toString())
        break;

        default:
    }



    dispatch({type: "SET_FAVO", 
      favourites: {...favourites},
      favoIds: {...favoIds}
    })
  }
}

}