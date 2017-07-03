# react-mutation-observer

[![Downloads][npm-dm]][package-url]
[![Downloads][npm-dt]][package-url]
[![NPM Version][npm-v]][package-url]
[![Dependencies][deps]][package-url]
[![Dev Dependencies][dev-deps]][package-url]
[![License][license]][package-url]

__React wrapper for mutation observers.__

> Based on
[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

## Getting Started

Install it via npm:

```shell
npm install --save react-mutation-observer
```

Install it via yarn:

```shell
yarn add react-mutation-observer
```

## Examples

### Basic usage
```javascript
import MutationObserver from 'react-mutation-observer';
```

```HTML
<MutationObserver
  onContentChange={console.log.bind(null, 'Change content triggered.')}
  onAttributeChange={console.log.bind(null, 'Change attribute triggered.')}
  onChildRemoval={console.log.bind(null, 'Child removal triggered.')}
  onChildAddition={console.log.bind(null, 'Child addition triggered.')}
>
  <div className="App-intro" data-edit="EDIT ME">
    REMOVE ME
    <b>EDIT ME</b>
  </div>
</MutationObserver>
```

### Triggered if the the specific element is removed
```javascript
import { WatchForRemoval } from 'react-mutation-observer';
```

```HTML
<WatchForRemoval
  onRemoval={console.log.bind(null, 'Child removal triggered.')}
>
  <div className="App-intro" data-edit="EDIT ME">
    Remove the whole div
  </div>
</WatchForRemoval>
```

### Only watch for children being added or removed
```javascript
import { WatchChildren, WatchForChildrenRemoval, WatchForChildrenAddition } from 'react-mutation-observer';
```

```HTML
<WatchChildren
  onRemoval={console.log.bind(null, 'Child removal triggered.')}
  onAddtion={console.log.bind(null, 'Child addition triggered.')}
>
  <div className="App-intro">
    <b>REMOVE b tag</b>
  </div>
</WatchChildren>
<WatchForChildrenRemoval
  onRemoval={console.log.bind(null, 'Child removal triggered.')}
>
  <div className="App-intro">
    <b>REMOVE b tag</b>
  </div>
</WatchForChildrenRemoval>
<WatchForChildrenAddition
  onAddtion={console.log.bind(null, 'Child addition triggered.')}
>
  <div className="App-intro">
    <b>REMOVE b tag</b>
  </div>
</WatchForChildrenAddition>
```

### Only watch content changes
```javascript
import { WatchContent } from 'react-mutation-observer';
```

```HTML
<WatchContent
  onChange={console.log.bind(null, 'Content change triggered.')}
>
  <div className="App-intro">
    Edit Me
  </div>
</WatchContent>
```

### Only watch attribute changes
```javascript
import { WatchAttributes } from 'react-mutation-observer';
```

```HTML
<WatchAttributes
  onChange={console.log.bind(null, 'Attribute change triggered.')}
>
  <div className="App-intro EditMe" data-thing="Or Edit Me">
    Some Text
  </div>
</WatchAttributes>
```

### Need More control? use the wrapper
```javascript
import { withObserver } from 'react-mutation-observer';
```

```javascript
return withObserver(Component);
```

#### Props
```javascript
{
  observedComponent: PropTypes.func,
  categories: PropTypes.oneOfType([
    PropTypes.oneOf([
      CHILD_LIST,
      ATTRIBUTES,
      CHARACTER_DATA,
      ALL_CATEGORIES
    ]),
    PropTypes.arrayOf(PropTypes.oneOf([
      CHILD_LIST,
      ATTRIBUTES,
      CHARACTER_DATA,
      ALL_CATEGORIES
    ]))
  ]).isRequired, // defaults to CHILD_LIST
  attributeList: PropTypes.arrayOf(PropTypes.string),
  subtree: PropTypes.bool, // defaults to false
  suppressAttributeOldValue: PropTypes.bool, // defaults to false
  suppressCharacterDataOldValue: PropTypes.bool, // defaults to false
  onMutation: PropTypes.func.isRequired
}
```

The different categories and mutation types are available as exports as well;

```javascript
import {
  ALL_CATEGORIES, // Sets the observer to watch all available changes
  CHILD_LIST, // Sets the observer to watch additions and removals of children
  CHILD_REMOVED, // Mutation type passed when a child is removed
  CHILD_ADDED, // Mutation type passed when a child is added
  ATTRIBUTES, // Mutation type passed when an attribute is changed and is used to set the observer to watch changes to attributes
  CHARACTER_DATA // Mutation type passed when content is changed and is used to set the observer to watch changes to content. Typically needs to be used with `subtree={true}`
} from 'react-mutation-observer';
```

__onMutation__
```javascript
handleMutation(type, payload) {
}
```

__onMutation Payload Structures__
  - Type: CHILD_REMOVED || CHILD_ADDED
  ```javascript
    {
      target,
      previousSibling,
      nextSibling,
      wrappedNode,
      child
    }
  ```
  - Type: ATTRIBUTES
  ```javascript
    {
      from,
      to,
      name,
      namespace,
      target
    }
  ```
  - Type: CHARACTER_DATA
  ```javascript
    {
      from,
      to,
      target
    }
  ```

## License

MIT

[npm-dm]: https://img.shields.io/npm/dm/react-mutation-observer.svg
[npm-dt]: https://img.shields.io/npm/dt/react-mutation-observer.svg
[npm-v]: https://img.shields.io/npm/v/react-mutation-observer.svg
[deps]: https://img.shields.io/david/jcgertig/react-mutation-observer.svg
[dev-deps]: https://img.shields.io/david/dev/jcgertig/react-mutation-observer.svg
[license]: https://img.shields.io/npm/l/react-mutation-observer.svg
[package-url]: https://npmjs.com/package/react-mutation-observer
