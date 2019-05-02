
/* 
* typeof operator
* source: https://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
*/

export const toType = function(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}