
import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  width, 
  height,
  circle 
}) => {
  return (
    <div
      className={cn(
        "bg-gray-200 animate-pulse rounded",
        circle && "rounded-full",
        className
      )}
      style={{
        width: width,
        height: height
      }}
    ></div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="bg-gray-200 h-48 w-full rounded-md mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="md:w-1/2">
          <div className="bg-gray-200 h-96 w-full rounded-lg"></div>
          <div className="flex gap-2 mt-4">
            <div className="bg-gray-200 h-20 w-20 rounded-md"></div>
            <div className="bg-gray-200 h-20 w-20 rounded-md"></div>
            <div className="bg-gray-200 h-20 w-20 rounded-md"></div>
          </div>
        </div>
        
        <div className="md:w-1/2 space-y-4">
          <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
          <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
          <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
          <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
          <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-200 h-10 w-full rounded-md"></div>
            <div className="bg-gray-200 h-10 w-full rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CheckoutSkeleton = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="md:w-2/3 space-y-6">
          <div className="bg-gray-200 h-8 w-1/3 rounded"></div>
          <div className="space-y-4">
            <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
            <div className="bg-gray-200 h-10 w-full rounded-md"></div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
            <div className="bg-gray-200 h-10 w-full rounded-md"></div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 space-y-4">
              <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
              <div className="bg-gray-200 h-10 w-full rounded-md"></div>
            </div>
            <div className="w-1/2 space-y-4">
              <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
              <div className="bg-gray-200 h-10 w-full rounded-md"></div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3 space-y-4">
          <div className="bg-gray-200 h-8 w-1/2 rounded"></div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/5 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/5 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/5 rounded"></div>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <div className="bg-gray-200 h-5 w-1/4 rounded"></div>
                <div className="bg-gray-200 h-5 w-1/5 rounded"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 h-12 w-full rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
