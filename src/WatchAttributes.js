import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import WatchForMutation from './WatchForMutation';
import { ATTRIBUTES } from './withObserver';

@autobind
class WatchAttributes extends WatchForMutation {
  static displayName = 'WatchAttributes';

  static propTypes = {
    ...WatchForMutation.propTypes,
    onChange: PropTypes.func.isRequired,
    attributeList: PropTypes.arrayOf(PropTypes.string),
    suppressAttributeOldValue: PropTypes.bool,
  };

  constructor(props) {
    super(props, ATTRIBUTES, ['onChange']);
  }

  handleMutation(type, payload) {
    if (type === ATTRIBUTES) {
      this.props.onChange(payload);
    }
  }
}

export default WatchAttributes;
