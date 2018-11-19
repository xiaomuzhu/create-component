/**
 * @class ExampleComponent
 */

import * as React from 'react'

import styles from './style.css'

export interface IProps {
  text: string
}

export default class ExampleComponent extends React.Component<IProps> {
  public render() {
    const { text } = this.props

    return <div className={styles.test}>Example Component: {text}</div>
  }
}
