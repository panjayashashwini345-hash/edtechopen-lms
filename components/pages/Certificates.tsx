'use client';

import { useState } from 'react';
import { User, mockCertificates } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CertificatesProps {
  user: User;
  onNavigate: (page: any) => void;
}

export default function Certificates({ user, onNavigate }: CertificatesProps) {
  const [previewCert, setPreviewCert] = useState<string | null>(null);

  const availableCerts = mockCertificates.filter((c) => c.status === 'available');
  const pendingCerts = mockCertificates.filter((c) => c.status === 'pending');

  const handleDownload = (cert: any) => {
    if (cert.status === 'available') {
      window.print();
    }
  };

  if (previewCert) {
    const cert = mockCertificates.find((c) => c.id === previewCert);
    if (!cert) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-4xl space-y-4">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setPreviewCert(null)}
              className="text-white text-2xl hover:text-orange-500 transition"
            >
              ✕
            </button>
          </div>

          {/* Certificate Preview */}
          <div className="bg-white rounded-lg p-16 shadow-2xl printable-area">
            {/* Top Decorations */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">✨</div>
              <div className="w-32 h-1 bg-yellow-500 mx-auto rounded"></div>
            </div>

            {/* Main Content */}
            <div className="text-center space-y-6">
              {/* Logo */}
              <div className="text-5xl font-bold text-yellow-700">EdTechOpen</div>

              {/* Title */}
              <div className="border-t-2 border-b-2 border-yellow-600 py-4">
                <p className="text-4xl font-bold text-gray-800">Certificate of Completion</p>
              </div>

              {/* Body */}
              <div className="space-y-4 text-gray-700">
                <p className="text-xl">This is to certify that</p>
                <p className="text-3xl font-bold text-yellow-700">{user.name}</p>
                <p className="text-xl">has successfully completed</p>
                <p className="text-2xl font-bold text-orange-600">{cert.courseName}</p>
                <p className="text-lg">
                  with Grade <span className="font-bold text-yellow-600">{cert.grade}</span> and{' '}
                  <span className="font-bold text-yellow-600">{cert.score}%</span> score
                </p>
              </div>

              {/* Bottom Decorations */}
              <div className="flex justify-between items-end pt-8 border-t-2 border-yellow-600">
                <div className="text-center">
                  <div className="text-5xl">🏆</div>
                  <p className="text-xs text-gray-600 mt-2">Official Seal</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Issued on</p>
                  <p className="text-lg font-bold text-gray-800">
                    {new Date(cert.issuedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Director Signature</p>
                  <div className="w-24 h-12 border-b-2 border-gray-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <Button onClick={() => handleDownload(cert)} className="bg-orange-600 hover:bg-orange-700 px-8">
              Download PDF
            </Button>
            <Button onClick={() => setPreviewCert(null)} className="bg-slate-700 hover:bg-slate-600 px-8">
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Certificates</h1>
          <p className="text-slate-400">View and download your earned certificates</p>
        </div>

        {/* Available Certificates */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Available Certificates</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableCerts.map((cert) => (
              <Card key={cert.id} className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 hover:border-yellow-500 transition overflow-hidden">
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Available
                </div>

                <div className="p-6 space-y-4">
                  {/* Certificate Preview */}
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg text-center border-2 border-yellow-400">
                    <div className="text-4xl mb-2">🏆</div>
                    <p className="text-yellow-900 text-xs font-bold">CERTIFICATE</p>
                    <h3 className="text-white text-lg font-bold my-2">{cert.courseName}</h3>
                    <p className="text-yellow-900 text-sm">Grade: {cert.grade}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-400">Score: <span className="text-orange-400 font-semibold">{cert.score}%</span></p>
                    <p className="text-slate-400">Issued: <span className="text-white">{new Date(cert.issuedDate).toLocaleDateString()}</span></p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => setPreviewCert(cert.id)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-sm"
                    >
                      Preview
                    </Button>
                    <Button
                      onClick={() => handleDownload(cert)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-sm"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pending Certificates */}
        {pendingCerts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">In Progress</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pendingCerts.map((cert) => (
                <Card
                  key={cert.id}
                  className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 opacity-75 hover:opacity-100 transition"
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Pending
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Certificate Preview */}
                    <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-lg text-center border-2 border-slate-600">
                      <div className="text-4xl mb-2 opacity-50">🏆</div>
                      <p className="text-slate-500 text-xs font-bold">CERTIFICATE</p>
                      <h3 className="text-slate-400 text-lg font-bold my-2">{cert.courseName}</h3>
                      <p className="text-slate-600 text-sm">Completion in progress...</p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <p className="text-sm text-slate-400">Complete the course to unlock this certificate</p>
                      <div className="h-2 w-full bg-slate-800 rounded">
                        <div className="h-full w-1/2 bg-orange-600 rounded"></div>
                      </div>
                      <p className="text-xs text-slate-500 text-right">50% Complete</p>
                    </div>

                    <Button disabled className="w-full bg-slate-700 text-slate-500 cursor-not-allowed">
                      Locked
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media print {
          * {
            display: none !important;
          }
          .printable-area {
            display: block !important;
          }
          .printable-area * {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
