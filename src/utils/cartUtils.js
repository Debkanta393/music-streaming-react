// Cart utility functions

// Get cart from localStorage
export const getLocalCart = () => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return [];
    }
};

// Set cart to localStorage
export const setLocalCart = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error writing cart to localStorage:', error);
    }
};

// Clear cart from localStorage
export const clearLocalCart = () => {
    try {
        localStorage.removeItem('cart');
    } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
    }
};

// Merge local cart with server cart
export const mergeCarts = (localCart, serverCart) => {
    const mergedCart = [...serverCart];
    
    localCart.forEach(localItem => {
        const existingItem = mergedCart.find(item => item.productId === localItem.productId);
        
        if (existingItem) {
            // If item exists in server cart, keep server version (it's more up-to-date)
            console.log('Item already exists in server cart, keeping server version');
        } else {
            // If item doesn't exist in server cart, add it
            mergedCart.push(localItem);
        }
    });
    
    return mergedCart;
};

// Calculate cart totals
export const calculateCartTotals = (items) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    return { totalItems, totalPrice };
};

// Format price
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
};

// Validate cart item
export const validateCartItem = (item) => {
    const requiredFields = ['productId', 'proName', 'price', 'quantity', 'totalPrice'];
    return requiredFields.every(field => item.hasOwnProperty(field) && item[field] !== null && item[field] !== undefined);
}; 