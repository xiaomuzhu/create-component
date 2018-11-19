import { configure, shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import ExampleComponent from '../'

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
    expect(ExampleComponent).toBeTruthy()
  })

  it('ExampleComponent should render Text', () => {
    expect(wrapper.text()).toEqual('Example Component: Text')
  })
})
