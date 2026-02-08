import { useCallback, useEffect, useMemo, useState } from 'react';
import { getEmailTemplates, updateEmailTemplate } from '../../services/emailTemplateService';
import Skeleton from '../../components/common/Skeleton';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { Mail, Save } from 'lucide-react';

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ subject: '', htmlBody: '', textBody: '' });

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
      <div className="p-8 space-y-4">
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
    <div className="p-8 space-y-6">
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
        <Button onClick={handleSave} disabled={!hasChanges || saving}>
          <span className="inline-flex items-center gap-2">
            <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Changes'}
          </span>
        </Button>
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
                  {'{{name}}'} {'{{loanType}}'} {'{{status}}'} {'{{message}}'} {'{{email}}'} {'{{phone}}'} {'{{city}}'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Select a template to edit.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;
