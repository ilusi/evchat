import React from 'react';

export default class InputComponent extends React.Component {
  constructor(props) {
    super();
    this._onChange = this._onChange.bind(this);
  }

  render() {
    var {component, field} = this.props.updateState;
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        value={component.state[field]}
        onChange={this._onChange}
      />
    );
  }

  _onChange(event) {
    var {component, field} = this.props.updateState;
    component.setState({
      [field]: event.target.value
    });
  }
}