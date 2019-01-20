# Lagash Library

## Why Lagash?

LAGASH, or Sirpurla, one of the oldest centres of Sumerian civilization in Babylonia. It is represented by a rather low, long line of ruin mounds, along the dry bed of an ancient canal, some 3 m. E. of the Shatt-el-Haī and a little less than 10 m. N. of the modern Turkish town of Shatra. These ruins were discovered in 1877 by Ernest de Sarzec, at that time French consul at Basra, who was allowed, by the Montefich chief, Nasir Pasha, the first Wali-Pasha, or governor-general, of Basra, to excavate at his pleasure in the territories subject to that official. At the outset on his own account, and later as a representative of the French government, under a Turkish firman, de Sarzec continued excavations at this site, with various intermissions, until his death in 1901, after which the work was continued under the supervision of the Commandant Cros. The principal excavations were made in two larger mounds, one of which proved to be the site of the temple, E-Ninnu, the shrine of the patron god of Lagash, Nin-girsu or Ninib. This temple had been razed and a fortress built upon its ruins, in the Greek or Seleucid period, some of the bricks found bearing the inscription in Aramaic and Greek of a certain Hadad-nadin-akhe, king of a small Babylonian kingdom. It was beneath this fortress that the numerous statues of Gudea were found, which constitute the gem of the Babylonian collections at the Louvre. These had been decapitated and otherwise mutilated, and thrown into the foundations of the new fortress. From this stratum came also various fragments of bas reliefs of high artistic excellence. [...]

**In a small outlying mound de Sarzec discovered __the archives of the temple, about 30,000 inscribed clay tablets__, containing the business records, and revealing with extraordinary minuteness the administration of an ancient Babylonian temple, the character of its property, the method of farming its lands, herding its flocks, and its commercial and industrial dealings and enterprises; for an ancient Babylonian temple was a great industrial, commercial, agricultural and stock-raising establishment.**

![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/The_name_of_Enannatum_I%2C_ruler_or_king_of_Lagash_is_mentioned_in_this_inscribed_cuneiform_text._Detail_of_a_stone_plaque._Circa_2420_BCE._From_Girsu%2C_Iraq._The_British_Museum%2C_London.jpg/1920px-thumbnail.jpg)

[More Infos](https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lagash)

## Ok, but why Lagash?

Lagash Library born as an excel sheet on the cloud where some friends used to share new music and forgotten gems.
<br><br>
Creating a good channel where to discover relevant information outside the mass channels at our disposal is something we have been always attracted to.
<br><br>
Powered by the Discogs API this simple project born to make possible collecting valuable infos from the largest music database on the planet, thanks to the help of a reduced amount of passionate user. 
This time using a web App.
<br><br>
Join Lagash!

All this information can be seen by everybody on the web but just selected users can edit and add items to it.

As a plus I'd like also the idea of sharing and interchange records, sometimes we are tired about them and we would like to sell it, why not change it?

Not many web platforms are exchange-based, at least musically speaking.
This small application potentially could fill the gap.

**Sharing is living**

_Peace_	☮


## API Database

[Discogs API](https://www.discogs.com/developers/)
[Node.js - Disconnect](https://github.com/bartve/disconnect)

## Structure & Pages

1.  Lagash Library Pages
    - **Home**
    - **Search**
    - **Artist Detail**
    - **Record Detail**
    - **Label Detail**
    - **Library**
    - **LogIn**
      - **Interchange** *(isLogged)*
      - **User Area** *(isLogged)*


2.  Pages Detail / Comoponents
    - **Common Components**
    - Header --> *Sticky Header - Always*
      - Navbar
        - Home
        - Search
        - Library
        - User Area
    - Footer --> *Sticky Footer - Always*
    - **Home**
      - Hot now *(Editorial record picks)*
      - Recently added as favourites
      - Random Selections by users collections
    - **Search**
      - Search Component
      - **Record List**
        - **Record Card**
          - **Action Bar** *(Always visible, active if logged)*
            - Add to faves
            - Add to collection
            - Add to wantlist
            - Add to interchange
            - Link to detail page
    - **Library**
      - Hot now artist *(Artist with most articles added recently)*
      - Editorial picks *(Editorial chosen artist)*
      - Recently added articles *(Latest articles uploaded)*
    - **Login**
      - LogIn Module
    - **Interchange**
      - Record List
        - Record Card
      - Interchange Form Area
    - **User Area**
      - Personal Details 
      - Message Area 
        - Message page
          - Message Compo
      - Collection 
        - Wantlist 
        - Owned 

## Built With

* [React](https://reactjs.org/)
* [React-Router](https://reacttraining.com/react-router/)
* [Sass](https://sass-lang.com/)
* [Firebase](https://firebase.google.com/)
* [Redux](https://redux.js.org/)

```
npm install create-react-app
npm install node-sass
npm install redux
npm install axios
npm install react-redux
npm install redux-thunk
npm install redux-logger
npm install redux-promise-middleware
```

# Modelo de Datos

## User

```
  static propTypes = {
    age: PropTypes.number,
    name: PropTypes.string,
    userName: PropTypes.string,
    profilePic: PropTypes.string,
    genreFave: PropTypes.array,
    recordCollection: {
      faves: PropTypes.array,
      wantlist: PropTypes.array,
      collection/interchange? : PropTypes.array,
    }
  }
```

## Record

```
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.string,
    cover_image: PropTypes.string,
    versions: PropTypes.array,
    label: PropTypes.array,
    style: PropTypes.array,
    genre: PropTypes.array,
    format: PropTypes.array,
    country: PropTypes.string,
    catno: PropTypes.string,
    tag: PropTypes.string // extra API
  }
```

## Artist

```
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    websites: PropTypes.array,
    aliases: PropTypes.array,
    country: PropTypes.string,
    genre: PropTypes.array,
    labels: PropTypes.array,
    releases: {
      albums: PropTypes.array,
      singles: PropTypes.array, 
      compilations: PropTypes.array,
      videos: PropTypes.array,
      misc: PropTypes.array
    }
  }

```

# Discogs API
https://www.discogs.com/applications/edit/21925

```
Consumer Key	SjjOjqWnqWohCWnuPfro
Consumer Secret	diyiYYaRVmAMBaqizxudyAhrBdHlVwbd
Request Token URL	https://api.discogs.com/oauth/request_token
Authorize URL	https://www.discogs.com/oauth/authorize
Access Token URL	https://api.discogs.com/oauth/access_token
```