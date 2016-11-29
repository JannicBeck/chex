import { createStore } from 'redux';

const MOVE = 'MOVE';

const reducer = (state, action) => {
  switch (action.type) {
    case MOVE:
      return state;
    default:
      return state;
  }
};

let store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({type: MOVE, payload: {
  from: 'e7',
  to: 'e6'
}});