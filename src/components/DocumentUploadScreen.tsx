import React, { useRef } from 'react';
import { DocumentItem } from '../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  X,
  FileCheck,
} from 'lucide-react';

interface DocumentUploadScreenProps {
  documents: DocumentItem[];
  onUpdateDocuments: (docs: DocumentItem[]) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({
  documents,
  onUpdateDocuments,
  onContinue,
  onBack,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeDocId, setActiveDocId] = React.useState<string | null>(null);

  const handleSimulateUpload = (id: string, customFileName?: string) => {
    const updated = documents.map((doc) => {
      if (doc.id === id) {
        return {
          ...doc,
          status: 'uploaded' as const,
          fileName: customFileName || `${doc.name.replace(/\s+/g, '_')}_Verified.pdf`,
          fileSize: '1.8 MB',
          uploadedAt: 'Just now',
        };
      }
      return doc;
    });
    onUpdateDocuments(updated);
  };

  const handleToggleMissing = (id: string) => {
    const updated = documents.map((doc) => {
      if (doc.id === id) {
        return {
          ...doc,
          status: (doc.status === 'uploaded' ? 'missing' : 'uploaded') as 'uploaded' | 'missing',
          fileName: doc.status === 'missing' ? `${doc.name.replace(/\s+/g, '_')}_Official.pdf` : undefined,
          fileSize: doc.status === 'missing' ? '2.1 MB' : undefined,
          uploadedAt: doc.status === 'missing' ? 'Just now' : undefined,
        };
      }
      return doc;
    });
    onUpdateDocuments(updated);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && activeDocId) {
      const file = e.target.files[0];
      handleSimulateUpload(activeDocId, file.name);
      setActiveDocId(null);
    }
  };

  const triggerUploadClick = (docId: string) => {
    setActiveDocId(docId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const uploadedCount = documents.filter((d) => d.status === 'uploaded').length;
  const missingCount = documents.filter((d) => d.status === 'missing').length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Hidden file input for interactive simulation */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg"
      />

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
          <span>Step 2 of 3</span>
          <span aria-hidden="true">·</span>
          <span>Required Credentials</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Upload Documents
        </h1>
        <p className="text-sm text-slate-600">
          Submit your official academic and professional certificates for AI evaluation against German standards (Anabin, Uni-Assist & APS).
        </p>
      </div>

      {/* Document Status Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Document Checklist Status
            </div>
            <div className="text-xs text-slate-600">
              {uploadedCount} of {documents.length} documents uploaded · {missingCount} missing
            </div>
          </div>
        </div>

        {missingCount > 0 && (
          <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Missing documents can be uploaded now or audited with partial advice.</span>
          </div>
        )}
      </div>

      {/* Document Cards List */}
      <div className="space-y-4">
        {documents.map((doc) => {
          const isUploaded = doc.status === 'uploaded';

          return (
            <div
              key={doc.id}
              className={`bg-white border rounded-xl p-5 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isUploaded
                  ? 'border-slate-200 hover:border-slate-300'
                  : 'border-amber-300 bg-amber-50/10 hover:border-amber-400'
              }`}
            >
              {/* Document Info */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                    isUploaded ? 'bg-slate-100 text-slate-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base font-semibold text-slate-900">
                      {doc.name}
                    </h3>

                    {/* Status Badge */}
                    {isUploaded ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                        <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Missing</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600">
                    {doc.shortDescription}
                  </p>

                  <div className="text-xs text-slate-400 flex items-center gap-2 pt-0.5">
                    <span>Purpose: {doc.requiredFor}</span>
                    {doc.fileName && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-600 font-medium truncate max-w-xs">
                          {doc.fileName} ({doc.fileSize})
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                {isUploaded ? (
                  <>
                    <button
                      type="button"
                      onClick={() => triggerUploadClick(doc.id)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Replace with another file"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Replace</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleMissing(doc.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      title="Mark as missing (simulate missing document)"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => triggerUploadClick(doc.id)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSimulateUpload(doc.id)}
                      className="px-2.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                      title="Click to instantly simulate mock file upload"
                    >
                      <span>Quick Mock</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Tip Box */}
      <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1">
        <div className="font-semibold text-slate-800">Pro-Tip for German Admissions:</div>
        <p>
          Language certificates (IELTS, TOEFL, Goethe) can often be submitted conditionally for initial uni-assist evaluation. If you don't have yours ready yet, you can still proceed to see your qualification analysis!
        </p>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Details</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Continue to AI Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
