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
            data.lastupdate = data.lastupdate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            res.send(data);
        },
    );
});

app.post('/server-ip', (req: Request, res: Response) => {
    dbServices.setIp(req.body.ip);
    app.use('/*', (req: Request, res: Response) => {
        res.redirect(`http://${req.body.ip}/${req.originalUrl}`);
    });
    res.status(200).send();
});

app.listen(process.env.PORT || Config.serverPort, () => console.log('Server running...'));

dbServices.getIp().then(
    (data: any) => {
        app.use('/*', (req: Request, res: Response) => {
            res.redirect(`http://${data.ip}:85/${req.originalUrl}`);
        });
    },
);
