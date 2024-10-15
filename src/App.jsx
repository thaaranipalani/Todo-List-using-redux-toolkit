import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './features/todos/todoSlice';
import { nanoid } from 'nanoid';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ id: nanoid(), text: newTodo }));
      setNewTodo('');
    }
  };

  const handleEditTodo = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    dispatch(editTodo({ id: editId, text: editText }));
    setEditId(null);
    setEditText('');
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 rounded-lg"
          placeholder="Add a new task..."
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-gray-500">No tasks added yet.</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-scroll">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center p-2 border-b"
              >
                {editId === todo.id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="border p-2 rounded-lg w-full"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{todo.text}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditTodo(todo.id, todo.text)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
