import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

axios.get('https://nashuanorthathletics.com')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            console.log($);
    }
}, (error) => console.log(error));
