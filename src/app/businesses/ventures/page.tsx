'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Building2, TrendingUp, DollarSign, Users, Plus, ArrowUpRight, BarChart3 } from 'lucide-react';
import { VentureService, Venture } from '@/domain/businesses/venturesService';

export default function VenturesPage() {
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [totals, setTotals] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<Venture['category']>('saas');
  const [revenue, setRevenue] = useState(5000000);
  const [expenses, setExpenses] = useState(1000000);
  const [clients, setClients] = useState(10);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setVentures(VentureService.getVentures());
    setTotals(VentureService.computePortfolioTotals());
  };

  const handleAddVenture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    VentureService.addVenture({
      name,
      category,
      monthlyRevenue: Number(revenue),
      monthlyExpenses: Number(expenses),
      activeClientsCount: Number(clients),
      status: 'active',
      notes,
    });

    setName('');
    setNotes('');
    setShowAddForm(false);
    loadData();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Multi-Tenant Venture Hub</h1>
            <Badge variant="gold">v8.0 Multi-Business OS</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Portfolio-wide P&L statements, revenue streams, and active client telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/businesses')}>
            <span>Business Registry</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>{showAddForm ? 'Cancel' : 'Add New Venture'}</span>
          </Button>
        </div>
      </div>

      {/* Portfolio Financial Totals */}
      {totals && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card goldBorder className="space-y-2 p-4 text-center">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Monthly Revenue</span>
            <p className="text-2xl font-mono font-bold text-emerald-400">
              ₦ {totals.totalRevenue.toLocaleString()}
            </p>
            <Badge variant="green" className="text-[9px]">Top Line Growth</Badge>
          </Card>

          <Card goldBorder className="space-y-2 p-4 text-center">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Monthly Expenses</span>
            <p className="text-2xl font-mono font-bold text-red-400">
              ₦ {totals.totalExpenses.toLocaleString()}
            </p>
            <Badge variant="gray" className="text-[9px]">Operational Burn</Badge>
          </Card>

          <Card goldBorder className="space-y-2 p-4 text-center">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Net Monthly Profit</span>
            <p className="text-2xl font-mono font-bold text-[#C9A84C]">
              ₦ {totals.netProfit.toLocaleString()}
            </p>
            <Badge variant="gold" className="text-[9px]">Net Cash Flow</Badge>
          </Card>

          <Card goldBorder className="space-y-2 p-4 text-center">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Profit Margin</span>
            <p className="text-2xl font-mono font-bold text-purple-400">{totals.marginPct}%</p>
            <Badge variant="purple" className="text-[9px]">Healthy Margin</Badge>
          </Card>
        </div>
      )}

      {/* New Venture Form Drawer */}
      {showAddForm && (
        <Card className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Add New Business Venture</h3>
          <form onSubmit={handleAddVenture} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Venture Name (e.g. Quantum Jersey)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            />

            <select
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            >
              <option value="saas">SaaS / Software</option>
              <option value="e-commerce">E-Commerce</option>
              <option value="consulting">Consulting / Advisory</option>
              <option value="media">Media & Content</option>
              <option value="real-estate">Real Estate</option>
            </select>

            <input
              type="number"
              placeholder="Monthly Revenue (NGN)"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />

            <input
              type="number"
              placeholder="Monthly Expenses (NGN)"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />

            <input
              type="number"
              placeholder="Active Clients Count"
              value={clients}
              onChange={(e) => setClients(Number(e.target.value))}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />

            <Button type="submit" variant="primary" size="sm">
              Save Venture
            </Button>
          </form>
        </Card>
      )}

      {/* Ventures Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ventures.map((v) => {
          const profit = v.monthlyRevenue - v.monthlyExpenses;
          const margin = v.monthlyRevenue > 0 ? Math.round((profit / v.monthlyRevenue) * 100) : 0;

          return (
            <Card key={v.id} className="space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="blue" className="uppercase text-[9px]">
                    {v.category}
                  </Badge>
                  <Badge variant={v.status === 'scaling' ? 'purple' : 'green'} className="text-[9px]">
                    {v.status.toUpperCase()}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-gray-100">{v.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{v.notes}</p>
              </div>

              <div className="pt-3 border-t border-gray-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Revenue:</span>
                  <span className="text-emerald-400 font-bold">₦ {v.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Expenses:</span>
                  <span className="text-red-400">₦ {v.monthlyExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-800/60">
                  <span className="text-gray-400 font-bold">Net Profit:</span>
                  <span className="text-[#C9A84C] font-bold">₦ {profit.toLocaleString()} ({margin}%)</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
