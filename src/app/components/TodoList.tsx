"use client";

import { TodoListItem } from "@/types/todoItemType";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HydrationBoundary, DehydratedState } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { getTodoItems, updateTodoStatus } from "../api/todo";
import { useMemo } from "react";

export default function TodoList({ dehydratedState }: { dehydratedState: DehydratedState }) {
  const queryClient = useQueryClient();

  // 데이터 조회 쿼리
  const { data: todoList } = useQuery<TodoListItem[]>({
    queryKey: ["todos"],
    queryFn: getTodoItems,
    initialData: dehydratedState.queries[0]?.state.data as TodoListItem[], // SSR 초기 데이터
  });

  // 상태 업데이트 뮤테이션
  const { mutate } = useMutation({
    mutationFn: (params: { id: string; currentStatus: boolean }) => updateTodoStatus(params.id, !params.currentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // 데이터 무효화
    },
  });

  // 파생 상태 계산
  const completedList = useMemo(() => todoList?.filter((todo) => todo.isCompleted) || [], [todoList]);
  const notCompletedList = useMemo(() => todoList?.filter((todo) => !todo.isCompleted) || [], [todoList]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <article className="flex flex-col md:flex-row gap-8">
        {/* TO DO 목록 */}
        <section className="flex flex-col gap-5 flex-1">
          <Image src="/images/todo.svg" alt="todo-할일 로고" width={101} height={36} priority />
          {completedList.length > 0 ? (
            completedList.map((todo) => (
              <div key={todo.id} className="p-2 bg-[#F9FAFB] flex items-center gap-3 border-[2px] border-black rounded-full">
                <Image
                  src="/images/Property 1=Default.svg"
                  alt="아이콘"
                  width={32}
                  height={32}
                  priority
                  className="cursor-pointer"
                  onClick={() => mutate({ id: todo.id, currentStatus: todo.isCompleted })}
                />
                <Link href={`/detail/${todo.id}`}>
                  <p className="cursor-pointer">{todo.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <div className="w-[240px] h-[240px] relative">
              <Image
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:hidden"
                src="/images/Group 33698.png"
                alt="할 일 추가 이미지"
                width={240}
                height={240}
                style={{ objectFit: "cover" }}
                priority
              />
              <Image
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden sm:block"
                src="/images/small.png"
                alt="할 일 추가 이미지"
                width={240}
                height={240}
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}
        </section>

        {/* DONE 목록 */}
        <section className="flex flex-col gap-5 flex-1">
          <Image src="/images/done.svg" alt="todo-할일 로고" priority width={101} height={36} />
          {notCompletedList.length > 0 ? (
            notCompletedList.map((todo) => (
              <div key={todo.id} className="p-2 bg-[#EDE9FE] flex items-center gap-3 border-[2px] border-black rounded-full">
                <Image
                  src="/images/Property 1=Frame 2610233.svg"
                  alt="아이콘"
                  priority
                  width={32}
                  height={32}
                  className="cursor-pointer"
                  onClick={() =>
                    mutate({
                      id: todo.id,
                      currentStatus: todo.isCompleted,
                    })
                  }
                />
                <Link href={`/detail/${todo.id}`}>
                  <p className="cursor-pointer">{todo.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <div className="w-[240px] h-[240px] relative">
              <Image
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:hidden"
                src="/images/Group 33697.png"
                alt="할 일 추가 이미지"
                width={240}
                height={240}
                style={{ objectFit: "cover" }}
                priority
              />
              <Image
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden sm:block"
                src="/images/small2.png"
                alt="할 일 추가 이미지"
                width={240}
                height={240}
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}
        </section>
      </article>
    </HydrationBoundary>
  );
}
