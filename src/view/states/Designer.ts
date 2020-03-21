import { AnimalCrossingColor } from '../../AnimalCrossingColor';
import { Designer } from '../../Designer';
import { Reducer } from 'redux';
import { produce } from 'immer';

// == state ========================================================================================
export interface State {
  instance?: Designer;
  matrix: number[];
  colors: Array<{
    raw: AnimalCrossingColor;
    css: string;
  }>;
}

export const initialState: Readonly<State> = {
  matrix: new Array( Designer.WIDTH * Designer.HEIGHT ).fill( 0 ),
  colors: new Array( Designer.COLORS ).fill( {
    raw: new AnimalCrossingColor(),
    css: 'rgb(0,0,0)'
  } ),
};

// == action =======================================================================================
export type Action = {
  type: 'Designer/SetInstance';
  designer: Designer;
} | {
  type: 'Designer/SetMatrix';
  matrix: number[];
} | {
  type: 'Designer/SetColors';
  colors: AnimalCrossingColor[];
};

// == reducer ======================================================================================
export const reducer: Reducer<State, Action> = ( state = initialState, action ) => {
  return produce( state, ( newState: State ) => {
    if ( action.type === 'Designer/SetInstance' ) {
      newState.instance = action.designer;
    } else if ( action.type === 'Designer/SetMatrix' ) {
      newState.matrix = action.matrix;
    } else if ( action.type === 'Designer/SetColors' ) {
      newState.colors = action.colors.map( ( color ) => ( {
        raw: color,
        css: color.toCSSColor()
      } ) );
    }
  } );
};
