import React, {Component} from 'react';

class MessageLog extends Component {
  constructor(props) {
    super();
    this.state = {
      messages: [],
      isReady: false
    };
    props.database.once('value', () => {
      this.setState({isReady: true});
    });
    props.database.on('child_added', (snapshot) => {
      var message = snapshot.val();
      message.key = snapshot.key();
      let newMessages = this.state.messages.concat([message]);
      this.setState({
        messages: newMessages,
      });
    });
  }

  render() {
    return (
      <div className="message-pane">
        {this._renderMessages()}
      </div>
    );
  }

  _renderMessages() {
    if (this.state.isReady === false) {
      return <div className="empty-state">Still loading chat messages ...</div>;
    }
    if (this.state.messages.length === 0) {
      return <div className="empty-state">No messages to show</div>;
    }
    return this.state.messages.map((message) => {
      return (
        <div className="message" key={message.key}>
          <span className="message-name">{message.name}</span>
          <span>: </span>
          <span className="message-text">{message.text}</span>
        </div>
      );
    });
  }
}

export default MessageLog;