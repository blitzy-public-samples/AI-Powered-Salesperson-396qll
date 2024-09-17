import React from 'react';
import { QuoteSummary as QuoteSummaryType } from '../schema/quoteTypes';
import { formatCurrency } from '../utils/formatters';

interface QuoteSummaryProps {
  quote: QuoteSummaryType;
}

const QuoteSummary: React.FC<QuoteSummaryProps> = ({ quote }) => {
  return (
    <div className="quote-summary">
      <h2>Quote Summary</h2>
      <div className="summary-item">
        <span>Total Premium:</span>
        <span>{formatCurrency(quote.totalPremium)}</span>
      </div>
      <div className="summary-item">
        <span>Coverage Amount:</span>
        <span>{formatCurrency(quote.coverageAmount)}</span>
      </div>
      <div className="summary-item">
        <span>Term Length:</span>
        <span>{quote.termLength} years</span>
      </div>
      <div className="summary-item">
        <span>Policy Type:</span>
        <span>{quote.policyType}</span>
      </div>
    </div>
  );
};

export default QuoteSummary;