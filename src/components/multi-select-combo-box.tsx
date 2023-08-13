import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "../utils/cn";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useState } from 'react';
import { Button } from './ui/button';

export function MultiSelectComboBox({ options, name, selected, setSelected }: { options: string[], name: string, selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>> }) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {
                        selected.length > 0 
                            ? `Filtered: ${selected.toString()}`
                            : `Filter by ${name}`
                    }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${name} filters`} />
                    <CommandEmpty>{`No ${name} found`}</CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                key={option}
                                onSelect={(optionValue) => {
                                    const currSelected = [...selected];
                                    if (!currSelected.includes(optionValue)) {
                                        currSelected.push(optionValue);
                                        setSelected(currSelected);
                                } else {
                                    const removed = currSelected.filter(val => val !== optionValue);
                                    setSelected(removed);
                                }
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selected.includes(option) ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option}
                            </CommandItem>
                        ))}
                        <CommandItem
                            key={99}
                            onSelect={() =>{
                                setSelected([]);
                            }}
                        >
                            Clear All
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
