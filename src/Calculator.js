import React from 'react';
import './Calculator.css';
import { addValue, displayToInfix, infixToPostfix, determine } from './process';

function Display(props) {
  return <div className="monitor-panel">{props.display}</div>;
}

function InputPanel(props) {

  return (
    <div className="input-panel">
      <div onClick={props.onInput} data-value="(">(</div>
      <div onClick={props.onInput} data-value=")">)</div>
      <div onClick={props.onInput} data-value="%">%</div>
      <div onClick={props.onClear}>Cls</div>
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
      <div onClick={props.onInput} data-value="-">.</div>
      <div onClick={props.onResult}>=</div>
      <div onClick={props.onInput} data-value="/">/</div>
    </div>
  )
}

function StatePanel(props) {
  return (
    <div>
      <div onClick={props.showState}>showlog</div>
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
    this.handleClick = this.handleClick.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.log = this.log.bind(this);
  }

  clearValue() {
    this.setState({
      display: "0",
      infix: [],
      postfix: [],
      result: 0
    });
  }

  handleResult() {
    const infix = displayToInfix(this.state.display);
    const postfix = infixToPostfix(infix);
    const result = determine(postfix);
    var display = this.state.display;
    if (result !== 0) {
      display = result.toString();
    }
    console.log(result);
    this.setState({
      display: display,
      infix: infix,
      postfix: postfix,
      result: result,
    });

  }

  log() {
    console.log(this.state);
  }

  handleClick(e) {
    const display = addValue(this.state.display, e.target.getAttribute('data-value'));
    this.setState({ display: display });
  }

  render() {
    return (
      <div className="calculator">
        <Display display={this.state.display} />
        <InputPanel
          onInput={this.handleClick}
          onClear={this.clearValue}
          onResult={this.handleResult}
        />
        <StatePanel showState={this.log} />
      </div>
    )
  }
}

export default Calculator;
