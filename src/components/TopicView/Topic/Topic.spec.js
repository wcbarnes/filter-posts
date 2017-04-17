import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Topic from './';

const wrapper = shallow(<Topic />);

describe('(Component) Topic', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1);
  });
});
