import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChartProps } from '../types'

const PerformanceMetrics: React.FC<BarChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[data]}>
                <XAxis dataKey="contract" />
                <YAxis domain={[0, 20000]} allowDataOverflow /> {/* Automatically scale Y-axis */}
                <Tooltip />
                <Legend />
                <Bar dataKey="transactionCount" fill="#8884d8" />
                <Bar dataKey="totalGasUsed" fill="#82ca9d" />
                <Bar dataKey="tokenTransfers" fill="red" />
                <Bar dataKey="errorRate" fill="green" />
                <Bar dataKey="averageGasPrice" fill="orange" />
                <Bar dataKey="averageTransactionValue" fill="navy" />
                <Bar dataKey="maxGasUsed" fill="blue" />
                <Bar dataKey="minGasUsed" fill="pink" />
                <Bar dataKey="totalEtherTransferred" fill="yellow" />
                <Bar dataKey="errorRate" fill="purple" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default PerformanceMetrics

