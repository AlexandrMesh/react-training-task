import React, {Component} from 'react';
import YourComponent from './YourComponent';
import './App.less';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-wrapper">
                <YourComponent/>
            </div>
        );
    }
}

export default App;