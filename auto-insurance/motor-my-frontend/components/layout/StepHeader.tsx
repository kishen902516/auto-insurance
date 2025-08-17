import React from 'react';

interface StepHeaderProps {
  title: string;
  subtitle?: string;
  currentStep?: number;
  totalSteps?: number;
  showBreadcrumb?: boolean;
}

export function StepHeader({ 
  title, 
  subtitle, 
  currentStep, 
  totalSteps,
  showBreadcrumb = false 
}: StepHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        {/* Progress Indicator */}
        {currentStep && totalSteps && (
          <div className="mb-4" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Title and Subtitle */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}