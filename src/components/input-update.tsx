import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Income } from "@/types/income";
import { Select, SelectContent, SelectGroup, SelectItem } from "./ui/select";

interface ITypeUpdate {
  value: string | number;
  data: any;
  title: string;
  name: string;
  setUpdate: Dispatch<SetStateAction<Income | undefined>>;
  enums?: { name: string; value: string }[];
  type?: HTMLInputTypeAttribute | "enum";
}

export function ItemUpdate({
  value,
  name,
  data,
  setUpdate,
  type,
  enums,
  title,
}: ITypeUpdate) {
  if (type === "enum") {
    return (
      <div>
        <Select
          onValueChange={(element) => setUpdate({ ...data, [name]: element })}
          defaultValue={value.toString()}
        >
          <Label htmlFor={name}>{title}</Label>
          <SelectContent>
            <SelectGroup>
              {enums?.map((el, index) => (
                <SelectItem key={index} value={el.name}>
                  {el.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
  return (
    <div>
      <Label htmlFor={name}>{title}</Label>
      <Input
        id={name}
        placeholder={title}
        type={type}
        value={value}
        onChange={(e) => setUpdate({ ...data, [name]: e.target.value })}
        className="col-span-3"
      />
    </div>
  );
}
