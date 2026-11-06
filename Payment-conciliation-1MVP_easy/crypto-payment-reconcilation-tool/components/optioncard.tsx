'use client'

import React, { useState , useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import usePopClose from '@/hooks/usePopClose';

// defining some of the interfaces...
export interface OptionType {
  value: string;
  label: string;
  priority?: string;
}

interface OptionCardProps {
  selectedValue: OptionType ;
  onChange: (obj: OptionType) => void ;
  options: OptionType[] ;
}

export default function Optioncard({ selectedValue, onChange, options }: OptionCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = options.find(option => option.value === selectedValue.value);
  
  const handleSelect = (option: OptionType, e: React.MouseEvent) => {
    // Preventing accidental submission when used inside <form>
    e.preventDefault()
    e.stopPropagation()

    onChange(option);
    setIsOpen(false);
  };
   
  usePopClose(isOpen,setIsOpen,containerRef);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm transition-shadow duration-200 text-gray-900 dark:text-gray-100 font-medium"
      >
        <span>{selectedOption?.label || 'Select option'}</span>
        <ChevronDown size={15} className={`ml-2 transition-transform cursor-pointer duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full p-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={(e) => handleSelect(option,e)}
              className={`px-4 py-2 cursor-pointer rounded-lg text-sm hover:bg-gray-100 transition-colors duration-150 ${
                selectedValue.value === option.value ? 'dark:bg-gray-950 bg-red-100 text-red-600' : 'text-gray-900'
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
