import { ChangeEvent, useState, KeyboardEvent } from "react";

type PropsTypeInput = {
  id: string;
  addTask: (title: string, todolistId: string) => void;
};

export function AddInputTodolist(props: PropsTypeInput) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      if (newTaskTitle.trim() !== "") {
        props.addTask(newTaskTitle.trim(), props.id);
        setNewTaskTitle("");
      }
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={newTaskTitle}
        onChange={onNewTaskTitleChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <button onClick={addTask}>send +</button>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
}
