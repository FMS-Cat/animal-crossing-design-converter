import { Designer } from '../../Designer';
import { MatrixPixel } from './MatrixPixel';
import React from 'react';
import { State } from '../states/store';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// == styles =======================================================================================
const Root = styled.div`
  width: 512px;
  height: 512px;
  display: grid;
  grid-template-columns: repeat( 32, 1fr );
`;

// == component ====================================================================================
export const Matrix = (): JSX.Element => {
  const { matrix, colors } = useSelector( ( state: State ) => ( {
    matrix: state.designer.matrix,
    colors: state.designer.colors
  } ) );

  return (
    <Root>
      { matrix.map( ( pixel, iPixel ) => (
        <MatrixPixel
          key={ iPixel }
          boldRight={ iPixel % 8 === 7 }
          boldBottom={ Math.floor( iPixel / Designer.WIDTH ) % 8 === 7 }
          color={ colors[ pixel ] }
          iColor= { pixel }
        />
      ) ) }
    </Root>
  );
};
