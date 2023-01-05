document.addEventListener('DOMContentLoaded', () => {

let score = 0;
let time = 60;


  
  $('#submitBtn').on('click', function(e){
    e.preventDefault();
    const $inputValue = $('#inputVal').val();
    getSubmittedWord($inputValue);
    $('#inputForm').trigger('reset');
  })

async function getSubmittedWord(word){
  const res = await axios.get('/check_word', {
    params: {
      guess: `${word}`
    }
  });

  const {result} = res.data;
  if (result === 'not-word'){
    $('.msg').text(`${word} is not a valid word`)
  }else if (result === 'not-on-board'){
    $('.msg').text(`${word} is not a valid word on this board`)
  }else {
    $('.msg').text(`Yay! You found: ${word}`)
    score += word.length;
    $('.score').text(score)
  }
}




function countDown(){
  time --
  $('.timer').text(time)
  
  if(time === 0){
    clearInterval(timerId)
    $('#inputForm').hide()
  }
}  

let timerId = setInterval(countDown, 1000)



})