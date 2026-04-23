import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ArrowLeft, Upload, Globe, Send } from 'lucide-react';
import { logAction, can } from '@/lib/adminAuth';

const CATEGORIES = ['Media Placement', 'Press Release', 'Insights', 'Case Study', 'Announcement'];
const BADGES = ['', 'Featured', 'Media Placement', 'Announcement', 'Case Release'];

const slugify = (str) =>
  str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const calcReadingTime = (html) => {
  const text = html?.replace(/<[^>]*>/g, '') || '';
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
};

export default function AdminArticleForm({ article, onSave, onCancel, currentUser }) {
  const isNew = !article;
  const [form, setForm] = useState({
    headline: article?.headline || '',
    subheadline: article?.subheadline || '',
    slug: article?.slug || '',
    category: article?.category || 'Press Release',
    status: article?.status || 'draft',
    publish_date: article?.publish_date ? new Date(article.publish_date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    location: article?.location || 'Melbourne, Australia',
    industry: article?.industry || '',
    cover_image: article?.cover_image || '',
    gallery_images: article?.gallery_images || [],
    body_content: article?.body_content || '',
    external_link: article?.external_link || '',
    tags: article?.tags?.join(', ') || '',
    is_featured: article?.is_featured || false,
    badge: article?.badge || '',
    seo_description: article?.seo_description || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [slugManual, setSlugManual] = useState(!!article);

  useEffect(() => {
    if (!slugManual && form.headline) {
      setForm(f => ({ ...f, slug: slugify(f.headline) }));
    }
  }, [form.headline, slugManual]);

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set('cover_image', file_url);
    setUploadingCover(false);
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    const urls = await Promise.all(files.map(f => base44.integrations.Core.UploadFile({ file: f }).then(r => r.file_url)));
    set('gallery_images', [...form.gallery_images, ...urls]);
  };

  const handleSave = async (statusOverride) => {
    setSaving(true);
    const payload = {
      ...form,
      status: statusOverride || form.status,
      publish_date: new Date(form.publish_date).toISOString(),
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      reading_time: calcReadingTime(form.body_content),
      gallery_images: form.gallery_images,
    };
    if (isNew) {
      const created = await base44.entities.NewsroomArticle.create(payload);
      await logAction(base44, currentUser, 'article_created', created?.id || '', payload.headline);
    } else {
      await base44.entities.NewsroomArticle.update(article.id, payload);
      const actionType = statusOverride === 'published' ? 'article_published'
        : statusOverride === 'draft' ? 'article_edited'
        : statusOverride === 'pending_review' ? 'article_submitted'
        : 'article_edited';
      await logAction(base44, currentUser, actionType, article.id, payload.headline);
    }
    setSaving(false);
    onSave();
  };

  const canPublish = can(currentUser, 'publish_article');
  const canSubmit = can(currentUser, 'submit_article');

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '13px',
    background: 'rgba(20,16,10,0.80)',
    border: '1px solid rgba(197,160,89,0.18)',
    color: '#E8DFC8',
    borderRadius: '3px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 200ms ease',
  };
  const labelStyle = {
    display: 'block',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '9px',
    fontWeight: 700,
    letterSpacing: '0.20em',
    textTransform: 'uppercase',
    color: 'rgba(197,160,89,0.45)',
    marginBottom: '8px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0B0D', paddingBottom: '100px' }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(197,160,89,0.12)', padding: '18px clamp(20px,5vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(14,12,8,0.95)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.40)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={14} /> Back
          </button>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.60)', borderLeft: '1px solid rgba(197,160,89,0.15)', paddingLeft: '16px' }}>
            {isNew ? 'New Release' : 'Edit Release'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleSave('draft')} disabled={saving} style={{ padding: '9px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(197,160,89,0.25)', color: 'rgba(197,160,89,0.55)', borderRadius: '2px', cursor: 'pointer' }}>
            Save Draft
          </button>
          {canPublish ? (
            <button onClick={() => handleSave('published')} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 22px', fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', background: saving ? 'rgba(197,160,89,0.40)' : '#C5A059', color: '#0A0B0D', border: 'none', borderRadius: '2px', cursor: saving ? 'not-allowed' : 'pointer' }}>
              <Globe size={12} /> {saving ? 'Publishing…' : 'Publish'}
            </button>
          ) : canSubmit ? (
            <button onClick={() => handleSave('pending_review')} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 22px', fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', background: saving ? 'rgba(197,160,89,0.40)' : 'rgba(197,160,89,0.15)', color: '#C5A059', border: '1px solid rgba(197,160,89,0.35)', borderRadius: '2px', cursor: saving ? 'not-allowed' : 'pointer' }}>
              <Send size={12} /> {saving ? 'Submitting…' : 'Submit for Review'}
            </button>
          ) : null}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '40px auto 0', padding: '0 clamp(20px,5vw,48px)', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '32px', alignItems: 'start' }}>
        {/* Main column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Headline */}
          <div>
            <label style={labelStyle}>Headline *</label>
            <input style={inputStyle} value={form.headline} onChange={e => set('headline', e.target.value)}
              onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
              onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
              placeholder="Enter compelling headline…" />
          </div>

          {/* Subheadline */}
          <div>
            <label style={labelStyle}>Subheadline</label>
            <input style={inputStyle} value={form.subheadline} onChange={e => set('subheadline', e.target.value)}
              onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
              onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
              placeholder="Supporting headline…" />
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle}>Slug *</label>
            <input style={inputStyle} value={form.slug}
              onChange={e => { setSlugManual(true); set('slug', slugify(e.target.value)); }}
              onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
              onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
              placeholder="auto-generated-from-headline" />
          </div>

          {/* SEO Description */}
          <div>
            <label style={labelStyle}>SEO Description</label>
            <textarea style={{ ...inputStyle, height: '72px', resize: 'vertical' }} value={form.seo_description} onChange={e => set('seo_description', e.target.value)}
              onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
              onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
              placeholder="Meta description for search engines…" />
          </div>

          {/* Cover image */}
          <div>
            <label style={labelStyle}>Cover Image</label>
            {form.cover_image && (
              <div style={{ borderRadius: '4px', overflow: 'hidden', marginBottom: '10px', maxHeight: '200px' }}>
                <img src={form.cover_image} alt="Cover" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <input style={{ ...inputStyle, flex: 1 }} value={form.cover_image} onChange={e => set('cover_image', e.target.value)} placeholder="Paste image URL…"
                onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', border: '1px solid rgba(197,160,89,0.25)', color: 'rgba(197,160,89,0.55)', borderRadius: '3px', cursor: 'pointer', whiteSpace: 'nowrap', background: 'transparent' }}>
                <Upload size={12} /> {uploadingCover ? 'Uploading…' : 'Upload'}
                <input type="file" accept="image/*" onChange={handleCoverUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <label style={labelStyle}>Gallery Images</label>
            {form.gallery_images.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {form.gallery_images.map((img, i) => (
                  <div key={i} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '3px', overflow: 'hidden' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button onClick={() => set('gallery_images', form.gallery_images.filter((_, j) => j !== i))} style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(10,9,7,0.80)', border: 'none', color: '#C5A059', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                  </div>
                ))}
              </div>
            )}
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', border: '1px solid rgba(197,160,89,0.20)', color: 'rgba(197,160,89,0.50)', borderRadius: '3px', cursor: 'pointer', background: 'transparent' }}>
              <Upload size={12} /> Add Images
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Body content */}
          <div>
            <label style={labelStyle}>Body Content *</label>
            <div style={{ borderRadius: '3px', overflow: 'hidden', border: '1px solid rgba(197,160,89,0.18)' }}>
              <ReactQuill
                theme="snow"
                value={form.body_content}
                onChange={v => set('body_content', v)}
                style={{ background: 'rgba(20,16,10,0.80)', color: '#E8DFC8', minHeight: '320px' }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'link', 'image'],
                    ['clean'],
                  ],
                }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '80px' }}>
          {/* Status */}
          <div style={{ background: 'rgba(20,16,10,0.70)', border: '1px solid rgba(197,160,89,0.12)', borderRadius: '4px', padding: '20px' }}>
            <label style={labelStyle}>Status</label>
            <select style={{ ...inputStyle }} value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {/* Category & Badge */}
          <div style={{ background: 'rgba(20,16,10,0.70)', border: '1px solid rgba(197,160,89,0.12)', borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Category *</label>
              <select style={{ ...inputStyle }} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Badge</label>
              <select style={{ ...inputStyle }} value={form.badge} onChange={e => set('badge', e.target.value)}>
                {BADGES.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
              </select>
            </div>
          </div>

          {/* Dates & Meta */}
          <div style={{ background: 'rgba(20,16,10,0.70)', border: '1px solid rgba(197,160,89,0.12)', borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Publish Date</label>
              <input type="datetime-local" style={{ ...inputStyle }} value={form.publish_date} onChange={e => set('publish_date', e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
              />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input style={{ ...inputStyle }} value={form.location} onChange={e => set('location', e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
                placeholder="Melbourne, Australia" />
            </div>
            <div>
              <label style={labelStyle}>Industry</label>
              <input style={{ ...inputStyle }} value={form.industry} onChange={e => set('industry', e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
                placeholder="e.g. Finance, Legal…" />
            </div>
            <div>
              <label style={labelStyle}>External Link</label>
              <input style={{ ...inputStyle }} value={form.external_link} onChange={e => set('external_link', e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
                placeholder="https://publication.com/…" />
            </div>
            <div>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input style={{ ...inputStyle }} value={form.tags} onChange={e => set('tags', e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(197,160,89,0.18)'}
                placeholder="authority, media, branding…" />
            </div>
          </div>

          {/* Feature toggle */}
          <div style={{ background: 'rgba(20,16,10,0.70)', border: '1px solid rgba(197,160,89,0.12)', borderRadius: '4px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(197,160,89,0.65)' }}>Pin as Featured</span>
            <button onClick={() => set('is_featured', !form.is_featured)} style={{ width: '38px', height: '22px', borderRadius: '11px', background: form.is_featured ? '#C5A059' : 'rgba(197,160,89,0.15)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 200ms ease' }}>
              <span style={{ position: 'absolute', top: '3px', left: form.is_featured ? '18px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 200ms ease' }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .ql-toolbar { background: rgba(20,16,10,0.95) !important; border: none !important; border-bottom: 1px solid rgba(197,160,89,0.15) !important; }
        .ql-container { background: rgba(20,16,10,0.80) !important; border: none !important; min-height: 280px; }
        .ql-editor { color: #E8DFC8 !important; font-family: 'DM Sans', sans-serif !important; font-size: 14px !important; min-height: 280px; }
        .ql-editor.ql-blank::before { color: rgba(197,160,89,0.30) !important; }
        .ql-stroke { stroke: rgba(197,160,89,0.60) !important; }
        .ql-fill { fill: rgba(197,160,89,0.60) !important; }
        .ql-picker-label { color: rgba(197,160,89,0.60) !important; }
        .ql-picker-options { background: rgba(20,16,10,0.98) !important; border: 1px solid rgba(197,160,89,0.20) !important; }
      `}</style>
    </div>
  );
}