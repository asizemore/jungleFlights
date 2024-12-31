import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AltitudePlot from '../components/AltitudePlot';



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


const fakeData = [
  {x: 0, y: 0},
  {x: 1, y: -1},
  {x: 2, y: 12},
  {x: 3, y: 3},
  {x: 4, y: -4},
  {x: 5, y: 5},
  {x: 6, y: 16},
];

export const Primary: Story = {
  args: {
    data: fakeData
  }
};