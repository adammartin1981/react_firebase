import * as React from 'react'
import { ChangeEvent } from 'react'

interface CounterState {
  min: number
  max: number
  step: number
  initial: number
}

interface CounterProps {}

export class Counter extends React.Component<{}, CounterState> {
  static defaultState: CounterState = {
    initial: 1,
    max: 10,
    min: 1,
    step: 1
  }

  constructor(props: CounterProps) {
    super(props)
    this.state = Counter.defaultState
  }

  private updateMin = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    this.validateInitialStateAgainstNewState(({
      ...this.state,
      // Ensure we don't go above the max
      min: Number(value) <= this.state.max ? Number(value) : this.state.max,
    }))
  }

  private updateMax = ({ target: {value}}: ChangeEvent<HTMLInputElement>) => {
    this.validateInitialStateAgainstNewState(({
      ...this.state,
      // Ensure we don't go over below the min
      max: Number(value) >= this.state.min ? Number(value) : this.state.min
    }))
  }

  private updateStep = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      step: Number(event.target.value)
    })
  }

  private add = () => {
    this.setState({
      initial: this.getInitialAgainstState(this.state.initial + this.state.step, this.state)
    })
  }

  private dec = () => {
    this.setState({
      initial: this.getInitialAgainstState(this.state.initial - this.state.step, this.state)
    })
  }

  private getInitialAgainstState = (desiredInitial: number, state: CounterState) =>
    (desiredInitial >= state.max)
      ? state.max
      : (desiredInitial <= state.min)
      ? state.min
      : desiredInitial

  private validateInitialStateAgainstNewState = (newState: CounterState) => {
    this.setState({
      ...newState,
      // Need to get the new values out and see if the min is greater than initial
      // Or see if max is lower than initial and then set
      initial: this.getInitialAgainstState(this.state.initial, newState)
    })
  }

  render() {
    const {initial, max, min, step} = this.state
    return <div>
      <h2>Experiment Time</h2>
      <p>This was after a video from John Lindquist on react-stream challenging the user
        to generate a counter with restricted values.</p>
      <p>He used streams, I'm using old fashioned react</p>
      <div>
        Min: <input type='number' value={min} onChange={this.updateMin} /><br/>
        Max: <input type='number' value={max} onChange={this.updateMax}/><br/>
        Step: <input type='number' value={step} onChange={this.updateStep}/><br/>
        <span>Counter: {initial}</span>
        <button onClick={this.dec}>-</button>
        <button onClick={this.add}>+</button>
      </div>
    </div>
  }
}