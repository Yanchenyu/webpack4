import React, {Component} from 'react';
import styles from './style';

export default class extends Component {
    render() {
        return <button className={styles.title} onClick={this.props.handleClick}>click me</button>
    }
}
