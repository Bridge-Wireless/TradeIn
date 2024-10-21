// Preload data into localStorage
export const initializeLocalStorage = () => {
    // Example Device Data
    const devices = [
      { modelName: 'iPhone 11', memory: '64GB', priceWorking: 100, priceNonWorking: 60, priceRecycle: 0, image: '' },
      { modelName: 'iPhone 12', memory: '128GB', priceWorking: 120, priceNonWorking: 70, priceRecycle: 0, image: '' },
      { modelName: 'iPhone 13', memory: '128GB', priceWorking: 130, priceNonWorking: 80, priceRecycle: 0, image: '' },
      { modelName: 'Samsung Galaxy S21', memory: '128GB', priceWorking: 110, priceNonWorking: 70, priceRecycle: 0, image: '' },
      { modelName: 'Google Pixel 5', memory: '128GB', priceWorking: 100, priceNonWorking: 60, priceRecycle: 0, image: '' }
    ];
  
    const customers = [
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Alice Johnson' }
    ];
  
    const tradeInHistory = [];
  
    // Save data to localStorage if not already present
    if (!localStorage.getItem('devices')) {
      localStorage.setItem('devices', JSON.stringify(devices));
    }
  
    if (!localStorage.getItem('customers')) {
      localStorage.setItem('customers', JSON.stringify(customers));
    }
  
    if (!localStorage.getItem('tradeInHistory')) {
      localStorage.setItem('tradeInHistory', JSON.stringify(tradeInHistory));
    }
  };
  