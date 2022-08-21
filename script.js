const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Heku',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

//store List Items
const listItems = [];

let dragStartIndex;

createList();



//insert list Into DOM

function createList() {
 [...richestPeople]
    .map(a=>({value: a, sort: Math.random()}))
    .sort((a,b)=>a.sort- b.sort)
    .map(a=>a.value)
    .forEach((person, index) =>{
        console.log(person)
        const listItem = document.createElement('li');
      // listItem.classList.add('over')
        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `<span class="number">${index+1}</span>
                            <div class="draggable" draggable="true">
                            <p class="person-name">${person}</p>
                            <i class="fas fa-grip-lines"></i>
                            </div>`
        listItems.push(listItem);
        draggable_list.appendChild(listItem)
    })
 addEventListeners();
}

function dragStart (){
   // console.log('drag start')
    dragStartIndex = +this.closest('li').getAttribute('data-index');

}
function dragLeave (){
   // console.log('drag leave')
    this.classList.remove('over')
}

function dragEnter (){
    //console.log('drag enter')
    this.classList.add('over')
}

function dragOver (e){
    e.preventDefault();
    //console.log('drag over')
}

function dragdrop (){
    //console.log('drag drop')
    const dragEndIndex = this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over')
}
//check the order of the list Items on the button click
function checkOrder(){
    listItems.forEach((listItem, index)=>{
     const personName = listItem.querySelector('.draggable').innerText.trim();
     if(personName !== richestPeople[index]){
        listItem.classList.add('wrong')
     }else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right')
     }
    })

}

//swap list Items that are drag and drop
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    //console.log(itemOne, itemTwo)
    //do actual swap
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

}


function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const draggableItems= document.querySelectorAll('.draggable-list li');
    draggables.forEach(dragable =>{
        dragable.addEventListener('dragstart', dragStart)
    })
    draggableItems.forEach(item =>{
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragdrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

check.addEventListener('click', checkOrder);
