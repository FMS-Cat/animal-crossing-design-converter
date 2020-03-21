import { Color } from './Color';
import React from 'react';
import { State } from '../states/store';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// == styles =======================================================================================
const Root = styled.div`
  display: flex;
  flex-direction: row;
`;

// == component ====================================================================================
export const Colors = (): JSX.Element => {
  const colors = useSelector( ( state: State ) => state.designer.colors );

  return (
    <Root>
      { colors.map( ( color, iColor ) => (
        <Color
          key={ iColor }
          color={ color }
          iColor={ iColor }
        />
      ) ) }
    </Root>
  );
};
