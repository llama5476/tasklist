//define UI variables
const form = document.getElementById('item-form');
const itemList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.getElementById('filter');
const itemInput = document.getElementById('item');

//load all event listeners
loadEventListeners();

//function - load all event listeners
function loadEventListeners() {
   //DOM Load event
   document.addEventListener('DOMContentLoaded', getItems);
   //add item event
   form.addEventListener('submit', addItem);
   //remove item event
   itemList.addEventListener('click', removeItem);
   //clear item event
   clearBtn.addEventListener('click', clearItems);
   //filter items event
   filter.addEventListener('keyup', filterItems);
}

//get items from Local Storge
function getItems(){
   let items;
   if(localStorage.getItem('items') === null){
      items = [];
   } else {
      items = JSON.parse(localStorage.getItem('items'));
   }

//loop
items.forEach(function(item){
      //create li element
      const li = document.createElement('li');
      //add class
      li.className = 'collection-item';
      //create text node and append to li
      li.appendChild(document.createTextNode(item));
      //create new link element
      const link = document.createElement('a');
      //add class
      link.className = 'delete-item secondary-content';
      //add icon html
      link.innerHTML = '<i class ="fa fa-remove"></i>';
      //append the link to li
      li.appendChild(link);
   
      //append the li to ul
      itemList.appendChild(li);
   });
}

//add item
function addItem(e) {
   if(itemInput.value === '') {
      alert('Add an Item');
   }

   //create li element
   const li = document.createElement('li');
   //add class
   li.className = 'collection-item';
   //create text node and append to li
   li.appendChild(document.createTextNode(itemInput.value));
   //create new link element
   const link = document.createElement('a');
   //add class
   link.className = 'delete-item secondary-content';
   //add icon html
   link.innerHTML = '<i class ="fa fa-remove"></i>';
   //append the link to li
   li.appendChild(link);

   //append the li to ul
   itemList.appendChild(li);

   //items in local storage
   storeItemInLocalStorage(itemInput.value);

   //clear input
   itemInput.value = '';

   e.preventDefault();
}
//store the item
function storeItemInLocalStorage(item) {
   let items;
   if(localStorage.getItem('items') === null){
      items = [];
   } else {
      items = JSON.parse(localStorage.getItem('items'));
   }

   items.push(item);

   localStorage.setItem('items', JSON.stringify(items));
}

//remove item
function removeItem(e){
   if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
   e.target.parentElement.parentElement.remove();

   //remove from localstorage
   removeItemFromLocalStorage(e.target.parentElement.parentElement);
      }
   }
}

//function - remove from LS loop
function removeItemFromLocalStorage(itemItem) {
   let items;
   if(localStorage.getItem('items') === null){
      items = [];
   } else {
      items=JSON.parse(localStorage.getItem('items'));
   }

   items.forEach(function(item){
      if(itemItem.textContent === item){
         items.splice(index, 1);
      }
   });

   localStorage.setItem('items', JSON.stringify(items));
}

//clear items
function clearItems(){
   while(itemList.firstChild){
      itemList.removeChild(itemList.firstChild);
   }
   //clear items from local storage
   clearItemsFromLocalStorage();
}

//function clear items from LS
function clearItemsFromLocalStorage(){
   localStorage.clear();
}

//filter items
function filterItems(e) {
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(function(item){
      const piece = item.firstChild.textContent;
      if(piece.toLowerCase().indexOf(text) != -1){
         item.style.display = 'block';
      } else {
         item.style.display = 'none';
      }
   });

}
