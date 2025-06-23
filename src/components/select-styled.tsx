"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface IOptions {
  label: string;
  value: string;
}

interface SelectStyledProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: IOptions[];
  triggerPlaceholder: string;
  disabled?: boolean;
}

export function SelectStyled<T extends FieldValues>({
  name,
  control,
  options,
  triggerPlaceholder,
  disabled,
}: SelectStyledProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <SelectTrigger className="text-zinc-700">
            <SelectValue
              placeholder={triggerPlaceholder}
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
