import {
  LockOpen2Icon
} from "@radix-ui/react-icons";
import {MailsIcon, BotIcon, AppWindowMacIcon, FileTextIcon} from "lucide-react"

import { BentoCard, BentoGrid } from "@/components/bentoGrid";
import Image from "next/image";

const features = [
  {
    Icon: FileTextIcon,
    name: "Add your docs",
    description: "Upload your data to show your agents how to reply and how to resolve your customers issues",
    href: "/",
    cta: "Learn more",
    background: (
      <Image
        className="absolute -right-20 -top-20 opacity-60"
        alt="Background"
        src="/path/to/image1.png"
        width={200}
        height={200}
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: MailsIcon,
    name: "Custom Emails",
    description: "Create custom email addresses that are managed by your agent",
    href: "/",
    cta: "Learn more",
    background: (
      <Image
        className="absolute -right-20 -top-20 opacity-60"
        alt="Background"
        src="/path/to/image2.png"
        width={200}
        height={200}
        />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
},
{
    Icon: AppWindowMacIcon,
    name: "Web email client",
    description: "See and manage all of your agents' conversations in a simple webapp.",
    href: "/",
    cta: "Learn more",
    background: (
      <Image
        className="absolute -right-20 -top-20 opacity-60"
        alt="Background"
        src="/path/to/image3.png"
        width={200}
        height={200}
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BotIcon,
    name: "Intelligent responses",
    description: "Use AI to generate custom responses and improve your customers experience",
    href: "/",
    cta: "Learn more",
    background: (
      <Image
        className="absolute -right-20 -top-20 opacity-60"
        alt="Background"
        src="/path/to/image4.png"
        width={200}
        height={200}
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: LockOpen2Icon,
    name: "Managed login and sign ups",
    description:
      "Your agents can log in to and register accounts with any service, no assistance required.",
    href: "/",
    cta: "Learn more",
    background: (
      <Image
        className="absolute -right-20 -top-20 opacity-60"
        alt="Background"
        src="/path/to/image5.png"
        width={200}
        height={200}
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

function Features() {
  return (
    <div className="container mx-4 my-12">
        <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
        ))}
        </BentoGrid>
    </div>
  );
}

export { Features };