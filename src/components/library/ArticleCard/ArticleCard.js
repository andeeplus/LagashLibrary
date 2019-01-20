
import React from 'react';
import PropTypes from 'prop-types';
import {truncateString} from '../../../services/helper'

const ArticleCard = ({property}) => {

    const {title, link, imgArticle, index} = property;
    return (

        <div className="article-card">
        <figure>
          <img src={imgArticle} alt={index}/>
        </figure>
        <a href={link} target="_blank" rel="noopener noreferrer" className="article-mono" key={index}>{truncateString(title,20)}</a>
        </div>

    )
}

ArticleCard.propTypes = {
    property: PropTypes.object.isRequired
}


export default ArticleCard;

// 