import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import WatchForMutation from './WatchForMutation';
import { CHILD_LIST, CHILD_REMOVED } from './withObserver';

@autobind
class WatchForRemoval extends WatchForMutation {
  static displayName = 'WatchForRemoval';

  static propTypes = {
    ...WatchForMutation.propTypes,
    onRemoval: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props, CHILD_LIST, ['onRemoval'], (elm) => elm.parentNode);
  }

  handleMutation(type, payload) {
    if (type === CHILD_REMOVED) {
      if (payload.child === payload.wrappedNode) {
        this.props.onRemoval(payload);
      }
    }
  }
}

export default WatchForRemoval;
