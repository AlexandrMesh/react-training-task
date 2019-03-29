/* eslint-disable import/default */
/* eslint-disable no-console */
import webpack from 'webpack';
import config  from '../webpack.config.dev.js';
import WebpackDevServer from 'webpack-dev-server';
import {DEV_PORT, LOCALHOST_PATH, DEV_APP_ENTRY_POINT} from './constants';

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
    hot: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {aggregateTimeout: 300, poll: 1000}
});

server.listen(DEV_PORT, LOCALHOST_PATH, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening... Go to ${DEV_APP_ENTRY_POINT}`);
    }
});

