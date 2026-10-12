export interface OCRResult {
  merchant: string;
  description: string;
  amount: number;
  date: string;
  category: 'land-prep' | 'inputs' | 'labor' | 'harvest';
  confidence: number;
}

export async function processReceiptImage(
  fileOrDataUrl: File | string
): Promise<OCRResult> {
  // Simulate OCR text processing with slight delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 1400));

  const today = new Date().toISOString().split('T')[0];

  // Return realistic parsed result with high confidence, ready for user review and confirmation
  return {
    merchant: 'Lanka Agro Chemicals & Fertilizers',
    description: 'Foliar Booster & Urea 50kg Purchase',
    amount: 6850,
    date: today,
    category: 'inputs',
    confidence: 0.94
  };
}
