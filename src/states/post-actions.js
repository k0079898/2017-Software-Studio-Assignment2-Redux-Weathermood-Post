import {listPosts} from 'api/posts.js';

//handle search
export function setNavbarToggle() {
    return {
        type: '@POST/SET_NAVBAR_TOGGLE',
    }
}

export function searchPost(text) {
    return {
        type: '@POST/SEARCH_POST',
        text: text
    }
}

//handle list post
export function startListingPost() {
    return {
        type: '@POST/START_LISTING_POST'
    }
}

export function endListingPost(posts) {
    return {
        type: '@POST/END_LISTING_POST',
        posts: posts
    }
}

export function errPost() {
    return {
        type: '@POST/ERROR_LISTING_POST'
    }
}

export function listingPost(searchText) {
    return (dispatch, getState) => {
        dispatch(startListingPost());
        return listPosts(searchText).then(posts => {
            dispatch(endListingPost(posts));
        }).catch(err => {
            console.error('Error listing posts', err);
            dispatch(errPost);
        });
    };
}

//handle mood
export function setMood(mood) {
    return {
        type: '@POST/SET_MOOD',
        mood: mood
    }
}

export function setInputValue(text) {
    return {
        type: '@POST/SET_INPUT_VALUE',
        text: text
    }
}

export function setInputDanger(bool) {
    return {
        type: '@POST/SET_INPUT_DANGER',
        bool: bool
    }
}

export function setMoodToggle(bool) {
    return {
        type: '@POST/SET_MOOD_TOGGLE',
        bool: bool
    }
}

//handle vote
export function setTooltipOpen(id) {
  return {
      type: '@POST/SET_TOOLLTIP_OPEN',
      id: id,
  }
}

export function setTooltipClose(id) {
    return {
        type: '@POST/SET_TOOLLTIP_CLOSE',
        id: id
    }
}

export function tooltipToggle(id) {
    return {
        type:  '@POST/TOOLTIP_TOGGLE',
        id: id,
    }
}
