'use server'

import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import bcrypt from 'bcrypt'

interface LoginFormData {
  email: string
  password: string
}

interface User extends Record<string, unknown> {
  _id: string
  name: string
  email: string
  password: string // this is the hashed password in the DB
}

export const loginUser = async (formData: LoginFormData): Promise<User | null> => {
  const { email, password } = formData

  const userCollection = await dbConnect<User>(collectionNameObj.userCollection)
  const user = await userCollection.findOne({ email })

  if (!user) {
    return null
  }

  const isPasswordOk = await bcrypt.compare(password, user.password)
  if (!isPasswordOk) {
    return null
  }

  return user
}
