import React, { useCallback, useState } from 'react';
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
  const [ enableTransparent, setEnableTransparent ] = useState( true );
  const [ dither, setDither ] = useState( false );

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
        designer.loadImage( img, enableTransparent, dither );
      };
      img.src = url;
    },
    [ designer, enableTransparent, dither ]
  );

  return (
    <Root onDragOver={ handleDragOver } onDrop={ handleDrop }>
      <div>
        <input
          type="checkbox"
          checked={ enableTransparent }
          onClick={ () => setEnableTransparent( !enableTransparent ) }
        /> enable transparent
      </div>
      <div>
        <input
          type="checkbox"
          checked={ dither }
          onClick={ () => setDither( !dither ) }
        /> dither
      </div>
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
