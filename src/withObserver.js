import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoizerific';
import omit from 'lodash.omit';
import isEqual from 'lodash.isequal';
import { autobind, decorate } from 'core-decorators';

const MutationObserver = window.MutationObserver;

export const CHILD_LIST = 'childList';
export const ATTRIBUTES = 'attributes';
export const CHILD_ADDED = 'childAdded';
export const CHILD_REMOVED = 'childRemoved';
export const CHARACTER_DATA = 'characterData';
export const ALL_CATEGORIES = 'ALL_CATEGORIES';

const oneOf = PropTypes.oneOf([
  CHILD_LIST,
  ATTRIBUTES,
  CHARACTER_DATA,
  ALL_CATEGORIES
]);

export default function withObserver(Wrapped) {
  const name = Wrapped.name || Wrapped.displayName || Wrapped.type || 'Anonymous';

  @autobind
  class Wrapper extends Component {
    static displayName = `MutationObserver(${name})`;

    static propTypes = {
      observedComponent: PropTypes.func.isRequired,
      categories: PropTypes.oneOfType([
        oneOf,
        PropTypes.arrayOf(oneOf)
      ]).isRequired,
      attributeList: PropTypes.arrayOf(PropTypes.string).isRequired,
      subtree: PropTypes.bool.isRequired,
      suppressAttributeOldValue: PropTypes.bool.isRequired,
      suppressCharacterDataOldValue: PropTypes.bool.isRequired,
      onMutation: PropTypes.func.isRequired
    }

    static defaultProps = {
      observedComponent: (i) => i,
      categories: [],
      attributeList: [],
      subtree: false,
      suppressAttributeOldValue: false,
      suppressCharacterDataOldValue: false
    }

    constructor(props) {
      super(props);
      this.observer = null;
    }

    /* Life Cycle Methods */
    componentWillMount() {
      this.buildObserver();
    }

    componentDidMount() {
      this.connectObserver();
    }

    componentWillReceiveProps(nextProps) {
      if (this.observer !== null && typeof this.node !== 'undefined') {
        const changesObserver = omit(Wrapper.propTypes, 'onMutation');
        let observerNeedsUpdate = false;
        for (const key of changesObserver) {
          if (!isEqual(this.props[key], nextProps[key])) {
            observerNeedsUpdate = true;
            break;
          }
        }
        if (observerNeedsUpdate) {
          this.buildObserver();
          this.connectObserver();
        }
      }
    }

    componentWillUnmount() {
      if (this.observer !== null) {
        this.observer.disconnect();
        this.observer = null;
      }
    }

    /* Mutation Handlers */
    handleAttributes({ oldValue, target, attributeName, attributeNamespace }) {
      const res = {
        from: oldValue,
        name: attributeName,
        namespace: attributeNamespace,
        target
      };
      res.to = target.getAttribute(attributeName);
      this.props.onMutation(ATTRIBUTES, res);
    }

    handleCharacterData({ oldValue, target }) {
      const res = {
        from: oldValue,
        to: target.data,
        target
      };
      this.props.onMutation(CHARACTER_DATA, res);
    }

    handleChildList({ target, addedNodes, removedNodes, previousSibling, nextSibling }) {
      const res = {
        target,
        previousSibling,
        nextSibling,
        wrappedNode: this.node
      };
      if (addedNodes.length > 0) {
        addedNodes.forEach((child) => {
          this.props.onMutation(CHILD_ADDED, { ...res, child });
        });
      }
      if (removedNodes.length > 0) {
        removedNodes.forEach((child) => {
          this.props.onMutation(CHILD_REMOVED, { ...res, child });
        });
      }
    }

    mutationReducer(type, payload) {
      switch (type) {
        case ATTRIBUTES:
          return this.handleAttributes(payload);
        case CHARACTER_DATA:
          return this.handleCharacterData(payload);
        case CHILD_LIST:
          return this.handleChildList(payload);
      }
    }

    /* Setup Functions */
    buildObserver() {
      if (this.observer !== null) {
        this.observer.disconnect();
      }
      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((data) => {
          this.mutationReducer(data.type, data);
        });
      });
    }

    @decorate(memoize(25))
    buildConfig(
      subtree,
      categories,
      attributeList,
      suppressAttributeOldValue,
      suppressCharacterDataOldValue
    ) {
      let cats = categories;
      if (typeof categories === 'string') {
        cats = [ categories ];
      }
      if (cats.indexOf(ALL_CATEGORIES) > -1) {
        cats = [ CHILD_LIST, ATTRIBUTES, CHARACTER_DATA ];
      }
      const config = {};
      if (subtree) {
        config.subtree = subtree;
      }
      if (!suppressAttributeOldValue && cats.indexOf(ATTRIBUTES) > -1) {
        config.attributeOldValue = true;
      }
      if (!suppressCharacterDataOldValue && cats.indexOf(CHARACTER_DATA) > -1) {
        config.characterDataOldValue = true;
      }
      if (attributeList.length > 0 && cats.indexOf(ATTRIBUTES) > -1) {
        config.attributeFilter = attributeList;
      }
      if (cats.length === 0) {
        config.childList = true;
      } else {
        cats.forEach((key) => {
          config[key] = true;
        });
      }
      return config;
    }

    connectObserver() {
      const {
        subtree,
        categories,
        attributeList,
        observedComponent,
        suppressAttributeOldValue,
        suppressCharacterDataOldValue
      } = this.props;
      const config = this.buildConfig(
        subtree,
        categories,
        attributeList,
        suppressAttributeOldValue,
        suppressCharacterDataOldValue
      );

      this.observer.observe(observedComponent(this.node), config);
    }

    render() {
      const props = omit(this.props, Object.keys(Wrapper.propTypes));
      if (typeof Wrapped === 'object') {
        return cloneElement(Wrapped, { ...props, ref: (node) => (this.node = node) });
      }
      return  (
        <Wrapped {...props} ref={(node) => (this.node = node)} />
      );
    }
  }

  return Wrapper;
}
