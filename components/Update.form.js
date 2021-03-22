import { useState } from 'react';
import _ from 'lodash';
import Button from './Button';
import client from '../lib/api';
import parseError from '../lib/errors';

export default ({ loading, setResponse, setWebhooks, setErrors, setLoading }) => {
    const [secretKey, setSecretKey] = useState('');
    const [webhookId, setWebhookId] = useState('');

    async function updateWebhook() {
        setLoading(true);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(secretKey)}`,
        };

        try {
            const payload = {
                data: {
                    attributes: {
                        events: ['source.chargeable', 'payment.paid', 'payment.failed'],
                    },
                },
            };

            const { data: responseData } = await client.put(`/webhooks/${webhookId}`, payload, { headers });

            setResponse(responseData);
            setWebhooks([responseData.data]);
        } catch (err) {
            setErrors(parseError(err));
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
            <div className="flex flex-col pt-2">
                <label className="text-base font-semibold" htmlFor="webhook_id">Webhook ID</label>
                <input
                    className="text-base border rounded h-8 p-2 mt-1"
                    type="text"
                    name="webhook_id"
                    value={webhookId}
                    onChange={e => setWebhookId(e.target.value)}
                />
            </div>
            <Button label="Update Webhook" loading={loading} disabled={loading} onClick={updateWebhook} />
        </form>
    );
}
