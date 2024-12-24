
import Searchbar from "./components/Searchbar";
import TodoList from "./components/TodoList";



export default function Home() {
  return (
    <main className="min-w-[320px] m-auto my-10 px-5 md:px-5 lg:px-80">
      <Searchbar />
      <TodoList />
    </main>
  );
}
