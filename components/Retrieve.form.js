import { useState } from 'react';
import _ from 'lodash';
import Button from './Button';
import client from '../lib/api';
import parseError from '../lib/errors';

const RetrieveForm = ({ loading, setResponse, setWebhooks, setErrors, setLoading }) => {
    const [secretKey, setSecretKey] = useState('');
    const [showEnabled, setShowEnabled] = useState(true);

    async function retrieveWebhooks() {
        setLoading(true);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(secretKey)}`,
        };

        try {
            const { data: responseData } = await client.get('/webhooks', { headers });

            let webhooks = responseData.data;

            if (showEnabled) {
                webhooks = responseData.data.filter(({ attributes }) => {
                    return _.get(attributes, 'status', '') === 'enabled';
                });
            }

            setResponse(responseData);
            setWebhooks(webhooks);
        } catch (err) {
            setErrors(parseError(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <form>
            <div className="flex flex-col pt-2">
                <label className="text-base font-semibold inline-flex items-center mt-3" htmlFor="show_enabled">
                    <input
                        type="checkbox"
                        name="show_enabled"
                        checked={showEnabled}
                        onChange={e => setShowEnabled(e.target.checked)}
                    />
                    <span className="ml-2">Show Enabled Only</span>
                </label>
            </div>
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
};

export default RetrieveForm;
