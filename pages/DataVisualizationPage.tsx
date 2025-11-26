
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';
import { ChartData } from '../types';

const mockChartData: ChartData[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 4500 },
  { name: 'Sep', value: 2900 },
  { name: 'Oct', value: 3800 },
  { name: 'Nov', value: 2100 },
  { name: 'Dec', value: 5000 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DataVisualizationPage: React.FC = () => {
  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Data Visualization Playground</h2>
      <p className="mb-8 text-gray-600">
        This section demonstrates various types of charts and data visualizations using the Recharts library.
        Focus on rendering, responsiveness, tooltips, and legends for testing.
      </p>

      {/* Bar Chart */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Sales Bar Chart</h3>
      <div className="bg-gray-50 p-4 rounded-md shadow-inner mb-8 h-80">
        <ResponsiveContainer width="100%" height="100%" data-testid="bar-chart-container">
          <BarChart
            data={mockChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Sales Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Trends Line Chart</h3>
      <div className="bg-gray-50 p-4 rounded-md shadow-inner mb-8 h-80">
        <ResponsiveContainer width="100%" height="100%" data-testid="line-chart-container">
          <LineChart
            data={mockChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} name="Page Views" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Cumulative Performance Area Chart</h3>
      <div className="bg-gray-50 p-4 rounded-md shadow-inner mb-8 h-80">
        <ResponsiveContainer width="100%" height="100%" data-testid="area-chart-container">
          <AreaChart
            data={mockChartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#ffc658" fill="#ffc658" name="User Activity" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Category Distribution Pie Chart</h3>
      <div className="bg-gray-50 p-4 rounded-md shadow-inner mb-8 h-80 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%" data-testid="pie-chart-container">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default DataVisualizationPage;
