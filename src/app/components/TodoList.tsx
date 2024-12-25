"use client"

import {TodoListItem} from "@/types/todoItemType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todoList, setTodoList] = useState<TodoListItem[]>([])
  const [completedList, setCompletedList] = useState<TodoListItem[]>([])
  console.log("completedList : ", completedList)
  const [notCompletedList, setNotCompletedList] = useState<TodoListItem[]>([])
  console.log("notCompletedList : ", notCompletedList)

  //Swagger 문서에 정의된 API 경로를 통해 GET 요청을 보내 할 일 리스트를 가져오는 훅입니다.
  useEffect(()=> {
    const fetchTodoData = async() => {
      try{
        const res = await fetch("https://assignment-todolist-api.vercel.app/api/junesung/items")

        if(!res.ok) {
          throw new Error("할 일 목록을 가져오는데 실패했습니다.")
        }

        const data = await res.json()
        // console.log("데이터베이스에 저장된 data : ", data)
        const completed = data.filter((todo:TodoListItem)=> todo.isCompleted)
        const notCompleted = data.filter((todo:TodoListItem) => !todo.isCompleted)
        setCompletedList(notCompleted)
        setNotCompletedList(completed)
        setTodoList(data)
        
      } catch(error) {
        console.error("할 일 가져오기 실패 :", error)
        throw new Error("할 일 가져오기 기능이 실패했습니다.")
      }
    }
    fetchTodoData()
  },[])

  // isCompleted 의 상태를 변화시키는 이벤트 함수
  const handleClickIsCompletedUpdate = async(id: string) => {
    try {
      const res = await fetch(`https://assignment-todolist-api.vercel.app/api/junesung/items/${id}`)

      if(!res.ok) {
        console.error("해당 id 요청 기능 실패")
        throw new Error("해당 id가 존재하지 않습니다.")
      }
      const data = await res.json()

      const updateData = {
        name: data.name,
        memo: data.name,
        imageUrl: data.imageUrl, 
        isCompleted: !data.isCompleted,
      }

      const updateItem = await fetch(`https://assignment-todolist-api.vercel.app/api/junesung/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData)
      })

      if(!updateItem.ok) {
        console.error("아이템 수정 실패")
        throw new Error("아이템 수정 실패")
      }
      alert("아이템 수정이 완료되었습니다.")

      //상태 업데이트 (리렌더링)
      setTodoList((prevList) => {
        const updatedList = prevList.map((todo)=> 
          todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
        )
        const completed = updatedList.filter((todo) => !todo.isCompleted);
        const notCompleted = updatedList.filter((todo) => todo.isCompleted);
        setCompletedList(completed);
        setNotCompletedList(notCompleted);
        return updatedList;
      })
    } catch(error) {
      console.error("수정이 실패했습니다.")
      throw new Error("수정 기능이 실패했습니다.")
    }
  }

  return(
    <article className="flex flex-col md:flex-row  gap-8">
      {/* TO DO 목록 */}
      <section className="flex flex-col gap-5 flex-1 ">
        <Image 
        src={"/images/todo.svg"}
        alt="todo-할일 로고"
        width={101}
        height={36}
        />
        {completedList.map((todo, idx)=> (
          <div key={idx} className="p-2  bg-[#F9FAFB] flex items-center gap-3 border border-[2px] border-black rounded-full">
              <Image 
              src={"/images/Property 1=Default.svg"}
              alt="아이콘"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={()=>handleClickIsCompletedUpdate(todo.id)}
              />
              <Link  href={`/detail/${todo.id}`}>
                <p className="cursor-pointer">{todo.name}</p>
              </Link>
          </div>
        ))}
      </section>

      {/* DONE 목록 */}
      <section className="flex flex-col gap-5  flex-1">
      <Image 
      src={"/images/done.svg"}
      alt="todo-할일 로고"
      width={101}
      height={36}
      />
      {notCompletedList.map((todo, idx)=> (
          <div key={idx} className="p-2  bg-[#EDE9FE] flex items-center gap-3 border border-[2px] border-black rounded-full">
              <Image 
              src={"/images/Property 1=Frame 2610233.svg"}
              alt="아이콘"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={()=>handleClickIsCompletedUpdate(todo.id)}
              />
              <Link  href={`/detail/${todo.id}`}>
                <p className="cursor-pointer">{todo.name}</p>
              </Link>
          </div>
        ))}
      </section>
    </article>
  )
}