export default () => (
    <form>
        <div className="flex flex-col pt-2">
            <label className="text-base font-semibold" htmlFor="secret_key">Secret Key</label>
            <input className="text-base border rounded h-8 p-2 mt-1" type="text" name="secret_key" />
        </div>
        <button className="mt-4 p-2 w-full rounded bg-orange-600 text-white font-semibold" type="button">
            Retrieve Webhooks
        </button>
    </form>
)
