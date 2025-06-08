"use client"
import { Box, Paper, Typography } from '@mui/material';
import {
  LineChart as LineChartRechart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export type LineChartProps = {
  data: ChartDataPoint[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  width?: number;
  height?: number;
}

export const LineChart = ({data, title, xAxisLabel, yAxisLabel, width, height}: LineChartProps) => {
return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      {title && (
        <Typography variant="h5" component="h2" gutterBottom align="center">
          {title}
        </Typography>
      )}
      <Box sx={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <LineChartRechart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x"
              label={{ 
                value: xAxisLabel, 
                position: 'insideBottom', 
                offset: -10 
              }}
            />
            <YAxis
              label={{ 
                value: yAxisLabel, 
                angle: -90, 
                position: 'insideLeft' 
              }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [value, yAxisLabel]}
              labelFormatter={(label: string) => `${xAxisLabel}: ${label}`}
            />

            <Line
              type="monotone"
              dataKey="y"
              stroke="#2196f3"
              strokeWidth={2}
              dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2196f3', strokeWidth: 2 }}
            />
          </LineChartRechart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};