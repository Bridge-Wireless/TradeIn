import React, { PureComponent } from 'react';
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const data = [
    {
        name: 'Mon',
        Apple: 590,
        Android: 800,
        amt: 1400,
    },
    {
        name: 'Tue',
        Apple: 868,
        Android: 967,
        amt: 1500,
    },
    {
        name: 'Wed',
        Apple: 1400,
        Android: 1000,
        amt: 999,
    },
    {
        name: 'Thu',
        Apple: 1450,
        Android: 1200,
        amt: 1100,
    },
    {
        name: 'Fri',
        Apple: 1520,
        Android: 1100,
        amt: 1200,
    },
    {
        name: 'Sat',
        Apple: 1400,
        Android: 650,
        amt: 1700,
    },
]

export default class Example extends PureComponent {
    render() {
        return (
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <ComposedChart width={500} height={400} data={data} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <CartesianGrid stroke='#f5f5f5' />
                        <XAxis dataKey='name' scale='band' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type='monotone' dataKey='amt' fill='#CDF5FD' stroke='#00A9FF' />
                        <Bar dataKey='Android' barSize={20} fill='#00A9FF' />
                        <Line type='monotone' dataKey='Apple' stroke='#ff7300' />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        )
    }
}