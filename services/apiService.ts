import { AdminStats, ChatMessage, DashboardData, Page } from "../types";

const API_BASE_URL = 'http://localhost:3001/api';

// Generic handler for streaming fetch responses
const fetchStream = async (url: string, body: object): Promise<ReadableStream<Uint8Array>> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch stream: ${response.status} ${errorText}`);
    }
    if (!response.body) {
        throw new Error("Response has no body");
    }
    return response.body;
};

// Generic handler for JSON fetch responses
const fetchJson = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorJson = await response.json().catch(() => ({ error: 'Failed to parse error JSON' }));
        throw new Error(errorJson.error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};


export const getReceptionistResponseStream = async (history: ChatMessage[]): Promise<ReadableStream<Uint8Array>> => {
    return fetchStream(`${API_BASE_URL}/receptionist-chat`, { history });
};

export const startChatbotStream = async (history: ChatMessage[], pageContext: Page): Promise<ReadableStream<Uint8Array>> => {
    return fetchStream(`${API_BASE_URL}/chatbot-stream`, { history, pageContext });
};

export const generateSocialPost = async (topic: string): Promise<string> => {
    const data = await fetchJson<{ result: string }>(`${API_BASE_URL}/social-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
    });
    return data.result;
};

export const draftNewsletter = async (topic: string, audience: string): Promise<string> => {
    const data = await fetchJson<{ result: string }>(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, audience }),
    });
    return data.result;
};

export const generateImage = async (prompt: string): Promise<string> => {
    const data = await fetchJson<{ result: string }>(`${API_BASE_URL}/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
    });
    return data.result;
};

export const generateClientDashboardData = async (clientName: string, plan: string): Promise<DashboardData> => {
    const params = new URLSearchParams({ clientName, plan });
    return fetchJson<DashboardData>(`${API_BASE_URL}/client-dashboard?${params}`, {
        headers: {
            // This is a mock token for demonstration purposes.
            'Authorization': 'Bearer client-token',
        }
    });
};

export const generateAdminDashboardStats = async (): Promise<AdminStats> => {
    return fetchJson<AdminStats>(`${API_BASE_URL}/admin-dashboard`, {
        headers: {
             // This is a mock token for demonstration purposes.
            'Authorization': 'Bearer admin-token',
        }
    });
};

export const impersonateClient = async (clientName: string): Promise<{ success: boolean }> => {
     return fetchJson<{ success: boolean }>(`${API_BASE_URL}/admin/impersonate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // This is a mock token for demonstration purposes.
            'Authorization': 'Bearer admin-token',
        },
        body: JSON.stringify({ clientName }),
    });
}