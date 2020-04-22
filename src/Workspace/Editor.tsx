import React, { useContext, useRef } from "react";
import sharedbAce from 'sharedb-ace';
import AceEditor from "react-ace";
import { LINKS } from '../utils/constants';
import { checkSessionIdExists } from './collabEditing/';

import "ace-builds/src-noconflict/mode-javascript"; // replace with mode source in the future
import "ace-builds/src-noconflict/theme-tomorrow";
import { IGlobalAction, Store } from "../reducers/Store";

export interface IEditorProps extends IMainEditorProps, ICollabEditorProps {}
    
export interface ICollabEditorProps {
  handleFinishInvite?: () => void;
  handleSetWebsocketStatus?: (websocketStatus: number) => void;
  handleUpdateHasUnsavedChanges?: (hasUnsavedChanges: boolean) => void
}

export interface IMainEditorProps  {
  preloadedProg: string;
  callBack: (newCode: string) => void;
  handleEditorValueChange: (newCode: string) => void;
}



function Editor(props: IEditorProps) {
  const { globalState, dispatch } = useContext(Store);
  const aceEditor: React.RefObject<AceEditor> = React.createRef();;
  let ShareAce: any = null;
  const mounted = useRef();
  const onChangeMethod = (newCode: string) => {
    props.handleEditorValueChange(newCode);
  };

  
  React.useEffect(() => {
      if (!aceEditor.current) {
        return;
      }
      const editor = (aceEditor.current as any).editor;
      // Has session ID
      if (globalState.editorSessionId !== '') {
         handleStartCollabEditing(editor);
      } else if(globalState.editorSessionId === '' && ShareAce !== null) {
        // close port
        ShareAce.WS.close();
      }
      return () => {
        if (ShareAce !== null) {
            // Umounting... Closing websocket
            ShareAce.WS.close();
        }
        ShareAce = null;
        }
    }
  ,[globalState.editorSessionId])

  const handleStartCollabEditing = (editor: any) => {
    console.log("start collab editing")
    const ShareAce = new sharedbAce(globalState.editorSessionId!, {
      WsUrl: 'wss://' + LINKS.SHAREDB_SERVER + 'ws/',
      pluginWsUrl: null,
      namespace: 'codepad'
    });
    ShareAce.on('ready', () => {
      ShareAce.add(
        editor,
        ['code'],
        [
          // SharedbAceRWControl,
          // SharedbAceMultipleCursors
        ]
      );
      if (globalState.sharedbAceIsInviting) {
        console.log("editor is inviting")
        props.handleEditorValueChange(globalState.sharedbAceInitValue!);
        props.handleFinishInvite!();
      }
    });

    // WebSocket connection status detection logic
    const WS = ShareAce.WS;
    let interval: any;
    const sessionIdNotFound = () => {
      clearInterval(interval);
      WS.close();
    };
    const cannotReachServer = () => {
      WS.reconnect();
    };
    const checkStatus = () => {
      if (ShareAce === null) {
        return;
      }
      checkSessionIdExists(
        globalState.editorSessionId,
        () => {},
        sessionIdNotFound,
        cannotReachServer
      );
    };
    // Checks connection status every 5sec
    interval = setInterval(checkStatus, 5000);

    WS.addEventListener('open', (event: Event) => {
      props.handleSetWebsocketStatus!(1);
    });
    WS.addEventListener('close', (event: Event) => {
      console.log('port close by event listenr')
      props.handleSetWebsocketStatus!(0);
    });
  };


  
  return (
    <AceEditor
      className="react-ace"
      mode="javascript"
      theme="black"
      height="90vh"
      width="inherit"
      ref={aceEditor}
      editorProps={{
        $blockScrolling: Infinity
      }}
      debounceChangePeriod={200}
      fontSize={16}
      highlightActiveLine={false}
      tabSize={4}
      value={globalState.playgroundEditorValue}
      onChange={onChangeMethod}
      style={{ zIndex: 0 }}
      setOptions={{
        fontFamily: "'Inconsolata', 'Consolas', monospace",
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true
      }}
    />
  );

}

export default Editor;
