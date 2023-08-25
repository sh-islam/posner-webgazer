import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Graph({ validMeanRT, validStd, invalidMeanRT, invalidStd }) {
    const data = [
        {
            name: 'Valid trials',
            valid_RT: validMeanRT,
            valid_Stdev: validStd,
        },
        {
            name: 'Invalid trials',
            invalid_RT: invalidMeanRT,
            invalid_Stdev: invalidStd,
        }
    ];

    return (
        <div className='bargraph'>
            <h2>Validity and Mean RT</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="valid_RT" fill="#8884d8" name="Valid Mean RT" />
                    <Bar dataKey="valid_Stdev" fill="#82ca9d" name="Valid Std Dev" />
                    <Bar dataKey="invalid_RT" fill="#8884d8" name="Invalid Mean RT" />
                    <Bar dataKey="invalid_Stdev" fill="#82ca9d" name="Invalid Std Dev" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
