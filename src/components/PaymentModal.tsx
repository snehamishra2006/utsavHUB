import React, { useState } from 'react';
import { X, Smartphone, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  price: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, eventTitle, price }) => {
  const [step, setStep] = useState<'methods' | 'processing' | 'success'>('methods');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  const upiMethods = [
    { id: 'gpay', name: 'Google Pay', icon: 'https://www.gstatic.com/images/branding/product/2x/gpay_64dp.png' },
    { id: 'phonepe', name: 'PhonePe', icon: 'https://phonepe.com/favicon.ico' },
    { id: 'paytm', name: 'Paytm', icon: 'https://paytm.com/favicon.ico' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            <div className="p-8">
              {step === 'methods' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
                    <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event</p>
                      <p className="text-lg font-bold text-slate-900 line-clamp-1">{eventTitle}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm text-slate-500">Total Amount</span>
                        <span className="text-xl font-black text-primary">₹{price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-bold text-slate-900">Pay via UPI</p>
                    <div className="grid grid-cols-1 gap-3">
                      {upiMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                            selectedMethod === method.id 
                              ? "border-primary bg-primary/5" 
                              : "border-slate-100 hover:border-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={method.icon} alt={method.name} className="w-8 h-8 object-contain rounded-lg" />
                            <span className="font-bold text-slate-700">{method.name}</span>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedMethod === method.id ? "border-primary bg-primary" : "border-slate-200"
                          }`}>
                            {selectedMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!selectedMethod}
                    className="w-full mt-8 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    <span>Pay Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secure UPI Payment</span>
                  </div>
                </>
              )}

              {step === 'processing' && (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-slate-900">Processing Payment</h2>
                  <p className="text-slate-500 mt-2">Please do not close this window or press back.</p>
                </div>
              )}

              {step === 'success' && (
                <div className="py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-slate-900">Ticket Confirmed!</h2>
                  <p className="text-slate-500 mt-2 mb-8">Your tickets have been sent to your registered mobile number via WhatsApp.</p>
                  
                  <button
                    onClick={onClose}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                  >
                    View My Tickets
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
