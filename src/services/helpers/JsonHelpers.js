const getKeys = (values, aDictionary) => {
    const keys = [];

    values.forEach(value =>
        Object.entries(aDictionary).forEach(entry => {
            const type = entry[1];

            if (value === type.name) {
                keys.push(type.id);
            }
        })
    );

    return keys;
};

export {
    getKeys
};