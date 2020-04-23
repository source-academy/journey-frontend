import React, { useContext } from "react";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BottomBar from "./BottomBar";
import "./index.css";
import { Store } from "../reducers/Store";

export interface IWorkspaceProps {
  repl: React.ReactElement;
  editor: React.ReactElement;
  question: React.ReactElement;
}

export interface IWorkspaceState {
  runState: boolean;
  editorInput: string;
}

export interface IWorkspaceStyleState {
  leftPanelWidth: number;
  rightPanelWidth: number;
}

export default function (props: IWorkspaceProps) {
  const { globalState } = useContext(Store);

  let [style, setStyle]: [IWorkspaceStyleState, Function] = React.useState({
    leftPanelWidth: 50,
    rightPanelWidth: 50,
  });

  let [isResizing, setIsResizing]: [boolean, Function] = React.useState(false);

  const phoneBreakpoint = 800;
  const inPhoneMode = useMediaQuery(`(max-width:${phoneBreakpoint}px)`);

  const handleResize = () => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  const resize = (e: MouseEvent) => {
    let editorWidth = (e.clientX * 100) / window.innerWidth;
    if (editorWidth >= 30 && editorWidth <= 60) {
      setStyle({
        ...style,
        leftPanelWidth: (e.clientX * 100) / window.innerWidth,
        rightPanelWidth: 100 - (e.clientX * 100) / window.innerWidth,
      });
      setIsResizing(true);
    }
  };

  const stopResize = () => {
    window.removeEventListener("mousemove", resize);
    setIsResizing(false);
  };

  return inPhoneMode ? (
    <>
      <div className="root">
        <div className="root-mobile">
          <div id="main-editor" className="right-panel">
            {props.editor}
          </div>
          <div id="repl" className="left-panel">
            {props.repl}
          </div>

          <div id="question" className="right-panel">
            {props.question}
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  ) : (
    <div className={clsx("root", isResizing && "is-resizing")}>
      <div
        className="left-panel"
        style={{ width: `${style.leftPanelWidth}vw` }}
      >
        {props.editor}
        <div className="resizer" onMouseDown={handleResize}></div>
      </div>
      <div
        className="right-panel"
        style={{ width: `${style.rightPanelWidth}vw` }}
      >
        {props.question}
        {globalState.useStepper ? <div></div> : props.repl}
      </div>
    </div>
  );
}
