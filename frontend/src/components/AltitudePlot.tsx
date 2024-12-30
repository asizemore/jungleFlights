import React from 'react';
import { XYChart, LineSeries, Axis } from '@visx/xychart';


type AltitudePlotProps = {
    data: { x: number, y: number }[]
  }
  
export default function AltitudePlot(props: AltitudePlotProps) {
    const inputData = props.data;
    return (
      <XYChart
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear' }}
        width={300}
        height={300}
      >
        <Axis orientation="bottom" />
        <Axis orientation="left" />
        <LineSeries
          data={inputData}
          xAccessor={(d: { x: number, y: number }) => d.x} 
          yAccessor={(d: { x: number, y: number }) => d.y}
          dataKey={"key1"}
        />
      </XYChart>
    );
  }