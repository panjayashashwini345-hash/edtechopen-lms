'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface EnrollmentModalProps {
  isOpen: boolean;
  courseTitle: string;
  price: number;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EnrollmentModal({
  isOpen,
  courseTitle,
  price,
  onClose,
  onConfirm,
}: EnrollmentModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 rounded-lg border border-slate-700 shadow-xl animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Confirm Enrollment</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Course</p>
              <p className="text-lg font-semibold text-white">{courseTitle}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Price</p>
              <p className="text-2xl font-bold text-blue-400">${price}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={onConfirm} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Confirm & Enroll
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
