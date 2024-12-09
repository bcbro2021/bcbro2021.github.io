const randomRange = (min, max) => {
    return min + Math.random() * (max - min);
};

const roundtonear = (x,num) => {
    return Math.floor( x / num ) * num;
}

const loadImage = (id,src) => {
    var img = document.createElement("img")
    img.src = src
    img.id = id
    img.style = "display:none;"
    document.body.appendChild(img)

    return img
}
