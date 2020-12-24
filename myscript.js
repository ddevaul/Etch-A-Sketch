let numColumns = 8;
let paletteSize = 400;
//going to do this using 
let gridParent = document.querySelector('#gridParent'); 
let str = "";
// the side has to be some mathematical fucntion so that the large container is
// always the same size
let columnSize = paletteSize/numColumns;
for (let i = 0; i < numColumns; i++){
    str = str + columnSize + 'px '; 
}

gridParent.setAttribute('style', `display: grid; grid-template-columns: ${str};`
     + ` grid-template-rows: ${str};`); 


// each box has an event listener that sees if the mouse is down
// if the mouse is down, that triggers all the boxes to have a 
// different event listener that sees if the mouse is over them
// if the mouse is over them, change the color of the box
for (let i = 0; i < numColumns**2; i++){
    let box = document.createElement('div');
    box.classList.add('box'); 
    box.addEventListener('mousedown', giveBoxSecondEventListener);
    box.addEventListener('mouseup', removeBoxSecondEventListener);
    gridParent.appendChild(box);
}

function giveBoxSecondEventListener(event){
    paintBox(event);
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.addEventListener('mouseover', paintBox));

    // boxes.forEach(function(b){
    //     b.addEventListener('mouseover', paintBox);
    // });
}


function removeBoxSecondEventListener(){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.removeEventListener('mouseover', paintBox));
}


function paintBox(event){
    event.target.style.backgroundColor = 'black';
}