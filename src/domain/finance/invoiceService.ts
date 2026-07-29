import { StorageAdapter } from '@/core/storage/localStorageAdapter';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  vatTaxPct: number;
  taxAmount: number;
  totalAmount: number;
  status: 'paid' | 'pending' | 'overdue';
}

const INVOICES_KEY = 'him_os_invoices';

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'HIM-2026-001',
    clientName: 'Global Cloud Systems Inc.',
    clientEmail: 'billing@globalcloud.io',
    issueDate: '2026-07-20',
    dueDate: '2026-08-04',
    items: [
      { description: 'FastAPI Microservice Infrastructure Audit', quantity: 1, unitPrice: 3500000 },
      { description: 'Supabase Real-time WebSocket Integration', quantity: 1, unitPrice: 2000000 },
    ],
    subtotal: 5500000,
    vatTaxPct: 7.5,
    taxAmount: 412500,
    totalAmount: 5912500,
    status: 'paid',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'HIM-2026-002',
    clientName: 'Quantum Tech Labs Ltd.',
    clientEmail: 'finance@quantumtech.com',
    issueDate: '2026-07-25',
    dueDate: '2026-08-10',
    items: [
      { description: 'MLOps Pipeline Deployment & Telemetry Setup', quantity: 1, unitPrice: 4000000 },
    ],
    subtotal: 4000000,
    vatTaxPct: 7.5,
    taxAmount: 300000,
    totalAmount: 4300000,
    status: 'pending',
  },
];

export class InvoiceService {
  static getInvoices(): Invoice[] {
    const data = StorageAdapter.getItem<Invoice[]>(INVOICES_KEY, []);
    if (data.length === 0) {
      StorageAdapter.setItem(INVOICES_KEY, INITIAL_INVOICES);
      return INITIAL_INVOICES;
    }
    return data;
  }

  static createInvoice(data: Omit<Invoice, 'id' | 'subtotal' | 'taxAmount' | 'totalAmount'>): Invoice {
    const invoices = this.getInvoices();
    const subtotal = data.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const taxAmount = (subtotal * data.vatTaxPct) / 100;
    const totalAmount = subtotal + taxAmount;

    const newInv: Invoice = {
      ...data,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      subtotal,
      taxAmount,
      totalAmount,
    };

    invoices.unshift(newInv);
    StorageAdapter.setItem(INVOICES_KEY, invoices);
    return newInv;
  }
}
