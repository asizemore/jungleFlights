import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {XYChart, LineSeries, Axis } from '@visx/xychart';


type AltitudePlotProps = {
  data: { x: number, y: number }[]
}

const AltitudePlot = (props: AltitudePlotProps) => {
  console.log(props.data);
  return (
    <XYChart
      xScale={{ type: 'band' }}
      yScale={{ type: 'linear' }}
      width={300}
      height={300}
    >
      <Axis orientation="bottom" />
      <Axis orientation="left" />
      <LineSeries
        data={[
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 4 },
          { x: 5, y: 5 },
          { x: 6, y: 6 },
          { x: 7, y: 7 },
          { x: 8, y: 8 },
          { x: 9, y: 9 },
        ]}
        xAccessor={(d: { x: number, y: number }) => d.x} 
        yAccessor={(d: { x: number, y: number }) => d.y}
        dataKey={"key1"}
      />
    </XYChart>
  );
}


const meta = {
  title: 'Components/AltitudePlot',
  component: AltitudePlot,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} satisfies Meta<typeof AltitudePlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: [
      {x: 0, y: 0},
    ]
  }
};