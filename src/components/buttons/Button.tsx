import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Text, StyleProp, ViewStyle, GestureResponderEvent, Animated, ActivityIndicator, TouchableOpacity, Platform } from "react-native";

export interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  type: 'primary' | 'secondary' | 'tertiary' | 'emphasize';
  size: 'sm' | 'md' | 'lg';
  icon?: string;
  loading?: boolean;
  iconPosition?: 'center' | 'left' | 'right';
  onPress?: (event?: GestureResponderEvent) => void;
  disabled?: boolean;
  colors?: string[];
  testID?: string;
  children?: React.ReactNode;
  accessibilityLabel?: string;
}

const Button: React.FC<ButtonProps> = function (props) {

  function renderChildren() {
    const childElements: React.ReactNode[] = [];
    React.Children.forEach(props.children, (child, index) => {
      if (typeof child === "string" || typeof child === "number" || (React.isValidElement(child) && (child.type as any).displayName === "Text")) {
        const element = (
          <Text allowFontScaling={false} style={getTextStyle()} key={child?.toString() + "_" + index}>{child}</Text>
        );
        childElements.push(element);
      } else if (React.isValidElement(child)) {
        childElements.push(child);
      }
    });
    return childElements;
  }

  const [valueAnimated] = React.useState(new Animated.Value(0));
  const iconPosition = (props.loading && !props.icon) ? 'center' : props.iconPosition;
  const padding: any = {
    sm: 17,
    md: 21,
    lg: 28
  };
  const height: any = {
    sm: 30,
    md: 36,
    lg: 44
  };
  const borderRadius = props.size === 'lg' ? 6 : 4;
  const outerStyle: any = {
    backgroundColor: props.disabled ? '#EEEEEE' : (props.type === 'primary' ? '#0086F6' : (props.type === 'emphasize' ? 'transparent' : '#FFFFFF')),
    borderColor: props.disabled ? '#EEEEEE' : (props.type === 'tertiary' ? '#CCCCCC' : (props.type === 'emphasize' ? 'transparent' : '#0086F6')),
    borderWidth: 1,
    paddingHorizontal: padding[props.size],
    height: height[props.size],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius,
    position: 'relative',
    overflow: 'hidden'
  };

  function getTextStyle() {
    const color: any = {
      emphasize: '#FFFFFF',
      primary: '#FFFFFF',
      secondary: '#0086F6',
      tertiary: '#333333',
    };
    const size: any = {
      sm: 13,
      md: 15,
      lg: 17
    };
    const style: any = {
      color: (props.loading && !props.icon) ? 'transparent' : (props.disabled ? '#999999' : (props.textColor || color[props.type])),
      fontSize: size[props.size],
      fontWeight: props.size === 'sm' ? '400' : '500'
    };
    return style;
  }

  const bgAnimateInterpolate = valueAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.12]
  });
  const maskStyle: any = {
    backgroundColor: '#000000',
    opacity: bgAnimateInterpolate,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius,
  };
  const emphysizeStyle: any = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius,
  }

  function getLoadingActivity() {
    const activityStyle: any = {
      height: 20,
      width: 20,
    };
    if (iconPosition === 'center') {
      Object.assign(activityStyle, {
        position: 'absolute',
        zIndex: 5
      });
    } else if (iconPosition === 'left') {
      Object.assign(activityStyle, {
        marginRight: 6
      });
    } else {
      Object.assign(activityStyle, {
        marginLeft: 6
      });
    }
    if (props.size === 'lg') {
      Object.assign(activityStyle, { transform: [{ scale: 1.2 }] });
    }
    const color = (props.type === 'primary' || props.type === 'emphasize') ? '#FFFFFF' : (Platform.OS === 'ios' ? 'gray' : '#333333');

    if (props.loading) {
      return <ActivityIndicator color={color} size="small" style={iconPosition === 'center' ? activityStyle : null} animating={props.loading} />;
    }
    if (props.icon) {
      return <Text></Text>;
    }
    return null;
  }

  return (
    <TouchableOpacity
      testID={props.testID}
      activeOpacity={(props.type === 'primary' || props.type === 'emphasize') ? 1 : 0.8}
      disabled={props.disabled}
      style={[outerStyle, props.style]}
      onPress={props.onPress}
      accessibilityLabel={props.accessibilityLabel}
      onPressIn={(props.type === 'primary' || props.type === 'emphasize') ? () => {
        Animated.timing(valueAnimated, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true
        }).start();
      } : undefined}
      onPressOut={(props.type === 'primary' || props.type === 'emphasize') ? () => {
        Animated.timing(valueAnimated, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        }).start();
      } : undefined}
    >
      {
        props.type === 'emphasize' &&
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={emphysizeStyle} colors={props.colors || ['#FFA50A', '#FF7700']} />
      }
      {
        (props.type === 'primary' || props.type === 'emphasize') &&
        <Animated.View pointerEvents="none" style={maskStyle} />
      }
      {
        (iconPosition === 'left' || iconPosition === 'center') &&
        getLoadingActivity()
      }
      {
        renderChildren()
      }
      {
        iconPosition === 'right' &&
        getLoadingActivity()
      }
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  type: 'primary',
  size: 'md',
  iconPosition: 'left'
};

export default Button;