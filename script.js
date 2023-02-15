const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('succes-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message_el2= document.getElementById('message');
const PlayAgainBtn =document.getElementById('play-again');



const correctLetters =[];
const wrongLetters =[];
let selectedWord = getRandomWord();

function getRandomWord(){
    const words=["javascript","java","python"];
    return words[Math.floor(Math.random() * words.length)];
}


function displayWord() {
     

    word_el.innerHTML = ` 
        ${selectedWord.split('').map(letter => 
            `<div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>`
             ).join('')}
        `;   
        
        const w =word_el.innerText.replace(/\n/g,'');

        if (w == selectedWord){
            popup.style.display= "flex";
            message_el.innerText="kazandınız"

        }
}

function updateWrongLetters(){
    wrongLetters_el.innerHTML=`
        ${wrongLetters.length>0? `<h3>Hatalı harfler:</h3>`:''}
        ${wrongLetters.map(letter=>`<span>${letter}</span> `)}
    
    `;
    items.forEach((item,index)=>{
        const errorCount= wrongLetters.length;
        if(index<errorCount){
            item.style.display ='block'

        }else{
            item.style.display='none'
        }

    })

    if(wrongLetters.length === items.length){
        popup.style.display= "flex";
            message_el.innerText="KAYBETTİN"

    }



}

function displayMessage(){
    message_el2.classList.add('show');

    setTimeout(function(){
        message_el2.classList.remove('show');

    },2000);

 


}

PlayAgainBtn.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display="none"
})


window.addEventListener('keydown',function(e){
    if(e.keyCode >= 65 && e.keyCode<=90){
        const letter =e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();

            }else{
                displayMessage();
                // bu harf var
                

            }

        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                //hatalı harf güncelle
                updateWrongLetters();

            }
            else{
                displayMessage();
            }

        }

    }

    


});



displayWord();
