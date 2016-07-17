import 'es5-shim';
import 'es6-shim';
import 'es6-promise';

import getRandomBetween from './utils/random';

import Rx from 'rxjs/Rx';

import * as LeafFactory from './factories/leaf-factory';
import * as BranchFactory from './factories/branch-factory';

// this is where we store our branches
const branches$ = new Rx.Subject();

// intervals
// randomInterval$ used to spawn things randomly
const randomInterval$ = Rx.Observable
  .interval(1000)
  .concatMap(() => {
    return Rx.Observable
      // this started as a wind experiment, so that's what the `of` is about
      .of(getRandomBetween(0, 100))
      .delay(getRandomBetween(1000, 5000));
  });

// timeInterval$ used to maintain a tick
const timeInterval$ = Rx.Observable
  .interval(1000);

// appLife$, where we track app ticks
const appLife$ = new Rx.Subject();

// subscribe appLife$ to timeInterval
timeInterval$.subscribe(appLife$
  .map(e => {
    return {
      'type': 'SET_DAY',
      'payload': {
        'day': e,
      },
    };
  })
);

// elementAgeCounter$, dispatches action to update how
// long any particular object has been alive
const elementAgeCounter$ = timeInterval$.map((e) => {
  return {
    type: 'SET_AGE',
    payload: {
      age: e,
    },
  };
});

// leafMaker$, dispatches action to add a new leaf
const leafMaker$ = randomInterval$
  .map(e => {
    return {
      type: 'ADD_LEAF',
      payload: {
        entity: LeafFactory.create(
          appLife$,
          elementAgeCounter$,
          getRandomBetween(0, 10000),
        ),
      },
    };
  });

// emit a new branch on the branches$ stream
const addBranch = () => {
  branches$.next(BranchFactory.create(
    appLife$,
    elementAgeCounter$,
    leafMaker$,
    getRandomBetween(0, 10000),
  ));
};
// subscribe addBranch to randomInterval$ stream
randomInterval$.subscribe(addBranch);

// show current state after each second
Rx.Observable.interval(1000)
  .take(10)
  .withLatestFrom(branches$.scan(function a(acc, x) { return acc.concat([x]); }, []).startWith([]))
  .map(e => {
    return {
      tick: e[0],
      branches: e[1],
    };
  })
  .subscribe(e => console.log('this', e));
