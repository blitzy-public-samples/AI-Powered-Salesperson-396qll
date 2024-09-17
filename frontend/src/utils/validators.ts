// Function to validate email address
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// HUMAN ASSISTANCE NEEDED
// Function to validate SKU (Stock Keeping Unit) code
// Please review and adjust the SKU format according to the company's specific requirements
export function isValidSKU(sku: string): boolean {
  // This is a placeholder regex. Adjust it based on your company's SKU format
  const skuRegex = /^[A-Z]{3}-\d{4}-[A-Z]{2}$/;
  return skuRegex.test(sku);
}