import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'both']).default('email'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    
    // For now, we'll simulate processing and log the data
    console.log('Contact form submission:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, you might use:
    // - SendGrid, AWS SES, or Resend for email
    // - Prisma/MongoDB for database storage
    // - Slack/Discord webhooks for notifications
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will get back to you within 24 hours.',
        reference: `REF-${Date.now()}`
      },
      { status: 200 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your input and try again.',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again later or contact us directly.'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is working. Use POST to submit contact forms.' },
    { status: 200 }
  );
}
