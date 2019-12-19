import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import { Config } from './config/config';
import { DBServices } from './services/db-services';

const app: Application = express();
const dbServices = new DBServices();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.get('/server-ip', (req: Request, res: Response) => {
    dbServices.getIp().then(
        (val: any) => {
            res.render('viewIp', { ip: val, lastUpdate: 'val' });
        },
    );
});

app.post('/server-ip', (req: Request, res: Response) => {
    dbServices.setIp(req.body.ip);
    res.status(200).send();
});

app.listen(process.env.PORT || Config.serverPort, () => console.log('Server running...'));
