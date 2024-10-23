"use client";
import Image from "next/image";
import avatarplaceholder from "../assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";
interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  size,
  className,
}: UserAvatarProps) {
  return (
    <Image
      src={avatarUrl || avatarplaceholder}
      alt="Avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-full flex-none rounded-full bg-secondary object-cover",
        className,
      )}
    />
  );
}