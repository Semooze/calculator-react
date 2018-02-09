import React from 'react';
import './Calculator.css';
import { addValue, displayToInfix, infixToPostfix, determine } from './process';
import PropTypes from 'prop-types';

function Display(props) {
  return <div className="monitor-panel">{props.display}</div>;
}

ClearButton.propTypes = {
  onClear: PropTypes.func.isRequired
} 

function ClearButton(props) {
  return <div onClick={props.onClear}>Cls</div>
}

DetermineButton.propTypes = {
  onSubmit: PropTypes.func.isRequired
} 

function DetermineButton (props) {
  return <div onClick={props.onSubmit}>=</div>
}

InputPanel.propTypes = {
  onInput: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
} 

function InputPanel(props) {

  return (
    <div className="input-panel">
      <div onClick={props.onInput} data-value="(">(</div>
      <div onClick={props.onInput} data-value=")">)</div>
      <div onClick={props.onInput} data-value="0"></div>
      <ClearButton onClear={props.onClear} />
      <div onClick={props.onInput} data-value="1">1</div>
      <div onClick={props.onInput} data-value="2">2</div>
      <div onClick={props.onInput} data-value="3">3</div>
      <div onClick={props.onInput} data-value="+">+</div>
      <div onClick={props.onInput} data-value="4">4</div>
      <div onClick={props.onInput} data-value="5">5</div>
      <div onClick={props.onInput} data-value="6">6</div>
      <div onClick={props.onInput} data-value="-">-</div>
      <div onClick={props.onInput} data-value="7">7</div>
      <div onClick={props.onInput} data-value="8">8</div>
      <div onClick={props.onInput} data-value="9">9</div>
      <div onClick={props.onInput} data-value="*">*</div>
      <div onClick={props.onInput} data-value="0">0</div>
      <div onClick={props.onInput} data-value="0"></div>
      <DetermineButton onSubmit={props.onSubmit} />
      <div onClick={props.onInput} data-value="/">/</div>
    </div>
  )
}

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      infix: [],
      postfix: [],
      result: 0,
      display: "0"
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClear() {
    this.setState({
      display: "0",
      infix: [],
      postfix: [],
      result: 0
    });
  }

  handleSubmit() {
    const infix = displayToInfix(this.state.display);
    const postfix = infixToPostfix(infix);
    const result = determine(postfix);
    var display = this.state.display;
    if (result !== 0) {
      display = result.toString();
    }

    this.setState({
      display: display,
      infix: infix,
      postfix: postfix,
      result: result,
    });

  }

  handleInput(e) {
    const display = addValue(this.state.display, e.target.getAttribute('data-value'));
    this.setState({ display: display });
  }

  render() {
    return (
      <div className="calculator">
        <Display display={this.state.display} />
        <InputPanel
          onInput={this.handleInput}
          onClear={this.handleClear}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default Calculator;
