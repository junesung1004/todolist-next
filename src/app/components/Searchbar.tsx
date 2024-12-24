"use client"

import { useState } from "react";
import Button from "./Button";


export default function Searchbar() {
  const [name, setName] = useState<string>("")

  //할 일 추가하는 이벤트 코드입니다. (마우스 이벤트)
  const clickAddHandler = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if(!name) {
      alert("할 일을 입력해 주세요")
      return
    }
    const newTodo = {
      name,
    }

    try {
      const response = await fetch(
        `https://assignment-todolist-api.vercel.app/api/junesung/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        }
      );

      if (!response.ok) {
        console.error("API 응답 오류");
        throw new Error("할 일 추가 기능이 실패했습니다.");
      }
  
      const responseData = await response.json();
      console.log("할 일이 추가되었습니다:", responseData);
    } catch(error) {
      console.error("할 일 추가 에러 : ", error)
    }

    setName("")
  }

  //할 일 추가하는 이벤트 코드입니다. (키보드 이벤트)
  const enterAddHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      //e as any를 하는 이유는 이벤트 대상이 키보드 vs 마우스이기 때문에 타입 오류를 방지하기 위해 설정한 코드
      clickAddHandler(e as any)
    }
  }

  //사용자가 입력한 값을 감지하여 name 상태에 반영하는 이벤트입니다.
  const onChangeText = (e:React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <div className="m-auto ">
      <form className="flex gap-5 mb-10">
        <input
        placeholder="할 일을 입력해주세요" 
        className="px-5 py-2 bg-[#E2E8F0] border border-[2px] border-black  rounded-full shadow-[4px_4px_#000] flex-1"
        type="text" 
        value={name} 
        onChange={onChangeText}
        onKeyDown={enterAddHandler}
        />
        <Button text={"+ 추가하기"} onClick={clickAddHandler}/>
      </form>
    </div>
  )
}