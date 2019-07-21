import React, { useState } from 'react';

export interface Step<I= {}, O = {}> {
    component: React.ComponentType<StepComponentProps<I, O>>;
}

export interface StepComponentProps<I, O> {
    input: I;
    onCompleted: (output: O) => void;
}

export interface WizardState {
    currentStepIndex: number;
    currentStepInput: any;
}

export interface WizardProps {
    steps: Step[];
}

// TODO use hooks instead

export const Wizard: React.FunctionComponent<WizardProps> = props => {
    const [currentInput, setCurrentInput] = useState<any>({});
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const nextStep = (output: any) => {
        console.log(output, props.steps);
        setLoading(true);
        setCurrentInput(output);
        setCurrentStepIndex(currentStepIndex + 1);
        setLoading(false);
    };

    const stepComponentInput = currentInput;
    console.log('RENDERING', stepComponentInput, currentStepIndex, props.steps);
    const StepComponent = props.steps[currentStepIndex].component;
    return (loading ? <span></span> :
        <StepComponent input={stepComponentInput} onCompleted={nextStep} />
    );
};

export class WizardOld extends React.Component<WizardProps, WizardState> {
    constructor(props: Readonly<WizardProps>) {
        super(props);
        this.state = {
            currentStepIndex: 0,
            currentStepInput: null
        };
    }

    nextStep = (data: any) => {
        const newLocal = this;
        newLocal.setState({
            currentStepIndex: this.state.currentStepIndex + 1,
            currentStepInput: data
        });
    }
    render() {
        const currentStep = this.state.currentStepIndex;
        const StepComponent = this.props.steps[currentStep].component;
        return (<StepComponent input={{}} onCompleted={this.nextStep} />);
    }
}
