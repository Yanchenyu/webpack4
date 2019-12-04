import React, {Component} from 'react';
import styles from './style';
// import 'Style/index';

export default class extends Component {
  render() {
    return <div className={styles.title}>点击次数： {this.props.num}</div>;
  }
}
