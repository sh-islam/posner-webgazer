import React from "react";

export default function Results({ results }) {
    // console.log("results from Results page", results);
    return (
        <div className="results">
            <h1>Results</h1>
            <table>
                <thead>
                    <tr>
                        <th>Valid</th>
                        <th>Arrow Cue</th>
                        <th>Target Side</th>
                        <th>Response Time</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.valid ? "True" : "False"}</td>
                            <td>{result.arrowCue}</td>
                            <td>{result.targetSide}</td>
                            <td>{result.responseTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
