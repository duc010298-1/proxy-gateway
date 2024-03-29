import pgPromise from 'pg-promise';
import { Config } from '../config/config';

const pgp = pgPromise({});
let db: any;
if (process.env.DATABASE_URL) {
    db = pgp(process.env.DATABASE_URL);
} else {
    const connectionString = 'postgres://' + Config.pgUsername + ':' + Config.pgPassword + '@' + Config.pgHost + ':'
        + Config.pgPort + '/' + Config.pgDatabase + '?' + 'currentSchema=public';
    db = pgp(connectionString);
}

export class DBServices {
    public getIp() {
        return db.one('SELECT * FROM server_ip')
            .then((data: any) => {
                console.log('DATA:', data.ip);
                return data;
            })
            .catch((error: any) => {
                console.log('ERROR:', error);
            });
    }

    public setIp(ip: string) {
        return db.none('UPDATE server_ip SET ip=$1, lastUpdate=NOW()', ip)
            .then((data: any) => {
                console.log('UPDATE SUCCESS');
            })
            .catch((error: any) => {
                console.log('ERROR:', error);
            });
    }
}
