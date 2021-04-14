import React from 'react';
import {csv} from 'd3-request';
import data_2019 from '../public/data_2019';


csv(url, function(err, data) {
 console.log(data);
})