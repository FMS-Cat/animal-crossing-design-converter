import React, { useEffect } from 'react';
import { Action } from '../states/store';
import { Designer } from '../../Designer';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// == styles =======================================================================================
const Root = styled.div`
  display: none;
`;

// == element ======================================================================================
export interface DesignerStateListenerProps {
  designer: Designer;
}

export const DesignerStateListener = ( props: DesignerStateListenerProps ): JSX.Element => {
  const dispatch = useDispatch<Dispatch<Action>>();
  const designer = props.designer;

  useEffect(
    () => {
      dispatch( {
        type: 'Designer/SetInstance',
        designer
      } );

      dispatch( {
        type: 'Designer/SetMatrix',
        matrix: designer.matrix
      } );

      dispatch( {
        type: 'Designer/SetColors',
        colors: designer.colors
      } );

      designer.on( 'changeMatrix', ( { matrix } ) => {
        dispatch( {
          type: 'Designer/SetMatrix',
          matrix
        } );
      } );

      designer.on( 'changeColors', ( { colors } ) => {
        dispatch( {
          type: 'Designer/SetColors',
          colors
        } );
      } );
    },
    [ designer ]
  );

  return (
    <Root />
  );
};
