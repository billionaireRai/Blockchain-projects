import 'server-only';

import { BirdClient } from '@messagebird/sdk';
import { EmailResponseType } from '@/types/emailresponse.type';

const apiKey = process.env.BIRD_API_KEY ; // Initializing bird client instance...
const birdClient = apiKey ? new BirdClient({ apiKey }) : null;

export async function TriggerEmailTransfer(from: string,to: string,subject: string,html: string): Promise<EmailResponseType> {
    if (!birdClient) {
        return {
            actionId: null,
            status: 'failed',
            category: 'BIRD_API_KEY_MISSING',
            latency: null
        };
    }

    if (!from.trim() || !to.trim() || !subject.trim() || !html.trim()) {
        return {
            actionId: null,
            status: 'failed',
            category: 'INVALID_EMAIL_PAYLOAD',
            latency: null
        };
    }

    const startTime = performance.now(); // triggering timestamp now...

    try {
        const response = await birdClient.email.send({
            from: { email: from, name: 'Paylume.io' },
            to: [to],
            subject,
            html
        });

        return {
            actionId: response.id,
            status: response.status,
            category: response.category,
            latency: response.total_latency_ms
        };

    } catch (error: unknown) {

        const latency = Math.round(performance.now() - startTime);
        console.error('[BIRD_EMAIL_ERROR]', { message: error instanceof Error ? error.message : 'Unknown email service error', latency });

        return {
            actionId: null,
            status: 'failed',
            category: 'EMAIL_TRANSFER_FAILED',
            latency
        };
    }
}