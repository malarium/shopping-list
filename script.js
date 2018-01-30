   alert("Rozpoznawane komendy: kup*, mam* i koniec. Mów głośno! Działą tylko pod Chrome");
   const allItems = [];
   var retrievedData = localStorage.getItem("list");
   // jeżeli jest coś w local storage, to wyświetl
   if (retrievedData) {
     var parsed = JSON.parse(retrievedData);
     parsed.forEach((item) => {
           allItems.push(item);
         });
         displayList();
   }
 function displayList(){
   console.log(allItems);
      allItems.forEach((item) => {
      let el = document.querySelector('#list');
      let txt = document.createElement('p');
      txt.textContent = item;
      el.appendChild(txt);
    });
}

var write = function(tag) {
    let el = document.querySelector('#list');
    let txt = document.createElement('p');
    txt.textContent = '' + tag;
    allItems.push(txt.innerText);
    localStorage.setItem("list", JSON.stringify(allItems));
    el.appendChild(txt);
  };

var del = function(rTag) {
  let item = [];
  item.push(...document.querySelectorAll('p'));
  item.forEach(function(i){
    if (i.textContent == rTag) {
      i.remove();
    }
  });
  // zmień zawartość allItems i podmień local storage na nowy array
  allItems.forEach((item) => {
    if (item == rTag) {
      allItems.splice(allItems.indexOf(item), 1);
      localStorage.setItem("list", JSON.stringify(allItems));
    }
  })
}

var delAll = function() {
  localStorage.removeItem("list");
  let items = (document.querySelectorAll('p'));
  items.forEach((item) =>
  {
    item.remove();
  }
)}

var commands = {
  'kup :tag': write,
  'mam :rTag': del,
  'koniec': delAll
};


annyang.setLanguage('pl');
annyang.addCommands(commands);
annyang.start({ autoRestart: true, continuous: false });
