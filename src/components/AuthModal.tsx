import React, { useState } from 'react';
import { X, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      onSuccess();
      onClose();
    }
  };

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

            <div className="p-8 pt-12">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                {step === 'phone' ? (
                  <Phone className="w-8 h-8 text-primary" />
                ) : (
                  <ShieldCheck className="w-8 h-8 text-primary" />
                )}
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  {step === 'phone' ? 'Login to UtsavHub' : 'Verify OTP'}
                </h2>
                <p className="text-slate-500 mt-2">
                  {step === 'phone' 
                    ? 'Enter your mobile number to continue' 
                    : `Enter the 4-digit code sent to +91 ${phone}`}
                </p>
              </div>

              {step === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r border-slate-200 pr-3">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="Mobile Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={phone.length !== 10}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none"
                  >
                    <span>Get OTP</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="flex justify-center gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-14 h-16 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        onChange={(e) => {
                          if (e.target.value) {
                            const newOtp = otp + e.target.value;
                            setOtp(newOtp);
                            if (i < 3) (e.target.nextSibling as HTMLInputElement)?.focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    disabled={otp.length !== 4}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    <span>Verify & Login</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep('phone')}
                    className="w-full text-sm font-bold text-slate-400 hover:text-primary transition-colors"
                  >
                    Change Number
                  </button>
                </form>
              )}

              <p className="text-[10px] text-slate-400 text-center mt-8 uppercase tracking-widest font-bold">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
