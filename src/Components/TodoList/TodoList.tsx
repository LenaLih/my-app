import React, { ChangeEvent } from "react";
import { FilterValuesType } from "../../App";
import { AddInputTodolist } from "../AddInputTodolist/AddInputTodolist";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  filter: FilterValuesType;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  removeTodolist: (todolistId: string) => void;
};

export function TodoList(props: PropsType) {
  const onAllHandler = () => props.changeFilter("All", props.id);
  const onActiveHandler = () => props.changeFilter("Active", props.id);
  const onCompletedHandler = () => props.changeFilter("Completed", props.id);
  const removeTodolist = () => props.removeTodolist(props.id);
  const addTask = (title: string) => props.addTask(title, props.id);

  return (
    <div className="body">
      <h3>
        {props.title}
        <button onClick={removeTodolist}>X</button>
      </h3>

      <AddInputTodolist addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => props.removeTask(t.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          const onChangeTitleHandler = (newValue: string) => props.changeTaskTitle(t.id, newValue, props.id);
          return (
            <li>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeHandler}
              />
              <EditableSpan title={t.title}  onChange={onChangeTitleHandler}/>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "All" ? "filter-button" : ""}
          onClick={onAllHandler}
        >
          All
        </button>
        <button
          className={props.filter === "Active" ? "filter-button" : ""}
          onClick={onActiveHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "Completed" ? "filter-button" : ""}
          onClick={onCompletedHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
