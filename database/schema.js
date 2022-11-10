// CREATE SCHEMA
const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'int',
    name: 'string',
    is_complete: 'bool',
  },
  primaryKey: '_id',
};

export {TaskSchema};
