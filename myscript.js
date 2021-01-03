const canvasSize = 600;
const gridParent = document.querySelector('#grid-parent'); 
let paintColor = 'rgb(255, 0, 0';
let randomColor = false;
let grayScale = false;
let colorGrabbing = false;

// select the pen and use the pen cursor when a color is picked 
const input = document.querySelector('#color-picker');
input.addEventListener('input', () => {
    deselectDrawingBtns(penBtn);
    paintColor = input.value;
    gridParent.classList.remove('erasing');
    gridParent.classList.add('drawing');
});


// event listeners for the buttons that allows the user to change the grid size
const sizes = document.querySelectorAll('.size');
sizes.forEach(b => b.addEventListener('click', (e) => {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.style.backgroundColor = 'white');
    setGrid(Number(e.target.dataset.size));
    noGridBtn.classList.remove('selected');
    gridBtn.classList.add('selected');
    deselectGridSizeBtns(e.target);
}));


// clear the grid by making all the boxes white
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.style.backgroundColor = 'white');
});


// highlight the eraser button and add the eraser cursor when eraser button 
// pressed
const eraserBtn = document.querySelector('#eraser');
eraserBtn.addEventListener('click', () => {
    paintColor = 'white';
    changeCursor('erasing');
    deselectDrawingBtns(eraserBtn);
});

// update the appropriate elements for drawing
const penBtn = document.querySelector('#pen');
penBtn.addEventListener('click', () => {
    paintColor = input.value;
    changeCursor('drawing');
    deselectDrawingBtns(penBtn);
});

// toggle the random color boolean, and always update appropriate items for 
// drawing
const randomBtn = document.querySelector('#random-color');
randomBtn.addEventListener('click', () => {
    if (randomColor === true){
        deselectDrawingBtns(penBtn);
        randomColor = false;
    }
    else{
        deselectDrawingBtns(randomBtn);
        randomColor = true;
    }
    changeCursor('drawing');
});

// toggle the gray scale boolean and always update appropriate items for drawing
const grayScaleBtn = document.querySelector('#gray-scale');
grayScaleBtn.addEventListener('click', () => {
    if (grayScale === true){
        deselectDrawingBtns(penBtn);
        grayScale = false;
    }
    else{
        deselectDrawingBtns(grayScaleBtn);
        grayScale = true;
    }
    changeCursor('drawing');
});

// when the user clicks on a box, the color picker input becomes the background 
// color of that box. this button also toggles on and off
const colorGrabBtn = document.querySelector('#color-grabber');
colorGrabBtn.addEventListener('click', (e) => {
    if (colorGrabbing === true){
        deselectDrawingBtns(penBtn);
        changeCursor('drawing');
        colorGrabbing = false;
    }
    else {
        deselectDrawingBtns(e.target);
        changeCursor('color-grabbing');
        colorGrabbing = true;
    }
});

// create a pop up for user to input custom value within selected range for grid
const custom = document.querySelector('#custom');
custom.addEventListener('click', (e) => {
    while (true){
        let size = Number(prompt('Input a number between 1 and 100'));
        if (1 <= size && size <= 100 && !isNaN(size)){
            setGrid(size);
            deselectGridSizeBtns(e.target);
            break;
        }
    }
});


// draw gridlines by giving all the boxes borders
const gridBtn = document.querySelector('#grid');
gridBtn.addEventListener('click', () => {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.classList.add('box-border'));
    gridBtn.classList.add('selected');
    noGridBtn.classList.remove('selected');
});

// remove gridlines by removing borders from all boxes
const noGridBtn = document.querySelector('#no-grid');
noGridBtn.addEventListener('click', () => {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.classList.remove('box-border'));
    noGridBtn.classList.add('selected');
    gridBtn.classList.remove('selected');
});

