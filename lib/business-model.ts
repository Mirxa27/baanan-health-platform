/**
 * Baanan Healthcare Technology Business Model
 * 
 * This file defines the core business logic and service offerings
 * to ensure consistency across the application.
 */

export interface BusinessService {
  id: string;
  name: string;
  description: string;
  category: 'marketplace' | 'consulting' | 'platform' | 'support';
  targetAudience: string[];
  revenueModel: 'commission' | 'subscription' | 'one-time' | 'service-fee';
}

export const BUSINESS_SERVICES: BusinessService[] = [
  // Halol Platform Services
  {
    id: 'device-marketplace',
    name: 'Medical Device Marketplace',
    description: 'Buy and sell medical devices through our secure platform',
    category: 'marketplace',
    targetAudience: ['hospitals', 'clinics', 'medical-suppliers'],
    revenueModel: 'commission'
  },
  {
    id: 'equipment-rental',
    name: 'Equipment Rental Solutions',
    description: 'Rent medical equipment for short-term or long-term needs',
    category: 'marketplace',
    targetAudience: ['hospitals', 'clinics', 'home-care-providers'],
    revenueModel: 'commission'
  },
  {
    id: 'import-services',
    name: 'Equipment Import Services',
    description: 'Professional import and customs handling for medical devices',
    category: 'platform',
    targetAudience: ['medical-suppliers', 'hospitals', 'distributors'],
    revenueModel: 'service-fee'
  },
  {
    id: 'maintenance-support',
    name: 'Maintenance & Support',
    description: 'Comprehensive maintenance and technical support services',
    category: 'support',
    targetAudience: ['hospitals', 'clinics', 'medical-facilities'],
    revenueModel: 'subscription'
  },
  
  // Consulting Services
  {
    id: 'healthcare-consulting',
    name: 'Healthcare Technology Consulting',
    description: 'Strategic guidance for healthcare digital transformation',
    category: 'consulting',
    targetAudience: ['hospitals', 'healthcare-systems', 'government'],
    revenueModel: 'service-fee'
  },
  {
    id: 'system-integration',
    name: 'System Integration Services',
    description: 'Integrate medical devices with existing healthcare systems',
    category: 'consulting',
    targetAudience: ['hospitals', 'clinics', 'healthcare-networks'],
    revenueModel: 'service-fee'
  },
  
  // Platform Features
  {
    id: 'ai-analytics',
    name: 'AI Health Analytics',
    description: 'Advanced analytics and insights for healthcare operations',
    category: 'platform',
    targetAudience: ['hospitals', 'clinics', 'healthcare-administrators'],
    revenueModel: 'subscription'
  },
  {
    id: 'telehealth-platform',
    name: 'Telehealth Platform',
    description: 'Integrated telemedicine and remote patient monitoring',
    category: 'platform',
    targetAudience: ['healthcare-providers', 'patients', 'clinics'],
    revenueModel: 'subscription'
  }
];

export const COMPANY_MISSION = {
  en: "To seamlessly blend innovative technology with holistic wellness, providing comprehensive healthcare solutions that empower healthcare providers, improve patient outcomes, and create a sustainable healthcare ecosystem through our integrated platform and smart devices.",
  ar: "دمج التكنولوجيا المبتكرة بسلاسة مع العافية الشاملة، وتوفير حلول رعاية صحية شاملة تمكن مقدمي الرعاية الصحية، وتحسن نتائج المرضى، وتخلق نظاماً بيئياً مستداماً للرعاية الصحية من خلال منصتنا المتكاملة والأجهزة الذكية."
};

export const COMPANY_VISION = {
  en: "To be the leading health-tech company in the Middle East, transforming healthcare through innovative technology solutions that make quality medical care accessible, efficient, and personalized for everyone.",
  ar: "أن نكون الشركة الرائدة في مجال التكنولوجيا الصحية في الشرق الأوسط، نحول الرعاية الصحية من خلال حلول تكنولوجية مبتكرة تجعل الرعاية الطبية عالية الجودة متاحة وفعالة ومخصصة للجميع."
};

export const VALUE_PROPOSITIONS = {
  halol: {
    en: "Complete healthcare ecosystem in one platform - buy, sell, rent, import, and maintain medical devices with AI-powered insights and telehealth integration.",
    ar: "نظام بيئي صحي متكامل في منصة واحدة - شراء وبيع وتأجير واستيراد وصيانة الأجهزة الطبية مع رؤى مدعومة بالذكاء الاصطناعي وتكامل التطبيب عن بُعد."
  },
  consulting: {
    en: "Expert healthcare consulting services that transform your organization through strategic guidance, technology integration, and operational excellence.",
    ar: "خدمات استشارية صحية متخصصة تحول مؤسستك من خلال التوجيه الاستراتيجي وتكامل التكنولوجيا والتميز التشغيلي."
  }
};

export function getServicesByCategory(category: BusinessService['category']): BusinessService[] {
  return BUSINESS_SERVICES.filter(service => service.category === category);
}

export function getServiceById(id: string): BusinessService | undefined {
  return BUSINESS_SERVICES.find(service => service.id === id);
}