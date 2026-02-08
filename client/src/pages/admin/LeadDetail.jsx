import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLead, updateLead } from '../../services/leadService';
import { getAdmins } from '../../services/adminService';
import { LEAD_STATUSES } from '../../constants/data';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import Skeleton from '../../components/common/Skeleton';
import { User, Mail, Phone, MapPin, ClipboardList, CalendarCheck, Clock4, BadgeCheck } from 'lucide-react';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [nextFollowUpAt, setNextFollowUpAt] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [admins, setAdmins] = useState([]);
  const [saving, setSaving] = useState(false);

  const fetchAdmins = useCallback(async () => {
    try {
      const data = await getAdmins();
      setAdmins(data.admins || []);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  }, []);

  const fetchLead = useCallback(async () => {
    try {
      const data = await getLead(id);
      setLead(data.lead);
      setStatus(data.lead.status || 'New');
      setNextFollowUpAt(
        data.lead.nextFollowUpAt
          ? new Date(data.lead.nextFollowUpAt).toISOString().slice(0, 10)
          : ''
      );
      setAssignedTo(data.lead.assignedTo?._id || '');
    } catch (error) {
      toast.error('Failed to load lead details');
      console.error('Lead details error:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLead();
    fetchAdmins();
  }, [fetchLead, fetchAdmins]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await updateLead(id, {
        status,
        assignedTo: assignedTo || undefined,
        note: note.trim() ? note : undefined,
        nextFollowUpAt: nextFollowUpAt || null,
      });
      toast.success('Lead updated successfully');
      setNote('');
      fetchLead();
    } catch (error) {
      toast.error('Failed to update lead');
      console.error('Update lead error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Lead not found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Lead Details</h1>
            <p className="text-gray-600">Review lead profile and update workflow.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
            <BadgeCheck className="h-4 w-4 text-primary" /> {lead.status}
          </span>
          <Button variant="outline" onClick={() => navigate('/admin/leads')}>
            Back to Leads
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="font-medium">{lead.firstName} {lead.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{lead.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">{lead.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-medium">{lead.city}, {lead.state} {lead.pincode}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Loan Information</h2>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" /> {lead.loanType}
            </span>
          </div>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-sm font-semibold text-gray-900">{lead.status}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarCheck className="h-4 w-4 text-primary" /> Submitted {new Date(lead.createdAt).toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock4 className="h-4 w-4 text-primary" /> Last contacted {lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleString() : '—'}
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
              <span className="text-sm text-gray-500">Next Follow-up</span>
              <span className="text-sm font-semibold text-gray-900">
                {lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt).toLocaleDateString() : '—'}
              </span>
            </div>
            {lead.message && (
              <div className="rounded-lg border border-dashed border-gray-200 bg-white px-3 py-2 text-sm">
                <span className="text-xs text-gray-500 block mb-1">Message</span>
                <p className="text-gray-700">{lead.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Lead Timeline</h2>
          <span className="text-xs text-gray-500">Latest updates</span>
        </div>
        <div className="space-y-4">
          {[
            {
              label: 'Submitted',
              value: new Date(lead.createdAt).toLocaleString(),
              color: 'bg-primary',
              bg: 'bg-primary/5',
            },
            {
              label: 'Current Status',
              value: lead.status,
              sub: lead.assignedTo?.name ? `Assigned to ${lead.assignedTo.name}` : null,
              color: 'bg-blue-500',
              bg: 'bg-blue-500/5',
            },
            {
              label: 'Last Contacted',
              value: lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleString() : '—',
              color: 'bg-emerald-500',
              bg: 'bg-emerald-500/5',
            },
            {
              label: 'Next Follow-up',
              value: lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt).toLocaleDateString() : '—',
              color: 'bg-amber-500',
              bg: 'bg-amber-500/5',
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className={`h-3 w-3 rounded-full ${item.color}`} />
              <div className={`flex-1 rounded-xl border border-gray-100 ${item.bg} px-4 py-3`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">{item.label}</p>
                  <span className="text-xs text-gray-500">{item.value}</span>
                </div>
                {item.sub && (
                  <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Update Status</h2>
          <span className="text-xs text-gray-500">Save changes to notify the lead</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="input-field"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <select
            className="input-field"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Unassigned</option>
            {admins.map((admin) => (
              <option key={admin._id} value={admin._id}>
                {admin.name} ({admin.email})
              </option>
            ))}
          </select>
          <input
            type="date"
            className="input-field"
            value={nextFollowUpAt}
            onChange={(e) => setNextFollowUpAt(e.target.value)}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Add note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button onClick={handleUpdate} disabled={saving}>
            {saving ? 'Saving...' : 'Update'}
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Notes</h2>
          <span className="text-xs text-gray-500">{lead.notes?.length || 0} entries</span>
        </div>
        {lead.notes?.length ? (
          <ul className="space-y-4">
            {lead.notes.map((n, index) => (
              <li key={index} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-gray-800 font-medium">{n.text}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(n.addedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No notes added yet.</p>
        )}
      </div>
    </div>
  );
};

export default LeadDetail;
