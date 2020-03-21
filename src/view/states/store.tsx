import * as Designer from './Designer';
import * as Matrix from './Matrix';
import { combineReducers, createStore } from 'redux';

// == state ========================================================================================
export interface State {
  designer: Designer.State;
  matrix: Matrix.State;
}

// == action =======================================================================================
export type Action = (
  Designer.Action |
  Matrix.Action
);

// == reducer ======================================================================================
const reducer = combineReducers<State>( {
  designer: Designer.reducer,
  matrix: Matrix.reducer
} );

// == store ========================================================================================
const devtools = ( window as any ).__REDUX_DEVTOOLS_EXTENSION__;
export const store = createStore(
  reducer,
  devtools && devtools()
);
