"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/services/productApi"
 
type TCategory = {
  value: string
  label: string
}
 
export function ComboBox({ filterProductsCategory }: {filterProductsCategory: (category: string) => void}) {
  const { data: categories } = useQuery<TCategory[]>({queryKey: ["categories"], queryFn: getCategories })

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories?.find((category) => category.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-10">
        <Command>
          {/* <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty> */}
          <CommandGroup className="max-h-[300px] overflow-auto">
            {categories?.map((category) => (
              <CommandItem
                key={category.value}
                onSelect={(currentValue) => {
                    filterProductsCategory(currentValue === value ? "" : currentValue)
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === category.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {category.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
)}