import { MatrixPixel } from './MatrixPixel';
import React from 'react';
import { State } from '../states/store';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// == styles =======================================================================================
const Root = styled.div`
  width: 256px;
  height: 256px;
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
          color={ colors[ pixel ] }
          iColor= { pixel }
        />
      ) ) }
    </Root>
  );
};
