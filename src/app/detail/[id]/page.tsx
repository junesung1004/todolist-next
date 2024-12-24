"use client"

import { useEffect, useState } from "react";
import { TodoListItem } from "@/types/todoItemType";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const params = useParams<{id:string}>()
  const [todoItem, setTodoItem] = useState<TodoListItem>()
  console.log("todoItem : ", todoItem)

  useEffect(()=> {
    const fetchTodoItem = async() => {
      if(!params.id) {
        console.error("해당 ID 파라미터의 정보가 존재하지 않습니다.")
        return
      }

      try {
        const res = await fetch(`https://assignment-todolist-api.vercel.app/api/junesung/items/${params.id}`)

        if(!res.ok) {
          console.error("API 응답 오류")
          throw new Error("api 정보에 담긴 데이터가 없거나 일치하지 않습니다.")
        }

        const data = await res.json()
        setTodoItem(data)
        console.log("데이터 가져오기 성공:", data);
      } catch(error) {
        console.error("특정 할 일의 정보를 불러오는데 실패", error)
        throw new Error("특정 할 일 데이터 정보를 가져오는데 실패했습니다.")
      }
    }
    fetchTodoItem()
  },[])

  return (
    <main className="max-w-[1200px] m-auto bg-white h-screen py-10">
       <div className="flex justify-center text-center mr-32 ml-32 m-auto p-2 flex-1 bg-[#F9FAFB] flex items-center gap-3 border border-[2px] border-black rounded-3xl cursor-pointer">
          <Image 
          src={"/images/Property 1=Default.svg"}
          alt="아이콘"
          width={32}
          height={32}
          />
          <p className="underline font-bold">{todoItem?.name}</p>
      </div>
    </main>
  );
}