// draw an nxn grid by inserting n^2 boxes into the grid parent
// while keeping the grid parent a constant size by adjusting
// the widths of the columns
function setGrid(numColumns){
    let str = "";
    const columnSize = canvasSize/numColumns;
    for (let i = 0; i < numColumns; i++){
        str = str + columnSize + 'px '; 
    }
    while (gridParent.hasChildNodes()){
        gridParent.removeChild(gridParent.firstChild);
    }
    for (let i = 0; i < numColumns**2; i++){
        const box = document.createElement('div');
        box.classList.add('box'); 
        box.classList.add('box-border'); 
        box.style.backgroundColor = '#FFFFFF';
        box.addEventListener('mousedown', giveBoxSecondEventListener);
        box.addEventListener('mouseup', removeBoxSecondEventListener);
        gridParent.appendChild(box);
    }
    gridParent.setAttribute('style', `display: grid; grid-template-columns: ${str};`
     + ` grid-template-rows: ${str};`); 
    }

// add the class with the correct cursor to the grid parent
function changeCursor(newCursorCssClass){
    gridParent.classList.remove('drawing');
    gridParent.classList.remove('erasing');
    gridParent.classList.remove('color-grabbing');
    gridParent.classList.add(`${newCursorCssClass}`);
}
// remove the selected class from all the buttons excepted the selected one 
// passed in as the argument
// set randomColor and grayScale to false because this code needs to be run
// if this function is called by clicking the Pen button, the color input, 
// or by using the Random Color or Gray Scale buttons. this way, only the
// event listeners in randomBtn and grayScaleBtn need to turn their 
// respective booleans to true after this function is called
function deselectDrawingBtns(btn){
    let doBtns = document.querySelectorAll('.do');
    doBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    randomColor = false;
    grayScale = false;
    colorGrabbing = false;
}

// remove the selected class from all grid size buttons and add it back to the
//  clicked button
function deselectGridSizeBtns(selected){
    sizes.forEach(b => b.classList.remove('selected'));
    selected.classList.add('selected');
}

// when the mouse clicks a cell, this function is called
// and gives all the boxes an event listener that changes the hovered
// boxes' background colors when the mouse hovers over
// thus, the user can click and hold to draw
function giveBoxSecondEventListener(event){
    paintBox(event);
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.addEventListener('mouseover', paintBox));
}

// when the mouse is up, this is called to remove the event listener
// that changes the boxes' background colors when the mouse hovers over them
function removeBoxSecondEventListener(){
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(b => b.removeEventListener('mouseover', paintBox));
}

// changes the background color of the target box, 
// if randomColor is on, then the color is a random color value
// if grayScale is on, then it checks the level data attribute
// to see how many times the box has been targeted before and thus
// how gray the box is. it then makes the box grayer if that is possible
// otherwise it makes the background color the value selected in the color input
//  div
function paintBox(event){
    let square = event.target;
    if (randomColor === true){
        let hex = Math.floor((Math.random()*16777216)).toString(16);
        square.style.backgroundColor = `#${hex}`;
    }
    else if (grayScale === true){
        const start = 220;
        const tenth = Math.ceil(start/10);
        let grayness = Number(square.dataset.level);
        if (!grayness){
            square.setAttribute('data-level', '1');
            square.style.backgroundColor = `rgb(${220}, ${220}, ${220})`;
        }
        else if (grayness < 10){
            grayness += 1;
            square.setAttribute('data-level', grayness);
            let newValue = start - tenth*grayness;
            square.style.backgroundColor = `rgb(${newValue}, ${newValue}` +
            `, ${newValue})`;
        }
    }
    else if (colorGrabbing === true){
        // convert the rgb color to hex to work with the input value limitations
        //  of the color input
        let rgbColor = square.style.backgroundColor; 
        rgbColor = rgbColor.split(", ");
        let red = Number(rgbColor[0].split("(")[1])
                                    .toString(16)
                                    .padStart(2, '0');
        let green = Number(rgbColor[1]).toString(16)
                                    .padStart(2, '0');
        let blue = Number(rgbColor[2].split(")")[0])
                                    .toString(16)
                                    .padStart(2, '0');
        let hexValue = '#' + red + green + blue;
        input.value = hexValue;
        paintColor = input.value;
    }
    else {
        square.style.backgroundColor = `${paintColor}`;
    }
}

// initializes the grid and highlights the appropriate elements
setGrid(32);
gridParent.classList.add('drawing');
penBtn.classList.add('selected');
let defaultGridSizeBtn = document.querySelector('.size[data-size="32"]');
defaultGridSizeBtn.classList.add('selected');
let defaultGridBtn = document.querySelector('#grid');
defaultGridBtn.classList.add('selected');



