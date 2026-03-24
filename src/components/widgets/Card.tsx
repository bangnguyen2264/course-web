"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "" }, ref) => (
    <div
      ref={ref}
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
    >
      {children}
    </div>
  ),
);

Card.displayName = "Card";

export const CardHeader: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardBody: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => <div className={`px-6 py-4 ${className}`}>{children}</div>;

export const CardFooter: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => (
  <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}>
    {children}
  </div>
);
