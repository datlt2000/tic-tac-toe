import React from 'react';
import { StatusBar } from 'react-native';
import { ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../Styles';
function Home({ navigation }) {
  return (
    <ImageBackground
      source={require(`../img/bg2.jpeg`)}
      style={[styles.center, styles.backgroundImage]}>
      <StatusBar hidden={true} />
      <Button
        buttonStyle={[styles.button, styles.bgPrimary]}
        title='2 Player'
        titleStyle={[styles.textMedium]}
        onPress={() => navigation.navigate('2player')} />
      <Button
        buttonStyle={[styles.button, styles.bgSuccess]}
        title='1 Player'
        titleStyle={[styles.textMedium]}
        onPress={() => navigation.navigate('1player')} />
    </ImageBackground>
  );
};
export default Home;