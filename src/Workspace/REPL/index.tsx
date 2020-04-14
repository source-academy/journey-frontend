import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AceEditor from "react-ace";

import { IGlobalAction, Store } from "../../reducers/Store";
import EvalButton from "../EvalButton";

import "ace-builds/src-noconflict/mode-javascript"; // replace with mode source in the future
import "ace-builds/src-noconflict/theme-tomorrow";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Repl2() {
  const { globalState, dispatch } = useContext(Store);
  const [code, setCode] = React.useState("");
  function onChangeMethod(newCode: string) {
    setCode(newCode);
  }
  const classes = useStyles();

  const runComponent = (
    <div>
      <Card className={classes.root}>
        <CardContent>
          {
            globalState.replComponents.filter(
              (component: React.ReactNode) => component !== <div></div>
            )[0]
          }
        </CardContent>
      </Card>
    </div>
  );

  const componentList = (
    <div>
      {globalState.replValue
        .filter((element: React.ReactNode) => element !== "")
        .map((component: React.ReactNode, i: number) => {
          return (
            <div>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="body2" component="p">
                    {component}
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.root}>
                <CardContent>
                  {globalState.run
                    ? globalState.replComponents[i + 1]
                    : globalState.replComponents[i]}
                </CardContent>
              </Card>
            </div>
          );
        })}
    </div>
  );
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      {globalState.run ? (
        globalState.replComponents[0] !== undefined ? (
          runComponent
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      )}
      {componentList}
      <Card className={classes.root}>
        <CardContent>
          <AceEditor
            className="react-ace"
            mode="javascript"
            theme="future"
            height="5vh"
            width="inherit"
            fontSize="17"
            value={globalState.eval ? "" : code}
            tabSize={4}
            onChange={onChangeMethod}
            style={{ zIndex: 0 }}
            setOptions={{
              fontFamily: "'Inconsolata', 'Consolas', monospace",
              showLineNumbers: false,
              showGutter: false
            }}
          />
        </CardContent>
        <CardActions>
          <EvalButton code={code} />
        </CardActions>
      </Card>
    </div>
  );
}
