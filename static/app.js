document.addEventListener('DOMContentLoaded', () => {

class BoggleGame {
  constructor(time=60){
    this.time = time;
    this.score = 0;
    this.timerId = setInterval(this.countDown, 1000)
    $('#submitBtn').on('click', this.getSubmittedWord())
  }
    

  // Handle time countdown and update timer in DOM
  async countDown(){
    this.time --
    $('.timer').text(this.time)
    
    if(this.time === 0){
      clearInterval(this.timerId)
      await this.sendScore()
      $('#inputForm').hide()
      $('.wordMsg').hide()
    }
  }  
  

  // At end of game, send score to server and update result message.
  async sendScore(){
    const res = await axios.post('/post_stat', {
        'score': this.score
    })
    if (res.result){
      $('.resultMsg').text(`New high score: ${this.score}`)
    }else{
      $('.resultMsg').text(`Final score: ${this.score}`)
    }
  }

  // Retrieve word submitted. If valid, update score. 
  async getSubmittedWord(e){
    e.preventDefault();
    const $inputValue = $('#inputVal').val();
    const res = await axios.get('/check_word', {
      params: {
        guess: `${$inputValue}`
      }
    });
  
    const {result} = res.data;
    if (result === 'not-word'){
      $('.wordMsg').text(`${$inputValue} is not a valid word`)
    }else if (result === 'not-on-board'){
      $('.wordMsg').text(`${$inputValue} is not a valid word on this board`)
    }else {
      $('.wordMsg').text(`Yay! You found: ${$inputValue}`)
      this.score += this.$inputValue.length;
      $('.score').text(this.score)
    }
  
    $('#inputForm').trigger('reset');
  }
}
let game = new BoggleGame(60) 

})