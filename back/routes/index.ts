import express, {NextFunction, Request, Response} from 'express';

const router = express.Router();
const fs = require('fs')

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    fs.readFile('../front/dist/index.html', 'utf-8', (err: Error | null, result: string) => {
        if (err) throw err;
        res.end(result)
    })
});

router.get('/api/v1/users.json', (req: Request, res: Response, next: NextFunction) => {
    res.json([
        {id: 1, name: 'Taro', age: 18},
        {id: 2, name: 'Jiro', age: 19},
        {id: 3, name: 'Hanako', age: 20},
    ])
})

export default router;