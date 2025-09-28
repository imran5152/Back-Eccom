import express from 'express';
import { getuserId, login, register } from '../controllers/authController.js';

const auth = express.Router();

auth.post('/register', register);

auth.post('/login',login)

auth.get('/user/:id',getuserId)

export default auth;
