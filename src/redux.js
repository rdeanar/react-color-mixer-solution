const initialState = {
  colors: [],
  selected: {},
  isLoading: false,
  waitingToBeAdded: 0,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_COLORS":
      return {
        ...state,
        isLoading: true
      };

    case "COLORS_LOADED":
      return {
        ...state,
        colors: action.colors,
        isLoading: false
      };

    case "INIT_ADD_COLOR":
      return {
        ...state,
        waitingToBeAdded: state.waitingToBeAdded + 1
      };

    case "ADD_COLOR":
      return {
        ...state,
        colors: [...state.colors, action.color],
        waitingToBeAdded: state.waitingToBeAdded - 1
      };

    case "SELECT_COLOR":
      let selected = { ...state.selected };

      if (selected[action.id]) {
        delete selected[action.id];
      } else {
        selected[action.id] = true;
      }

      return {
        ...state,
        selected
      };

    case "UNSELECT_ALL":
      return {
        ...state,
        selected: {}
      };
    default:
      return state;
  }
}
