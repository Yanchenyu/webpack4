import React, { Component } from 'react';
import { render } from 'react-dom';
import Appdownload from './appdownload';
import Button from './button';

class App extends Component {
    state = {
        num: 0
    }
    handleClick = () => {
        this.setState({
            num: this.state.num + 1
        })
    }
    render () {
        return <div>
            <Appdownload num={this.state.num} />
            <Button handleClick={this.handleClick} />
        </div>
    }
}


render(
    <App />,
    document.getElementById('root')
)


if (module.hot) {
    module.hot.accept('./button/index.jsx', function() {
        Button.render();
    })
}