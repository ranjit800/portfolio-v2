# Contact form email delivery

The contact page and all email, phone, social, and CV links work without configuration. Until a sender is configured, the form opens a prefilled email draft and clearly asks the visitor to send it from their email app.

To enable direct form submission:

1. Create a Resend API key and verify a sender domain in your Resend account.
2. Add these server-only variables to `.env.local` and your hosting provider's environment settings:

   ```dotenv
   RESEND_API_KEY=your_actual_key
   CONTACT_FROM_EMAIL=Ranjit Portfolio <contact@your-verified-domain.com>
   ```

3. Restart the development server; redeploy when changing hosting environment variables. The form will switch to “Send Message.”
4. Send a real message from the contact page and verify it arrives at `rjranjit099@gmail.com`. Replying to that email addresses the visitor.

Never prefix these variables with `NEXT_PUBLIC_`. Do not commit `.env.local`. The sender must be authorized in your Resend account; the visitor's address is used only as `reply_to`.

The endpoint validates input on the server, limits request size, rejects cross-origin browser submissions, includes a honeypot, and throttles requests in memory (5 attempts per 15 minutes per client per server instance). For multi-instance high-traffic deployments, configure shared rate limiting or your host's firewall. Messages are sent as plain text and never stored in this project.

Run `node --test tests/contact-handler.test.mjs` for isolated delivery/error/validation tests that do not send real email.

Reference: https://resend.com/docs/api-reference/emails/send-email
