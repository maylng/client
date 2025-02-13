/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { Linkedin, Twitter, Github, Mail, ExternalLink } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

function RightSidebarContent({ user }: { user: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hidden sm:flex flex-shrink-0 w-[320px] p-8 overflow-auto bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800"
    >
      <div className="w-full space-y-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <Image
            src={user.avatarUrl || "/placeholder.svg?height=80&width=80"}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-neutral-200 dark:border-neutral-700"
            width={80}
            height={80}
          />
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            {`${user.firstName} ${user.lastName}`}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {user.jobTitle} at {user.company}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-2"
        >
          <InfoItem icon={Mail} text={user.email} />
          <InfoItem icon={ExternalLink} text={user.location} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-sm font-semibold text-neutral-400 dark:text-neutral-500 mb-3 uppercase tracking-wider">
            Recent Mail
          </h3>
          <ul className="space-y-2">
            {user.latestThreads.map((thread: any, index: number) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                className="text-sm text-neutral-600 dark:text-neutral-300 truncate"
              >
                <Mail size={12} className="inline mr-2 text-neutral-400 dark:text-neutral-500" />
                {thread.subject}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center space-x-4"
        >
          {user.linkedin && <SocialLink href={user.linkedin} icon={Linkedin} label="LinkedIn" />}
          {user.twitter && <SocialLink href={user.twitter} icon={Twitter} label="Twitter" />}
          {user.github && <SocialLink href={user.github} icon={Github} label="GitHub" />}
        </motion.div>
      </div>
    </motion.div>
  )
}

function InfoItem({
  icon: Icon,
  text,
}: { icon: React.ComponentType<{ size: number; className: string }>; text: string }) {
  return (
    <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
      <Icon size={14} className="mr-2 text-neutral-400 dark:text-neutral-500" />
      <span className="truncate">{text}</span>
    </div>
  )
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: { href: string; icon: React.ComponentType<{ size: number; className: string }>; label: string }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        asChild
      >
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          <Icon size={18} className=""/>
        </a>
      </Button>
    </motion.div>
  )
}

export default RightSidebarContent

