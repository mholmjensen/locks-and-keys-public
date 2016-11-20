#Flux folder
This is part of the Flux application architecture used. See ```docs/how-to-integrate-redux-md``` for the project setup. 
# Action creators
Action creators go in this folder.

## Synchronous
* To create a synchronous action creator:
  * Return an object <code>{type: ACTION_TYPE_CONSTANT, payload: {...}}</code>. 
  * Each action must be interpreted by a corresponding reducer.
  * Actions are *synchronous* (e.g. you cannot wait for callbacks when reducing these actions).

## Asynchronous 
* To create an asynchronous action creator:
  * Return a function <code>f(dispatch) {...} </code>. 
  * Such actions can use a promise based approach to do asynchronous requests. 
  * These actions should *always* dispatch *synchronous* actions to actually update the state tree. 
  * See Async action versions in this folder for examples.
  * This extension of react dispatcher is provided by redux-thunk
