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

export const Wizard: React.FunctionComponent<WizardProps> = props => {
    const [currentInput, setCurrentInput] = useState<any>({});
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const nextStep = (output: any) => {
        setLoading(true);
        setCurrentInput(output);
        setCurrentStepIndex(currentStepIndex + 1);
        setLoading(false);
    };

    const stepComponentInput = currentInput;
    const StepComponent = props.steps[currentStepIndex].component;
    return (loading ? <span></span> :
        <StepComponent input={stepComponentInput} onCompleted={nextStep} />
    );
};
