import Realm from 'realm';
import realm from './db';

// CREATE TASKS
const addNewTodo = (id, _name, _status = 'open') => {
  realm.write(() => {
    realm.create('Task', {
      _id: id,
      name: _name,
      status: _status,
    });
  });
};

// GET ALL TODO LISTS
let getAllTodos = () => {
  return realm.objects('Task');
};

// DELETE TODO
const deleteTodo = id => {
  realm.write(() => {
    let todo = realm.objectForPrimaryKey('Task', id);
    realm.delete(todo);
  });
};

// Filter by closed or open
const filterByStatus = status => {
  getAllTodos().filter(`status=${status}`);
};

export {addNewTodo, getAllTodos, deleteTodo};
