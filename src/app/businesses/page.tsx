'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { BusinessService } from '@/domain/business/service';
import { Business } from '@/domain/business/types';

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBusinesses(BusinessService.getBusinesses());
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    BusinessService.createBusiness({
      name,
      description: description || 'Commercial enterprise',
      status: 'active',
    });

    setName('');
    setDescription('');
    setShowAdd(false);
    loadData();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Businesses Engine</h1>
            <Badge variant="gold">{businesses.length} Businesses Registered</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Generic Multi-Business Manager (Quantum Jersey, SaaS, Consulting, Investment).
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancel' : '+ Register Business'}
        </Button>
      </div>

      {/* Register Business Form */}
      {showAdd && (
        <Card goldBorder className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Register New Business Entity</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Business Name (e.g. Quantum Jersey)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Description / Value Proposition"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="sm:col-span-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
            <Button type="submit" variant="primary" size="sm">
              Save Entity
            </Button>
          </form>
        </Card>
      )}

      {/* Business Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {businesses.map((biz) => {
          const rev = BusinessService.getMonthlyRevenue(biz.id);

          return (
            <Card key={biz.id} className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-serif font-bold text-gray-100">{biz.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{biz.description}</p>
                </div>
                <Badge variant={biz.status === 'active' ? 'green' : 'gold'}>{biz.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-800 text-center font-mono">
                <div className="bg-gray-900/60 p-2.5 rounded border border-gray-800">
                  <p className="text-sm font-bold text-[#C9A84C]">₦ {rev.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500 font-sans">Monthly Revenue</p>
                </div>
                <div className="bg-gray-900/60 p-2.5 rounded border border-gray-800">
                  <p className="text-sm font-bold text-gray-200">Active</p>
                  <p className="text-[10px] text-gray-500 font-sans">Operational Status</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
