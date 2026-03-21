import { Provider } from 'react-redux';
import store from './store/store';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1>Redux Todo List</h1>
        <AddTodo />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
