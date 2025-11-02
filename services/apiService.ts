import { AdminStats, ChatMessage, DashboardData, Page } from "../types";
import * as geminiService from './geminiService';

export const getReceptionistResponseStream = async (history: ChatMessage[]): Promise<ReadableStream<Uint8Array>> => {
    return geminiService.getReceptionistResponseStream(history);
};

export const startChatbotStream = async (history: ChatMessage[], pageContext: Page): Promise<ReadableStream<Uint8Array>> => {
    return geminiService.startChatbotStream(history, pageContext);
};


export const generateSocialPost = async (topic: string): Promise<string> => {
    return geminiService.generateSocialPost(topic);
};

export const draftNewsletter = async (topic: string, audience: string): Promise<string> => {
    return geminiService.draftNewsletter(topic, audience);
};

export const generateImage = async (prompt: string): Promise<string> => {
    return geminiService.generateImage(prompt);
};

export const generateClientDashboardData = async (clientName: string, plan: string): Promise<DashboardData> => {
    return geminiService.generateClientDashboardData(clientName, plan);
};

export const generateAdminDashboardStats = async (): Promise<AdminStats> => {
    return geminiService.generateAdminDashboardStats();
};
