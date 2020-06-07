import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import { Config } from './config/config';
import { DBServices } from './services/db-services';

const app: Application = express();
const dbServices = new DBServices();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/server-ip', (req: Request, res: Response) => {
    dbServices.getIp().then(
        (data: any) => {
            data.lastupdate = data.lastupdate.toLocaleString();
            res.send(data);
        },
    );
});

app.post('/server-ip', (req: Request, res: Response) => {
    dbServices.setIp(req.body.ip);
    app.use(require('json-proxy').initialize({
        proxy: {
            forward: {
                '/(.*)': 'http://' + req.body.ip + ':9812/' + '$1',
            },
        },
    }));
    res.status(200).send();
});

app.listen(process.env.PORT || Config.serverPort, () => console.log('Server running...'));

dbServices.getIp().then(
    (data: any) => {
        app.use(require('json-proxy').initialize({
            proxy: {
                forward: {
                    '/(.*)': 'http://' + data.ip + ':9812/' + '$1',
                },
            },
        }));
    },
);
