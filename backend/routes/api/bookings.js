const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { Op, Error } = require('sequelize');
const {requireAuth} = require('../../utils/auth.js');


















module.exports = router;
