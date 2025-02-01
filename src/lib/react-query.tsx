"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";

export default function AppProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // 실패하면 재시도 X
          staleTime: 1000 * 60 * 5, // 데이터를 캐시에 저장 후 5분 동안 fresh 상태 유지
          gcTime: 1000 * 60 * 10, // 데이터를 캐시에 저장 후 10분 후 캐시에서 삭제
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
