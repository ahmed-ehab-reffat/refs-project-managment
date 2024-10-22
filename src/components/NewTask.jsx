import { useState } from "react";

export default function NewTask({ onAddTask }) {
  const [enteredTask, setEnteredtask] = useState("");

  function handleChange(event) {
    setEnteredtask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim === "") return;
    onAddTask(enteredTask);
    setEnteredtask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        className="px-2 py-1 w-64 rounded-sm bg-stone-200 focus:outline-blue-600"
        type="text"
        value={enteredTask}
        onChange={handleChange}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
