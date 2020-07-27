import { useState } from 'react';
import Tab from '../components/Tab';
import GenerateForm from '../components/Generate.form';

import '../styles/index.css'

export default () => {
    const [selectedTab, setSelectedTab] = useState('generate');

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-1/4 p-4 rounded border border-orange-600 shadow-md">
                <h1 className="text-2xl text-center">PayMongo Webhook Tool</h1>
                <ul className="flex border-b pt-4">
                    <Tab name="generate" active={selectedTab} label="Generate" onSelect={setSelectedTab} />
                    <Tab name="retrieve" active={selectedTab} label="Retrieve" onSelect={setSelectedTab} />
                </ul>
                <div className="w-full pt-4">
                    {selectedTab === 'generate' && <GenerateForm />}
                </div>
            </div>
        </div>
    );
}
