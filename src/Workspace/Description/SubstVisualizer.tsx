import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import CardContent from "@material-ui/core/CardContent";
import { Store, IGlobalAction } from "../../reducers/Store";
import React, { useContext, ReactElement } from "react";

export interface ISubstVisualizerProps {
  content: string[];
}

export interface ISubstVisualizerState {
  value: number;
}

const SubstDefaultText = () => {
  return (
    <div>
      <div id="substituter-default-text">
        Welcome to the Substituter!
        <br />
        <br />
        On this tab, the REPL will be hidden from view. You may use this tool by
        writing your program on the left, then dragging the slider above to see
        its evaluation.
        <br />
        <br />
        Alternatively, you may click on the gutter of the editor (where all the
        line numbers are, on the left) to set a breakpoint, and then run the
        program to show it here!
        <br />
        <br />
        <Divider />
        Some useful keyboard shortcuts:
        <br />
        <br />
        Note that first and last step shortcuts are only active when the browser
        focus is on this panel (click on the slider or the text!).
        <br />
        <br />
        When focus is on the slider, the arrow keys may also be used to move a
        single step.
      </div>
    </div>
  );
};

const SubstCodeDisplay = (props: { content: string }) => {
  return (
    <Card>
      <CardContent>{props.content}</CardContent>
    </Card>
  );
};

const SubstVisualizer: React.FC<ISubstVisualizerProps> = (props) => {
  {
    const { globalState, dispatch } = useContext(Store);
    const [step, setStep] = React.useState<number[]>([1]);

    //const lastStepValue = this.props.content.length;
    // 'content' property is initialised to '[]' by Playground component
    //const hasRunCode = lastStepValue !== 0;
    /*const substHandlers = hasRunCode
      ? {
          FIRST_STEP: this.stepFirst,
          LAST_STEP: this.stepLast(lastStepValue)
        }
      : {
          FIRST_STEP: () => {},
          LAST_STEP: () => {}
        };*/
    const handleChange = (event: any, newValue: number | number[]) => {
      console.log(newValue);
      setStep(newValue as number[]);
    };

    return (
      <div>
        {
          <Slider
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            marks
            value={step}
            onChange={handleChange}
            min={1}
            max={
              globalState.stepperComponents == undefined
                ? 1
                : globalState.stepperComponents.length
            }
          />
        }
        <div>{globalState.stepperComponents[step[0] - 1]}</div>
        {console.log(globalState.stepperComponents[0])}
        {globalState.stepperComponents[0] === undefined ? (
          SubstDefaultText()
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  /*const sliderShift = (newValue: number) => {
    this.setState((state: ISubstVisualizerState) => {
      return { value: newValue };
    });
  };

  const stepFirst = () => {
    // Move to the first step
    this.sliderShift(1);
  };

  const stepLast = (lastStepValue: number) => () => {
    // Move to the last step
    this.sliderShift(lastStepValue);
  };*/
};

export default SubstVisualizer;
