import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import omit from 'lodash.omit';
import withObserver from './withObserver';

@autobind
class WatchForMutation extends Component {
  static displayName = 'WatchForMutation';

  static propTypes = {
    children: PropTypes.element,
    component: PropTypes.element,
    subtree: PropTypes.bool.isRequired
  };

  static defaultProps = {
    subtree: false
  };

  constructor(props, categories, omitList = [], observedComponent) {
    super(props);
    this.categories = categories;
    this.omitList = omitList;
    this.observedComponent = observedComponent;
  }

  handleMutation(type, data) {
    console.log(`Mutation triggered: ${type}`, data);
  }

  render() {
    const { children, component, subtree, ...rest } = this.props;
    const props = omit(rest, this.omitList);
    let toBeWrapped;
    if (Children.count(children)) {
      toBeWrapped = Children.only(children);
    } else {
      if (!component) {
        throw new Error('WatchForRemove: A child or a component has to be passed in.');
      }
      toBeWrapped = component;
    }
    const Component = withObserver(toBeWrapped);
    return (
      <Component
        observedComponent={this.observedComponent}
        onMutation={this.handleMutation}
        categories={this.categories}
        subtree={subtree}
        {...props}
      />
    );
  }
}

export default WatchForMutation;
