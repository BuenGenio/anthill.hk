/* ============================================================
   anthill.hk — Contact Form Configuration
   ============================================================
   Edit this file to configure how the contact form sends emails.
   Supported providers: 'formspree', 'emailjs', 'custom'
   ============================================================ */

window.ANTHILL_CONFIG = {
  contact: {
    // Choose your provider: 'formspree' | 'emailjs' | 'custom'
    provider: 'formspree',

    // Formspree — https://formspree.io
    // 1. Create a free account
    // 2. Create a new form
    // 3. Paste your form ID below (the part after /f/ in the endpoint)
    formspree: {
      formId: 'YOUR_FORM_ID'
    },

    // EmailJS — https://www.emailjs.com
    // 1. Create an account and connect your email service
    // 2. Create an email template with {{name}}, {{email}}, {{message}} vars
    // 3. Fill in the IDs below
    emailjs: {
      serviceId: 'YOUR_SERVICE_ID',
      templateId: 'YOUR_TEMPLATE_ID',
      publicKey: 'YOUR_PUBLIC_KEY'
    },

    // Custom endpoint — POST with JSON body: { name, email, message }
    custom: {
      endpoint: 'https://your-api.example.com/contact',
      headers: { 'Content-Type': 'application/json' }
    }
  }
};
