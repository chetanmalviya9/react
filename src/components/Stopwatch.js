import React, { Component } from 'react'

export default class Stopwatch extends Component {
    constructor() {
        super();
        this.state = {
            hour: "00",
            minute: "00",
            second: "00",
            miliSecond: "00",
            laps: [],
            prevlaps: [],
            preHour: 0,
            preMinute: 0,
            preSecond: 0,
            preMs: 0,
            startVisiblity: true,
            stopVisiblity: false,
            lapVisiblity: false,
            resetVisiblity: false,
            resumeVisiblity: false

        }
        this.interval = "";
    }
    timer = () => {
        this.setState({
            stopVisiblity: true,
            lapVisiblity: true,
            startVisiblity: false,
            resetVisiblity: false,
            resumeVisiblity: false
        })
        this.interval = setInterval(() => {

            this.setState({ miliSecond: parseInt(this.state.miliSecond) + 1 })

            if (this.state.miliSecond == 99) {
                this.setState({
                    miliSecond: 0,
                    second: parseInt(this.state.second) + 1
                })
            }
            if (this.state.second == 59) {
                this.setState({
                    second: 0,
                    minute: parseInt(this.state.minute) + 1
                })
            }
            if (this.state.minute == 59)
                this.setState({
                    minute: 0,
                    hour: parseInt(this.state.hour) + 1
                })
        }, 10)
    }
    cleartimer = () => {
        this.setState({
            resetVisiblity: true,
            resumeVisiblity: true,
            lapVisiblity: false,
            stopVisiblity: false
        })
        clearInterval(this.interval)
    }
    lap = () => {
        const value = { hour: this.state.hour, minute: this.state.minute, second: this.state.second, miliSecond: this.state.miliSecond }
        const diffrence = { hour: value.hour - this.state.preHour, minute: value.minute - this.state.preMinute, second: value.second - this.state.preSecond, miliSecond: value.miliSecond - this.state.preMs }
        this.setState({
            prevlaps: [...this.state.prevlaps, diffrence],
            preHour: this.state.hour,
            preMinute: this.state.minute,
            preSecond: this.state.second,
            preMs: this.state.miliSecond,
            laps: [...this.state.laps, value]
        })
    }
    reset = () => {
        this.setState({
            startVisiblity: true,
            resumeVisiblity: false,
            resetVisiblity: false,
            prevlaps: [],
            preHour: 0,
            preMinute: 0,
            preSecond: 0,
            preMs: 0,
            laps: [],
            hour: "00",
            minute: "00",
            second: "00",
            miliSecond: "00",
        })
        clearInterval(this.interval)
    }

    render() {
        return (
            <div className='container '>

                <div className="d-flex justify-content-center">
                    <div style={{ backgroundColor: "whitesmoke" }}><button className='btn btn-lg'>{this.state.hour}</button>:<button className='btn btn-lg'>{this.state.minute}</button>:<button className='btn btn-lg'>{this.state.second}</button>:<button className='btn btn-lg'>{this.state.miliSecond}</button></div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    {this.state.startVisiblity ? <button onClick={this.timer} className='btn btn-success ml-4'>Start</button> : ""}
                    {this.state.stopVisiblity ? <button onClick={this.cleartimer} className='btn btn-danger mr-4 ml-4'>stop</button> : ""}
                    {this.state.lapVisiblity ? <button onClick={this.lap} className='btn btn-warning mr-4'>Lap</button> : ""}
                    {this.state.resetVisiblity ? <button onClick={this.reset} className='btn btn-secondary mr-4'>Reset</button> : ""}
                    {this.state.resumeVisiblity ? <button onClick={this.timer} className='btn btn-secondary mr-4'>Resume</button> : ""}
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <div className="row ">
                        <div className="col-md-6">
                            <table className='table table-dark '>
                                <thead>
                                </thead>
                                <tbody style={{ color: "white" }}>
                                    {this.state.laps.map((time, index) => {

                                        return <tr>
                                            <td>{index + 1}</td>
                                            <td>{this.state.prevlaps[index].hour}:{this.state.prevlaps[index].minute}:{this.state.prevlaps[index].second}:{this.state.prevlaps[index].miliSecond} </td>
                                            <td>{time.hour}:{time.minute}:{time.second}:{time.miliSecond} </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
