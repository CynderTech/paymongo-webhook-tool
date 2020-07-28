import { useState } from 'react';
import client from '../lib/api';

export default ({ onResponse, onError }) => {
    const [secretKey, setSecretKey] = useState('');

    async function retrieveWebhooks() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(secretKey)}`,
        };

        try {
            const { data: responseData } = await client.get('/webhooks', { headers });

            onResponse(responseData);
        } catch (err) {
            onError(err);
        }
    }

    return (
        <form>
            <div className="flex flex-col pt-2">
                <label className="text-base font-semibold" htmlFor="secret_key">Secret Key</label>
                <input
                    className="text-base border rounded h-8 p-2 mt-1"
                    type="text"
                    name="secret_key"
                    value={secretKey}
                    onChange={e => setSecretKey(e.target.value)}
                />
            </div>
            <button
                className="mt-4 p-2 w-full rounded bg-orange-600 text-white font-semibold"
                type="button"
                onClick={retrieveWebhooks}>
                Retrieve Webhooks
            </button>
        </form>
    );
}
