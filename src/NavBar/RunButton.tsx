import React, { useContext } from "react";
import { Store } from "../reducers/Store";
import Runner from "./../library_function/Runner";
import { runInContext } from "js-slang";
import createContext from "js-slang/dist/createContext";
import { Context } from "js-slang/dist/types";
import { Result } from "js-slang/dist/types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { codify } from "js-slang/dist/stepper/stepper";

import "./NavBar.css";

/**
 * States
 */

const RunButton: React.FC = () => {
  const { globalState, dispatch } = useContext(Store);
  const source =
    globalState.source === "Source2"
      ? 2
      : globalState.source === "Source3"
      ? 3
      : globalState.source === "Source4"
      ? 4
      : 1;

  const runTime =
    globalState.time === "10000"
      ? 10000
      : globalState.time === "2000"
      ? 2000
      : globalState.time === "3000"
      ? 3000
      : globalState.time === "4000"
      ? 4000
      : globalState.time === "5000"
      ? 5000
      : 1000;
  const context: Context = createContext(source);

  //runInContext takes in (string code, context, {})
  const evaluate = async () => {
    return await runInContext(globalState.playgroundEditorValue, context, {
      scheduler: "preemptive",
      originalMaxExecTime: runTime,
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
          (x: any) => (
            <div>
              {codify(x)
                .split("\n")
                .map((x) => (
                  <h5>{x}</h5>
                ))}
            </div>
          )
        );
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
    <div className="run" onClick={handleRun}>
      Run
    </div>
  );
};

export default RunButton;
