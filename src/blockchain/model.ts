import crypto from 'crypto';

export class Block {
    indexBlock: number;
    hashPreviousBlock: string;
    timestamp: number;
    data: any;
    hash: string;

    constructor(data, indexBlock = 0, hashPreviousBlock = null) {
        this.indexBlock = indexBlock;
        this.hashPreviousBlock = hashPreviousBlock;
        this.timestamp = new Date().getTime();
        this.data = data;
        this.hash = this.generateHashBlock();
    }

    generateHashBlock(): string {
        const data = this.indexBlock + this.hashPreviousBlock + this.timestamp + this.data;
        return crypto.createHash('sha256').update(data).digest('hex');
    }
}
