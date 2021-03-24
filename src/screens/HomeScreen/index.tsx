import * as React from "react";
import { Text, View } from "react-native";
import { ScreenStackProps } from "../../base";
import SubmitForm from "./components/SubmitForm";

interface HomeScreenProps {}

const HomeScreen: ScreenStackProps<HomeScreenProps> = function(props) {
  return (
    <View>
      <SubmitForm />
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: "Home1"
};

export default HomeScreen;