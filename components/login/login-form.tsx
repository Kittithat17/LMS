"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import { Loader, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();
  const [emailpending, startemailTran] = useTransition();
  const [email, setEmail] = useState("");
  const router = useRouter(); 
  async function signInwithGoogle() {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully signed in with Google");
          },
          onError: (error) => {
            toast.error("Error signing in with Google");
          },
        },
      });
    });
  }

  async function signInwithEmail(){
    startemailTran(async()=>{
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("OTP sent to your email");
            router.push(`/verify-otp?email=${email}`); // Redirect to OTP verification page
          },
          onError: (error) => {
            toast.error("Error sending OTP");
          },
        }
      });
    }); 
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              
              <Field>
                <Button type="submit" onClick={signInwithEmail} disabled={emailpending} >
                  {emailpending ? (
                    <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Loading....</span>
                    </>
                   ) : (
                    <>
                    <Send className="size-4" />
                    <span>Continue with Email</span>
                    </>
                   )}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Button
                onClick={signInwithGoogle}
                variant="outline"
                type="button"
                className="w-full cursor-pointer"
                disabled={isPending}
              >
               {isPending ? (
                <>
                <Loader className="size-4 animate-spin" />
                <span>Loading....</span>
                </>
               ) : (
                <>
                <FcGoogle />
                Continue with Google
                </>
               )}
              </Button>

              
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <span><a href="#">Privacy Policy</a></span>.
      </FieldDescription>
    </div>
  );
}
