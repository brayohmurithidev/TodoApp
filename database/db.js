import Realm from 'realm';
import {TaskSchema} from './schema';

// create realm
let realm = new Realm({
  path: 'myrealm',
  schema: [TaskSchema],
});

export default realm;
