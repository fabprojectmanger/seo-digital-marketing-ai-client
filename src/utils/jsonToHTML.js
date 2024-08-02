const JsonToHtml = (jsonData) => {
    let html = '';
    for (let key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            html += `<h2>${splitOnUppercase(key)}</h2><table>`;
            
            for (let prop in jsonData[key]) {
                if (jsonData[key].hasOwnProperty(prop)) {
                    html += `<tr><td>${splitOnUppercase(prop)}</td><td>${jsonData[key][prop]}</td></tr>`;
                }
            }
            
            html += '</table>';
        }
    }
    return html
}
const JsonToHtmlTags = (jsonData) => {
    let html = '';
    for (let key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            html += `<h2>${splitOnUppercase(key)}</h2><div>`;
            console.log(jsonData[key]);            
            for (let prop in jsonData[key]) {
                if (jsonData[key].hasOwnProperty(prop)) {
                    html += `<strong>${splitOnUppercase(prop)}</strong><ul><li>${jsonData[key][prop]}</li></ul>`;
                }
            }
            
            html += '</div>';
        }
    }
    return html
}

export { JsonToHtml, JsonToHtmlTags };

function splitOnUppercase(str) {
    return str.split(/(?=[A-Z])/).join(' ');
}

