import * as React from "react";
import { Text, View } from "react-native";
import { ScreenStackProps } from "../../base";

interface HomeScreenProps {}

const HomeScreen: ScreenStackProps<HomeScreenProps> = function(props) {
  return (
    <View>
      <Text>1231</Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: "Home1"
};

export default HomeScreen;