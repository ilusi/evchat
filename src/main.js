import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//console.log("hello react");
// var React = require('react');   // Same as import React from 'react' // (newer)

import MessageLog from './components/MessageLog';
import InputComponent from './views/InputComponent';

const DEFAULT_NAME = 'Anonymous';


class App extends Component {
    constructor(props) {
        super();
        
        this.state = {
            messageDraft: '',
//            messages: [],
            name: ''
        };
        this._onMessageSubmit = this._onMessageSubmit.bind(this);
                
        // Bind to re-attach to its parents. Odd js stuff.
//        this._onNameChange = this._onNameChange.bind(this);
//        this._onMessageChange = this._onMessageChange.bind(this);
//        this._onMessageSubmit = this._onMessageSubmit.bind(this);
        // Or React.bindAll(this);
    }
    
    render() {      
        return (
            <div className="chat-app">
            <h1>React Chat Demo</h1>
            <div className="input-group">
                <div className="input-label">Your name:</div>
                <InputComponent
                    placeholder={DEFAULT_NAME}
                    updateState={{component: this, field: 'name'}}
                />
            </div>
            <MessageLog database={this.props.database} />
            <form className="input-group message-input" onSubmit={this._onMessageSubmit}>
                <InputComponent
                    placeholder="Enter a message"
                    updateState={{component: this, field: 'messageDraft'}}
                />
                <button type="submit">Send</button>
            </form>
          </div>
        );
    }
    
//    _renderMessages() {
//        if (this.props.isReady === false) {
//           return <div>Still loading chat messages ... </div>; 
//        }
//        
//        if (this.state.messages.length === 0) {
//            return <div className="empty-state">No messages to show</div>;
//        }
//        
//        return this.state.messages.map((message) => {
//            return (
//                <div className="message" key={message.key}>
//                    <span className="message-name">{message.name}</span>
//                    <span>: </span>
//                    <span className="message-text">{message.text}</span>
//                </div>    
//            );
//        });
//    }
    
//    _onNameChange(event) {
//        let text = event.target.value;
//        console.log('You changed the value to', text);
//        this.setState({
//            name: text
//        });
//    }
//    
//    _onMessageChange(event) {
//        let text= evetn.target.value;
//        this.setState({ messageDraft: text });
//    }
     
     _onMessageSubmit(event) {
        event.preventDefault();
        let message = {
          name: this.state.name || DEFAULT_NAME,
          text: this.state.messageDraft
        };
        this.props.database.push(message);
        this.setState({
          messageDraft: ''
        });
         
//        let oldMessages = this.state.messages;
//        let newMessages = oldMessage.concat([message]);
         
//        this.setState({
//           messages: newMessages,
//           messageDraft: ''
//        });
     }
    
}

document.addEventListener('DOMContentLoaded', () => {
    let database = new Firebase('https://evchat.firebaseio.com/');
    
    ReactDOM.render(
        <App database={database} />,
        document.getElementById('app')
    );
//    let isReady = false;
//    
//    let render = () => {
//        ReactDOM.render(
//            <App database={database} isReady={isReady} />,
//            document.getElementById('app')
//        );
//    };
//    
//    render();
//    
//    database.once('value', () => {
//        isReady = true;
//        render();
//    });
    
});
