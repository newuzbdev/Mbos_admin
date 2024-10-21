import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ITypeUpdate {
  value: string | number;
  data: any;
  title: string;
  name: string;
  setUpdate: Dispatch<SetStateAction<any | undefined>>;
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
      <div className="w-full h-[60px]">
        <Label htmlFor={name}>{title}</Label>
        <select
          className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          onChange={(element) => setUpdate({ ...data, [name]: element })}
          defaultValue={value.toString()}
        >
          {enums?.map((el, index) => (
            <option className="dark:bg-black" key={index} value={el.value}>
              {el.name}
            </option>
          ))}
        </select>
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
