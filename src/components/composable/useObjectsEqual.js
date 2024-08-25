
export function useObjectsEqual(object1, object2, delEmpty = false) {
    let obj1 = object1
    let obj2 = object2

    if(delEmpty){
        obj1 = removeEmptyFields(object1)
        obj2 = removeEmptyFields(object2)
    }


    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !useObjectsEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}

function removeEmptyFields(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.filter(item => item !== '' && item !== null && item !== undefined)
            .map(removeEmptyFields);
    }

    return Object.keys(obj).reduce((acc, key) => {
        const value = removeEmptyFields(obj[key]);
        if (value !== '' && value !== null && value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {});
}