import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import WatchForMutation from './WatchForMutation';
import { CHILD_LIST, CHILD_REMOVED } from './withObserver';

@autobind
class WatchForChildrenRemoval extends WatchForMutation {
  static displayName = 'WatchForChildrenRemoval';

  static propTypes = {
    ...WatchForMutation.propTypes,
    onRemoval: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props, CHILD_LIST, ['onRemoval']);
  }

  handleMutation(type, payload) {
    if (type === CHILD_REMOVED) {
      this.props.onRemoval(payload);
    }
  }
}

export default WatchForChildrenRemoval;
