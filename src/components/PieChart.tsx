import { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';



export function PieChartComp(props:any) {
  const demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';
  
  

    return (
      <ResponsiveContainer width="100%" height="70%">
        <PieChart width={400} height={400} > 
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={props.data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
      
}
