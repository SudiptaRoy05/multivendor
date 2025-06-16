"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc" // Google icon

const LoginForm = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <h2 className="text-3xl font-bold text-center text-primary">Login to Your Account</h2>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">or</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <FcGoogle className="h-5 w-5" />
                    Login with Google
                </Button>
            </div>
        </div>
    )
}

export default LoginForm
