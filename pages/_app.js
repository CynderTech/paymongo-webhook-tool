import { useState } from 'react';
import Tab from '../components/Tab';
import GenerateForm from '../components/Generate.form';
import RetrieveForm from '../components/Retrieve.form';

import '../styles/index.css'

export default () => {
    const [selectedTab, setSelectedTab] = useState('generate');

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-1/2 p-4 rounded border border-orange-600 shadow-md">
                <h1 className="text-2xl text-center">PayMongo Webhook Tool</h1>
                <div className="flex justify-between w-full pt-4" style={{ minHeight: '273px' }}>
                    <div className="w-full pr-2">
                        <ul className="flex border-b pt-4">
                            <Tab name="generate" active={selectedTab} label="Generate" onSelect={setSelectedTab} />
                            <Tab name="retrieve" active={selectedTab} label="Retrieve" onSelect={setSelectedTab} />
                        </ul>
                        {selectedTab === 'generate' && <GenerateForm />}
                        {selectedTab === 'retrieve' && <RetrieveForm />}
                    </div>
                    <div className="w-full pl-2">
                        <h2 className="text-base font-semibold">Results</h2>
                        <textarea className="w-full h-56 border" style={{ resize: 'none' }} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}
