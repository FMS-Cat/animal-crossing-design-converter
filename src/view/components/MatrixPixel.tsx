import { Action, State } from '../states/store';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimalCrossingColor } from '../../AnimalCrossingColor';
import { Dispatch } from 'redux';
import styled from 'styled-components';

// == styles =======================================================================================
const Root = styled.div`
  border-right: 1px solid rgba( 128, 128, 128, 0.5 );
  border-bottom: 1px solid rgba( 128, 128, 128, 0.5 );
`;

// == props ========================================================================================
export interface MatrixPixelProps {
  color: {
    raw: AnimalCrossingColor;
    css: string;
  };
  iColor: number;
}

// == component ====================================================================================
export const MatrixPixel = ( { color, iColor }: MatrixPixelProps ): JSX.Element => {
  const dispatch = useDispatch<Dispatch<Action>>();
  const isSelected = useSelector(
    ( state: State ) => state.matrix.selectedColor.indexOf( iColor ) !== -1
  );

  const handleMouseEnter = useCallback(
    () => {
      dispatch( {
        type: 'Matrix/SelectColor',
        color: iColor
      } );
    },
    [ iColor ]
  );

  const handleMouseLeave = useCallback(
    () => {
      dispatch( {
        type: 'Matrix/UnselectColor',
        color: iColor
      } );
    },
    [ iColor ]
  );

  return (
    <Root
      onMouseEnter={ handleMouseEnter }
      onMouseLeave={ handleMouseLeave }
      style={ {
        backgroundColor: isSelected ? '#f0f' : color.css
      } }
    />
  );
};
