import express, { Application, Request, Response } from 'express';
import { Config } from './config/config';
import { DBServices } from './services/db-services';

const app: Application = express();

app.get('/server-ip', (req: Request, res: Response) => {
    const dbServices = new DBServices();
    dbServices.getIp().then(
        (val: any) => {
            const html = renderHtml(val);
            res.writeHead(200, {
                'Content-Type': 'text/html',
                // tslint:disable-next-line: object-literal-sort-keys
                'Content-Length': html.length,
                'Expires': new Date().toUTCString(),
            });
            res.end(html);
        },
    );
});

app.post('/server-ip', (req: Request, res: Response) => {
    // const ip = req.query.ip;
    // console.log(req.body);
    res.status(200).send();
});

app.listen(process.env.PORT || Config.serverPort, () => console.log('Server running...'));

const renderHtml = (valueIp: any): string => {
    const originHtml = '<!DOCTYPE html><html><head> <title>Server IP</title></head><body> <h1 style="text-align: center; margin: 100px auto 0 auto">$value</h1></body></html>';
    return originHtml.replace('$value', valueIp);
}
