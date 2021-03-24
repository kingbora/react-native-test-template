import * as React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SubmitForm from "./SubmitForm";
import Snackbar from "react-native-snackbar";

describe("Validate phone", () => {
  test.each`
  input | expected
  ${""} | ${"请输入手机号码"}
  ${"1"} | ${"请输入11位手机号码"}
  ${"1123123123212"} | ${"请输入11位手机号码"}
  ${"32932123212"} | ${"请输入正确的手机号码"}
  `("输入$input提交应当弹出$expected提示", ({input, expected}) => {
    const submitFn = jest.fn();
    const { getByA11yLabel } = render(<SubmitForm onSubmit={submitFn} />);
    const phone = getByA11yLabel("phone");
    const submit = getByA11yLabel("submit");

    fireEvent(phone, "onTextChanged", input);
    fireEvent.press(submit);
    const spyFn = jest.spyOn(Snackbar, "show");
    expect(spyFn).toHaveBeenCalledWith({
      text: expected
    });
    expect(submitFn).toHaveBeenCalledTimes(0);
  });
});

describe("Validate password", () => {
  test.each`
  input | expected
  ${""} | ${"请输入密码"}
  ${"1"} | ${"密码长度为8~18位"}
  ${"123——阿安静思考的"} | ${"密码必须由字母和数字组成"}
  `("输入$input提交应当弹出$expected提示", ({input, expected}) => {
    const submitFn = jest.fn();
    const { getByA11yLabel } = render(<SubmitForm onSubmit={submitFn} />);
    const phone = getByA11yLabel("phone");
    const password = getByA11yLabel("password");
    const submit = getByA11yLabel("submit");

    fireEvent(phone, "onTextChanged", "18827836542");
    fireEvent(password, "onTextChanged", input);
    fireEvent.press(submit);
    const spyFn = jest.spyOn(Snackbar, "show");
    expect(spyFn).toHaveBeenCalledWith({
      text: expected
    });
    expect(submitFn).toHaveBeenCalledTimes(0);
  });
});

describe("Validate submit", () => {

});