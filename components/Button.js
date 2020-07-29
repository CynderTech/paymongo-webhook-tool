import ButtonLoader from './ButtonLoader';

export default ({ disabled, label, loading, onClick }) => {
    let classes = "mt-4 p-2 w-full rounded bg-orange-600 text-white text-center font-semibold";

    if (disabled) {
        classes += ' opacity-50 cursor-not-allowed';
    }

    return (
        <button
            className={classes}
            type="button"
            onClick={onClick}
            disabled={disabled}>
            {
                loading ? <ButtonLoader /> : label
            }
        </button>
    );
}
