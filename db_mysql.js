import mysql from 'mysql'

export const db_SQL = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ecostore',
    password: 'root',
});

