import { useState } from 'react';
import Button from './Button';
import client from '../lib/api';
import parseError from '../lib/errors';

export default ({ loading, onResponse, onError, setLoading }) => {
    const [secretKey, setSecretKey] = useState('');

    async function retrieveWebhooks() {
        onError([]);
        setLoading(true);
        onResponse({})

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(secretKey)}`,
        };

        try {
            const { data: responseData } = await client.get('/webhooks', { headers });

            onResponse(responseData);
        } catch (err) {
            onError(parseError(err));
        } finally {
            setLoading(false);
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
            <Button label="Retrieve Webhooks" loading={loading} disabled={loading} onClick={retrieveWebhooks} />
        </form>
    );
}
