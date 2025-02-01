"use client";

import { useEffect, useRef, useState } from "react";
import { TodoListItem } from "@/types/todoItemType";
import { useParams } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [todoItem, setTodoItem] = useState<TodoListItem>();
  //console.log("todoItem : ", todoItem)

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null); // 이미지 미리보기 상태 관리

  const [memo, setMemo] = useState<string>("");
  const [text, setText] = useState<string>("");

  // 할 일 제목을 수정하는 코드
  const handleChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 메모 내용을 수정하는 코드
  const handleChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  //파일 이름이 영어로만 이루어졌는지 유효성 검사하는 코드
  // const isValidFileName = (fileName: string) => {
  //   const regex = /^[a-zA-Z._-]+$/; // 영어만 있는지 체크하는 validation
  //   return regex.test(fileName);
  // };

  // 파일 선택 후 미리보기 이미지 생성하는 코드
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.error("파일이 선택되지 않았습니다.");
      alert("파일을 선택해주세요.");
      return;
    }

    // 파일 크기 검사 (5MB = 5 * 1024 * 1024 바이트)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기가 5MB 초과할 수 없습니다.");
      return;
    }

    // 파일 이름 검사
    // if (!isValidFileName(file.name)) {
    //   alert("이미지 파일 이름은 영어로만 이루어져야 합니다.");
    //   return;
    // }

    //FileReader를 사용한 이미지 미리보기
    const reader = new FileReader();
    reader.onload = () => {
      //미리보기 이미지
      setImgSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 사진 파일을 등록하는 버튼 이벤트
  const handleClickImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 사진(url) + 메모의 내용을 데이터베이스에 업로드하는 버튼 이벤트
  const handleClickPostUpload = async () => {
    // 1. 등록된 이미지 파일이 있거나, 새로 등록할 이미지 파일이 없을 때
    if (!todoItem?.imageUrl && !imgSrc) {
      console.error("등록된 이미지 파일이 없습니다.");
      alert("이미지 파일을 등록 후 수정하기 버튼을 눌러주세요");
      return;
    }

    const formData = new FormData();
    const file = fileInputRef.current?.files?.[0];

    let imageUrl = todoItem?.imageUrl;

    if (file) {
      console.log("선택된 파일 : ", file);
      formData.append("image", file);

      try {
        const uploadRes = await fetch("https://assignment-todolist-api.vercel.app/api/junesung/images/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          console.error("이미지 업로드 실패 : ", uploadRes.text);
          throw new Error("이미지 업로드 기능 실패했습니다.");
        }

        const uploadData = await uploadRes.json();
        console.log("업로드된 데이터 : ", uploadData);
        imageUrl = uploadData.url;

        router.push("/");

        if (!imageUrl) {
          console.log("응답에 imageUrl이 없습니다.");
          throw new Error("응답에 imageUrl이 없습니다.");
        }
      } catch (error) {
        console.error("이미지 업로드 실패 : ", error);
        alert("이미지 업로드가 실패했습니다.");
        return;
      }
    } else {
      console.log("데이터베이스에 등록된 이미지 파일이 있어서 기존 등록된 이미지 파일로 대체됩니다.");
    }

    // 2. 수정할 아이템
    const updateData = {
      name: text,
      memo: memo,
      imageUrl: imageUrl,
      isCompleted: todoItem?.isCompleted === true ? true : true,
    };

    if (!text && !memo) {
      alert("할 일 제목, 메모 내용, 이미지 파일을 전부 적용 후 수정완료 버튼을 눌러주세요.");
      return;
    }

    try {
      const updataItem = await fetch(`https://assignment-todolist-api.vercel.app/api/junesung/items/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!updataItem) {
        console.error("아이템 수정 실패");
        throw new Error("아이템 수정 실패");
      }

      alert("아이템 수정이 완료되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("수정 요청 실패 : ", error);
      alert("아이템 수정 중 오류가 발생했습니다.");
    }
  };

  // 해당 id의 아이템을 삭제하는 버튼 이벤트
  const handleClickPostDelete = async () => {
    if (window.confirm("정말로 이 아이템을 삭제하시겠습니까?")) {
      try {
        const deleteItem = await fetch(`https://assignment-todolist-api.vercel.app/api/junesung/items/${params.id}`, {
          method: "DELETE",
        });
        // 요청이 성공한 경우
        if (deleteItem.ok) {
          alert("아이템이 성공적으로 삭제되었습니다.");
          router.push("/");
        } else {
          console.error("아이템 삭제 실패", deleteItem);
          alert("삭제하기 기능이 실패했습니다.");
        }
      } catch (error) {
        console.error("삭제하기 실패 : ", error);
        alert("삭제하기 기능이 실패했습니다.");
      }
    }
  };

  // swagger의 get 요청으로 특정 아이템의 정보를 가져오는 코드
  useEffect(() => {
    const fetchTodoItem = async () => {
      if (!params.id) {
        console.error("해당 ID 파라미터의 정보가 존재하지 않습니다.");
        return;
      }

      try {
        const res = await fetch(`https://assignment-todolist-api.vercel.app/api/junesung/items/${params.id}`);

        if (!res.ok) {
          console.error("API 응답 오류");
          throw new Error("api 정보에 담긴 데이터가 없거나 일치하지 않습니다.");
        }

        const data = await res.json();
        setTodoItem(data);
        console.log("데이터 가져오기 성공:", data);
      } catch (error) {
        console.error("특정 할 일의 정보를 불러오는데 실패", error);
        throw new Error("특정 할 일 데이터 정보를 가져오는데 실패했습니다.");
      }
    };
    fetchTodoItem();
  }, [params.id]);

  // todoItem의 memo && name속성값이 존재하면 값을 적용하는 코드
  useEffect(() => {
    if (todoItem?.memo) {
      setMemo(todoItem.memo);
    }
    if (todoItem?.name) {
      setText(todoItem.name);
    }
  }, [todoItem]);

  return (
    <main className="max-w-[1200px] m-auto bg-white h-screen py-10">
      {/* todo 할 일 name */}
      <div className="justify-center text-center mb-10 mr-5 ml-5 lg:mr-32 lg:ml-32 m-auto p-2 flex-1 bg-[#F9FAFB] flex items-center gap-3 border-[2px] border-black rounded-3xl cursor-pointer">
        <Image src={"/images/Property 1=Default.svg"} alt="아이콘" priority width={32} height={32} />
        <input type="text" value={text} onChange={handleChangeTodoText} className="w-[16rem] underline font-bold bg-[#F9FAFB] border-none outline-none" />
      </div>

      {/* 이미지 && 메모장 컨테이너 */}
      <div className="flex gap-10 mb-5 mr-5 ml-5 lg:mr-32 lg:ml-32  flex-col md:flex-row">
        {/* 이미지 컨테이너  */}
        <div className="flex flex-col flex-1">
          <form encType="multipart/form-data">
            {todoItem?.imageUrl || imgSrc ? (
              <div className="w-full h-[311px] relative bg-[#F8FAFC] rounded-2xl">
                <input ref={fileInputRef} className="hidden" type="file" name="todoPicture" accept="image/*" onChange={handleFileChange} />
                <img
                  src={imgSrc ?? todoItem?.imageUrl ?? undefined} // 이미지 URL을 사용
                  alt="미리보기 이미지"
                  className="object-fit w-full h-full rounded-2xl"
                />
                <Image
                  src={"/images/Type=Edit.svg"} // 플러스 버튼 아이콘
                  alt="수정정 버튼 아이콘"
                  priority
                  width={64}
                  height={64}
                  className="absolute bottom-2 right-2 cursor-pointer"
                  onClick={handleClickImageUpload}
                />
              </div>
            ) : (
              <div className="w-full h-[311px] relative bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] rounded-2xl">
                <input ref={fileInputRef} className="hidden" type="file" name="todoPicture" accept="image/*" onChange={handleFileChange} />
                <Image
                  src={"/images/img.svg"} // 기본 이미지 파일 아이콘
                  alt="이미지 파일 아이콘"
                  priority
                  width={64}
                  height={64}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />

                <Image
                  src={"/images/Type=Plus.svg"} // 플러스 버튼 아이콘
                  alt="플러스 버튼 아이콘"
                  priority
                  width={64}
                  height={64}
                  className="absolute bottom-2 right-2 cursor-pointer"
                  onClick={handleClickImageUpload}
                />
              </div>
            )}
          </form>
        </div>

        {/* 메모장 컨테이너 */}
        <div className="flex flex-1 h-[311px] relative">
          <p className="absolute left-1/2 top-5  transform -translate-x-1/2 z-10 text-[#9F5829] font-bold">Memo</p>

          <Image src={"/images/memo.svg"} alt="메모장 배경색 이미지" layout="intrinsic" priority className="rounded-2xl" width={588} height={311} />
          <textarea
            className="absolute cursor-pointer hover:outline-none focus:outline-none top-0 left-0 w-full h-full px-4 py-2 rounded-2xl bg-transparent text-center z-10 pt-24"
            placeholder="메모를 입력하세요"
            value={memo}
            onChange={handleChangeMemo}
          ></textarea>
        </div>
      </div>

      {/* 버튼 컨테이너 */}
      <div className=" bottom-0 flex gap-5 justify-center lg:justify-end mr-5 ml-5 lg:mr-32 lg:ml-32">
        <Button text={"수정완료"} onClick={handleClickPostUpload} buttonColor={"#E2E8F0"} textColor={"black"} />
        <Button text={"삭제하기"} onClick={handleClickPostDelete} buttonColor={"#F43F5E"} textColor={"white"} />
      </div>
    </main>
  );
}
