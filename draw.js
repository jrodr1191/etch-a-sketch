const GRID_WIDTH = 512;
const GRID_HEIGHT = 512;

const erase = document.querySelector('.erase');
const resize = document.querySelector('.resize');
const body = document.querySelector('#main');
const closeResize = document.querySelector('.closeModal');
const modal = document.querySelector('.modal');
const modalInnerText = document.querySelector('.modal-inner-text');
const form = document.querySelector('form');
const changeWidth = document.querySelector('#changeWidth');
const changeHeight = document.querySelector('#changeHeight');
const confirmBtn = document.querySelector('.confirm-btn');
const error = document.createElement('p');

const grid = document.createElement('div');
const cell = [];
let gridSquare;

let rows = 16;
let columns = 16;

grid.classList.add('mainGrid');
grid.style.overflow = 'hidden';
grid.style.display = 'flex';
grid.style.flexWrap = 'wrap';
grid.style.border = '2px solid black';
grid.style.width = GRID_WIDTH + 'px';
grid.style.minWidth = GRID_WIDTH + 'px';
grid.style.height = GRID_HEIGHT + 'px';
grid.style.minHeight = GRID_WIDTH + 'px';
grid.style.position = 'absolute';
body.appendChild(grid);

createGrid(columns, rows);
colorGrid();

function createGrid(columns, rows){
    for(let i = 0; i < columns; i++){
        for(let j = 0; j < rows; j++){
            gridSquare = document.createElement('div');
            gridSquare.classList.add('cells');
            gridSquare.style.flex = 1;
            gridSquare.style.minWidth = GRID_WIDTH / columns + 'px';
            gridSquare.style.minheight = GRID_HEIGHT / rows + 'px';
            grid.appendChild(gridSquare);
            cell.push(gridSquare);
        }
    }
}

function deleteGrid(){
    while(grid.firstElementChild){
        grid.removeChild(grid.firstElementChild);
    }
}

function colorGrid(){
    for(let i = 0; i < cell.length; i++){
        cell[i].addEventListener('mouseover', function(){
            cell[i].style.backgroundColor = 'rgb(' 
                                            + Math.floor(Math.random() * 256) + ',' 
                                            + Math.floor(Math.random() * 256) + ',' 
                                            + Math.floor(Math.random() * 256) + ')';
        });
    }
}


function eraseGrid(){
    for(let i = 0; i < cell.length; i++){
        cell[i].style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
}

erase.addEventListener('click', eraseGrid);

resize.addEventListener('click', function(){
    modal.classList.add('open');
});

closeResize.addEventListener('click', function(){
    modal.classList.remove('open');
});

confirmBtn.addEventListener('click', function(){
    if(changeHeight.value < 1 || changeWidth.value < 1 || changeHeight.value > 64 || changeWidth.value > 64){
        error.textContent = 'Choose a height and width between 1 and 64';
        modalInnerText.appendChild(error);
    }else {
        deleteGrid();
        columns = changeHeight.value;
        rows = changeWidth.value;
        createGrid(rows, columns);
        colorGrid();
        modal.classList.remove('open');
        if(modalInnerText.contains(error)){
            modalInnerText.removeChild(error);
        }
    }
});