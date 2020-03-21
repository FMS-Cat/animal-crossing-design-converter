import { Reducer } from 'redux';
import { produce } from 'immer';

// == state ========================================================================================
export interface State {
  selectedColor: number[];
}

export const initialState: Readonly<State> = {
  selectedColor: []
};

// == action =======================================================================================
export type Action = {
  type: 'Matrix/SelectColor';
  color: number;
} | {
  type: 'Matrix/UnselectColor';
  color: number;
};

// == reducer ======================================================================================
export const reducer: Reducer<State, Action> = ( state = initialState, action ) => {
  return produce( state, ( newState: State ) => {
    if ( action.type === 'Matrix/SelectColor' ) {
      if ( state.selectedColor.indexOf( action.color ) === -1 ) {
        newState.selectedColor.push( action.color );
      }
    } else if ( action.type === 'Matrix/UnselectColor' ) {
      const i = state.selectedColor.indexOf( action.color );
      if ( i !== -1 ) {
        newState.selectedColor.splice( i, 1 );
      }
    }
  } );
};
