// still a glitch after the user selects a new color but was previously using
// the random color or grayscale functions
let paletteSize = 600;
let gridParent = document.querySelector('#gridParent'); 
let paintColor = 'red';
let randomColor = false;
let grayScale = false;

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
        box.style.backgroundColor = 'white';
        box.addEventListener('mousedown', giveBoxSecondEventListener);
        box.addEventListener('mouseup', removeBoxSecondEventListener);
        gridParent.appendChild(box);
    }
    gridParent.setAttribute('style', `display: grid; grid-template-columns: ${str};`
     + ` grid-template-rows: ${str};`); 

    gridParent.classList.add('drawing');
    penBtn.classList.add('selected');
}

let input = document.querySelector('#colorPicker');
input.addEventListener('change', function(){
    deselectDrawingBtns(penBtn);
});

let sizes = document.querySelectorAll('.size');
sizes.forEach(b => b.addEventListener('click', function(e){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.style.backgroundColor = 'white');
    setGrid(Number(e.target.dataset.size));
    noGridBtn.classList.remove('selected');
    gridBtn.classList.add('selected');
    deselectGridSizeBtns(e);
}));


const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', function(){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.style.backgroundColor = 'white');
});
// potential eraser bug
const eraserBtn = document.querySelector('#eraser');
eraserBtn.addEventListener('click', function(e){
    paintColor = 'white';
    gridParent.classList.remove('drawing');
    gridParent.classList.add('erasing');
    deselectDrawingBtns(eraserBtn);
});

const penBtn = document.querySelector('#pen');
penBtn.addEventListener('click', function(e){
    paintColor = picker.value;
    gridParent.classList.remove('erasing');
    gridParent.classList.add('drawing');
    deselectDrawingBtns(penBtn);
    randomColor = false;
    grayScale = false;
});

// make a function that unhighlights/highlights 
const randomBtn = document.querySelector('#random-color');
randomBtn.addEventListener('click', function(e){
    if (randomColor == true){
        deselectDrawingBtns(penBtn);
        randomColor = false;
    }
    else{
        deselectDrawingBtns(randomBtn);
        randomColor = true;
    }
    gridParent.classList.remove('erasing');
    gridParent.classList.add('drawing');
});


const grayScaleBtn = document.querySelector('#gray-scale');
grayScaleBtn.addEventListener('click', function(e){
    if (grayScale == true){
        deselectDrawingBtns(penBtn);
        grayScale = false;
    }
    else{
        deselectDrawingBtns(grayScaleBtn);
        grayScale = true;
    }
    gridParent.classList.remove('erasing');
    gridParent.classList.add('drawing');
});

const custom = document.querySelector('#custom');
custom.addEventListener('click', function(e){
    let size;
    while (true){
        console.log('this runs');
        size = getSize();
        if (1 <= size && size <= 100 && !isNaN(size)){
            setGrid(size);
            deselectGridSizeBtns(e);
            break;
        }
    }
});

const picker = document.getElementById("colorPicker");
picker.addEventListener('input', function(){
    paintColor = picker.value;
});

const gridBtn = document.querySelector('#grid');
gridBtn.addEventListener('click', function(){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.classList.add('box-border'));
    gridBtn.classList.add('selected');
    noGridBtn.classList.remove('selected');
});

const noGridBtn = document.querySelector('#nogrid');
noGridBtn.addEventListener('click', function(){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.classList.remove('box-border'));
    noGridBtn.classList.add('selected');
    gridBtn.classList.remove('selected');
});

function getSize(){
    let size = Number(prompt('Enter a Number Between 1 and 100'));
    return size;
}

function deselectDrawingBtns(btn){
    let doBtns = document.querySelectorAll('.do');
    doBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    randomColor = false;
    grayScale = false;
}

function deselectGridSizeBtns(e){
    let selected = e.target;
    sizes.forEach(b => b.classList.remove('selected'));
    selected.classList.add('selected');
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
    let square = event.target;
    if (randomColor == true){
        let hex = Math.floor((Math.random()*16777216)).toString(16);
        square.style.backgroundColor = `#${hex}`;
    }
    else if (grayScale == true){
        let start = 220;
        let tenth = Math.ceil(start/10);
        let grayness = Number(square.dataset.level);
        if (!grayness){
            square.setAttribute('data-level', '1');
            square.style.backgroundColor = `rgb(${220}, ${220}, ${220})`;
        }
        else if (grayness < 10){
            grayness += 1;
            square.setAttribute('data-level', grayness);
            let newValue = start - tenth*grayness;
            square.style.backgroundColor = `rgb(${newValue}, ${newValue}, ${newValue})`;
        }
    }
    else {
        event.target.style.backgroundColor = `${paintColor}`;
    }
}


setGrid(32);
let defaultGridSizeBtn = document.querySelector('.size[data-size="32"]');
defaultGridSizeBtn.classList.add('selected');

let defaultGridBtn = document.querySelector('#grid');
defaultGridBtn.classList.add('selected');



