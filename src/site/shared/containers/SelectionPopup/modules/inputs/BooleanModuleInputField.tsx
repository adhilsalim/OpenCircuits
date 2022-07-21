import {SwitchToggle} from "shared/components/SwitchToggle";

import {SharedModuleInputFieldProps, useBaseModule} from "./ModuleInputField";


type Props = SharedModuleInputFieldProps<boolean> & {
    type?: "button" | "switch";
    text?: string;
}
export const BooleanModuleInputField = ({ text, type, ...props }: Props) => {
    const [state, setState] = useBaseModule<boolean>({
        ...props,

        parseVal: (val) => (val === "true"),
        isValid:  (_)  => true,
    });

    const isOn = (state.value === "true" || state.value === true);

    const onClick = () => {
        setState.onFocus();
        setState.onChange(isOn ? "false" : "true");
        setState.onBlur();
    }

    if (type === "button") {
        return (
            <button type="button"
                    title="Toggle the boolean property"
                    onClick={onClick}>
                {text}
            </button>
        );
    }

    return (
        <SwitchToggle
            isOn={state.allSame ? isOn : false}
            height="35px"
            onChange={onClick}>
            {text}
        </SwitchToggle>
    );
}
