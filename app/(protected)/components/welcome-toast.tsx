'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    if (!document.cookie.includes('email-toast=1')) {
      toast('📩 Hi there,', {
        duration: Infinity,
        onDismiss: () =>
          (document.cookie = 'email-toast=1; max-age=31536000; path=/'),
        description: (
          <p>
            Inbox AI is an email service like Gmail, but for Agents.{' '}
            <a
              href="https://vercel.com/templates/next.js/next-js-email-client"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Learn more
            </a>
            .
          </p>
        ),
      });
    }
  }, []);

  return null;
}
