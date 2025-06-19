"use client"

import { useState, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import registerUser from "@/app/action/auth/registerUser"
import SocialLogin from "./SocialLogin"
import toast from "react-hot-toast"

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        // Clear field-specific error when user starts typing
        if (fieldErrors[id]) {
            setFieldErrors(prev => ({ ...prev, [id]: "" }));
        }

        // Clear general error
        if (error) setError("")
        if (success) setSuccess("")
    }

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {}

        // Name validation
        if (!formData.name.trim()) {
            errors.name = "Name is required"
        } else if (formData.name.trim().length < 2) {
            errors.name = "Name must be at least 2 characters long"
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            errors.email = "Email is required"
        } else if (!emailPattern.test(formData.email)) {
            errors.email = "Please enter a valid email address"
        }

        // Password validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/
        if (!formData.password) {
            errors.password = "Password is required"
        } else if (!passwordPattern.test(formData.password)) {
            errors.password = "Password must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 special character"
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }

        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (!validateForm()) {
            return
        }

        setLoading(true)

        try {
            const result = await registerUser(formData);

            if (result?.success) {
                setSuccess("Account created successfully! You can now log in.")
                toast.success("Account created successfully! You can now log in.")
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                // Optionally redirect to login page after a delay
                // setTimeout(() => router.push('/login'), 2000)
            } else {
                setError(result?.message || "Failed to create account. Please try again.")
                toast.error("Failed to create account. Please try again.")
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("An unexpected error occurred. Please try again.");
            toast.error("An unexpected error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary">Create an Account</h2>
                    <p className="text-muted-foreground mt-2">Enter your details to get started</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={fieldErrors.name ? "border-red-500" : ""}
                            disabled={loading}
                        />
                        {fieldErrors.name && (
                            <p className="text-sm text-red-500">{fieldErrors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={fieldErrors.email ? "border-red-500" : ""}
                            disabled={loading}
                        />
                        {fieldErrors.email && (
                            <p className="text-sm text-red-500">{fieldErrors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Password <span className="text-red-600">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={fieldErrors.password ? "border-red-500 pr-10" : "pr-10"}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={loading}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {fieldErrors.password && (
                            <p className="text-sm text-red-500">{fieldErrors.password}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                            Confirm Password <span className="text-red-600">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={fieldErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={loading}
                            >
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {fieldErrors.confirmPassword && (
                            <p className="text-sm text-red-500">{fieldErrors.confirmPassword}</p>
                        )}
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="border-green-200 bg-green-50 text-green-800">
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
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
                <SocialLogin />

                <p className="text-sm text-muted-foreground text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary underline hover:text-primary/80">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignUp