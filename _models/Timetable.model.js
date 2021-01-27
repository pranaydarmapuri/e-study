import {
  Schema,
  model
} from 'mongoose'

export default model('Timetable', new Schema({
  id: {
    type: String,
    required: [true, 'Section Id required']
  },
  monday: {
    one: {
      type: String,
      required: [true, 'Requried']
    },
    two: {
      type: String,
      required: [true, 'Requried']
    },
    three: {
      type: String,
      required: [true, 'Requried']
    },
    four: {
      type: String,
      required: [true, 'Requried']
    },
    five: {
      type: String,
      required: [true, 'Requried']
    },
    six: {
      type: String,
      required: [true, 'Requried']
    }
  },
  tuesday: {
    one: {
      type: String,
      required: [true, 'Requried']
    },
    two: {
      type: String,
      required: [true, 'Requried']
    },
    three: {
      type: String,
      required: [true, 'Requried']
    },
    four: {
      type: String,
      required: [true, 'Requried']
    },
    five: {
      type: String,
      required: [true, 'Requried']
    },
    six: {
      type: String,
      required: [true, 'Requried']
    }
  },
  wednesday: {
    one: {
      type: String,
      required: [true, 'Requried']
    },
    two: {
      type: String,
      required: [true, 'Requried']
    },
    three: {
      type: String,
      required: [true, 'Requried']
    },
    four: {
      type: String,
      required: [true, 'Requried']
    },
    five: {
      type: String,
      required: [true, 'Requried']
    },
    six: {
      type: String,
      required: [true, 'Requried']
    }
  },
  thursday: {
    one: {
      type: String,
      required: [true, 'Requried']
    },
    two: {
      type: String,
      required: [true, 'Requried']
    },
    three: {
      type: String,
      required: [true, 'Requried']
    },
    four: {
      type: String,
      required: [true, 'Requried']
    },
    five: {
      type: String,
      required: [true, 'Requried']
    },
    six: {
      type: String,
      required: [true, 'Requried']
    }
  },
  friday: {
    one: {
      type: String,
      required: [true, 'Requried']
    },
    two: {
      type: String,
      required: [true, 'Requried']
    },
    three: {
      type: String,
      required: [true, 'Requried']
    },
    four: {
      type: String,
      required: [true, 'Requried']
    },
    five: {
      type: String,
      required: [true, 'Requried']
    },
    six: {
      type: String,
      required: [true, 'Requried']
    }
  },
  saturday: {
    one: {
      type: String,
      required: [true, 'Requried']
    },
    two: {
      type: String,
      required: [true, 'Requried']
    },
    three: {
      type: String,
      required: [true, 'Requried']
    },
    four: {
      type: String,
      required: [true, 'Requried']
    },
    five: {
      type: String,
      required: [true, 'Requried']
    },
    six: {
      type: String,
      required: [true, 'Requried']
    }
  }
}, {
  collection: 'timetables'
}))