import React from "react";
import Graph from './Graph';

export default function Results({ results }) {
    // Separate valid and invalid results
    const validResults = results.filter(result => result.valid);
    const invalidResults = results.filter(result => !result.valid);

    // Calculate mean and standard deviation functions
    const calculateMean = data => data.reduce((sum, value) => sum + value, 0) / data.length;
    const calculateStandardDeviation = (data, mean) =>
        Math.sqrt(data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length);

    // Calculate mean and standard deviation for valid and invalid response times
    const validResponseTimes = validResults.map(result => result.responseTime);
    const invalidResponseTimes = invalidResults.map(result => result.responseTime);
    const validMean = calculateMean(validResponseTimes);
    const validStdDev = calculateStandardDeviation(validResponseTimes, validMean);
    const invalidMean = calculateMean(invalidResponseTimes);
    const invalidStdDev = calculateStandardDeviation(invalidResponseTimes, invalidMean);

    const generateCSV = () => {
        const csvContent = [
            "Valid,Arrow Cue,Target Side,Response Time",
            ...results.map(result => `${result.valid},${result.arrowCue},${result.targetSide},${result.responseTime}`),
            "", // Add an empty line to separate results from statistics
            "Category,Mean,Standard Deviation",
            `Valid Trials,${validMean.toFixed(2)},${validStdDev.toFixed(2)}`,
            `Invalid Trials,${invalidMean.toFixed(2)},${invalidStdDev.toFixed(2)}`
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "results_statistics.csv");
        link.click();
    };
    
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
            <h2>Statistics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Mean</th>
                        <th>Standard Deviation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Valid Trials</td>
                        <td>{validMean.toFixed(2)}</td>
                        <td>{validStdDev.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Invalid Trials</td>
                        <td>{invalidMean.toFixed(2)}</td>
                        <td>{invalidStdDev.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <div className="download-container">
                <button onClick={generateCSV}>Download CSV</button>
            </div>
            <Graph validMeanRT = {validMean} validStd = {validStdDev}invalidMeanRT = {invalidMean} invalidStd = {invalidStdDev}/>
        </div>
    );
}
