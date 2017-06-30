import withObserver, {
  CHILD_LIST,
  ATTRIBUTES,
  CHILD_ADDED,
  CHILD_REMOVED,
  CHARACTER_DATA
} from './withObserver';
import WatchForRemoval from './WatchForRemoval';
import WatchForChildrenAddition from './WatchForChildrenAddition';
import WatchChildren from './WatchChildren';
import WatchAttributes from './WatchAttributes';
import WatchContent from './WatchContent';
import WatchForChildrenRemoval from './WatchForChildrenRemoval';
import MutationObserver from './MutationObserver';

export default MutationObserver;

export {
  withObserver,

  MutationObserver,
  WatchForRemoval,
  WatchForChildrenAddition,
  WatchForChildrenRemoval,
  WatchChildren,
  WatchAttributes,
  WatchContent,

  CHILD_LIST,
  ATTRIBUTES,
  CHILD_ADDED,
  CHILD_REMOVED,
  CHARACTER_DATA
};
