const express = require('express');
const mongoose = require('mongoose');


var genreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});


const Genre = module.exports = mongoose.model('Genre',genreSchema);