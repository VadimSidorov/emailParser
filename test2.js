var fs = require("fs");
let email = "";
let dataByLine = [];
let regex = /_Part_/;
let range = [];
let mimeTypesRange = [];
let example = "text\/html";
let headerRange = [];
let headerObject = {}
let splitEmail = []
email = fs.readFileSync("testFile.txt").toString('utf-8');

//range of diffrent mimeTypes
mimeTypes = (arr) => {
    i = 0
    do {
        mimeTypesRange.push([arr[i], arr[i + 1]])
        i += 1
    } while (i < arr.length - 1)
    return
}
// method for array of diffrent mimeTypes content
sliceByMimeTypes = (range) => {
    range.forEach((arr) => {
        splitEmail.push(dataByLine.slice(arr[0], arr[1]).join("\n"))
    })
}

//parsing html version of email body with Quoted-Printable encoding
emailBodyParser = function (mimeType) {
    dataByLine = email.split("\n")
//number of lines where (_part_) appears
    dataByLine.forEach((el, i) => {
        if (el.search(regex) !== -1) {
            range.push(i)
        }
    })
//range of diffrent mimeTypes
    mimeTypes(range)
// array of diffrent MIME types
    sliceByMimeTypes(mimeTypesRange)
    return splitEmail.filter(el => el.includes(mimeType))
}

headerParser = function (headerKey) {
//push every line of email in an array
    dataByLine = email.split("\n");

//number of lines where (_part_) appears
    dataByLine.forEach((el, i) => {
        if (el.search(regex) !== -1) {
            range.push(i)
        }
    });
// header of email
    headerRange = dataByLine.splice(0, range[1]);
// split header by key/value pair and add it into object for easy access
    let i = 0
    do {
        headerType = headerRange[i].split(":")
        headerObject[headerType[0]] = headerType.splice(1, headerType.length - 1)
        if (headerRange[i + 1].slice(0, 6).trim() == []) {
            headerObject[headerType[0]] = (headerObject[headerType[0]] + headerRange[i + 1])
            i += 1
        } 
        i += 1
    } while (headerRange.length > i)
    return headerObject[headerKey].join(" ")
}

console.log(headerParser('Delivered-To'))
// console.log(emailBodyParser(example))