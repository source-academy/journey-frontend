import React from "react";
import { createContext } from "react";
import { ICollabEditorProps } from "../Workspace/Editor";
import {
  CHANGE_LANGUAGE, 
  CHANGE_SOURCE, 
  CHANGE_LIBRARY, 
  UPDATE_EDITOR_VALUE, 
  INIT_INVITE, 
  FINISH_INVITE, 
  SET_EDITOR_SESSION_ID,
  SET_WEBSOCKET_STATUS
} from './actionTypes';

const defaultSource: string = "Source";
const defaultLanguage: string = "Language";
const defaultLibaray: string = "Library";
const defaultValue: string = "// Type your program in here\n\n";
const defaultReplValue: string[] = [""];


export interface IGlobalState {
  source: string | undefined;
  library: string | undefined;
  language: string | undefined;
  playgroundEditorValue: string | undefined;
  replValue: string[];
  replComponents: React.ReactElement[];
  eval: boolean | undefined;
  run: boolean | undefined;
  CollabEditorState: ICollabEditorProps;
}

// Action Interfaces
export interface IGlobalAction {
  type: String;
  source?: string;
  library?: string;
  language?: string;
  playgroundEditorValue?: string;
  replValue?: string;
  replComponents?: React.ReactElement;
  eval?: boolean;
  runComponent?: React.ReactElement;
}


export interface ICollabAction {
  type: string;
  playgroundEditorValue: string;
  editorSessionId: string;
  websocketStatus: number;
}


// State Interfaces
export const CollabEditorState: ICollabEditorProps = {
  editorSessionId: '',
  sharedbAceInitValue: '',
  sharedbAceIsInviting: false,
  websocketStatus: 0,
};



const initialState: IGlobalState = {
  source: defaultSource,
  library: defaultLibaray,
  language: defaultLanguage,
  playgroundEditorValue: defaultValue,
  replValue: defaultReplValue,
  replComponents: [],
  eval: false,
  run: false,
  CollabEditorState: CollabEditorState
};



export const Store = createContext<IGlobalState | any>(initialState);


// Reducers
function reducer(
  globalState: IGlobalState,
  action: IGlobalAction
): IGlobalState {
  switch (action.type) {
    case "CHANGE_SOURCE":
      return {
        ...globalState,
        source: action.source
      };
    case "CHANGE_LIBRARY":
      return {
        ...globalState,
        library: action.library
      };
    case "CHANGE_LANGUAGE":
      return {
        ...globalState,
        language: action.language
      };
    case "UPDATE_EDITOR_VALUE":
      return {
        ...globalState,
        playgroundEditorValue: action.playgroundEditorValue
      };
    case "UPDATE_AND_EVAL":
      var l: number = globalState.replValue.length;
      const value: string =
        action.replValue === undefined ? "" : action.replValue;
      globalState.replValue.push(value);
      return {
        ...globalState,
        replValue: globalState.replValue,
        eval: true
      };
    case "RUN_EVAL":
      const component: React.ReactElement =
        action.replComponents === undefined ? (
          <div></div>
        ) : (
          action.replComponents
        );
      globalState.replComponents.push(component);
      return {
        ...globalState,
        replComponents: globalState.replComponents,
        eval: false
      };
    case "RUN":
      const newComponent: React.ReactElement =
        action.runComponent === undefined ? <div></div> : action.runComponent;
      return {
        ...globalState,
        replComponents: [newComponent],
        replValue: [""],
        run: true
      };
    default:
      throw new Error();
  }
}

const CollabReducer = (
  globalState: IGlobalState,
  action: ICollabAction
): IGlobalState => {
  switch (action.type) {
    case INIT_INVITE:
      return {
        ...globalState,
        CollabEditorState: {
          ...globalState.CollabEditorState,
          sharedbAceInitValue: action.playgroundEditorValue,
          sharedbAceIsInviting: true
        }
      };
    case FINISH_INVITE:
      return {
        ...globalState,
        CollabEditorState: {
          ...globalState.CollabEditorState,
          sharedbAceIsInviting: false
        }
      };
    case SET_EDITOR_SESSION_ID:
      return {
        ...globalState,
        CollabEditorState: {
          ...globalState.CollabEditorState,
          editorSessionId: action.editorSessionId
        }
      };
    
      case SET_WEBSOCKET_STATUS:
        return {
          ...globalState,
          CollabEditorState: {
            ...globalState.CollabEditorState,
            websocketStatus: action.websocketStatus
          }
        };


    default:
      throw new Error();
  }
}

export function StoreProvider(props: any): JSX.Element {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ globalState, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
