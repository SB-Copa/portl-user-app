/**
 * Clears all sessionStorage items related to cart/checkout
 */
export function clearCartSessionStorage() {
    sessionStorage.removeItem('external_id')
    sessionStorage.removeItem('qr_code_data')
}

