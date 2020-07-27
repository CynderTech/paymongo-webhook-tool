export default ({ active: _active, label, name, onSelect }) => {
    const active = _active === name;
    const textColorPrefix = 'text-blue';
    const textColor = `${textColorPrefix}-${active ? '700' : '500'}`;

    let liClasses = 'flex-grow mr-1'
    let aClasses = `w-full py-2 px-4 bg-white inline-block ${textColor} text-center font-semibold`;

    if (active) {
        liClasses += ' -mb-px border-l border-t border-r rounded-t';
    } else {
        aClasses += ` hover:${textColorPrefix}-800`;
    }

    return (
        <li className={liClasses} onClick={() => !active && onSelect(name)}>
            <a className={aClasses} href="#">{label}</a>
        </li>
    );
}
