/* eslint-disable indent */
/* eslint-disable semi */
import { toType } from './type-checker'

const processObject = function(option) {
    let propsToInsert = {};

    _.forEach(option.content, function(parentValue, key) {
        if (parentValue.type === 'number' && parentValue.value === '') {
            propsToInsert[key] = null;
        } else {
            propsToInsert[key] = parentValue.value;
        }
    });

    return {name: option.name, propsToInsert: propsToInsert};
}

const processArray = function(option, filteredOptions) {
    let propsToInsert = [];
    let optionName = _.first(option).name;

    option.forEach(arrayItem => (
        propsToInsert.push(processObject(arrayItem).propsToInsert)
    ));

    return {name: optionName, propsToInsert: propsToInsert};
}

export default {

    merge: function(options) {
        let filteredOptions = {};
        Object.keys(options).forEach(key => {
            let option = options[key]
            let res;

            if (toType(option) === 'array') {
                res = processArray(option, filteredOptions);
            } else {
                res = processObject(option, filteredOptions);
            }

            filteredOptions[res.name] = res.propsToInsert;
        });
        return filteredOptions;
    },
}