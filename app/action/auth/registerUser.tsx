'use server'

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export interface User extends Record<string, unknown> {
    name: string;
    email: string;
    password: string;
    role?: string;
    _createdAt?: Date;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterResult {
    success: boolean;
    message: string;
    data?: any;
}

const registerUser = async (formData: FormData): Promise<RegisterResult> => {
    try {
        const { name, email, password, confirmPassword } = formData;

        // Server-side validation
        if (!name?.trim()) {
            return { success: false, message: "Name is required" };
        }

        if (name.trim().length < 2) {
            return { success: false, message: "Name must be at least 2 characters long" };
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email?.trim() || !emailPattern.test(email)) {
            return { success: false, message: "Please enter a valid email address" };
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
        if (!password || !passwordPattern.test(password)) {
            return { 
                success: false, 
                message: "Password must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 special character" 
            };
        }

        if (password !== confirmPassword) {
            return { success: false, message: "Passwords do not match" };
        }

        // Connect to database
        const userCollection = await dbConnect<User>(collectionNameObj.userCollection);

        // Check if user already exists (case-insensitive email check)
        const existingUser = await userCollection.findOne({ 
            email: { $regex: new RegExp(`^${email.toLowerCase().trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
        });

        if (existingUser) {
            return { success: false, message: "An account with this email already exists" };
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser: User = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: "user",
            _createdAt: new Date(),
        };

        const result = await userCollection.insertOne(newUser);

        if (result.acknowledged && result.insertedId) {
            return { 
                success: true, 
                message: "Account created successfully!",
                data: { 
                    userId: result.insertedId,
                    email: newUser.email,
                    name: newUser.name 
                }
            };
        } else {
            return { success: false, message: "Failed to create account. Please try again." };
        }
    } catch (error) {
        console.error("Registration error:", error);
        
        // Handle specific MongoDB errors
        if (error instanceof Error) {
            // MongoDB duplicate key error
            if (error.message.includes('duplicate key') || error.message.includes('E11000')) {
                return { success: false, message: "An account with this email already exists" };
            }
            // MongoDB validation error
            if (error.message.includes('validation')) {
                return { success: false, message: "Invalid data provided" };
            }
            // MongoDB connection error
            if (error.message.includes('connection') || error.message.includes('timeout')) {
                return { success: false, message: "Database connection error. Please try again." };
            }
        }
        
        return { 
            success: false, 
            message: "An unexpected error occurred. Please try again later." 
        };
    }
};

export default registerUser;