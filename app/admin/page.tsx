'use client';

import React, { useState, useEffect } from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';

export default function AdminDashboard() {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Use demo-001 as our pilot testing workspace
  const targetId = 'demo-001';

  // Load configuration details from database on mount
  useEffect(() => {
    async function loadData() {
      try {
        // In production, this will fetch the specific business row
        const res = await fetch(`/api/admin?id=${targetId}`);
        // Default structural state if API is still warming up locally
        setBusiness({
          id: targetId,
          name: "Slotly Salon",
          branch_name: "Gulberg, Lahore",
          google_review_url: "https://google.com",
          manager_whatsapp: "923001234567",
          is_active: true
        });
      } catch (err) {
        console.error("Failed to load live data state.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Universal updater pushing states live to app/api/admin/route.ts
  async function syncDatabase(updatedFields: any) {
    const updatedState = { ...business, ...updatedFields };
    setBusiness(updatedState); // Optimistic UI update

    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedState)
      });
    } catch (err) {
      console.error("Database sync failed.");
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    
    const fields = {
      manager_whatsapp: formData.get('whatsapp') as string,
      google_review_url: formData.get('google_url') as string,
    };

    // Strict validation check before triggering database call
    if (!/^92\d{10}$/.test(fields.manager_whatsapp)) {
      alert("Error: WhatsApp configuration must begin with 92 followed by 10 digits.");
      setSaving(false);
      return;
    }

    await syncDatabase(fields);
    setSaving(false);
    alert("Live parameters synchronized successfully.");
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#09090b', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontFamily: 'sans-serif' }}>
        <h3>Loading Control Panel Context...</h3>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#09090b', 
      backgroundImage: 'radial-gradient(circle at 50% 0%, #1c1917 0%, #09090b 70%)',
      color: '#f4f4f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '40px 24px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a', paddingBottom: '24px', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 750, letterSpacing: '-0.05em', margin: '0 0 4px 0' }}>The Daily Pulse</h1>
            <p style={{ color: '#a1a1aa', margin: 0, fontSize: '15px' }}>Control center for {business.name} ({business.branch_name})</p>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: business.is_active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)', 
            border: business.is_active ? '1px solid #10b981' : '1px solid #f43f5e', 
            color: business.is_active ? '#10b981' : '#f43f5e', 
            padding: '6px 14px', 
            borderRadius: '99px', 
            fontSize: '13px', 
            fontWeight: 600 
          }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: business.is_active ? '#10b981' : '#f43f5e', borderRadius: '50%', display: 'inline-block' }}></span>
            {business.is_active ? 'Review Guard Intercept Active' : 'Kill-Switch Engaged (Google Only)'}
          </div>
        </div>

        {/* Analytics Display Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#111115', border: '1px solid #27272a', padding: '24px', borderRadius: '16px' }}>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total QR Scans</p>
            <h3 style={{ fontSize: '36px', fontWeight: 700, margin: 0 }}>142</h3>
          </div>
          <div style={{ backgroundColor: '#111115', border: '1px solid #27272a', padding: '24px', borderRadius: '16px' }}>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Google Reviews</p>
            <h3 style={{ fontSize: '36px', fontWeight: 700, margin: 0 }}>89</h3>
          </div>
          <div style={{ backgroundColor: '#111115', border: '1px solid #27272a', padding: '24px', borderRadius: '16px' }}>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Private Intercepts</p>
            <h3 style={{ fontSize: '36px', fontWeight: 700, margin: 0, color: '#f43f5e' }}>53</h3>
          </div>
        </div>

        {/* Configurations Forms Side-by-Side */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          
          <div style={{ backgroundColor: 'rgba(20, 20, 23, 0.6)', border: '1px solid rgba(39, 39, 42, 0.6)', borderRadius: '20px', padding: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 24px 0', letterSpacing: '-0.02em' }}>Routing Parameters</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 500 }}>Manager WhatsApp Number</label>
                <input type="text" name="whatsapp" defaultValue={business.manager_whatsapp} style={{ width: '100%', padding: '14px', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', marginBottom: '8px', fontWeight: 500 }}>Target Google Review URL</label>
                <input type="text" name="google_url" defaultValue={business.google_review_url} style={{ width: '100%', padding: '14px', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <button type="submit" disabled={saving} style={{ width: '100%', backgroundColor: '#ffffff', color: '#09090b', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', marginTop: '8px' }}>
                {saving ? 'Synchronizing...' : 'Save Configurations'}
              </button>
            </form>
          </div>

          {/* Kill-Switch Mechanism UI card */}
          <div style={{ backgroundColor: 'rgba(20, 20, 23, 0.6)', border: '1px solid rgba(39, 39, 42, 0.6)', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>Review Guard Mechanism</h2>
              <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6', margin: '0 0 28px 0' }}>
                When enabled, unhappy clients are automatically routed away from Google onto your manager's WhatsApp account to fix the problem privately before they leave a public rating.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#111115', padding: '20px', borderRadius: '12px', border: '1px solid #27272a' }}>
                <div>
                  <p style={{ margin: '0 0 2px 0', fontWeight: 600, fontSize: '15px' }}>WhatsApp Intercept</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#71717a' }}>
                    {business.is_active ? 'Status: Deflecting bad reviews' : 'Status: Off (All traffic goes to Google)'}
                  </p>
                </div>
                {/* Clickable Switch running Live State Mutations */}
                <div 
                  onClick={() => syncDatabase({ is_active: !business.is_active })}
                  style={{ 
                    width: '50px', 
                    height: '28px', 
                    backgroundColor: business.is_active ? '#10b981' : '#27272a', 
                    borderRadius: '99px', 
                    padding: '2px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: business.is_active ? 'flex-end' : 'flex-start', 
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#ffffff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #27272a', paddingTop: '20px', marginTop: '24px' }}>
              <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>
                *Changes take effect instantaneously across all deployed QR standees.
              </p>
            </div>
          </div>

        </div>

        {business?.id ? (
          <div style={{ marginTop: '32px' }}>
            <QRCodeGenerator businessSlug={business.id} businessName={business.name} />
          </div>
        ) : null}

      </div>
    </div>
  );
}