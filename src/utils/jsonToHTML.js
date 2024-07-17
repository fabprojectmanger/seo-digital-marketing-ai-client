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
export { JsonToHtml };

function splitOnUppercase(str) {
    return str.split(/(?=[A-Z])/).join(' ');
}