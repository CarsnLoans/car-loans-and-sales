import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import { INDIAN_STATES } from '../../constants/data';
import { createLead } from '../../services/leadService';
import { FileText, User, MapPin, MessageSquare } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';
import useSettings from '../../hooks/useSettings';
import { useSearchParams } from 'react-router-dom';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(1, 'Please select a state'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  loanType: z.string().min(1, 'Please select a loan type'),
  message: z.string().optional(),
});

const ApplyNow = () => {
  const { settings = {} } = useSettings();
  const [searchParams] = useSearchParams();
  const LOAN_TYPES = settings.loanTypes || [
    'New Car Loan',
    'Used Car Loan',
    'Auto Loan Top Up',
    'Refinance',
    'Balance Transfer',
    'Personal Loan',
    'Home Loan',
  ];
  const primaryPhone = settings.primaryPhone || '+91 8660516762';
  const alternatePhone = settings.alternatePhone || '+91 8197596707';

  usePageMeta({
    title: 'Apply Now | Car Loans & Sales',
    description: 'Submit your car loan application with quick approvals and minimal documentation.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasPrefilledRef = useRef(false);
  const hasNotifiedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (hasPrefilledRef.current) return;
    const firstName = searchParams.get('firstName');
    const phone = searchParams.get('phone');
    const loanType = searchParams.get('loanType');

    if (firstName) setValue('firstName', firstName);
    if (phone) setValue('phone', phone);
    if (loanType) setValue('loanType', loanType);

    hasPrefilledRef.current = true;
  }, [searchParams, setValue]);

  useEffect(() => {
    const showHelpToast = () => {
      if (hasNotifiedRef.current) return;
      hasNotifiedRef.current = true;
      toast(`Need help? Call ${primaryPhone} / ${alternatePhone}`, {
        icon: '☎️',
        duration: 6000,
      });
    };

    const timer = setTimeout(showHelpToast, 12000);
    const handleMouseLeave = (event) => {
      if (event.clientY <= 0) showHelpToast();
    };

    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [primaryPhone, alternatePhone]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createLead(data);
      toast.success('Application submitted successfully! We will contact you soon.');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Apply for Car Loan"
        subtitle="Fill out the form below and we'll get back to you within 24-48 hours"
        className="bg-gradient-to-r from-primary to-red-700"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Apply Now' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 reveal" data-reveal>
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Loan Type */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <FileText />
              <h2 className="text-xl font-semibold">Loan Information</h2>
            </div>
            <Select
              label="Type of Loan"
              name="loanType"
              id="loanType"
              options={LOAN_TYPES}
              required
              register={register}
              error={errors.loanType}
              placeholder="Select loan type"
            />
          </div>

          {/* Personal Details */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <User />
              <h2 className="text-xl font-semibold">Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                id="firstName"
                required
                register={register}
                error={errors.firstName}
                placeholder="Enter first name"
              />
              <Input
                label="Last Name"
                name="lastName"
                id="lastName"
                required
                register={register}
                error={errors.lastName}
                placeholder="Enter last name"
              />
              <Input
                label="Email"
                type="email"
                name="email"
                id="email"
                required
                register={register}
                error={errors.email}
                placeholder="your.email@example.com"
              />
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                id="phone"
                required
                register={register}
                error={errors.phone}
                placeholder="10-digit mobile number"
              />
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <MapPin />
              <h2 className="text-xl font-semibold">Address Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                id="city"
                required
                register={register}
                error={errors.city}
                placeholder="Enter city"
              />
              <Select
                label="State"
                name="state"
                id="state"
                options={INDIAN_STATES}
                required
                register={register}
                error={errors.state}
                placeholder="Select state"
              />
              <Input
                label="Pincode"
                name="pincode"
                id="pincode"
                required
                register={register}
                error={errors.pincode}
                placeholder="6-digit pincode"
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <MessageSquare />
              <h2 className="text-xl font-semibold">Additional Information (Optional)</h2>
            </div>
            <Textarea
              label="Message"
              name="message"
              id="message"
              register={register}
              error={errors.message}
              placeholder="Any additional details you'd like to share..."
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full md:w-auto md:px-12"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-red-700 text-white p-6 shadow-xl">
            <h3 className="text-xl font-bold">Why Apply with Us?</h3>
            <ul className="mt-4 space-y-2 text-white/90 text-sm">
              <li>• Quick approval in 24–48 hours</li>
              <li>• Competitive interest rates</li>
              <li>• Minimal documentation</li>
              <li>• Dedicated support</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
            <h4 className="font-semibold text-gray-800">Need Help?</h4>
            <p className="text-sm text-gray-600 mt-2">Our team will assist you at every step.</p>
            <p className="text-sm text-gray-800 mt-3">Call: +91 9686-870-536</p>
            <p className="text-sm text-gray-800">Email: info@carloansandsales.com</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ApplyNow;
