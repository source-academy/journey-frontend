import React, { useEffect, useContext } from "react";
import Workspace from "../Workspace";
// import WorkspaceCom from "../Workspace/WorkspaceCom";
import Editor from "../Workspace/Editor";
import Description from "../Workspace/Description/index";
import CompleteNavBar from "../NavBar";
import { saveState } from "../reducers/localStorage";
import { Store } from "../reducers/Store";
import "./Playground.css";
import Repl2 from "../Workspace/REPL";
import { FINISH_INVITE, SET_WEBSOCKET_STATUS } from "../reducers/actionTypes";

const Playground: React.FC = () => {
  const { globalState, dispatch } = useContext(Store);

  useEffect(() => {
    saveState(globalState);
  });

  // Dispatch collab actions

  const handleEditorValueChange = (newCode: string) => {
    return dispatch({
      type: "UPDATE_EDITOR_VALUE",
      playgroundEditorValue: newCode,
    });
  };

  const finishInvite = () => {
    return dispatch({
      type: FINISH_INVITE,
    });
  };

  const setWebsocketStatus = (websocketStatus: number) => {
    "action ready to setwebsocket status";
    return dispatch({
      type: SET_WEBSOCKET_STATUS,
      websocketStatus: websocketStatus,
    });
  };

  const editorProps = {
    preloadedProg: "",
    callBack: () => {},
    handleEditorValueChange: (newCode: string) => () =>
      handleEditorValueChange(newCode),
    editorSessionId: globalState.editorSessionId,
    websocketStatus: globalState.websocketStatus,
    sharedbAceInitValue: globalState.sharedbAceInitValue,
    sharedbAceIsInviting: globalState.sharedbAceIsInviting,
    handleFinishInvite: () => finishInvite(),
    handleSetWebsocketStatus: (websocketStatus: number) =>
      setWebsocketStatus(websocketStatus),
  };
  return (
    <>
      <CompleteNavBar />
      {/* <div className="playgroundPhone"> */}
      <Workspace
        editor={<Editor {...editorProps} />}
        question={<Description />}
        repl={<Repl2 />}
        // bottomBar={<BottomBar />}
      />
      {/* </div> */}
      {/* <div className="playgroundComputer">
        <WorkspaceCom
          editor={<Editor {...editorProps} />}
          repl={<Description />}
          question={<Repl2 />}

  />*/}
    </>
  );
};

export default Playground;
