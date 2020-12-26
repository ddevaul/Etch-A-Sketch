let paletteSize = 600;
let gridParent = document.querySelector('#gridParent'); 
let paintColor = 'black';
// the side has to be some mathematical fucntion so that the large container is
// always the same size


function setGrid(numColumns){
    let str = "";
    let columnSize = paletteSize/numColumns;
    for (let i = 0; i < numColumns; i++){
        str = str + columnSize + 'px '; 
    }

    while (gridParent.hasChildNodes()){
        gridParent.removeChild(gridParent.firstChild);
    }
    
    for (let i = 0; i < numColumns**2; i++){
        let box = document.createElement('div');
        box.classList.add('box'); 
        box.classList.add('box-border'); 
        box.addEventListener('mousedown', giveBoxSecondEventListener);
        box.addEventListener('mouseup', removeBoxSecondEventListener);
        gridParent.appendChild(box);
    }
    gridParent.setAttribute('style', `display: grid; grid-template-columns: ${str};`
     + ` grid-template-rows: ${str};`); 

    gridParent.classList.add('drawing');
}




let sizes = document.querySelectorAll('.size');
sizes.forEach(b => b.addEventListener('click', function(e){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.style.backgroundColor = 'white');
    setGrid(Number(e.target.dataset.size));
}));


const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', function(){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.style.backgroundColor = 'white');
});

const eraserBtn = document.querySelector('#eraser');
eraserBtn.addEventListener('click', function(){
    paintColor = 'white';
    gridParent.classList.remove('drawing');
    gridParent.classList.add('erasing');
});

const penBtn = document.querySelector('#pen');
penBtn.addEventListener('click', function(){
    paintColor = picker.value;
    gridParent.classList.remove('erasing');
    gridParent.classList.add('drawing');
});

const picker = document.getElementById("colorPicker");
picker.value = '#000000';
picker.addEventListener('input', function(){
    paintColor = picker.value;
});

const gridBtn = document.querySelector('#grid');
gridBtn.addEventListener('click', function(){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.classList.add('box-border'));
});

const noGridBtn = document.querySelector('#nogrid');
noGridBtn.addEventListener('click', function(){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.classList.remove('box-border'));
});

// maybe look into debouncing 

// each box has an event listener that sees if the mouse is down
// if the mouse is down, that triggers all the boxes to have a 
// different event listener that sees if the mouse is over them
// if the mouse is over them, change the color of the box


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
    event.target.style.backgroundColor = `${paintColor}`;
}


setGrid(64);

