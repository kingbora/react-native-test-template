import * as React from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";

interface QuestionBoardProps {
  questions: any[];
  onSubmit: (result: any) => void;
}

const QuestionBoard: React.FC<QuestionBoardProps> = function (props) {
  const [data, setData] = React.useState({});
  return (
    <ScrollView>
      {
        props.questions.map((q, index) => (
          <View key={q}>
            <Text>{q}</Text>
            <TextInput
              accessibilityLabel="answer input"
              accessibilityHint="input"
              onChangeText={(text) => {
                setData((state) => ({
                  ...state,
                  [index + 1]: { q, a: text }
                }));
              }}
            />
          </View>
        ))
      }
      <TouchableOpacity onPress={() => props.onSubmit(data)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default QuestionBoard;