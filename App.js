import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Style';

const BTN_START = 'Iniciar';
const BTN_RESUME = 'Resumir';
const BTN_PAUSE = 'Pausar';
const BTN_STOP = 'Stop';
const COUNT_DEFAULT = '00:00.00';

export default () => {
  /* Variables */
  const [milliseconds, setMilliseconds] = React.useState(0);
  const [btn, setBtn] = React.useState(BTN_START);
  const [count, setCount] = React.useState(COUNT_DEFAULT);
  const [isRunning, setIsRunning] = React.useState(false);
  
  React.useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setMilliseconds((milliseconds) => (milliseconds += 1));
        let ms = milliseconds % 100;
        let s = Math.floor((milliseconds / 100) % 60);
        let m = Math.floor((milliseconds / (100 * 60)) % 60);
        function format(number) {
          return (number < 10 ? '0' : '') + number;
        }
        setCount(`${format(m)}:${format(s)}.${format(ms)}`);
      }, 10);
      return () => clearInterval(id);
    }
    return undefined;
  }, [isRunning, milliseconds]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cronômetro</Text>
      </View>
      <Text style={styles.time}>{count}</Text>
      <View style={styles.contentButton}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007aff' }]}
          onPress={() => {
            !isRunning ? setBtn(BTN_PAUSE) : setBtn(BTN_RESUME);
            setIsRunning(!isRunning);
          }}>
          <Text style={styles.label}>{btn}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff0000' }]}
          onPress={() => {
            setIsRunning(false);
            setMilliseconds(0);
            setCount(COUNT_DEFAULT);
            setBtn(BTN_START);
          }}>
          <Text style={styles.label}>{BTN_STOP}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
