/* eslint-disable indent */
/* eslint-disable semi */

export default {

    merge: function(options) {
        let filteredOptions = {};
        options.forEach(option => {
            let content = option.content;
            let propsToInsert = {};

            _.forEach(content, function(parentValue, key) {
                if (parentValue.type === 'number' && parentValue.value === '') {
                    propsToInsert[key] = null;
                } else {
                    propsToInsert[key] = parentValue.value;
                }
            });

            filteredOptions[option.name] = propsToInsert;
        });
        return filteredOptions;
    },
}