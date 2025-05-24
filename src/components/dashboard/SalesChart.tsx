import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../ui/Button';

// Demo data
const weeklyData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const monthlyData = [
  { name: 'Jan', sales: 20000 },
  { name: 'Feb', sales: 16000 },
  { name: 'Mar', sales: 18000 },
  { name: 'Apr', sales: 22000 },
  { name: 'May', sales: 26000 },
  { name: 'Jun', sales: 24000 },
  { name: 'Jul', sales: 28000 },
  { name: 'Aug', sales: 32000 },
  { name: 'Sep', sales: 34000 },
  { name: 'Oct', sales: 30000 },
  { name: 'Nov', sales: 28000 },
  { name: 'Dec', sales: 38000 },
];

type TimeRange = 'week' | 'month' | 'year';

const SalesChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  
  const data = timeRange === 'week' ? weeklyData : monthlyData;
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Sales Overview</CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant={timeRange === 'week' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#e5e7eb' }} 
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#e5e7eb' }} 
                tickLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Sales']}
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#1e40af" 
                strokeWidth={2} 
                activeDot={{ r: 6, fill: '#1e40af', stroke: '#fff', strokeWidth: 2 }} 
                dot={{ r: 4, fill: '#1e40af', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;