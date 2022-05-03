import moment from "moment";
import React from "react";

function Table({stationboard}){

    return (
        <div className="overflow-x-auto">
            <div style={{fontWeight:"bold", textAlign:"center", marginBottom:"20px"}}>  {(stationboard[0].stop.station.name)}</div>
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Time</th>
                    <th>Category</th>
                    <th>Line</th>
                    <th>Heading To</th>
                </tr>
                </thead>
                <tbody>
                {stationboard && stationboard.map((connection) => {
                    return (
                        <tr>
                            <td style={{fontWeight: "bold"}}>{
                                <div>
                                    {
                                        (() => {
                                            if(moment(connection.stop.departure).diff(moment(),'minutes',false) > 0) {
                                                return (
                                                    "in " + moment(connection.stop.departure).diff(moment(),'minutes',false) + "'"
                                                )
                                            } else if (moment(connection.stop.departure).diff(moment(),'minutes',false) === 0) {
                                                return (
                                                    <p className={"pulse"}>Jetzt</p>
                                                )
                                            } else {
                                                return (
                                                    "vor " + moment(connection.stop.departure).diff(moment(),'minutes',false)*-1 + "'"
                                                )
                                            }
                                        })()
                                    }
                                </div>

                            }



                            </td>
                            <td>{(() => {
                                switch (connection.category) {
                                    case "T":
                                        return <span class="material-icons">
                                                tram
                                            </span>
                                    case "B":
                                        return <span class="material-icons">
                                                directions_bus
                                            </span>
                                    default:
                                        return <span class="material-icons">
                                                train
                                            </span>
                                }
                            })()}</td>
                            <td>{connection.number}</td>
                            <td>{connection.to}</td>
                        </tr>

                    )
                })}
                </tbody>
            </table>
        </div>


    )
}
export default Table