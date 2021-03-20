import { StackNavigationOptions } from "@react-navigation/stack";
import * as React from "react";
export type ScreenStackProps<T = {}> = React.FC<T> & {
  navigationOptions?: StackNavigationOptions
};