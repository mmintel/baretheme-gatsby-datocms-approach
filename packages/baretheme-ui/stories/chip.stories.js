import React from 'react';
import Chip from '../components/chip';

export default {
  title: 'Components/Chip',
};

export const Single = () => <Chip>Test</Chip>;

export const Multiple = () => (
  <>
    <Chip>Test</Chip>
    <Chip>Test</Chip>
    <Chip>Test</Chip>
  </>
);
