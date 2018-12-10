import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    <% if (!cssinjs) { %>
      return <div className={styles.test}>Example Component: {text}</div>
    <% } else { %>
      return <Title>Example Component: {text}</Title>
    <% } %>
  }
}
