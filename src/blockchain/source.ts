import {Block} from './model';

const massage = {
    success: {status: 200, text: 'Block successfully created'},
    error: {status: 404, text: 'Block failed validation'}
};

const generateGenesisBlock = (): Block => {
    return new Block('data');
};

const blockChainArray = [generateGenesisBlock()];

const addBlock = (data: any, mode: boolean): { status: number, text: string } => {
    const newBlock = generateNewBlock(data);
    const notValidNewBlock = addNotValidBlock(data);

    if (!validateBlock(mode ? newBlock : notValidNewBlock)) return massage.error;

    blockChainArray.push(newBlock);
    return massage.success;
};

const generateNewBlock = (data: any): Block => {
    const indexBlock = blockChainArray.length;
    const hashPreviousBlock = getPreviousBlock().hash;
    return new Block(data, indexBlock, hashPreviousBlock);
};

const getPreviousBlock = (): Block => {
    return blockChainArray[blockChainArray.length - 1];
};

const addNotValidBlock = (data: any): Block => {
    const indexBlock = blockChainArray.length;
    const hashPreviousBlock = 'nbhgjvhvhbghbhb';
    return new Block(data, indexBlock, hashPreviousBlock);
};

const validateBlock = (newBlock: Block): boolean => {
    const previousBlock = getPreviousBlock();
    if (previousBlock.hash !== newBlock.hashPreviousBlock) return false;
    if (previousBlock.indexBlock + 1 !== newBlock.indexBlock) return false;
    return newBlock.hash === newBlock.generateHashBlock();
};

const validateAllBlockChain = (): boolean => {
    let valid = false;
    blockChainArray.reduce((previousValue: string, currentValue: Block) => {
        valid = previousValue === currentValue.hashPreviousBlock;
        previousValue = currentValue.hash;
        if (valid) return previousValue;
    }, null);

    return valid;
};

const blockchain = {
    blockChainArray,
    addBlock,
    generateNewBlock,
    getPreviousBlock,
    addNotValidBlock,
    validateBlock,
    validateAllBlockChain,
};


export default blockchain;
