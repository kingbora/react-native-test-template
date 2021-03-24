import * as React from "react";
import { TextInputProps, TextInput } from "react-native";

interface InputProps extends TextInputProps {
  onTextChanged?: (text: string) => void;
}

const Input: React.FC<InputProps> = function (props) {
  const { onTextChanged, ...rest } = props;

  function handleChange(e: any) {
    const text = e.nativeEvent?.text?.replace(/\u2006/g, '');
    props.onTextChanged?.(text);
  }

  return <TextInput
    underlineColorAndroid="transparent"
    allowFontScaling={false}
    onSubmitEditing={handleChange}
    onChange={handleChange}
    placeholderTextColor="#ccc"
    {...rest}
  />;
}

export default Input;