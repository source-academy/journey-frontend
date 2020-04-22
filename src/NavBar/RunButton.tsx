import React, { useContext } from "react";
import { Store, IGlobalAction } from "../reducers/Store";
import Runner from "./../library_function/Runner";
import { runInContext } from "js-slang";
import createContext from "js-slang/dist/createContext";
import { Context, Environment } from "js-slang/dist/types";
import { Result } from "js-slang/dist/types";
import { TypeError } from "js-slang/dist/utils/rttc";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { getEvaluationSteps, codify } from "js-slang/dist/stepper/stepper";

import "./NavBar.css";
import { stringify } from "querystring";

/**
 * States
 */

const RunButton: React.FC = () => {
  const { globalState, dispatch } = useContext(Store);
  const context: Context = createContext(globalState.source);

  //runInContext takes in (string code, context, {})
  const evaluate = async () => {
    return await runInContext(globalState.playgroundEditorValue, context, {
      scheduler: "preemptive",
      originalMaxExecTime: 2000,
      useSubst: globalState.useStepper,
    });
  };
  const handleRun = async () => {
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
      if (globalState.useStepper) {
        const stepperComponents: React.ReactElement[] = result.value.map(
          (x: any) => <div>{codify(x)}</div>
        );
        console.log(stepperComponents);
        return dispatch({
          type: "RUNSTEPPER",
          stepperComponents: stepperComponents,
        });
      }
      newComponent = <Runner value={result.value} />;
    } else {
      newComponent = <div></div>;
    }

    return dispatch({
      type: "RUN",
      runComponent: newComponent,
    });
  };
  return (
    <div>
      <a onClick={handleRun}>Run</a>
    </div>
  );
};

export default RunButton;
