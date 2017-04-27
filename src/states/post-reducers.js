//Main
const initMainState = {
  navbarToggle: false,
  searchText: ''
}

export function mainReducer(state = initMainState, action) {
  switch (action.type) {
    case '@POST/SET_NAVBAR_TOGGLE':
      return {
        ...state,
        navbarToggle: !state.navbarToggle
      };
      case '@POST/SEARCH_POST':
        return {
          ...state,
          searchText: action.text
        };
    default:
      return state;
  }
}

//Today
const initTodayState = {
    postLoading: false,
    posts: []
};

export function todayReducer(state = initTodayState, action) {
    switch (action.type) {
        case '@POST/START_LISTING_POST':
            return {
                ...state,
                postLoading: true
            };
        case '@POST/END_LISTING_POST':
            return {
                ...state,
                postLoading: false,
                posts: action.posts
            }
        case '@POST/ERROR_LISTING_POST':
            return initTodayState;
        default:
            return state;
    }
}

//PostForm
const initPostFormState = {
    inputValue: '',
    inputDanger: false,
    moodToggle: false,
    mood: 'na'
};

export function postFormReducer(state = initPostFormState, action) {
    switch (action.type) {
        case '@POST/SET_MOOD':
            return {
                ...state,
                mood: action.mood
            }
        case '@POST/SET_INPUT_VALUE':
            return {
                ...state,
                inputValue: action.text
            }
        case '@POST/SET_INPUT_DANGER':
              return {
                ...state,
                inputDanger: action.bool
            };
        case '@POST/SET_MOOD_TOGGLE':
            return {
                ...state,
                moodToggle: action.bool
            };
        default:
            return state;
    }
}

//PostItem
const initPostItemState = {
    tooltipOpen: {}
};

export function postItemReducer(state = initPostItemState, action) {
    let arr=state.tooltipOpen;
    switch (action.type) {
      case '@POST/SET_TOOLLTIP_OPEN':
          arr[action.id]=true;
          return {
              ...state,
              tooltipOpen: arr
          };
      case '@POST/TOOLTIP_TOGGLE':
          arr[action.id]=!arr[action.id];
          return {
              ...state,
              tooltipOpen: arr
          }
      case '@POST/SET_TOOLLTIP_CLOSE':
          arr[action.id]=false;
          return {
              ...state,
              tooltipOpen: arr
          }
      default:
          return state;
    }
}
