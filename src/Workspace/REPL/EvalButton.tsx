import React, { useContext } from "react";
import { Store } from "../../reducers/Store";

import IconButton from "@material-ui/core/IconButton";
import Runner from "../../library_function/Runner";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { runInContext } from "js-slang";
import { Result } from "js-slang/dist/types";
import createContext from "js-slang/dist/createContext";
import { Context } from "js-slang/dist/types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

/**
 * Props
 */
interface evalButtonProps {
  code: string;
  setHistory: (x: number) => void;
}
const context: Context = createContext(4);

const EvalButton: React.FC<evalButtonProps> = (props) => {
  //subscribe to the context
  const { globalState, dispatch } = useContext(Store);

  function conbineCode(): string {
    return (
      globalState.playgroundEditorValue +
      globalState.replValue.reduce(
        (sum: string, current: string) => sum + current
      )
    );
  }

  const evaluate = async () => {
    //handleRun update the code to global container first
    handleRun();
    props.setHistory(globalState.replValue.length - 1);
    const code: string = conbineCode();
    return await runInContext(code, context, {
      scheduler: "preemptive",
      originalMaxExecTime: 2000,
      useSubst: false,
    });
  };
  const runEval = async () => {
    const result: Result = await evaluate();
    let newComponent: React.ReactElement;
    if (result.status === "error") {
      newComponent = (
        <Card>
          <CardContent>
            <div style={{ color: "red" }}>
              {context.errors.map((x) => x.explain()).reduce((x, y) => x + y)}
            </div>
          </CardContent>
        </Card>
      );
    } else if (result.status === "finished") {
      newComponent = <Runner value={result.value} />;
    } else {
      newComponent = <div></div>;
    }
    return dispatch({
      type: "RUN_EVAL",
      replComponents: newComponent,
    });
  };

  const handleRun = () => {
    return dispatch({
      type: "UPDATE_AND_EVAL",
      replValue: props.code,
    });
  };

  return (
    <div>
      <IconButton onClick={runEval}>
        <DirectionsRunIcon />
      </IconButton>
    </div>
  );
};

export default EvalButton;
