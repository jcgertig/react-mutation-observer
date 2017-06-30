import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import WatchForMutation from './WatchForMutation';
import {
  ALL_CATEGORIES, CHILD_REMOVED, CHILD_ADDED, ATTRIBUTES, CHARACTER_DATA
} from './withObserver';

const noop = () => {};

@autobind
class MutationObserver extends WatchForMutation {
  static displayName = 'MutationObserver';

  static propTypes = {
    ...WatchForMutation.propTypes,
    subtree: PropTypes.oneOf([ true ]).isRequired,
    onChildRemoval: PropTypes.func.isRequired,
    onChildAddition: PropTypes.func.isRequired,
    onContentChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    subtree: true,
    onChildRemoval: noop,
    onChildAddition: noop,
    onContentChange: noop,
    onAttributeChange: noop
  };

  constructor(props) {
    super(props, ALL_CATEGORIES, [
      'onChildRemoval',
      'onChildAddition',
      'onContentChange',
      'onAttributeChange'
    ]);
  }

  handleMutation(type, payload) {
    switch (type) {
      case CHILD_REMOVED:
        return this.props.onChildRemoval(payload);
      case CHILD_ADDED:
        return this.props.onChildAddition(payload);
      case CHARACTER_DATA:
        return this.props.onContentChange(payload);
      case ATTRIBUTES:
        return this.props.onAttributeChange(payload);
    }
  }
}

export default MutationObserver;
