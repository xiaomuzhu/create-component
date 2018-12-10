/**
 * @class ExampleComponent
 */

import * as React from 'react'

<% if (!cssinjs) { %>
import styles from './style.css'
<% } else { %>
import * as styledComponents from 'styled-components'

const Title = styledComponents.default.h1`
  display: inline-block;
  margin: 2em auto;
  border: 2px solid #000;
  font-size: 2em;
`
<% } %>

export interface IProps {
  text: string
}

export default class ExampleComponent extends React.Component<IProps> {
  public render() {
    const { text } = this.props

    <% if (!cssinjs) { %>
      return <div className={styles.test}>Example Component: {text}</div>
    <% } else { %>
      return <Title>Example Component: {text}</Title>
    <% } %>
  }
}
