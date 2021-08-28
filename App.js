import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Style';

const BTN_START = 'Iniciar';
const BTN_RESUME = 'Resumir';
const BTN_PAUSE = 'Pausar';
const BTN_STOP = 'Stop';
const COUNT_DEFAULT = '00:00.00';

export default () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [btn, setBtn] = useState(BTN_START);
  const [count, setCount] = useState(COUNT_DEFAULT);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setMilliseconds((milliseconds) => milliseconds += 1);        
        function format(number) { return (number < 10 ? '0' : '') + number; }
        setCount(`${format(Math.floor(((milliseconds / (10 * 60)) % 60)))}:${format(Math.floor((milliseconds / 10) % 60))}.${format(milliseconds % 10)}`);
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