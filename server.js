'use strict';

const express = require('express');
const marko = require('marko');
const markoExpress = require('marko/express');
const template = marko.load(require.resolve('./view.marko'));

const app = express();

app.use(markoExpress());

app.get('/', (req, res) => {
    res.marko(template);
});

app.use((err, req, res, next) => {
    console.log('error handled');
    console.error(err);
});

app.listen(8080);
