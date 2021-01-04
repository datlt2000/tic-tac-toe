import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Styles';

function TranScript(props) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={[styles.textBig, { paddingBottom: 20 }]}>Score Board</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.textMedium, { flex: 0.5, textAlign: 'start' }]}>X:</Text>
        <Text style={[styles.textMedium, { flex: 0.5, textAlign: 'center' }]}>{props.Xscore}-{props.Oscore}</Text>
        <Text style={[styles.textMedium, { flex: 0.5, textAlign: 'end' }]}>:O</Text>
      </View>
    </View>
  );
};
export default TranScript;