import { dehydrate, QueryClient } from "@tanstack/react-query";
import Searchbar from "./components/Searchbar";
import TodoList from "./components/TodoList";
import { getTodoItems } from "./api/todo";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: () => getTodoItems(),
  });

  return (
    <main className="min-w-[320px] m-auto my-10 px-5 md:px-5 lg:px-80">
      <Searchbar />
      <TodoList dehydratedState={dehydrate(queryClient)} />
    </main>
  );
}
