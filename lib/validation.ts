/**
 * Business Logic Validation Utilities
 * 
 * This file contains validation functions to ensure business logic consistency
 * across the application.
 */

import { BUSINESS_SERVICES, BusinessService } from './business-model';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ServiceValidation {
  service: BusinessService;
  validation: ValidationResult;
}

/**
 * Validates that all business services have consistent logic
 */
export function validateBusinessServices(): ServiceValidation[] {
  return BUSINESS_SERVICES.map(service => ({
    service,
    validation: validateSingleService(service)
  }));
}

/**
 * Validates a single business service
 */
function validateSingleService(service: BusinessService): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate required fields
  if (!service.id || service.id.trim() === '') {
    errors.push('Service ID is required');
  }

  if (!service.name || service.name.trim() === '') {
    errors.push('Service name is required');
  }

  if (!service.description || service.description.trim() === '') {
    errors.push('Service description is required');
  }

  // Validate business logic consistency
  if (service.category === 'marketplace' && service.revenueModel !== 'commission') {
    warnings.push('Marketplace services typically use commission-based revenue model');
  }

  if (service.category === 'consulting' && service.revenueModel !== 'service-fee') {
    warnings.push('Consulting services typically use service-fee revenue model');
  }

  if (service.category === 'platform' && !['subscription', 'service-fee'].includes(service.revenueModel)) {
    warnings.push('Platform services typically use subscription or service-fee revenue models');
  }

  // Validate target audience
  if (!service.targetAudience || service.targetAudience.length === 0) {
    errors.push('Service must have at least one target audience');
  }

  // Validate ID format (kebab-case)
  if (service.id && !/^[a-z0-9-]+$/.test(service.id)) {
    errors.push('Service ID should be in kebab-case format');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates that translation keys exist for all services
 */
export function validateTranslationKeys(locale: 'en' | 'ar', translations: Record<string, string>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required translation keys for business consistency
  const requiredKeys = [
    'healthcare_knowledge_hub',
    'professional_healthcare_consulting',
    'medical_device_marketplace',
    'equipment_rental_solutions',
    'maintenance_support',
    'ai_health_analytics',
    'telehealth_platform'
  ];

  requiredKeys.forEach(key => {
    if (!translations[key]) {
      errors.push(`Missing translation key: ${key}`);
    }
  });

  // Check for empty translations
  Object.entries(translations).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      warnings.push(`Empty translation for key: ${key}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates the overall business model consistency
 */
export function validateBusinessModel(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check service distribution across categories
  const categoryCount = BUSINESS_SERVICES.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (categoryCount.marketplace < 2) {
    warnings.push('Consider adding more marketplace services for better platform value');
  }

  if (categoryCount.consulting < 2) {
    warnings.push('Consider expanding consulting service offerings');
  }

  // Check revenue model distribution
  const revenueModelCount = BUSINESS_SERVICES.reduce((acc, service) => {
    acc[service.revenueModel] = (acc[service.revenueModel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (Object.keys(revenueModelCount).length < 2) {
    warnings.push('Consider diversifying revenue models for better business sustainability');
  }

  // Validate target audience coverage
  const allAudiences = new Set(BUSINESS_SERVICES.flatMap(s => s.targetAudience));
  if (allAudiences.size < 3) {
    warnings.push('Consider expanding target audience reach');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Runs all validations and returns a comprehensive report
 */
export function runFullValidation(): {
  businessModel: ValidationResult;
  services: ServiceValidation[];
  summary: {
    totalErrors: number;
    totalWarnings: number;
    isValid: boolean;
  };
} {
  const businessModel = validateBusinessModel();
  const services = validateBusinessServices();

  const totalErrors = businessModel.errors.length + services.reduce((sum, s) => sum + s.validation.errors.length, 0);
  const totalWarnings = businessModel.warnings.length + services.reduce((sum, s) => sum + s.validation.warnings.length, 0);

  return {
    businessModel,
    services,
    summary: {
      totalErrors,
      totalWarnings,
      isValid: totalErrors === 0
    }
  };
}