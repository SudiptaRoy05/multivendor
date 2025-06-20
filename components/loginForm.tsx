"use client"
import { signIn } from "next-auth/react"

import { useState, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react"
import SocialLogin from "./SocialLogin"
import getUser from "@/app/action/auth/getUser"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            alert("Please enter both email and password.")
            return
        }

        setIsLoading(true)

        try {
            const result = await signIn("credentials", {
                email,
                password,
                callbackUrl: '/',
                redirect: false,
            })

            if (result?.error) {
                // Handle authentication error
                toast.error("Invalid credentials. Please try again.")
                // console.error("Login error:", result.error)
            } else if (result?.ok) {
                router.push('/')
                router.refresh()
                toast.success("Login successfully");
            }
        } catch (error) {
            console.error("Login error:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }
   


    const handleGoogleLogin = async () => {
        try {
            await signIn("google", {
                callbackUrl: "/" // This will redirect to home after Google login
            })
        } catch (error) {
            console.error("Google login error:", error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                <h2 className="text-3xl font-bold text-center text-primary">Login to Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
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
                <SocialLogin></SocialLogin>
            </div>
        </div>
    )
}

export default LoginForm