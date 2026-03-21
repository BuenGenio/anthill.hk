/* ============================================================
   anthill.hk — Contact Form Configuration
   ============================================================
   Edit this file to configure how the contact form sends emails.
   Supported providers: 'formspree', 'emailjs', 'custom'
   ============================================================

   SETUP INSTRUCTIONS (EmailJS — recommended for business email):
   -----------------------------------------------------------
   1. Go to https://www.emailjs.com and create a free account
   2. In "Email Services", add your email provider (Gmail, Outlook, etc.)
      and connect business@anthill.hk
   3. In "Email Templates", create a new template with these variables:
      {{name}}    — sender's name
      {{email}}   — sender's email address
      {{message}} — the message content
      Set the "To Email" to: business@anthill.hk
   4. In "Account" > "Integration", copy your:
      - Public Key (starts with a UUID like "user-xxxxx")
      - Service ID (e.g. "service_xxxxx")
      - Template ID (e.g. "template_xxxxx")
   5. Paste those values below and set provider: 'emailjs'
   -----------------------------------------------------------

   ALTERNATIVE — Formspree (simpler, no account needed):
   1. Go to https://formspree.io and create a form
   2. Set the destination email to business@anthill.hk
   3. Copy your form ID and set provider: 'formspree' below
   ============================================================ */

window.ANTHILL_CONFIG = {
  contact: {
    // Choose your provider: 'formspree' | 'emailjs' | 'custom'
    provider: 'emailjs',

    // Formspree — https://formspree.io
    formspree: {
      formId: 'YOUR_FORM_ID'
    },

    // EmailJS — https://www.emailjs.com
    // Fill in the three values from your EmailJS dashboard
    emailjs: {
      serviceId: 'YOUR_SERVICE_ID',   // e.g. 'service_abc123'
      templateId: 'YOUR_TEMPLATE_ID', // e.g. 'template_def456'
      publicKey: 'YOUR_PUBLIC_KEY'    // e.g. 'user-xyz789'
    },

    // Custom endpoint — POST with JSON body: { name, email, message }
    custom: {
      endpoint: 'https://your-api.example.com/contact',
      headers: { 'Content-Type': 'application/json' }
    }
  }
};
