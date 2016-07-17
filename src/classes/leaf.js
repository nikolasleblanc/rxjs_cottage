class Leaf {
  constructor({id}) {
    this.id = id;
  }

  update = (value) => {
    switch (value.type) {
    case 'WIND': {
      this.blow(value.power);
      break;
    }
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

  subscribeTo = (stream) => {
    stream.subscribe(this.update);
  };

  grow = (interval) => {
    // console.log('growing', this.id, interval);
  };

  blow = (power) => {
    // console.log('blowing', power);
  };

  fall = () => {
    // console.log('fell', this.id);
  };

  setDay = (day) => {
    this.day = day;
  };

  setAge = (age) => {
    this.age = age;
  };
}

export default Leaf;
