function updateArrayItem(array, selector, update) {
    return array.map((item) => {
        if (selector(item)) {
            return Object.assign({}, item, update);
        }
        return item;
    });
}

export default {updateArrayItem};
