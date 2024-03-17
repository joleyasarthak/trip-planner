//returns array of unique elements between both arrays
const filterForUnique = (arr1, arr2) => {
    //assumes arr1 and arr2 are unique themselves
    res = arr1
    seen = {}
    for (let i = 0; i < arr1.length; i++) {
        seen[arr1[i]] = 1
    }

    for (let i = 0; i < arr2.length; i++) {
        if (!(arr2[i] in seen)) {
            res.append(arr2[i])
        }
    }
    return res
}

module.exports = {filterForUnique}