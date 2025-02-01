import { TodoListItem } from "@/types/todoItemType";

// api/todo.ts (API 레이어 분리)
export const getTodoItems = async (): Promise<TodoListItem[]> => {
  const res = await fetch("https://assignment-todolist-api.vercel.app/api/junesung/items", {
    cache: "no-cache",
  });
  return await res.json();
};

export const updateTodoStatus = async (id: string, isCompleted: boolean): Promise<TodoListItem> => {
  const res = await fetch(`https://assignment-todolist-api.vercel.app/api/junesung/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isCompleted }),
  });
  return await res.json();
};
