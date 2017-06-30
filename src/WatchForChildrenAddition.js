import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import WatchForMutation from './WatchForMutation';
import { CHILD_LIST, CHILD_ADDED } from './withObserver';

@autobind
class WatchForNewChildren extends WatchForMutation {
  static displayName = 'WatchForNewChildren';

  static propTypes = {
    ...WatchForMutation.propTypes,
    onAddition: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props, CHILD_LIST, ['onAddition']);
  }

  handleMutation(type, payload) {
    if (type === CHILD_ADDED) {
      this.props.onAddition(payload);
    }
  }
}

export default WatchForNewChildren;
