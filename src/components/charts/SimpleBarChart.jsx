import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Mon',
        Apple: 7000,
        Android: 5400,
        amt: 2400,
    },
    {
        name: 'Tue',
        Apple: 3000,
        Android: 1400,
        amt: 2200,
    },
    {
        name: 'Wed',
        Apple: 9800,
        Android: 4400,
        amt: 2300,
    },
    {
        name: 'Thu',
        Apple: 1780,
        Android: 5900,
        amt: 2000,
    },
    {
        name: 'Fri',
        Apple: 1890,
        Android: 4800,
        amt: 2100,
    },
    {
        name: 'Sat',
        Apple: 8300,
        Android: 6800,
        amt: 2500,
    },
    {
        name: 'Sun',
        Apple: 8500,
        Android: 9400,
        amt: 2100,
    },
]

export default class SimpleBarChart extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart width={500} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='Android' fill='#00A9FF' activeBar={<Rectangle fill='#D14D72' stroke='blue' />} />
                    <Bar dataKey='Apple' fill='#82ca9d' activeBar={<Rectangle fill='#E38B29' stroke='purple' />} />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}