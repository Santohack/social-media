import React from "react";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    return (
      <div className="relative">
        <Input
          type={isShowPassword ? "text" : "password"}
          className={cn("pe-10", className)}
          {...props}
          ref={ref}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground inset-y-0  cursor-pointer items-center "
          onClick={() => setIsShowPassword(!isShowPassword)}
          title={isShowPassword ? "Hide password" : "Show password"}
          
        >
            {isShowPassword ? ( <EyeOff size={16} />) : ( <Eye  size={16} />)}
        </button>
      </div>

    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
