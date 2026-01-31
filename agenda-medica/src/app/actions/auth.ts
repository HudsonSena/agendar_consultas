import { SignupFormSchema, FormState } from '../../lib/definitions.js'
import prisma from '../../lib/prisma.js'
import bcrypt from 'bcrypt'
 
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // 2. Prepare data for insertion into database
  const { username, name, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
 
  // 3. Insert the user into the database or call an Auth Library's API 
  const newUser = await prisma.user.create({
    data: {
      username,
      name,
      email,
      password: hashedPassword,
    },
  })
 
  const user = newUser[0]
 
  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
  // Call the provider or db to create a user...
}