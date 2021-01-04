import React from 'react';
import { Button } from 'react-native-elements';
import styles from '../Styles';
function Square(props) {
  return (
    <Button
      buttonStyle={[styles.square]}
      type="clear"
      titleStyle={[styles[props.value], { fontSize: 70, fontWeight: 600, }]}
      onPress={() => props.handleClick(props.row, props.col)}
      title={props.value} />
  );
};
export default Square;