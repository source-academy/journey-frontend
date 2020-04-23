import React from "react";
import { createContext } from "react";
import {
  INIT_INVITE,
  FINISH_INVITE,
  SET_EDITOR_SESSION_ID,
  SET_WEBSOCKET_STATUS,
} from "./actionTypes";

const defaultSource: string = "Source";
const defaultLanguage: string = "Language";
const defaultRunTime: string = "RunningTime";
const defaultValue: string = "// Type your program in here\n\n";
const defaultReplValue: string[] = [""];

export interface IGlobalState {
  editorSessionId: string | undefined;
  source: string | undefined;
  time: string | undefined;
  language: string | undefined;
  playgroundEditorValue: string | undefined;
  replValue: string[];
  replComponents: React.ReactElement[];
  eval: boolean | undefined;
  run: boolean | undefined;
  useStepper: boolean | undefined;
  stepperComponents: React.ReactElement[] | undefined;
  websocketStatus?: number;
  sharedbAceInitValue?: string;
  sharedbAceIsInviting?: boolean;
}

// Action Interfaces
export interface IGlobalAction {
  editorSessionId: string;
  type: String;
  source?: string;
  time?: string;
  language?: string;
  playgroundEditorValue?: string;
  replValue?: string;
  replComponents?: React.ReactElement;
  eval?: boolean;
  runComponent?: React.ReactElement;
  stepperComponents?: React.ReactElement[];
  websocketStatus: number;
}

const initialState: IGlobalState = {
  source: defaultSource,
  time: defaultRunTime,
  language: defaultLanguage,
  playgroundEditorValue: defaultValue,
  replValue: defaultReplValue,
  replComponents: [],
  eval: false,
  run: false,
  useStepper: false,
  stepperComponents: [],
  // collab editing
  editorSessionId: "",
  sharedbAceInitValue: "",
  sharedbAceIsInviting: false,
  websocketStatus: 0,
};

export const Store = createContext<IGlobalState | any>(initialState);

// Reducers
function reducer(
  globalState: IGlobalState,
  action: IGlobalAction
): IGlobalState {
  switch (action.type) {
    case SET_EDITOR_SESSION_ID:
      console.log("action", action.editorSessionId);
      return {
        ...globalState,
        editorSessionId: action.editorSessionId,
      };
    case "CHANGE_SOURCE":
      return {
        ...globalState,
        source: action.source,
      };
    case "CHANGE_TIME":
      return {
        ...globalState,
        time: action.time,
      };
    case "CHANGE_LANGUAGE":
      return {
        ...globalState,
        language: action.language,
      };
    case "UPDATE_EDITOR_VALUE":
      return {
        ...globalState,
        playgroundEditorValue: action.playgroundEditorValue,
      };
    case "UPDATE_AND_EVAL":
      console.log(action.replValue);
      const value: string =
        action.replValue === undefined ? "" : action.replValue;
      globalState.replValue.push(value);
      return {
        ...globalState,
        replValue: globalState.replValue,
        eval: true,
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
        eval: false,
      };
    case "RUN":
      const newComponent: React.ReactElement =
        action.runComponent === undefined ? <div></div> : action.runComponent;
      return {
        ...globalState,
        replComponents: [newComponent],
        replValue: [""],
        run: true,
      };
    case "TOGGLESTEPPER":
      return {
        ...globalState,
        useStepper: true,
      };
    case "CLOSESTEPPER":
      return {
        ...globalState,
        useStepper: false,
      };
    case "RUNSTEPPER":
      return {
        ...globalState,
        stepperComponents: action.stepperComponents,
      };

    case INIT_INVITE:
      return {
        ...globalState,
        sharedbAceInitValue: action.playgroundEditorValue,
        sharedbAceIsInviting: true,
      };
    case FINISH_INVITE:
      console.log("STOP invite");
      return {
        ...globalState,
        sharedbAceIsInviting: false,
      };
    case SET_EDITOR_SESSION_ID:
      return {
        ...globalState,
        editorSessionId: action.editorSessionId,
      };
    case SET_WEBSOCKET_STATUS:
      return {
        ...globalState,
        websocketStatus: action.websocketStatus,
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
