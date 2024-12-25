"use client"

import { useEffect, useRef, useState } from "react";
import { TodoListItem } from "@/types/todoItemType";
import { useParams } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/Button";

export default function Page() {
  const params = useParams<{id:string}>()
  const [todoItem, setTodoItem] = useState<TodoListItem>()
  console.log("todoItem : ", todoItem)

  const fileInputRef = useRef<HTMLInputElement>(null)
  // const [imgSrc, setImgSrc] = useState<string | null>(null); // 이미지 미리보기 상태 관리

  // 파일 선택 후 미리보기 이미지 생성하는 코드입니다.
  // const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if(!file) {
  //     console.error("파일이 선택되지 않았습니다.")
  //     alert("파일을 선택해주세요.");
  //     return
  //   }

  //   //FileReader를 사용한 이미지 미리보기
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     //미리보기 이미지
  //     setImgSrc(reader.result as string)
  //   }
  //   reader.readAsDataURL(file)
  // }

  // 사진 업로드하는 버튼 이벤트입니다.
  const handleClickImageUpload = () => {
    if(fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // 사진(url) + 메모의 내용을 업로드하는 버튼 이벤트입니다.
  const handleClickPostUpload = () =>{}

  // swagger의 get 요청으로 특정 아이템의 정보를 가져오는 코드입니다.
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
  },[params.id])

  return (
    <main className="max-w-[1200px] m-auto bg-white h-screen py-10">
      {/* todo 할 일 name */}
      <div className="flex justify-center text-center mb-10 mr-5 ml-5 lg:mr-32 lg:ml-32 m-auto p-2 flex-1 bg-[#F9FAFB] flex items-center gap-3 border border-[2px] border-black rounded-3xl cursor-pointer">
          <Image 
          src={"/images/Property 1=Default.svg"}
          alt="아이콘"
          width={32}
          height={32}
          />
          <p className="underline font-bold">{todoItem?.name}</p>
      </div>

      {/* 이미지 && 메모장 컨테이너 */}
      <div className="flex gap-10 mb-5 mr-5 ml-5 lg:mr-32 lg:ml-32  flex-col md:flex-row">
        {/* 이미지 컨테이너  */}
        <div className="flex flex-col flex-1">
          <form 
              encType="multipart/form-data"
              >
              <div className="w-full h-[311px] relative bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] rounded-2xl">
                <input 
                ref={fileInputRef} 
                className="hidden"
                type="file" 
                name="todoPicture" 
                accept="image/*"
                // onChange={handleFileChange}
                />
                <Image
                  src={"/images/img.svg"}
                  alt="플러스 버튼 아이콘"
                  width={64}
                  height={64}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <Image
                  src={"/images/Type=Plus.svg"}
                  alt="플러스 버튼 아이콘"
                  width={64}
                  height={64}
                  className="absolute bottom-2 right-2 cursor-pointer"
                  onClick={handleClickImageUpload}
                />
              </div>
            </form>
        </div>

        {/* 메모장 컨테이너 */}
        <div className="flex flex-1 h-[311px] relative">
          <p className="absolute left-1/2 top-5  transform -translate-x-1/2 z-10 text-[#9F5829] font-bold">
            Memo
          </p>

          <Image 
          src={"/images/memo.svg"}
          alt="메모장 배경색 이미지"
          className="rounded-2xl"
          width={588}
          height={311}
          />
           <textarea 
            className="absolute cursor-pointer hover:outline-none focus:outline-none top-0 left-0 w-full h-full px-4 py-2 rounded-2xl bg-transparent text-center z-10 pt-36" 
            placeholder="메모를 입력하세요"
          ></textarea>
        </div>

      </div>
      
      {/* 버튼 컨테이너 */}
      <div className=" bottom-0 flex gap-5 justify-center lg:justify-end mr-5 ml-5 lg:mr-32 lg:ml-32">
      <Button text={"수정완료"} onClick={handleClickPostUpload} buttonColor={"#E2E8F0"} textColor={"black"}/>
      <Button text={"수정완료"} onClick={handleClickPostUpload} buttonColor={"#F43F5E"} textColor={"white"}/>
      </div>
    </main>
  );
}
