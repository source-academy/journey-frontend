import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { checkSessionIdExists, createNewSession } from '../Workspace/collabEditing';
import { Store, IGlobalAction } from "../reducers/Store";
import {
    INIT_INVITE, 
    FINISH_INVITE, 
    SET_EDITOR_SESSION_ID,
    SET_WEBSOCKET_STATUS
  } from '../reducers/actionTypes';
import { Popover, Typography } from "@material-ui/core";

export type SessionButtonsState = {
    editorSessionId?: string;
    editorValue?: string | null;
    // handleInitInvite?: (value: string) => void;
    // handleInvalidEditorSessionId?: () => void;
    // handleSetEditorSessionId?: (editorSessionId: string) => void;
    websocketStatus?: number;
    joinElemValue: string;

  };


  
const SessionControl: React.FC = () => {
    const {globalState, dispatch } = useContext(Store);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [inviteAnchorEl, setInviteAnchorEl] = React.useState<null | HTMLElement>(null);
    const [joinAnchorEl, setJoinAnchorEl] = React.useState<null | HTMLElement>(null);

    const [state, setState] = React.useState<SessionButtonsState>({
        joinElemValue: ""
    });


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleInviteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setInviteAnchorEl(event.currentTarget);
        handleStartInvite();

    };
    const handleJoinClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setJoinAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleInviteClose = () => {
        setInviteAnchorEl(null);
    }

    const handleJoinClose = () => {
        setJoinAnchorEl(null);
    }

    // Actions

    const handleSetEditorSessionId = (editorSessionId: String) => {
        return dispatch({
            type: SET_EDITOR_SESSION_ID,
            editorSessionId: editorSessionId
          });
    }

    const handleInitInvite = (code: String) => {
        return dispatch({
            type: INIT_INVITE,
            sharedbAceInitValue: code
          });
    }

    const handleInvalidEditorSessionId = () => {
        alert("Invalid Session ID")

    }
    

    const handleStartInvite = () => {
        console.log("start invite")
        if (globalState.editorSessionId === '') {
          const onSessionCreated = (sessionId: string) => {
            handleSetEditorSessionId!(sessionId);
            const code = globalState.editorValue || '// Collaborative Editing Mode!';
            handleInitInvite!(code);
          };
          createNewSession(onSessionCreated);
        }
    };

     const inviteButton = 
         <div>
          <Button
                onClick={handleInviteClick}
          >
              Invite
          </Button>
          <Popover
            anchorEl={inviteAnchorEl}
            open={Boolean(inviteAnchorEl)}
            onClose={handleInviteClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
     
        >
            <input value={globalState.editorSessionId} readOnly={true}/>
        </Popover>
         </div>
  
  // Join

  const handleStartJoining = (event: React.FormEvent<HTMLFormElement>) => {
    const onSessionIdExists = () =>
      handleSetEditorSessionId!(state!.joinElemValue);

    const onSessionIdNotExist = () => {
      handleInvalidEditorSessionId!();
      handleSetEditorSessionId!('');
    };

    const onServerUnreachable = () => handleSetEditorSessionId!('');

    checkSessionIdExists(
      state.joinElemValue,
      onSessionIdExists,
      onSessionIdNotExist,
      onServerUnreachable
    );
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
    setState({ joinElemValue: event.target.value });
  }

  const joinButton = (
    <div>
    <Button
          onClick={handleJoinClick}
    >
        JOIN
    </Button>
    <Popover
      anchorEl={joinAnchorEl}
      open={Boolean(joinAnchorEl)}
      onClose={handleJoinClose}
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}

    >
        <form onSubmit={handleStartJoining}>
          <input type="text" value={state.joinElemValue} onChange={handleChange} />
          <span>
            <input type='submit'/>
          </span>
        </form>
      
  </Popover>
   </div>);
   
   const handleLeave = () => {
    handleSetEditorSessionId!('');
    setState({ joinElemValue: '' });
     
   }

   // leave Button
   const leaveButton = 
   <Button
    onClick={handleLeave}
   >LEAVE
   </Button>



    const menuList = (
        <div>
            {inviteButton}
            {globalState.editorSessionId === '' ? joinButton : leaveButton}
        </div>
    );

    return (
        <div>
        <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ padding: 0, color: "white" }}
        >
            {"SESSIONS"}
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
            }}
            transformOrigin={{
            vertical: "top",
            horizontal: "center"
            }}
        >
            {menuList}
        </Menu>
        </div>
    );
};

export default SessionControl;