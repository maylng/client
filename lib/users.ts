"use server"
import { prisma } from "./prisma";
import {currentUser} from "@clerk/nextjs/server"

export async function createUser({email, firstname, lastname}: {email: string, firstname: string, lastname: string}) {
    const user = await currentUser()
    if (!user) {
        return null
    }

    try {
       await prisma.user.create({
          data: {
            email,
            firstName: firstname,
            lastName: lastname,
            clerkId: user.id,
            avatarUrl: user.imageUrl,
          }
       }) 
    } catch (error) {
        console.error(error)
    }
}