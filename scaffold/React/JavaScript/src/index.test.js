import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ExampleComponent from './index'

configure({ adapter: new Adapter() })

const setup = () => {
  const wrapper = shallow(<ExampleComponent text="Text" />)

  return {
    wrapper,
  }
}

describe('ExampleComponent', () => {
  const { wrapper } = setup()

  it('is truthy', () => {
    expect(wrapper).toBeTruthy()
  })

  it('ExampleComponent should render Text', () => {
    expect(wrapper.text()).toEqual('Example Component: Text')
  })
})
