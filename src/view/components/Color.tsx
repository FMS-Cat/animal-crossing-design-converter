import { Action, State } from '../states/store';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimalCrossingColor } from '../../AnimalCrossingColor';
import { Dispatch } from 'redux';
import styled from 'styled-components';

// == styles =======================================================================================
const Pixel = styled.div`
  width: 32px;
  height: 32px;
`;

const Value = styled.div`
  text-align: right;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

// == props ========================================================================================
export interface ColorProps {
  color: {
    raw: AnimalCrossingColor;
    css: string;
  };
  iColor: number;
}

// == component ====================================================================================
export const Color = ( { color, iColor }: ColorProps ): JSX.Element => {
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
    <Root>
      <Pixel
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }
        style={ {
          backgroundColor: isSelected ? '#f0f' : color.css
        } }
      />
      <Value>{ color.raw.h }</Value>
      <Value>{ color.raw.s }</Value>
      <Value>{ color.raw.v }</Value>
    </Root>
  );
};
