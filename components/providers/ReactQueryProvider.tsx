"use client"

import { ReactNode } from "react"
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function ReactQueryProvider({ children }: {children: ReactNode}) {
  
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
