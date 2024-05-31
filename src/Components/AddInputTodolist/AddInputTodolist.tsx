import { ChangeEvent, useState, KeyboardEvent } from "react";

type PropsTypeInput = {
  addItem: (title: string) => void;
};

export function AddInputTodolist(props: PropsTypeInput) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
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
