import express from 'express';
import blockchain from '../blockchain/source';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Node.js');
});

router.get('/showAllChain', (req, res) => {
    res.send(blockchain.blockChainArray);
});

router.post('/createBlock', (req, res) => {
    const response = blockchain.addBlock(req.body.data, true);
    res.status(response.status).send(response.text);
});

router.post('/createNotValidBlock', (req, res) => {
    const response = blockchain.addBlock(req.body.data, false);
    res.status(response.status).send(response.text);
});

module.exports = router;
