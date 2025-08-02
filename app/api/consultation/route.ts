import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  position: z.string().min(2, 'Position is required'),
  industry: z.string().min(2, 'Industry is required'),
  consultationType: z.enum(['strategy', 'technology', 'operations', 'compliance', 'other']),
  budget: z.enum(['under-50k', '50k-100k', '100k-250k', '250k-500k', 'over-500k']),
  timeline: z.enum(['immediate', '1-3-months', '3-6-months', '6-12-months', 'flexible']),
  description: z.string().min(20, 'Please provide more details about your requirements'),
  preferredMeeting: z.enum(['video', 'phone', 'in-person', 'any']).default('video'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = consultationSchema.parse(body);
    
    // Generate a consultation request ID
    const consultationId = `CONS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email to client
    // 3. Send notification to sales team
    // 4. Create calendar booking link
    // 5. Integrate with CRM (HubSpot, Salesforce, etc.)
    
    console.log('Consultation request:', {
      id: consultationId,
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your consultation request. Our team will contact you within 2 business hours to schedule your meeting.',
        consultationId,
        nextSteps: [
          'You will receive a confirmation email within 5 minutes',
          'Our consultant will contact you within 2 business hours',
          'We will send you a calendar link to schedule the meeting',
          'Please prepare any relevant documents or questions'
        ]
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
    
    console.error('Consultation request error:', error);
    
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
    { message: 'Consultation API is working. Use POST to submit consultation requests.' },
    { status: 200 }
  );
}
