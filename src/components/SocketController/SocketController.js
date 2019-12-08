import React from 'react'

type Props = {
  authenticated: boolean,
  isOpened: boolean,
  openConnection: void => void
};

class SocketController extends React.Component<Props> {
  openConnection() {
    const { openConnection } = this.props
    //in case the connection is already set, nothing changes
    //otherwise we open the connection. openConnection() returns
    //the unsubscribe method to close the connection
    if (typeof this.unsubscribe !== 'function') {
      this.unsubscribe = openConnection()
    }
  }

  closeConnection() {
    if (typeof this.unsubscribe !== 'function') return

    this.unsubscribe()
    this.unsubscribe = null
  }

  UNSAFE_componentWillMount() {
    this.openConnection()
  }

  componentDidUpdate(prevProps) {
    this.openConnection()
  }

  componentWillUnmount() {
    this.closeConnection()
  }

  render() {
    const { isOpened, children, authenticated } = this.props
    return children
  }
}

export default SocketController
