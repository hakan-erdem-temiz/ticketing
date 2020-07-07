import mongoose from 'mongoose';
import { Password } from '../services/password'

// An interface that decribes that properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// an interface that describes th properties
//that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that
// a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//HOOK
// every time you save data to db this middleware will run (this is mongodb middleware)
userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed)
  }
  done();
})

// const buildUser = ( attrs : UserAttrs ) => {
//   return new User(attrs)
// }

// add custom function
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };