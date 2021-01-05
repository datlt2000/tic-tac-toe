import React, { useEffect, useState } from 'react';
import Board from '../base_components/Board';
import TranScript from '../base_components/TranScript';
import { View, Text, ImageBackground } from 'react-native';
import styles from '../Styles';
import { Overlay, Button, Icon } from 'react-native-elements';
import { StatusBar } from 'react-native';
const defaultRow = () => {
  return JSON.parse(JSON.stringify([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]));
};
const d = defaultRow();
var history = [defaultRow()];
var i = 0;
var top = i;
function ComPlayer({ navigation }) {
  const [data, setData] = useState(d);
  const [Xisnext, setNext] = useState(true);
  const [Xscore, setXscore] = useState(0);
  const [Oscore, setOscore] = useState(0);
  const [turn, setTurn] = useState('Next player: X');
  const [over, setOver] = useState(false);
  const [message, setMessage] = useState('');
  const handleClick = (row, col) => {
    if (i === 9) return null;
    if (!Xisnext) return null;
    if (data[row][col] === 'X' || data[row][col] === 'O') return null;
    const t = JSON.parse(JSON.stringify(data));
    t[row][col] = Xisnext ? 'X' : 'O';
    ++i;
    history[i] = t;
    top = i;
    setData(t);
    setNext(!Xisnext);
  };
  const undo = () => {
    if (i <= 1) return;
    i -= 2;
    setData(history[i]);
  };
  const redo = () => {
    if (i < 8 && i + 1 < top) {
      setData(history[i + 2]);
      i += 2;
    }
  };
  const calc = (data) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let j = 0; j < lines.length; j++) {
      const [a, b, c] = lines[j];
      if (data[Math.floor(a / 3)][a % 3] !== ''
        && data[Math.floor(a / 3)][a % 3] === data[Math.floor(b / 3)][b % 3]
        && data[Math.floor(a / 3)][a % 3] === data[Math.floor(c / 3)][c % 3]) {
        return data[Math.floor(a / 3)][a % 3];
      }
    }
    if (i === 9) return 'H';
    return false;
  };
  const changeO = (row, col) => {
    const t = JSON.parse(JSON.stringify(data));
    t[row][col] = 'O';
    ++i;
    history[i] = t;
    top = i;
    setData(t);
    setNext(!Xisnext);
  };
  const computerTurn = () => {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let max = -10, min = 10;
    let maxIndex = 0, minIndex = 0;
    let index = -1;
    let score = Array(9).fill(0);
    for (let j = 0; j < 8; ++j) {
      for (let h = 0; h < 3; ++h) {
        let k = line[j][h];
        if (data[Math.floor(k / 3)][k % 3] === '') score[j] += 0;
        else if (data[Math.floor(k / 3)][k % 3] === 'X') score[j] -= 3;
        else if (data[Math.floor(k / 3)][k % 3] === 'O') score[j] += 1;
      }
    }
    let count = 0;
    for (let j = 0; j < 8; ++j) {
      if (score[j] === -1 || score[j] === -5) continue;
      if (score[j] > max) {
        max = score[j];
        maxIndex = j;
        count = 0;
      }
      if (score[j] < min) {
        min = score[j];
        minIndex = j;
      }
      if (score[j] === max) {
        count++;
      }
    }
    if (max === 3) return null;
    else if (min === -9) return null;
    else if (max === 2) {
      index = maxIndex;
    }
    else if (min === -6) {
      index = minIndex;
    }
    else if (max === 1 || max === 0) {
      let temp = Math.floor(Math.random() * count);
      for (let j = 0; j < 8; j++) {
        if (score[j] === max) {
          temp--;
          maxIndex = j;
          if (temp < 0) break;
        }
      }
      index = maxIndex;
    }
    else {
      index = maxIndex;
    }
    count = 0;
    for (let j = 0; j < 3; ++j) {
      let a = Math.floor(line[index][j] / 3);
      let b = line[index][j] % 3;
      if (data[a][b] === '') {
        count++;
      }
    }
    let temp = Math.floor(Math.random() * count);
    for (let j = 0; j < 3; ++j) {
      let a = Math.floor(line[index][j] / 3);
      let b = line[index][j] % 3;
      if (data[a][b] === '') {
        temp--;
        if (temp < 0) {
          changeO(a, b);
          break;
        }
      }
    }
  };
  useEffect(() => {
    const w = calc(data, Xisnext);
    if (!w) {
      if (!Xisnext) {
        setTurn('Next player: O');
        computerTurn();
      }
      else {
        setTurn('Next player: X');
      }
    }
    else {
      setTimeout(() => { }, 1000);
      gameOver(w);
    }
  }, [Xisnext, data]);
  const gameOver = (winner) => {
    if (winner === 'O') {
      setOscore(Oscore + 1);
      setTurn('Computer win');
      setMessage('Winner is Computer');
    }
    else if (winner === 'X') {
      setXscore(Xscore + 1);
      setTurn('X win');
      setMessage('Winner is You');
    }
    else {
      setTurn('Tie');
      setMessage('Tie');
    }
    setOver(true);
  };
  const back = () => {
    i = 0;
    history = [defaultRow()];
    setOver(false);
    setData(defaultRow());
    Xisnext ? setTurn('Next player: X') : setTurn('Next player:O');
    if (!Xisnext) computerTurn();
  };
  const reset = () => {
    i = 0;
    history = [defaultRow()];
    setData(defaultRow());
    setXscore(0);
    setOscore(0);
    setNext(true);
    setTurn('Next player: X');
    setOver(false);
  };
  return (
    <ImageBackground source={require(`../img/bg2.jpeg`)}
      style={[styles.backgroundImage]} >
      <StatusBar hidden={true} />
      <Button
        type='clear'
        buttonStyle={{ alignItems: 'flex-start', marginLeft: 10, width: 50 }}
        icon={<Icon name='arrow-left' color='white' type='font-awesome-5' />}
        onPress={() => { navigation.navigate('Home') }}
      />
      <View style={styles.topScreen}>
        <TranScript Xscore={Xscore} Oscore={Oscore} />
        <Board style={styles.board} data={data} handleClick={handleClick} />
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.textMedium, { margin: 10, textAlign: 'center' }]}>{turn}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              title='Undo'
              onPress={() => undo()}
              buttonStyle={{ margin: 20 }} />
            <Button
              title='Redo'
              onPress={() => redo()}
              buttonStyle={{ margin: 20 }} />
          </View>
        </View>
        <Overlay isVisible={over}>
          <View>
            <Text style={{ paddingHorizontal: 30, margin: 20, fontSize: 24, fontWeight: '500' }}>
              {message}
            </Text>
            <View>
              <Button
                title='Reset'
                onPress={() => reset()}
                buttonStyle={{ margin: 10 }} />
              <Button
                title='Again'
                onPress={() => back()}
                buttonStyle={{ margin: 10 }} />
            </View>
          </View>
        </Overlay>
      </View>
    </ImageBackground>
  );
};
export default ComPlayer;