import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, toggleTodo, deleteTodo } from "../redux/todoslice";
import { AppDispatch, RootState } from "../redux/store";

const TodoApp = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);

  return (
    <div className={styles.TodoApp}>
      <h1>To Do List</h1>
      <div className={styles.InputArea}>
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          placeholder="add a task"
          type="text"
        />
        <button
          onClick={() => {
            if (text) dispatch(addTodo(text));
            setText("");
          }}
        >
          ADD
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              className={todo.completed ? styles.Completed: ""}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
