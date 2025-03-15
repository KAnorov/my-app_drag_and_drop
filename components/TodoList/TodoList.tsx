import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "@/components/TodoList/TodoItem";
import styles from "@/components/TodoList/TodoList.module.css";

type Task = {
    id: string;
    text: string;
    status: "new" | "in-progress" | "completed";
    checked: boolean;
};

const generateId = () => uuidv4();

export default function TodoList() {
    const [todos, setTodos] = useState<Task[]>([
        { id: generateId(), text: "Задача 1", status: "new", checked: false },
        { id: generateId(), text: "Задача 2", status: "in-progress", checked: false },
        { id: generateId(), text: "Задача 3", status: "completed", checked: true },
        { id: generateId(), text: "Задача 4", status: "new", checked: false },
        { id: generateId(), text: "Задача 5", status: "in-progress", checked: false },
    ]);

    const [task, setTask] = useState("");
    const [draggingOverColumn, setDraggingOverColumn] = useState<"new" | "in-progress" | "completed" | null>(null);

    const addTodo = () => {
        if (task.trim()) {
            setTodos([...todos, { id: generateId(), text: task, status: "new", checked: false }]);
            setTask("");
        }
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id: string, newText: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    const onToggle = (id: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        checked: !todo.checked,
                        status: !todo.checked ? "completed" : "in-progress",
                    }
                    : todo
            )
        );
    };

    const deleteSelectedTodos = () => {
        setTodos(todos.filter((todo) => !todo.checked));
    };

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
        e.dataTransfer.setData("text/plain", id);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, status: "new" | "in-progress" | "completed") => {
        e.preventDefault();
        setDraggingOverColumn(status);
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        targetStatus: "new" | "in-progress" | "completed"
    ) => {
        const id = e.dataTransfer.getData("text/plain");
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, status: targetStatus } : todo
        );
        setTodos(updatedTodos);
        setDraggingOverColumn(null);
    };

    const handleDragLeave = () => {
        setDraggingOverColumn(null);
    };

    const newTasks = todos.filter((todo) => todo.status === "new");
    const inProgressTasks = todos.filter((todo) => todo.status === "in-progress");
    const completedTasks = todos.filter((todo) => todo.status === "completed");

    return <>
    
        <div className={styles.todoList}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Добавить новое дело"
                className={styles.todoInput}
            />
            <div>
                <button onClick={addTodo} className={styles.addButton}>
                    ➕
                </button>
                <button onClick={deleteSelectedTodos} className={styles.deleteSelectedButton}>
                    Удалить выбранные
                </button>
            </div>


            <div className={styles.columns}>
                <div
                    // Новые задачи 
                    className={`${styles.column} ${draggingOverColumn === "new" ? styles.draggingOver : ""}`}
                    onDragOver={(e) => handleDragOver(e, "new")}
                    onDrop={(e) => handleDrop(e, "new")}
                    onDragLeave={handleDragLeave}
                >
                    <h2>Новые</h2>
                    <ul>
                        {newTasks.map((todo) => (
                            <li
                                key={todo.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, todo.id)}
                                className={styles.todoItem}
                            >
                                <TodoItem
                                    item={todo}
                                    onToggle={onToggle}
                                    onDelete={deleteTodo}
                                    onEdit={editTodo}
                                />
                            </li>
                        ))}
                    </ul>
                </div>


                <div
                    // Текущие задачи
                    className={`${styles.column} ${draggingOverColumn === "in-progress" ? styles.draggingOver : ""}`}
                    onDragOver={(e) => handleDragOver(e, "in-progress")}
                    onDrop={(e) => handleDrop(e, "in-progress")}
                    onDragLeave={handleDragLeave}
                >
                    <h2>В процессе</h2>
                    <ul>
                        {inProgressTasks.map((todo) => (
                            <li
                                key={todo.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, todo.id)}
                                className={styles.todoItem}
                            >
                                <TodoItem
                                    item={todo}
                                    onToggle={onToggle}
                                    onDelete={deleteTodo}
                                    onEdit={editTodo}
                                />
                            </li>
                        ))}
                    </ul>
                </div>


                <div
                    // Выполненные задачи

                    className={`${styles.column} ${draggingOverColumn === "completed" ? styles.draggingOver : ""}`}
                    onDragOver={(e) => handleDragOver(e, "completed")}
                    onDrop={(e) => handleDrop(e, "completed")}
                    onDragLeave={handleDragLeave}
                >
                    <h2>Выполнено</h2>
                    <ul>
                        {completedTasks.map((todo) => (
                            <li
                                key={todo.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, todo.id)}
                                className={styles.todoItem}
                            >
                                <TodoItem
                                    item={todo}
                                    onToggle={onToggle}
                                    onDelete={deleteTodo}
                                    onEdit={editTodo}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>;
}

