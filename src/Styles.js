import { StyleSheet } from 'react-native';

const color = {
  primary: '#007bff',
  success: '#28a745',
  blue: "#33AEFF",
  black: 'black',
  warning: 'red'
}
const styles = StyleSheet.create({
  button: {
    width: 200,
    paddingVertical: 8,
    margin: 10
  },
  background: {
    flex: 1,
    backgroundColor: color.blue
  },
  backgroundImage: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain'
  },
  board: {
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    borderColor: color.blue,
    borderWidth: 2
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  topScreen: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textMedium: {
    fontSize: 26,
    fontWeight: 500,
    color: 'white'
  },
  textBig: {
    fontSize: 40,
    fontWeight: 700,
    color: 'white'
  },
  bgPrimary: {
    backgroundColor: color.primary
  },
  bgSuccess: {
    backgroundColor: color.success
  },
  square: {
    width: 80,
    height: 80,
    borderColor: color.blue,
    borderWidth: 1,
    borderRadius: 0
  },
  X: {
    color: color.blue
  },
  O: {
    color: color.warning
  }
});
export default styles;