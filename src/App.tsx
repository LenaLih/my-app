import React, { useState } from "react";
import { TodoList } from "./Components/TodoList/TodoList";
import "./App.css";
import { v1 } from "uuid";
import { AddInputTodolist } from "./Components/AddInputTodolist/AddInputTodolist";
export type FilterValuesType = "All" | "Active" | "Completed";

function App() {
  type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;

  }


  function removeTask(id: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const updatedTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = updatedTasks;
    setTasks({...tasksObj});
  }
  function changeFilter(value: FilterValuesType, todolistId: string) {
   let todolist = todolists.find(tl => tl.id === todolistId);
   if(todolist) {
    todolist.filter = value;
    setTodolists([...todolists])
   }
  }
  function addTask(title: string, todolistId: string) {
    const task = { id: v1(), title: title, isDone: false };
    const tasks = tasksObj[todolistId];
    const newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }
  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    const tasks = tasksObj[todolistId];
   let task = tasks.find(t => t.id === taskId);
   if (task) {
    task.isDone = isDone;
    setTasks({...tasksObj});
   }
  
  }
  let todolistId1 = v1();
  let todolistId2 = v1();

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolist);

    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  }

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "Learn", filter: "All"},
    {id: todolistId2, title: "Bay", filter: "All"},
  ]);
  let [tasksObj, setTasks] = useState({
    [todolistId1]:[
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]:[
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Coffee", isDone: false },
    ]
  })

  return (
    <div className="app">
<AddInputTodolist id={"hhh"} addTask={() => {}} />
     {todolists.map((tl) => {
        let tasksForValue = tasksObj[tl.id];
        if (tl.filter === "Completed") {
          tasksForValue = tasksForValue.filter((t) => t.isDone === true);
        }
        if (tl.filter === "Active") {
          tasksForValue = tasksForValue.filter((t) => t.isDone === false);
        }
      return <TodoList
      key={tl.id}
      id={tl.id}
      title={tl.title}
      tasks={tasksForValue}
      removeTask={removeTask}
      changeFilter={changeFilter}
      addTask={addTask}
      filter={tl.filter}
      changeTaskStatus={changeTaskStatus}
      removeTodolist={removeTodolist}
    />
     })} 
    </div>
  );
}

export default App;
