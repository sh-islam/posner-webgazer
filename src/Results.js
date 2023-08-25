import React from "react";
import Graph from './Graph';
import { useEffect } from 'react';
import {Tabulator} from 'tabulator-tables';



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


    // Tabulator 
    useEffect(() => {
        new Tabulator("#results-table", {
            height: '100%',
            columns: [
                { title: "Valid", field: "valid" },
                { title: "Arrow Cue", field: "arrowCue" },
                { title: "Target Side", field: "targetSide" },
                { title: "Response Time", field: "responseTime" },
            ],
            data: results, // Use the results array as data source
        });

        const statsData = [
            {
                valid: validMean.toFixed(2),
                arrowCue: validStdDev.toFixed(2),
                targetSide: invalidMean.toFixed(2),
                responseTime: invalidStdDev.toFixed(2),
            }
        ];

        new Tabulator("#stats-table", {
            height: '100%',
            columns: [
                { title: "Valid mean", field: "valid" },
                { title: "Valid std", field: "arrowCue" },
                { title: "Invalid mean", field: "targetSide" },
                { title: "Invalid std", field: "responseTime" },
            ],
            data: statsData, 
        });

    },[results, invalidMean, invalidStdDev, validMean, validStdDev]);

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
            <div id="results-table"></div>
            <h2>Statistics</h2>
            <div id="stats-table"></div>
            <div className="download-container">
                <button onClick={generateCSV}>Download CSV</button>
            </div>
            <Graph validMeanRT = {validMean}
                validStd = {validStdDev}
                invalidMeanRT = {invalidMean}
                invalidStd = {invalidStdDev}
            />
        </div>
    );
}
