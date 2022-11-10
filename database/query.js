import Realm from 'realm';
import realm from './db';

// CREATE TASKS
const addNewTodo = (id, _name, _is_complete = false) => {
  realm.write(() => {
    realm.create('Task', {
      _id: id,
      name: _name,
      is_complete: _is_complete,
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
const filterByStatus = stat => {
  const filtered = getAllTodos().filtered(`is_complete=${stat}`);
  return filtered;
};

// Update
const updateTodoStatus = (id, is_checked) => {
  realm.write(() => {
    let todo = realm.objectForPrimaryKey('Task', id);
    todo.is_complete = is_checked;
  });
};

// Delete all records
const deleteAllTodos = () => {
  realm.write(() => {
    realm.delete(realm.objects('Task'));
  });
};

export {addNewTodo, getAllTodos, deleteTodo, filterByStatus, updateTodoStatus};
