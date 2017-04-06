function runExperiment(){



	serverPsych.request(function (settings){

		settings.timeline.forEach(function(block, idx, timeline){
			if(block.type == "Your block name 1"){
						block.timeline = [
						/* to add things manually to your timeline, by example your stimuli */
						];
			}
			else if (block.type == "Your block name 2"){
						block.timeline = [
						/* to add things manually to your timeline, by example your stimuli */
						];
				}

		});

    /* create experiment timeline array */
    var timeline = [];

    /* define welcome message block */
    var welcome_block = {
      type: "text",
      text: "<p>Bienvenidos al experimento 'TAM Audio'.</p>" +
            "<p>Gracias por participar.</p>" +
            "<p>Presione cualquier tecla para continuar.</p>",
    };
    timeline.push(welcome_block);

    /* define instructions block */
    var instructions_block = {
      type: "single-audio",
	  // bonjour Hugues! je me suis permis quelques corrections sur les paths de tes stimuli :)
      stimulus: "/media/tamaudio/stimuli/instrucciones.wav",
      prompt: "<p>En esta prueba vas a oir varios pares de frases. Escúchalos y decide en cada caso si la segunda frase combina bien con la primera. " +
            "En otras palabras, indica si la combinación de frases puede haber sido dicha por un hablante nativo del español. " +
            "Para ello, debes utilizar la escala que se te ofrece. Esta escala contiene cinco números de -2 a +2, los cuales corresponden a las siguientes respuestas:<br/>" +
            "<ul style=''>" +
            "<li>-2: no podría ser dicha por un hablante nativo = la 2da frase no combina bien en absoluto con la 1ra.</li>" +
            "<li>-1: creo que no podría ser dicha por un hablante nativo = la 2da frase no combina bien con la 1ra.</li>" +
            "<li>1: creo que podría ser dicha por un hablante nativo = la 2da frase combina bien con la 1ra.</li>" +
            "<li>2: podría ser dicha por un hablante nativo = la 2da frase combina perfectamente bien con la 1ra.</li>" +
            "<li>0: No sé (por favor, evite esta respuesta dentro de lo posible)</li>" +
            "</ul>" +
            "</p>",
      timing_post_trial: 2000,
      choices: [13]
    };
    timeline.push(instructions_block);

    var stimuli = [
		  { text: "Contrataremos una persona que hable holandés, si logramos encontrar alguna.",
		    response: "go",
		    audio: "/media/tamaudio/stimuli/stim-01.wav"
		  },
		  { text: "Luis y Pedro quieren amueblar la casa porque les gusta más vacía.",
		    correct: ["Luis y Pedro no quieren amueblar la casa porque les gusta más vacía."],
		    response: "no-go",
		    audio: "/media/tamaudio/stimuli/stim-02.wav"
		  },
		  { text: "Quiero una lavadora que indica la temperatura. La venden en Amazon y está barata.",
		    response: "go",
		    audio: "/media/tamaudio/stimuli/stim-03.wav"
		  },
		  { text: "Esteban y su hermano se parecen mucho. Siempre los confundo.",
		    response: "go",
		    audio: "/media/tamaudio/stimuli/stim-04.wav"
		  },
		  { text: "Compraré una casa que queda en el centro, si hay alguna a buen precio.",
		    correct: ["Compraré una casa que quede en el centro, si hay alguna a buen precio."],
		    response: "no-go",
		    audio: "/media/tamaudio/stimuli/stim-05.wav"
		  },
		]

    var test_block, timeline_stimuli = [];
    for(var i = 0; i < stimuli.length; i++){
      test_block = {timeline: [
        {
          type: "single-audio",
          stimulus: '' + stimuli[i].audio + '',
          prompt: "",
          trial_ends_after_audio : true,
        },
        {
          type: "survey-likert",
          questions: ['¿Qué tal te ha parecido?'],
          labels : [['-2', '-1', '0', '1', '2']],
          data: {"response" : stimuli[i].response},
          button_label : "Confirmar",
          on_finish: function(data){
            var correct = false;
            if(data.response == 'go' && data.rt > -1 && jQuery.parseJSON( data.responses ).Q0 > 2){
              correct = true;
            } else if(data.response == 'no-go' && data.rt > -1 && jQuery.parseJSON( data.responses ).Q0 < 2){
              correct = true;
            }
            jsPsych.data.addDataToLastTrial({correct: correct});
          },
        },
        {
          timeline : [
            {
              type: "survey-text",
              preamble: '¿La frase no te parece correcta? Corríjala: ',
              questions: [stimuli[i].text],
              values: [stimuli[i].text],
              rows: [2],
              columns: [120],
              button_label : "Confirmar",
              data: {'response': stimuli[i].response ? stimuli[i].response : []},
            }],
          conditional_function: function(){
            var data = jsPsych.data.getLastTrialData().first().values()[0];
            if(jQuery.parseJSON( data.responses ).Q0 < 2)
              return true;
            else
              return false;
          }
        }],
        choices: [13]};

      timeline.push(test_block);
    }

    /* define debrief block */

    function getSubjectData() {

      var trials = jsPsych.data.get().filter({trial_type: 'survey-likert'});

      var sum_rt = 0;
      var correct_trial_count = 0;
      var correct_rt_count = 0;
      var following_survey_text;
      for (var i = 0; i < trials.values().length; i++) {
        sum_rt += trials.values()[i].rt;
        if (trials.values()[i].correct == true) {
          //Always correct
          if(trials.values()[i].response == 'go'){
            correct_trial_count++;
          }else if(trials.values()[i].response == 'no-go'){
            //get survey-text
            following_survey_text = jsPsych.data.get().values()[trials.values()[i].trial_index+1];
            if(following_survey_text && $.inArray($.parseJSON( following_survey_text.responses ).Q0, following_survey_text.response) ){
              correct_trial_count++;
            }
          }
        //   if(trials[i].rt > -1){
        //     sum_rt += trials[i].rt;
        //     correct_rt_count++;
        //   }
        }
        correct_rt_count++;
      }
      return {
        rt: Math.floor(sum_rt / correct_rt_count),
        accuracy: Math.floor(correct_trial_count / trials.values().length * 100)
      }
    }

    var debrief_block = {
      type: "text",
      text: function() {
        var subject_data = getSubjectData();
        return "<p>You responded correctly on "+subject_data.accuracy+"% of "+
        "the trials.</p><p>Your average response time was <strong>" +
        subject_data.rt + "ms</strong> for the likert scale. We didn't count for the other parts. "+
        "experiment. Thank you!</p>";
      }
    };


    // timeline.push(welcome_block);
    //timeline.push(instructions_block);
    //console.log(timeline_stimuli);
    //timeline.push(timeline_stimuli);
    timeline.push(debrief_block);

		//Create timeline here.
		jsPsych.init({
			//pass timeline var here.
			timeline: timeline,
			on_finish:function(data){
        jsPsych.data.displayData();
				serverPsych.save({
					data:data
				})
			},
			display_element: 'jsPsychTarget',
			on_trial_start:function(){
				$("#jsPsychTarget")[0].scrollIntoView();
			}
		});
	});
}
