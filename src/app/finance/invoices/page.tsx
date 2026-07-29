'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Printer, Plus, Download, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { InvoiceService, Invoice } from '@/domain/finance/invoiceService';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(2500000);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const list = InvoiceService.getInvoices();
    setInvoices(list);
    if (list.length > 0) setSelectedInvoice(list[0]);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !desc.trim()) return;

    const num = `HIM-2026-00${invoices.length + 1}`;
    const newInv = InvoiceService.createInvoice({
      invoiceNumber: num,
      clientName,
      clientEmail: clientEmail || 'client@enterprise.io',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      items: [{ description: desc, quantity: 1, unitPrice: Number(price) }],
      vatTaxPct: 7.5,
      status: 'pending',
    });

    setClientName('');
    setDesc('');
    setShowAddForm(false);
    loadData();
    setSelectedInvoice(newInv);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800 print:hidden">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Automated Invoice & Client Proposals</h1>
            <Badge variant="gold">v8.0 Billing Ops</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Professional client billing, auto-calculated 7.5% VAT, and printable PDF receipts.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance')}>
            <span>Finance Hub</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrintPdf}>
            <Printer className="w-3.5 h-3.5 mr-1" />
            <span>Print PDF Invoice</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>{showAddForm ? 'Cancel' : 'Create Invoice'}</span>
          </Button>
        </div>
      </div>

      {/* New Invoice Form Drawer */}
      {showAddForm && (
        <Card className="space-y-4 print:hidden">
          <h3 className="text-base font-serif font-semibold text-gray-100">Generate Client Invoice</h3>
          <form onSubmit={handleCreateInvoice} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Client Company Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            />

            <input
              type="email"
              placeholder="Client Billing Email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Service Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            />

            <input
              type="number"
              placeholder="Amount (NGN)"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />

            <Button type="submit" variant="primary" size="sm" className="sm:col-span-4">
              Generate & Select Invoice
            </Button>
          </form>
        </Card>
      )}

      {/* Invoice Layout: Sidebar List + Invoice Paper Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List Column */}
        <div className="lg:col-span-4 space-y-3 print:hidden">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Invoices Registry</h3>
          {invoices.map((inv) => (
            <div
              key={inv.id}
              onClick={() => setSelectedInvoice(inv)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedInvoice?.id === inv.id
                  ? 'bg-gray-900 border-[#C9A84C]'
                  : 'bg-gray-950/60 border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-gray-200">{inv.invoiceNumber}</span>
                <Badge variant={inv.status === 'paid' ? 'green' : 'gold'} className="text-[9px]">
                  {inv.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-gray-400 truncate">{inv.clientName}</p>
              <p className="text-xs font-mono font-bold text-[#C9A84C] mt-2">
                ₦ {inv.totalAmount.toLocaleString()} NGN
              </p>
            </div>
          ))}
        </div>

        {/* Right Invoice Paper Container */}
        {selectedInvoice && (
          <Card
            goldBorder
            className="lg:col-span-8 p-8 space-y-6 bg-[#0B0F17] text-gray-100 border-gray-700 shadow-2xl print:border-none print:shadow-none print:p-0 print:col-span-12"
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-800 pb-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#C9A84C]">HIM ENTERPRISE OS</h1>
                <p className="text-xs text-gray-400">High-Performance Engineering Advisory</p>
              </div>
              <div className="text-right font-mono text-xs">
                <h2 className="text-lg font-bold text-gray-100">{selectedInvoice.invoiceNumber}</h2>
                <p className="text-gray-400">Date: {selectedInvoice.issueDate}</p>
                <p className="text-gray-400">Due: {selectedInvoice.dueDate}</p>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500 font-mono uppercase text-[10px]">Billed To:</span>
                <p className="font-bold text-gray-100 mt-0.5">{selectedInvoice.clientName}</p>
                <p className="text-gray-400">{selectedInvoice.clientEmail}</p>
              </div>
              <div className="text-right">
                <span className="text-gray-500 font-mono uppercase text-[10px]">Payment Status:</span>
                <div className="mt-1">
                  <Badge variant={selectedInvoice.status === 'paid' ? 'green' : 'gold'}>
                    {selectedInvoice.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-gray-800 rounded-lg overflow-hidden text-xs">
              <div className="bg-gray-900 p-3 grid grid-cols-12 font-bold text-gray-300 font-mono">
                <span className="col-span-7">Description</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-3 text-right">Amount (NGN)</span>
              </div>
              {selectedInvoice.items.map((item, idx) => (
                <div key={idx} className="p-3 grid grid-cols-12 border-t border-gray-800 text-gray-200">
                  <span className="col-span-7">{item.description}</span>
                  <span className="col-span-2 text-center font-mono">{item.quantity}</span>
                  <span className="col-span-3 text-right font-mono">
                    ₦ {(item.quantity * item.unitPrice).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Calculations */}
            <div className="flex justify-end font-mono text-xs">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>₦ {selectedInvoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>VAT ({selectedInvoice.vatTaxPct}%):</span>
                  <span>₦ {selectedInvoice.taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#C9A84C] pt-2 border-t border-gray-800">
                  <span>Total Amount:</span>
                  <span>₦ {selectedInvoice.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
