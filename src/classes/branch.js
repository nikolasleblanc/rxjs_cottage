import Rx from 'rxjs/Rx';

class Branch {
  constructor({id}) {
    this.id = id;
    this.leaves$ = new Rx.Subject()
      .scan(function a(acc, x) { return acc.concat([x]); }, []);
    this.leaves$.startWith([]);
    /*
    Rx.Observable.interval(1000)
      .combineLatest(this.leaves$)
      .map(e => {
        return {
          id: this.id,
          leaves: e[1],
          age: this.age,
          day: this.day,
        };
      })
      .subscribe(console.log);
      */
  }

  update = (value) => {
    switch (value.type) {
    case 'ADD_LEAF':
      this.add(value.payload.entity);
      break;
    case 'SET_DAY': {
      this.setDay(value.payload.day);
      break;
    }
    case 'SET_AGE': {
      this.setAge(value.payload.age);
      break;
    }
    default:
      break;
    }
  };

  add = (leaf) => {
    this.leaves$.next(leaf);
  };

  subscribeTo = (stream) => {
    stream.subscribe(this.update);
  };

  grow = (interval) => {
    // console.log('growing', this.id, interval);
  };

  blow = (power) => {
    // console.log('blowing', power);
  };

  setAge = (age) => {
    this.age = age;
  };

  setDay = (day) => {
    this.day = day;
  };

  fall = () => {
    // console.log('fell', this.id);
  }
}

export default Branch;
