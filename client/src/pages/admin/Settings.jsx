import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { getSettings, updateSettings } from '../../services/settingsService';
import toast from 'react-hot-toast';
import { Settings as SettingsIcon, Plus, X } from 'lucide-react';

const Settings = () => {
  const { admin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    primaryPhone: '',
    alternatePhone: '',
    email: '',
    loanTypes: [],
    newLoanType: '',
    companyName: '',
    facebookUrl: '',
    instagramUrl: '',
  });

  useEffect(() => {
    if (admin?.role !== 'super_admin') {
      setLoading(false);
      return;
    }
    fetchSettings();
  }, [admin]);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings({
        primaryPhone: data.primaryPhone || '',
        alternatePhone: data.alternatePhone || '',
        email: data.email || '',
        loanTypes: Array.isArray(data.loanTypes) ? data.loanTypes : [],
        newLoanType: '',
        companyName: data.companyName || '',
        facebookUrl: data.facebookUrl || '',
        instagramUrl: data.instagramUrl || '',
      });
    } catch {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddLoanType = () => {
    const trimmed = settings.newLoanType.trim();
    if (!trimmed) {
      toast.error('Please enter a loan type');
      return;
    }
    if (settings.loanTypes.includes(trimmed)) {
      toast.error('This loan type already exists');
      return;
    }
    setSettings((prev) => ({
      ...prev,
      loanTypes: [...prev.loanTypes, trimmed],
      newLoanType: '',
    }));
  };

  const handleRemoveLoanType = (index) => {
    setSettings((prev) => ({
      ...prev,
      loanTypes: prev.loanTypes.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLoanType();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await updateSettings({
        primaryPhone: settings.primaryPhone,
        alternatePhone: settings.alternatePhone,
        email: settings.email,
        loanTypes: settings.loanTypes,
        companyName: settings.companyName,
        facebookUrl: settings.facebookUrl,
        instagramUrl: settings.instagramUrl,
      });
      toast.success('Settings updated successfully');
    } catch {
      toast.error('Failed to update settings');
    } finally {
      setSubmitting(false);
    }
  };

  // Only super_admin can access
  if (admin?.role !== 'super_admin') {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="bg-red-50 border border-red-200">
            <p className="text-red-700 font-semibold">
              Access restricted. Only super-admin can manage settings.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage application configuration"
        className="bg-gradient-to-r from-primary to-red-700"
      />

      <section className="py-6 md:py-12 px-3 md:px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border border-gray-100 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <SettingsIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Application Settings</h2>
                <p className="text-xs sm:text-sm text-gray-600">Configure contact information, services, and social links</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Section */}
              <div className="border-t pt-4 md:pt-6">
                <h3 className="text-base md:text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <Input
                    label="Primary Phone"
                    name="primaryPhone"
                    value={settings.primaryPhone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                    required
                  />
                  <Input
                    label="Alternate Phone"
                    name="alternatePhone"
                    value={settings.alternatePhone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                    placeholder="info@example.com"
                    required
                  />
                  <Input
                    label="Company Name"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                  />
                </div>
              </div>

              {/* Services Section */}
              <div className="border-t pt-4 md:pt-6">
                <h3 className="text-base md:text-lg font-semibold mb-4">Loan Types</h3>
                
                {/* Add Loan Type Input */}
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input
                    type="text"
                    name="newLoanType"
                    value={settings.newLoanType}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., Business Loan"
                    className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddLoanType}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm md:text-base rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>

                {/* Loan Types Chips */}
                <div className="space-y-3">
                  {settings.loanTypes.length === 0 ? (
                    <p className="text-gray-500 text-sm py-4 text-center bg-gray-50 rounded-lg">
                      No loan types added yet. Add one to get started!
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {settings.loanTypes.map((type, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/15 transition-colors text-xs md:text-sm"
                        >
                          <span className="font-medium text-primary line-clamp-1">{type}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveLoanType(index)}
                            className="text-primary hover:text-primary/80 transition-colors"
                            aria-label="Remove loan type"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links Section */}
              <div className="border-t pt-4 md:pt-6">
                <h3 className="text-base md:text-lg font-semibold mb-4">Social Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <Input
                    label="Facebook URL"
                    name="facebookUrl"
                    value={settings.facebookUrl}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                  />
                  <Input
                    label="Instagram URL"
                    name="instagramUrl"
                    value={settings.instagramUrl}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-4 md:pt-6 flex flex-col sm:flex-row gap-3">
                <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? 'Saving...' : 'Save Settings'}
                </Button>
                <Button type="button" variant="outline" onClick={fetchSettings} className="w-full sm:w-auto">
                  Reset
                </Button>
              </div>
            </form>
          </Card>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-blue-700">
              <strong>Note:</strong> Changes to settings will be reflected across the application after the page refreshes.
              Users will see the updated loan types, contact information, and social links.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
