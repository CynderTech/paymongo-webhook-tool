export default ({ data }) => (
    <div className="h-64 overflow-y-scroll">
        {data.map(({ attributes, id }) => {
            const { url, secret_key: secretKey, status } = attributes;

            return (
                <table key={id} className="w-full my-2 border border-black table-fixed">
                    <tbody>
                        <tr className="bg-orange-600 text-white">
                            <td className="text-sm w-1/6 pl-2 pt-1 font-semibold">Domain</td>
                            <td className="text-sm pt-1 pl-2 border-l border-black">{url}</td>
                        </tr>
                        <tr className="border-t border-black">
                            <td className="text-sm pl-2 pt-1 font-semibold">ID</td>
                            <td className="text-sm pt-1 pl-2 border-l border-black">{id}</td>
                        </tr>
                        <tr className="border-t border-black">
                            <td className="text-sm pl-2 pt-1 font-semibold">Secret Key</td>
                            <td className="text-sm pt-1 pl-2 border-l border-black">{secretKey}</td>
                        </tr>
                        <tr className="border-t border-black">
                            <td className="text-sm pl-2 pt-1 font-semibold">Status</td>
                            <td className="text-sm pt-1 pl-2 border-l border-black">{status === 'enabled' ? 'Enabled' : 'Disabled'}</td>
                        </tr>
                    </tbody>
                </table>
            );
        })}
    </div>
);
