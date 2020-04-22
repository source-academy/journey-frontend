import React, { useContext } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./workspace.css";
import { Store, IGlobalAction } from "../reducers/Store";

export interface IWorkspaceProps {
  repl: React.ReactElement;
  editor: React.ReactElement;
  question: React.ReactElement;
}

export interface IWorkspaceState {
  runState: boolean;
  editorInput: string;
  leftPanelWidth: number;
  rightPanelWidth: number;
}

export default function WorkspaceCom(props: IWorkspaceProps) {
  let [state, setState]: [IWorkspaceState, Function] = React.useState({
    runState: false,
    editorInput: "", // initially named code
    leftPanelWidth: 50,
    rightPanelWidth: 50,
  });

  const { globalState, dispatch } = useContext(Store);

  const phoneBreakpoint = 800;
  const inPhoneMode = useMediaQuery(`(max-width:${phoneBreakpoint}px)`);
  React.useEffect(() => {
    if (inPhoneMode) {
      setState({
        ...state,
        leftPanelWidth: 100,
        rightPanelWidth: 100,
      });
    } else {
      setState({
        ...state,
        leftPanelWidth: 50,
        rightPanelWidth: 50,
      });
    }
  }, [inPhoneMode]);

  const callBackFromRepl = () => {
    setState({
      ...state,
      runState: true,
    });
  };

  const callBackFromReplStop = () => {
    setState({
      ...state,
      runState: true,
    });
  };

  const callBackFromEditor = (childData: string) => {
    setState({
      ...state,
      editorInput: childData,
    });
  };

  const handleResize = () => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  const resize = (e: MouseEvent) => {
    let editorWidth = (e.clientX * 100) / window.innerWidth;
    if (editorWidth >= 30 && editorWidth <= 60) {
      setState({
        ...state,
        leftPanelWidth: (e.clientX * 100) / window.innerWidth,
        rightPanelWidth: 100 - (e.clientX * 100) / window.innerWidth,
      });
    }
  };

  const stopResize = () => {
    window.removeEventListener("mousemove", resize);
  };

  return (
    <div className="root">
      <div
        className="left-panel"
        style={{ width: `${state.leftPanelWidth}vw` }}
      >
        {props.editor}
        <div className="resizer" onMouseDown={handleResize}></div>
      </div>
      <div style={{ width: `${state.rightPanelWidth}vw` }}>
        {props.question}
        {globalState.useStepper ? <div></div> : props.repl}
      </div>
    </div>
  );
}
