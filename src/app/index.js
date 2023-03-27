import React,{Component} from 'react';
import ReactDOM, { render } from 'react-dom'
import {SSL_OP_PKCS1_CHECK_1} from 'constants'

class App extends Component {
    render() {
        return (
            <h1>Hola mundo</h1>
        )
    }
}

render(<App/>, document.getElementById('app'));