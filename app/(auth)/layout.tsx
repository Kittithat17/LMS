import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="hidden sm:block">
        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
            className: "absolute left-4 top-4",
          })}
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </div>
      {children}
    </>
  );
}
