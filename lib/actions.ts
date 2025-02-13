'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { z } from 'zod';
import { redirect } from "next/navigation";

const sendEmailSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Body is required'),
    recipientEmail: z.string().email('Invalid email address'),
});

export async function sendEmailAction(_: any, formData: FormData) {
    
    let newThread;
    const rawFormData = {
        subject: formData.get('subject'),
        body: formData.get('body'),
        recipientEmail: formData.get('recipientEmail'),
    };

    if(process.env.VERCEL_ENV === 'production') {
        return {
            error: 'Only works on localhost for now',
            previous: rawFormData
        }
    }
  

    try {
        const validatedFields = sendEmailSchema.parse({
            subject: formData.get('subject'),
            body: formData.get('body'),
            recipientEmail: formData.get('recipientEmail'),
        })

        const { subject, body, recipientEmail } = validatedFields;

        let recipient = await prisma.user.findFirst({
            where: {
                email: recipientEmail
            }
        })

        if (!recipient) {
            recipient = await prisma.user.create({
                data: {
                    clerkId: "",
                    firstName: "",
                    lastName: "",
                    email: recipientEmail
                }
            })
        }

        const result = await prisma.thread.create({
            data: {
                subject,
                lastActivityDate: new Date(),
            }
        })
        newThread = result

        await prisma.email.create({
            data: {
                threadId: newThread.id,
                senderId: "",
                recipientId: recipient.id,
                subject,
                body,
                sentDate: new Date()
            }
        })

        const sentFolder = await prisma.folder.findFirst({
            where: {
                name: 'Sent'
            }
        })

        if (!sentFolder) {
            return { error: 'Sent folder not found', previous: rawFormData };
        }

        await prisma.threadFolder.create({
            data: {
                threadId: newThread.id,
                folderId: sentFolder.id
            }
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message, previous: rawFormData };
        }
        return {
            error: `Failed to send email. Please try again. ${error}`,
            previous: rawFormData,
        };
    }
  
  
    revalidatePath('/', 'layout');
    redirect(`/f/sent/${newThread.id}`);
}


export async function moveThreadToDone(_: any, formData: FormData) {
    if (process.env.VERCEL_ENV === 'production') {
      return {
        error: 'Only works on localhost for now',
      };
    }
  
    const threadId = formData.get('threadId');
  
    if (!threadId || typeof threadId !== 'string') {
      return { error: 'Invalid thread ID', success: false };
    }
  

    try {
        const doneFolder = await prisma.folder.findFirst({
            where: {
                name: 'Archive'
            }
        })

        if (!doneFolder) {
            return { error: 'Done folder not found', success: false };
        }

        await prisma.threadFolder.deleteMany({
            where: {
                threadId: threadId
            }
        })

        await prisma.threadFolder.create({
            data: {
                threadId: threadId,
                folderId: doneFolder.id
            }
        })

        revalidatePath('/f/[name]', "page");
        revalidatePath('/f/[name]/[id]', "page");

        return { success: true, error: null };
    } catch (error) {
      console.error('Failed to move thread to Done:', error);
      return { success: false, error: 'Failed to move thread to Done' };
    }
}

export async function moveThreadToTrash(_: any, formData: FormData) {

    if (process.env.VERCEL_ENV === 'production') {
        return {
            error: 'Only works on localhost for now',
        };
    }

    const threadId = formData.get('threadId');

    if (!threadId || typeof threadId !== 'string') {
        return { error: 'Invalid thread ID', success: false };
    }

    try {
        const trashFolder = await prisma.folder.findFirst({
            where: {
                name: 'Trash'
            }
        })

        if (!trashFolder) {
            return { error: 'Trash folder not found', success: false };
        }

        await prisma.threadFolder.deleteMany({
            where: {
                threadId: threadId
            }
        })

        await prisma.threadFolder.create({
            data: {
                threadId: threadId,
                folderId: trashFolder.id
            }
        })

        revalidatePath('/f/[name]');
        revalidatePath('/f/[name]/[id]');

        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to move thread to Trash:', error);
        return { success: false, error: 'Failed to move thread to Trash' };
    }
}