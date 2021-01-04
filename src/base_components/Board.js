import React from 'react';
import { View } from 'react-native';
import styles from '../Styles';
import Square from './Square';
function Board(props) {
  return (
    <View style={props.style}>
      {props.data.map((rows, row) => {
        return (<View style={styles.row} key={row}>
          {rows.map((value, col) => {
            return (
              <Square
                key={col}
                handleClick={props.handleClick}
                value={value}
                row={row}
                col={col} />);
          })}
        </View>)
      })}
    </View>
  );
};
export default Board;