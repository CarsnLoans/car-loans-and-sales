import { useCallback, useEffect, useMemo, useState } from 'react';
import { getEmailTemplates, updateEmailTemplate } from '../../services/emailTemplateService';
import Skeleton from '../../components/common/Skeleton';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { Mail, Save, Eye, Code } from 'lucide-react';

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ subject: '', htmlBody: '', textBody: '' });
  const [viewMode, setViewMode] = useState('edit');

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEmailTemplates();
      setTemplates(data.templates || []);
      if (!selected && data.templates?.length) {
        setSelected(data.templates[0]);
      }
    } catch (error) {
      console.error('Failed to fetch email templates:', error);
    } finally {
      setLoading(false);
    }
  }, [selected]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  useEffect(() => {
    if (selected) {
      setForm({
        subject: selected.subject || '',
        htmlBody: selected.htmlBody || '',
        textBody: selected.textBody || '',
      });
    }
  }, [selected]);

  const hasChanges = useMemo(() => {
    if (!selected) return false;
    return (
      form.subject !== selected.subject ||
      form.htmlBody !== selected.htmlBody ||
      form.textBody !== selected.textBody
    );
  }, [form, selected]);

  const renderTemplate = useCallback((template, data = {}) => {
    if (!template) return '';
    let output = template;
    output = output.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, key, content) =>
      data[key] ? content : ''
    );
    output = output.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      const value = data[key];
      return value === undefined || value === null ? '' : String(value);
    });
    return output;
  }, []);

  const previewData = useMemo(
    () => ({
      companyName: 'Car Loans & Sales',
      logoUrl: '',
      supportEmail: 'info@carloansandsales.com',
      supportPhone: '+91 9686-870-536',
      name: 'Alex Morgan',
      loanType: 'New Car Loan',
      status: 'Approved',
      message: 'Your application has moved forward. We will contact you shortly.',
      email: 'alex.morgan@example.com',
      phone: '+91 98765-43210',
      city: 'Bengaluru',
      role: 'admin',
      tempPassword: 'Temp#1234',
      loginUrl: 'https://your-domain.com/admin/login',
    }),
    []
  );

  const previewHtml = useMemo(
    () => renderTemplate(form.htmlBody, previewData),
    [form.htmlBody, previewData, renderTemplate]
  );

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const data = await updateEmailTemplate(selected.name, form);
      toast.success('Template updated');
      const updated = data.template;
      setTemplates((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setSelected(updated);
    } catch (error) {
      toast.error('Failed to update template');
      console.error('Update template error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Email Templates</h1>
            <p className="text-gray-600">Customize automated emails sent to customers.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
                viewMode === 'edit' ? 'bg-primary text-white' : 'text-gray-600'
              }`}
            >
              <Code className="h-4 w-4" /> Edit
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
                viewMode === 'preview' ? 'bg-primary text-white' : 'text-gray-600'
              }`}
            >
              <Eye className="h-4 w-4" /> Preview
            </button>
          </div>
          <Button onClick={handleSave} disabled={!hasChanges || saving}>
            <span className="inline-flex items-center gap-2">
              <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Changes'}
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 lg:col-span-1">
          <h2 className="text-lg font-semibold mb-3">Templates</h2>
          <div className="space-y-2">
            {templates.map((template) => (
              <button
                key={template._id}
                className={`w-full text-left px-3 py-2 rounded border ${
                  selected?._id === template._id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 hover:border-primary'
                }`}
                onClick={() => setSelected(template)}
              >
                <div className="font-medium">{template.name}</div>
                <div className="text-xs text-gray-500">Updated {new Date(template.updatedAt).toLocaleDateString()}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 lg:col-span-3">
          {selected ? (
            viewMode === 'preview' ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs text-gray-500">Subject Preview</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {renderTemplate(form.subject, previewData)}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <iframe
                    title="Email Preview"
                    srcDoc={previewHtml}
                    className="w-full h-[520px] bg-white"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">HTML Body</label>
                  <textarea
                    rows="8"
                    className="input-field font-mono text-xs"
                    value={form.htmlBody}
                    onChange={(e) => setForm({ ...form, htmlBody: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Text Body</label>
                  <textarea
                    rows="6"
                    className="input-field font-mono text-xs"
                    value={form.textBody}
                    onChange={(e) => setForm({ ...form, textBody: e.target.value })}
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                  <p className="font-medium mb-2">Available placeholders</p>
                  <p>
                    {'{{name}}'} {'{{loanType}}'} {'{{status}}'} {'{{message}}'} {'{{email}}'} {'{{phone}}'} {'{{city}}'}{' '}
                    {'{{companyName}}'} {'{{supportEmail}}'} {'{{supportPhone}}'} {'{{role}}'} {'{{tempPassword}}'} {'{{loginUrl}}'}
                  </p>
                </div>
              </div>
            )
          ) : (
            <p className="text-gray-600">Select a template to edit.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;
