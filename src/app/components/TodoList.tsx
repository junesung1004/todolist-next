"use client"

import {TodoListItem} from "@/types/todoItemType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TodoList() {

  const [todoList, setTodoList] = useState<TodoListItem[]>([])
  //console.log("todoList : ", todoList)

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
        setTodoList(data)
        
      } catch(error) {
        console.error("할 일 가져오기 실패 :", error)
        throw new Error("할 일 가져오기 기능이 실패했습니다.")
      }
    }
    fetchTodoData()
  },[])

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
  
      {todoList.map((todo, idx)=> (
        <Link key={idx} href={`/detail/${todo.id}`}>
          <div  className="p-2 flex-1 bg-[#F9FAFB] flex items-center gap-3 border border-[2px] border-black rounded-full cursor-pointer">
              <Image 
              src={"/images/Property 1=Default.svg"}
              alt="아이콘"
              width={32}
              height={32}
              />
              <p>{todo.name}</p>
          </div>
        </Link>
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
      <div className="p-2  bg-[#EDE9FE] flex items-center gap-3 border border-[2px] border-black rounded-full cursor-pointer">
        <Image 
        src={"/images/Property 1=Frame 2610233.svg"}
        alt="아이콘"
        width={32}
        height={32}
        />
        <p>비타민 챙겨먹기</p>
      </div>
      </section>
    </article>
  )
}