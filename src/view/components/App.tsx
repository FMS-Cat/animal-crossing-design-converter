import React, { useCallback } from 'react';
import { Colors } from './Colors';
import { Designer } from '../../Designer';
import { DesignerStateListener } from './DesignerStateListener';
import { Matrix } from './Matrix';
import { Provider } from 'react-redux';
import { store } from '../states/store';
import styled from 'styled-components';

// == styles =======================================================================================
const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

// == props ========================================================================================
export interface AppProps {
  designer: Designer;
}

// == component ====================================================================================
const Fuck = ( { designer }: AppProps ): JSX.Element => {
  const handleDragOver = useCallback(
    ( event: React.DragEvent ) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    ( event: React.DragEvent ) => {
      event.preventDefault();

      const file = event.dataTransfer!.files[ 0 ];
      const blob = new Blob( [ file ] );
      const url = URL.createObjectURL( blob );
      const img = document.createElement( 'img' );
      img.onload = () => {
        designer.loadImage( img, true );
      };
      img.src = url;
    },
    [ designer ]
  );

  return (
    <Root onDragOver={ handleDragOver } onDrop={ handleDrop }>
      <DesignerStateListener designer={ designer } />
      <Colors />
      <Matrix />
    </Root>
  );
};

export const App = ( props: AppProps ): JSX.Element => (
  <Provider store={ store }>
    <Fuck { ...props } />
  </Provider>
);
