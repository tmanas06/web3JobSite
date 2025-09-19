// Script to add localhost network to MetaMask
// Run this in your browser console while on your app

const addLocalhostNetwork = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x7a69', // 31337 in hex
        chainName: 'Hardhat Localhost',
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: ['http://127.0.0.1:8545'],
        blockExplorerUrls: ['http://localhost:8545'],
      }],
    });
    console.log('Localhost network added successfully!');
  } catch (error) {
    console.error('Error adding network:', error);
  }
};

// Call the function
addLocalhostNetwork();

