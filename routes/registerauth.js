import express from 'express';
import { login, register } from '../controllers/authController.js';

const auth = express.Router();

auth.post('/register', register);

auth.post('/login',login)

export default auth;
