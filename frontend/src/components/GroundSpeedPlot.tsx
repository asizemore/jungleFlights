import React from 'react';
import { XYChart, LineSeries, Axis } from '@visx/xychart';


type GroundSpeedPlotProps = {
    data: { x: number, y: number }[]
  }

const getMinMax = (vals: (number | { valueOf(): number })[]) => {
    const numericVals = vals.map(Number);
    return [Math.min(...numericVals), Math.max(...numericVals)];
};
  
export default function GroundSpeedPlot(props: GroundSpeedPlotProps) {
    const inputData = props.data;

    // Return an empty div if there's no data
    if (inputData.length === 0) {
        return <div>No data</div>;
    } else {
        return (
          <XYChart
            xScale={{ type: 'linear'}}
            yScale={{ type: 'linear' }}
            width={550}
            height={200}
          >
            <Axis orientation="bottom" tickValues= {inputData.map(d => d.x)} label="Time"/>
            <Axis orientation="left" label="Ground Speed (kts)"/>
            <LineSeries
              data={inputData}
              xAccessor={(d: { x: number, y: number }) => d.x} 
              yAccessor={(d: { x: number, y: number }) => d.y}
              dataKey={"key1"}
            />
          </XYChart>
        );
    }
  }