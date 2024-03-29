import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from './Button';
import client from '../lib/api';
import parseError from '../lib/errors';

const GenerateForm = ({ loading, setResponse, setWebhooks, setErrors, setLoading }) => {
    const router = useRouter();
    const { query } = router;

    const [webhookUrl, setWebhookUrl] = useState('');
    const [secretKey, setSecretKey] = useState('');

    useEffect(() => {
        setWebhookUrl(query.url);
    }, [query.url]);

    async function generateWebhook() {
        setLoading(true);

        const payload = {
            data: {
                attributes: {
                    events: ['source.chargeable', 'payment.paid', 'payment.failed'],
                    url: webhookUrl,
                },
            },
        };

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(secretKey)}`,
        };

        try {
            const { data: responseData } = await client.post('/webhooks', payload, { headers });

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
                <label className="text-base font-semibold" htmlFor="webhook_url">Webhook URL</label>
                <input
                    className="text-base border rounded h-8 p-2 mt-1"
                    type="text"
                    name="webhook_url"
                    value={webhookUrl}
                    onChange={e => setWebhookUrl(e.target.value)}
                />
            </div>
            <div className="flex flex-col pt-4">
                <label className="text-base font-semibold" htmlFor="secret_key">Secret Key</label>
                <input
                    className="text-base border rounded h-8 p-2 mt-1"
                    type="text"
                    name="secret_key"
                    value={secretKey}
                    onChange={e => setSecretKey(e.target.value)}
                />
            </div>
            <Button label="Generate Webhook" loading={loading} disabled={loading} onClick={generateWebhook} />
        </form>
    )
};

export default GenerateForm;
