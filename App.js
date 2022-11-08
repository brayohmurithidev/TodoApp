import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {
  addNewTodo,
  deleteTodo,
  filterByStatus,
  getAllTodos,
} from './database/query';

const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(getAllTodos());
  const [filterStatus, setFilterStatus] = useState('');

  // ADD NEW TO
  const handleAddTodo = () => {
    addNewTodo(Math.floor(Math.random() * 500), text);
    setTodos(getAllTodos());
  };

  // Handle delete
  const handleDelete = id => {
    // console.log(id);
    deleteTodo(id);
    setTodos(getAllTodos());
  };

  // Handle filter
  const handleFilter = status => {
    console.log(status);
    setTodos(filterByStatus(status));
    console.log(filterByStatus(status));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MY TODO</Text>
      <View style={styles.content}>
        <Text>REACT NATIVE APP</Text>
        <TextInput
          onChangeText={val => setText(val)}
          style={styles.textInput}
          placeholder="e.g Eating lunch"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
          <FontAwesomeIcon icon={faPlus} size={20} style={{color: '#fff'}} />
          <Text style={styles.buttonText}>ADD TODO</Text>
        </TouchableOpacity>
        {/* FILTER BY */}
        <View style={styles.filter}>
          <Text style={styles.filtertext}> Filter By:</Text>
          <TouchableOpacity onPress={() => handleFilter('closed')}>
            <Text style={styles.filterKeyword}> Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('open')}>
            <Text style={styles.filterKeyword}>Not done</Text>
          </TouchableOpacity>
        </View>
        {todos == '' ? (
          <Text style={styles.emptyList}>
            You have no plans today. Start by adding a new todo
          </Text>
        ) : (
          <FlatList
            style={styles.todoList}
            data={todos}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View style={styles.todoItem}>
                <Text style={styles.todoName}>{item.name}</Text>
                <Text style={styles.todoName}>{item.status}</Text>
                <TouchableOpacity onPress={() => handleDelete(item._id)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size={20}
                    style={{color: 'red'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginBottom: 30,
    marginRight: 10,
    padding: 24,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '777',
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    // flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    paddingBottom: 15,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  todoName: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    paddingVertical: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 8,
  },
  filtertext: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  filterKeyword: {
    color: '#777',
    fontSize: 16,
    marginHorizontal: 8,
  },
  emptyList: {
    marginVertical: 40,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#777',
    fontSize: 16,
  },
});

export default App;
