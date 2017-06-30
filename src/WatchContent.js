import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import WatchForMutation from './WatchForMutation';
import { CHARACTER_DATA } from './withObserver';

@autobind
class WatchContent extends WatchForMutation {
  static displayName = 'WatchContent';

  static propTypes = {
    ...WatchForMutation.propTypes,
    onChange: PropTypes.func.isRequired,
    suppressCharacterDataOldValue: PropTypes.bool,
  };

  static defaultProps = {
    subtree: true
  };

  constructor(props) {
    super(props, CHARACTER_DATA, ['onChange']);
  }

  handleMutation(type, payload) {
    if (type === CHARACTER_DATA) {
      this.props.onChange(payload);
    }
  }
}

export default WatchContent;
