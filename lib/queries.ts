import { prisma } from "./prisma";

export async function getUserProfile(userId: string) {
    'use cache';
    const userInfo = await prisma.user.findUnique({
        where: {
            clerkId: userId
        }
    })
  
    if (userInfo === null) {
      return null;
    }
  
    const latestThreads = await prisma.thread.findMany({
        where: {
            emails: {
                some: {
                    senderId: userId
                }
            }
        },
        orderBy: {
            lastActivityDate: 'desc'
        },
        take: 3
    })
    
    return {
        ...userInfo,
        latestThreads
    }
}