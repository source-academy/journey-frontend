import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AceEditor from "react-ace";
import { HotKeys } from "react-hotkeys";

import { Store } from "../../reducers/Store";
import EvalButton from "./EvalButton";

import "ace-builds/src-noconflict/mode-javascript"; // replace with mode source in the future
import "ace-builds/src-noconflict/theme-tomorrow";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "5px 10px",
    margin: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Repl2() {
  const { globalState } = useContext(Store);

  const [code, setCode] = React.useState("");
  const [history, setHistory] = React.useState(0);
  const [line, setLine] = React.useState(3);
  function onChangeMethod(newCode: string) {
    setCode(newCode);
    setLine(newCode.split(/\r\n|\r|\n/).length);
  }
  var height = line * 3 + "vh";
  const classes = useStyles();

  const runComponent = (
    <Card className={classes.root}>
      <CardContent>
        {
          globalState.replComponents.filter(
            (component: React.ReactNode) => component !== <div></div>
          )[0]
        }
      </CardContent>
    </Card>
  );

  const componentList = (
    <div style={{ maxHeight: "45vh" }}>
      {globalState.replValue
        .filter((element: string) => element !== "")
        .map((component: string, i: number) => {
          return (
            <>
              <div
                style={{
                  height: globalState.replComponents.length > 0 ? 10 : 0,
                }}
              ></div>
              <Card className={classes.root}>
                {component.split("\n").map((i) => (
                  <p>{i}</p>
                ))}
              </Card>
              <div style={{ height: 10 }}></div>
              <Card className={classes.root}>
                {globalState.run
                  ? globalState.replComponents[i + 1]
                  : globalState.replComponents[i]}
              </Card>
            </>
          );
        })}
    </div>
  );
  const keyMap = { lastCode: "up" };
  const handlers = {
    lastCode: () => {
      console.log("initial" + history);
      if (history > 0) {
        console.log("previous" + history);
        const nextP = history - 1;
        setHistory(nextP);
        console.log("next " + nextP);
      }

      setCode(globalState.replValue[history - 1]);
    },
  };

  const handleHistory = (x: number) => {
    setHistory(x);
  };

  const wholePage = (
    <div>
      {componentList}
      <div style={{ height: 10 }}></div>
      <Card className={classes.root}>
        <CardContent>
          <AceEditor
            className="react-ace"
            mode="javascript"
            theme="future"
            height={height}
            width="inherit"
            fontSize={20}
            value={globalState.eval ? "" : code}
            tabSize={4}
            onChange={onChangeMethod}
            style={{ zIndex: 0, backgroundColor: "#E0DEDE ", color: "" }}
            setOptions={{
              fontFamily: "'Inconsolata', 'Consolas', monospace",
              showLineNumbers: false,
              showGutter: false,
            }}
          />
        </CardContent>
        <CardActions>
          <EvalButton setHistory={handleHistory} code={code} />
        </CardActions>
      </Card>
    </div>
  );

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <div style={{ maxHeight: "45vh", overflowY: "scroll" }}>{wholePage}</div>
    </HotKeys>
  );
}
