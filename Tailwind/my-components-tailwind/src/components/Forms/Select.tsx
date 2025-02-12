import { InputHTMLAttributes, useState, useRef, useEffect } from "react";
import { Arrow } from "./assets/icons";

export type DataSelectTypes = {
    name: string;
    value: string | number;
};

type SelectProps = {
    label?: string;
    data: DataSelectTypes[];
    placeholder?: string;
    defaultValue?: string | number;
    message?: string;
    onChange?: (value: string) => void;
    onClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const Select = ({
    label,
    data,
    placeholder,
    defaultValue,
    message,
    onChange = () => null,
    onClick,
    ...rest
}: SelectProps) => {
    const valueDefaultIndex = data.findIndex(
        (values) => values.value === String(defaultValue)
    );
    const [value, setValue] = useState<DataSelectTypes>({
        name: data[valueDefaultIndex]?.name,
        value: data[valueDefaultIndex]?.value,
    });
    const [openSelect, setOpenSelect] = useState(false);
    const selectRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const getValues = (value: DataSelectTypes) => {
        onChange(value.value as string);
        setOpenSelect(false);
        if (selectRef.current) {
            selectRef.current.value = value.value as string;
            setValue(value);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(event.target as Node)
            ) {
                setOpenSelect(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div
            ref={contentRef}
            className="w-full flex flex-col relative cursor-pointer z-10"
        >
            <label
                htmlFor=""
                className="text-[#344054] font-medium text-xs mb-[2px]"
            >
                {label}
            </label>
            <input
                {...rest}
                type="text"
                className="w-full absolute bottom-[3px] border z-[-1] invisible"
                ref={selectRef}
                defaultValue={defaultValue}
            />
            <div
                onClick={() => {
                    setOpenSelect(!openSelect);
                    onClick?.();
                }}
                className="w-full h-[33.5px] min-h-[33.5px] flex items-center justify-between gap-1 rounded-lg border border-[#99a7bd7d] bg-white px-3"
            >
                <div>
                    {value?.name !== "" && value?.name !== undefined ? (
                        <span className="text-sm font-normal text-zinc-600">
                            {value?.name}
                        </span>
                    ) : (
                        <span className="text-sm font-medium text-zinc-600/50">
                            {placeholder && placeholder}
                        </span>
                    )}
                </div>
                <div
                    data-open={openSelect}
                    className="data-[open=true]:rotate-180 transition duration-300"
                >
                    <Arrow />
                </div>
            </div>
            {message && (
                <span className="text-[10px] absolute -bottom-4 right-2 text-red-600 font-medium">
                    {message}
                </span>
            )}
            <div
                className={`w-full flex flex-col gap-1 bg-[#f3f3f3] rounded-md shadow-200 z-[2px] absolute top-[105%] left-0 right-0 cursor-pointer overflow-y-scroll transition-all duration-200 ease-out ${
                    openSelect ? "max-h-[140px]" : "max-h-0 opacity-5"
                }`}
            >
                <ul>
                    {data &&
                        data.map((items, index) => (
                            <li
                                key={index}
                                onClick={() => getValues(items)}
                                className="w-full h-8 px-2 text-xs text-[#494848] flex items-center select-none hover:bg-zinc-200"
                            >
                                {items.name}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};
