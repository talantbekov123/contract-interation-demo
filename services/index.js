const { createPublicClient, http, parseAbi } = require('viem');
const { mainnet } = require('viem/chains');

const client = createPublicClient({
    chain: mainnet,
    transport: http(),
});

const erc20Abi = parseAbi([
    'function balanceOf(address owner) view returns (uint256)',
]);

async function getERC20Balance(tokenAddress, walletAddress) {
    try {
        const balance = await client.readContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [walletAddress],
        });
        return Number(balance) * 10 ** -18;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
}

module.exports = { getERC20Balance };
