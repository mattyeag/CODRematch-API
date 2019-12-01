import {app} from './ExpressApp'; 

const port = 3000; 

app.listen(port, () => console.log(`app listening on port ${port}! and pid: ${process.pid}`))

process.on('SIGINT', () => {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    process.exit(1);
});
