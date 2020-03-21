import { Action, State } from '../states/store';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimalCrossingColor } from '../../AnimalCrossingColor';
import { Dispatch } from 'redux';
import styled from 'styled-components';

// == styles =======================================================================================
const Root = styled.div<{ boldRight: boolean; boldBottom: boolean }>`
  border-right: ${ ( { boldRight } ) => `1px solid rgba( 128, 128, 128, ${ boldRight ? 1.0 : 0.2 } )` };
  border-bottom: ${ ( { boldBottom } ) => `1px solid rgba( 128, 128, 128, ${ boldBottom ? 1.0 : 0.2 } )` };
`;

// == props ========================================================================================
export interface MatrixPixelProps {
  color: {
    raw: AnimalCrossingColor;
    css: string;
  };
  iColor: number;
  boldRight: boolean;
  boldBottom: boolean;
}

// == component ====================================================================================
export const MatrixPixel = ( props: MatrixPixelProps ): JSX.Element => {
  const { color, iColor, boldRight, boldBottom } = props;
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
      boldRight={ boldRight }
      boldBottom={ boldBottom }
      onMouseEnter={ handleMouseEnter }
      onMouseLeave={ handleMouseLeave }
      style={ {
        backgroundColor: isSelected ? '#f0f' : color.css
      } }
    />
  );
};
