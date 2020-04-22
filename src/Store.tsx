import React from "react";
import { createContext } from "react";

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
  useStepper: boolean | undefined;
  stepperComponents: React.ReactElement[] | undefined;
}

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
  stepperComponents?: React.ReactElement[];
}

const initialState: IGlobalState = {
  source: defaultSource,
  library: defaultLibaray,
  language: defaultLanguage,
  playgroundEditorValue: defaultValue,
  replValue: defaultReplValue,
  replComponents: [],
  eval: false,
  run: false,
  useStepper: false,
  stepperComponents: [],
};

export const Store = createContext<IGlobalState | any>(initialState);

function reducer(
  globalState: IGlobalState,
  action: IGlobalAction
): IGlobalState {
  switch (action.type) {
    case "CHANGE_SOURCE":
      return {
        ...globalState,
        source: action.source,
      };
    case "CHANGE_LIBRARY":
      return {
        ...globalState,
        library: action.library,
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
      var l: number = globalState.replValue.length;
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
