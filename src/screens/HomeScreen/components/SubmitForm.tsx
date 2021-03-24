import * as React from "react";
import { StyleSheet, View } from "react-native";
import Snackbar from "react-native-snackbar";
import Button from "../../../components/buttons/Button";
import Input from "../../../components/inputs/Input";
import Util from "../../../utils/Util";

interface SubmitResultProps {
  phone: string;
  password: string;
}

interface SubmitFormProps {
  onSubmit?: (result: SubmitResultProps) => void;
}

const SubmitForm: React.FC<SubmitFormProps> = function (props) {
  const [phone, updatePhone] = React.useState("");
  const [password, updatePassword] = React.useState("");

  function handlePhoneChange(text: string) {
    updatePhone(text);
  }

  function handlePasswordChange(text: string) {
    updatePassword(text);
  }

  function handleSubmit() {
    if (phone.length === 0) {
      return Snackbar.show({
        text: "请输入手机号码"
      });
    } else if (phone.length !== 11) {
      return Snackbar.show({
        text: "请输入11位手机号码"
      });
    } else if (!Util.validateMobile(phone)) {
      return Snackbar.show({
        text: "请输入正确的手机号码"
      });
    }

    if (password.length === 0) {
      return Snackbar.show({
        text: "请输入密码"
      });
    } else if (password.length < 8 || password.length > 18) {
      return Snackbar.show({
        text: "密码长度为8~18位"
      });
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/.test(password)) {
      return Snackbar.show({
        text: "密码必须由字母和数字组成"
      });
    }

    props.onSubmit?.({
      phone,
      password
    });
  }

  return (
    <View style={styles.container}>
      <Input
        style={styles.phone}
        onTextChanged={handlePhoneChange}
        value={phone}
        accessibilityLabel="phone"
        placeholder="Input Phone Number"
      />
      <Input
        style={styles.password}
        onTextChanged={handlePasswordChange}
        value={password}
        accessibilityLabel="password"
        placeholder="Input Password"
      />
      <Button style={styles.submit} accessibilityLabel="submit" onPress={handleSubmit} type="primary" size="md">提交</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  phone: {
    height: 32,
    fontSize: 16,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd'
  },
  password: {
    height: 32,
    fontSize: 16,
    marginTop: 8,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd'
  },
  submit: {
    marginTop: 8
  }
})

export default SubmitForm;