import { Router } from 'express';
import {
    receptionistChat,
    chatbotStream,
    socialPostGenerator,
    newsletterDrafter,
    imageGenerator,
    clientDashboardData,
    adminDashboardStats
} from '../controllers/amunet.controller';

const router = Router();

// Playground & Chat Endpoints
router.post('/receptionist-chat', receptionistChat);
router.post('/chatbot-stream', chatbotStream);
router.post('/social-post', socialPostGenerator);
router.post('/newsletter', newsletterDrafter);
router.post('/image', imageGenerator);

// Dashboard Endpoints
router.get('/client-dashboard', clientDashboardData);
router.get('/admin-dashboard', adminDashboardStats);

export default router;
