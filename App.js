import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Style';

const BTN_START = 'Início';
const BTN_PAUSE = 'Pause';
const BTN_STOP = 'Stop';
const COUNT_DEFAULT = '00:00.00';

export default class App extends React.Component {
  
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = { n: 0, count: COUNT_DEFAULT, botao: BTN_START };
    this.timer = null;
    this.startPause = this.startPause.bind(this);
    this.clear = this.clear.bind(this);
  }

  /**
   * 
   * @returns 
   */
  startPause() {
    let s = this.state;
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
      s.botao = BTN_START;
    } else {
      this.timer = setInterval(() => {
        let s = this.state;
        s.n += 0.1;
        let aM, aS, aMM = null;
        function pad2(number) {
          return (number < 10 ? '0' : '') + number;
        }
        aM = Math.floor(s.n % 3600 / 60);
        aS = Math.floor(s.n % 60);
        aMM = parseInt(10 * (s.n - parseInt(s.n)));
        s.count = `${pad2(aM)}:${pad2(aS)}.${pad2(aMM)}`;
        this.setState(s);
      }, 100);
      s.botao = BTN_PAUSE;
    }
    this.setState(s);
  }

  /**
   * 
   * @returns 
   */
  clear() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    let s = this.state;
    s.n = 0;
    s.count = COUNT_DEFAULT;
    s.botao = BTN_START;
    this.setState(s);
  }

  /**
   * 
   * @returns 
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cronômetro</Text>
        </View>
        <Text style={styles.time}>{this.state.count}</Text>
        <View style={styles.contentButton}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#007aff' }]}
            onPress={this.startPause}>
            <Text style={styles.label}>{this.state.botao}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#ff0000' }]}
            onPress={this.clear}>
            <Text style={styles.label}>{BTN_STOP}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}