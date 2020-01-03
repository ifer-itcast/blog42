function arrToJSON(form) {
    let arr = form.serializeArray();
    let obj = {};
    arr.forEach((item, index) => {
        obj[item.name] = item.value;
    });
    return obj;
}