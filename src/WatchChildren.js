import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import WatchForMutation from './WatchForMutation';
import { CHILD_LIST, CHILD_REMOVED, CHILD_ADDED } from './withObserver';

@autobind
class WatchChildren extends WatchForMutation {
  static displayName = 'WatchChildren';

  static propTypes = {
    ...WatchForMutation.propTypes,
    onRemoval: PropTypes.func.isRequired,
    onAddition: PropTypes.func.isRequired
  };

  static defaultProps = {
    subtree: true,
    onRemoval: () => {},
    onAddition: () => {}
  };

  constructor(props) {
    super(props, CHILD_LIST, ['onRemoval', 'onAddition']);
  }

  handleMutation(type, payload) {
    if (type === CHILD_REMOVED) {
      this.props.onRemoval(payload);
    }
    if (type === CHILD_ADDED) {
      this.props.onAddition(payload);
    }
  }
}

export default WatchChildren;
