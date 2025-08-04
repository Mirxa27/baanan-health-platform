import { NextRequest, NextResponse } from 'next/server';
import { translations } from '../../../lib/translations';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const namespace = searchParams.get('namespace') || 'common';
  
  try {
    const translationData = translations[locale as 'en' | 'ar']?.[
      namespace as keyof typeof translations.en
    ] as Record<string, string> | undefined;
    
    return NextResponse.json({
      success: true,
      locale,
      namespace,
      translations: translationData || {},
      sampleKeys: {
        home_title: translationData?.['transforming_healthcare_title_part1'] || 'Not found',
        about_title: translationData?.['about_us_title'] || 'Not found',
        contact_title: translationData?.['contact_us'] || 'Not found'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to load translations',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
