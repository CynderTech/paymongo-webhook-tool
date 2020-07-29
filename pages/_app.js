import { useState } from 'react';
import Tab from '../components/Tab';
import GenerateForm from '../components/Generate.form';
import RetrieveForm from '../components/Retrieve.form';
import WebhooksList from '../components/WebhooksList';
import Loader from '../components/Loader';
import fakedata from '../fakedata.json';

import '../styles/index.css'

export default () => {
    const [selectedTab, setSelectedTab] = useState('retrieve');
    const [response, setResponse] = useState({});
    const [errors, setErrors] = useState([]);
    const [showRaw, setShowRaw] = useState(false);
    const [loading, setLoading] = useState(false);

    const hasData = Object.keys(response).length > 0;
    const hasErrors = errors.length > 0;

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-3/5 p-4 rounded border border-orange-600 shadow-md">
                <h1 className="text-2xl text-center">PayMongo Webhook Tool</h1>
                <div className="flex justify-between w-full pt-4" style={{ minHeight: '273px', maxHeight: '500px' }}>
                    <div className="w-full pr-2">
                        <ul className="flex border-b pt-4">
                            <Tab name="generate" active={selectedTab} label="Generate" onSelect={setSelectedTab} />
                            <Tab name="retrieve" active={selectedTab} label="Retrieve" onSelect={setSelectedTab} />
                        </ul>
                        {
                            selectedTab === 'generate' &&
                                <GenerateForm
                                    onResponse={setResponse}
                                    onError={setErrors}
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                        }
                        {
                            selectedTab === 'retrieve' &&
                                <RetrieveForm
                                    onResponse={setResponse}
                                    onError={setErrors}
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                        }
                    </div>
                    <div className="w-full pl-2">
                        <h2 className="text-base font-semibold pt-4 float-left">Results</h2>
                        <a
                            href="#"
                            className="pt-4 float-right text-base font-semibold text-blue-500 hover:text-blue-700"
                            onClick={() => setShowRaw(!showRaw)}>
                                {showRaw ? 'View Data' : 'View Raw Response'}
                        </a>
                        <span className="clearfix" />
                        {
                            loading &&
                                <div className="flex justify-center items-center">
                                    <Loader className="w-16 h-16" />
                                </div>
                        }
                        {
                            hasErrors &&
                                <div role="alert">
                                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                        Danger
                                    </div>
                                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                        <ul>
                                            {errors.map(({ message }, index) => (
                                                <li key={`error-${index}`}>{message}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                        }
                        {
                            selectedTab === 'retrieve' && hasData && !showRaw && !hasErrors &&
                                <WebhooksList data={response.data} />
                        }
                        {
                            showRaw && !hasErrors &&
                                <textarea
                                    className="w-full h-56 border font-mono"
                                    style={{ resize: 'none' }}
                                    readOnly
                                    value={hasData ? JSON.stringify(response, null, 4) : ''}
                                />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
