'use client';

import React, { memo } from 'react';
import { useTheme } from '@/components/utils/ThemeProvider';

// Component to display a color swatch (memoized for performance)
const ColorSwatch = memo(({ 
  name, 
  variable, 
  textClass = 'text-black dark:text-white'
}: { 
  name: string; 
  variable: string; 
  textClass?: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-16 h-16 rounded-md shadow-md mb-2"
        style={{ backgroundColor: `var(--${variable})` }} 
      />
      <span className={`text-xs font-medium ${textClass}`}>{name}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{variable}</span>
    </div>
  );
});

ColorSwatch.displayName = 'ColorSwatch';

// Color category section (memoized for performance)
const ColorSection = memo(({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {children}
      </div>
    </div>
  );
});

ColorSection.displayName = 'ColorSection';

// Main color palette component
const ColorPalette = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="p-4 bg-surface-2 dark:bg-surface-2 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Color Palette</h2>
        <span className="text-sm font-medium py-1 px-3 rounded-full bg-gray-200 dark:bg-gray-700">
          {isDarkMode ? 'Dark Theme' : 'Light Theme'}
        </span>
      </div>

      <ColorSection title="Theme">
        <ColorSwatch name="Background" variable="background" />
        <ColorSwatch name="Foreground" variable="foreground" />
        <ColorSwatch name="Surface 1" variable="surface-1" />
        <ColorSwatch name="Surface 2" variable="surface-2" />
        <ColorSwatch name="Surface 3" variable="surface-3" />
      </ColorSection>

      <ColorSection title="Primary">
        <ColorSwatch name="Primary" variable="primary" />
        <ColorSwatch name="Primary Light" variable="primary-light" />
        <ColorSwatch name="Primary Dark" variable="primary-dark" />
        <ColorSwatch name="Primary Hover" variable="primary-hover" />
      </ColorSection>

      <ColorSection title="Secondary">
        <ColorSwatch name="Secondary" variable="secondary" />
        <ColorSwatch name="Secondary Light" variable="secondary-light" />
        <ColorSwatch name="Secondary Dark" variable="secondary-dark" />
        <ColorSwatch name="Secondary Hover" variable="secondary-hover" />
      </ColorSection>

      <ColorSection title="Accent">
        <ColorSwatch name="Accent" variable="accent" />
        <ColorSwatch name="Accent Light" variable="accent-light" />
        <ColorSwatch name="Accent Dark" variable="accent-dark" />
        <ColorSwatch name="Accent Hover" variable="accent-hover" />
      </ColorSection>

      <ColorSection title="Feedback">
        <ColorSwatch name="Success" variable="success" />
        <ColorSwatch name="Success Light" variable="success-light" />
        <ColorSwatch name="Warning" variable="warning" />
        <ColorSwatch name="Warning Light" variable="warning-light" />
        <ColorSwatch name="Error" variable="error" />
        <ColorSwatch name="Error Light" variable="error-light" />
      </ColorSection>

      <ColorSection title="Gray Scale">
        <ColorSwatch name="Gray 50" variable="gray-50" textClass="text-gray-900 dark:text-gray-50" />
        <ColorSwatch name="Gray 100" variable="gray-100" textClass="text-gray-900 dark:text-gray-50" />
        <ColorSwatch name="Gray 200" variable="gray-200" textClass="text-gray-900 dark:text-gray-50" />
        <ColorSwatch name="Gray 300" variable="gray-300" textClass="text-gray-900 dark:text-gray-50" />
        <ColorSwatch name="Gray 400" variable="gray-400" textClass="text-gray-900 dark:text-gray-50" />
        <ColorSwatch name="Gray 500" variable="gray-500" textClass="text-gray-900 dark:text-gray-50" />
        <ColorSwatch name="Gray 600" variable="gray-600" textClass="text-gray-50 dark:text-gray-900" />
        <ColorSwatch name="Gray 700" variable="gray-700" textClass="text-gray-50 dark:text-gray-900" />
        <ColorSwatch name="Gray 800" variable="gray-800" textClass="text-gray-50 dark:text-gray-900" />
        <ColorSwatch name="Gray 900" variable="gray-900" textClass="text-gray-50 dark:text-gray-900" />
      </ColorSection>
    </div>
  );
};

// Export memoized component for better performance
export default memo(ColorPalette);
