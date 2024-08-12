$(document).ready(function() {
    var countdown = 100;
  var timerElement = $('#timer');

  function updateTimer() {
      if (countdown >= 0) {        
          timerElement.text(countdown);
          countdown--;
      } else {            
        document.getElementById('submit-test').classList.add('hidden');
        clearInterval(timerInterval);  
          $.ajax({
              method: 'GET', 
              success: function(data) {
                  console.log(data); 
                  
              },
              error: function(error) {
                  console.error('Error:', error); 
              }
          });
      }
  } 

  var timerInterval = setInterval(updateTimer, 1000); // Update every second

  $.getJSON('questions.json', function(data) {
      let testContainer = $('#test-container');
      data.forEach((item, index) => {
          let questionBlock = `<div class="question-block">
              <p class="alert alert-primary" role="alert">${item.question}</p>`;
          item.options.forEach(option => {
              questionBlock += `<label style="margin-left:30px"><input type="radio" name="question${index}" value="${option}"> ${option}</label><br>`;
          });
          questionBlock += `</div><br>`;
          testContainer.append(questionBlock);
      });
  });

  $('#submit-test').click(function() {
      let score = 0;
      let total = 0;
      $.getJSON('questions.json', function(data) {
          data.forEach((item, index) => {
              let selected = $(`input[name="question${index}"]:checked`).val();
              if (selected === item.answer) {
                  score++;
              }
              total++;
          });
          let name = prompt("Enter your name:");
          alert(`Поздравляем, ${name}! Тест сдан на ${score} из ${total}. Времени осталось ${countdown} секунд.`);
      });
  });

});
