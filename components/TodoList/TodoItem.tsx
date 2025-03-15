import { useState } from "react";
import styles from "@/components/TodoList/TodoList.module.css";

interface TodoItemProps {
  item: {
    id: string;
    text: string;
    status: "new" | "in-progress" | "completed"; 
    checked: boolean; 
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({ item, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditTask, setIsEditTask] = useState(false);
  const [newTask, setNewTask] = useState(item.text);

  const handleEdit = () => {
    onEdit(item.id, newTask);
    setIsEditTask(false);
  };

  return (
    <div className={`${styles['todo-item']} ${isEditTask ? styles['editing'] : ''}`}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id)}
        className={styles['todo-checkbox']}
      />

      {isEditTask ? (
        <>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={styles['todo-edit-input']}
          />
          <div className={styles['todo-button']}>
            <button onClick={handleEdit} className={styles['todo-edit-button']}>
              🆗
            </button>
            <button onClick={() => setIsEditTask(false)} className={styles['todo-cancel-button']}>
              ⛔
            </button>
          </div>
        </>
      ) : (
        <>
          <span className={`${styles['todo-text']} ${item.checked ? styles['completed'] : ''}`}>
            {item.text}
          </span>
          <div className={styles['todo-button']} >
            <button onClick={() => setIsEditTask(true)} className={styles['todo-edit-button']}>
              🖊
            </button>
            <button onClick={() => onDelete(item.id)} className={styles['todo-delete-button']}>
              ❌
            </button>
            {item.checked && <span className={styles['todo-checkmark']}>✔</span>}
          </div>
        </>
      )}
    </div>
  );
}