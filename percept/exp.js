function runExperiment(){
	var prefix;
	//This is for local testing purposes, we define an "empty" server and other variables used for local purposes.
	if(typeof serverPsych === "undefined"){
		serverPsych = {
			request: function(func){
				func();
			}
		}
		Percept = {
			save:function(data){
				$.ajax({
			    url: 'server/save.php',
			    data : {data:  data.data.csv(), filename:jsPsych.data.getDataByTimelineNode("0.0-2.0").first().values()[0].code, group:data.group},
			    type: 'POST'
			  });
			}
		}
		prefix = "percept/stimuli/";
	}else {
		//this is the prefix when testing on cogmtl server.
		prefix = "/media/tamaudio/stimuli/";
	}

	serverPsych.request(function (settings){



		var languages = [];
		var language_levels = ['Muy mal', 'Mal','Regular','Bien', 'Muy bien', 'Excelente'];
		var language_order_name = ['Primera lengua', 'Segunda lengua', 'Tercera lengua', 'Cuarta lengua', 'Quinta lengua', 'Sexta lengua'];
		var currentGroup;
		function getCurrentLanguages(){
			return languages;
		};

		function getLanguageLevels(){
			return language_levels;
		}

		function getLanguage(i){
			if(languages[i])return languages[i];
			else return 'N/A';
		}



		function assignGroup(data){
			var spanish = ['Spanish', 'Español', 'Espanol', 'Espagnol'];
			var french = ['French', 'Français', 'Francais', 'Francés'];
			var english = ['English', 'Inglés', 'Ingles', 'Anglais'];
			var group;
			//"Native" speaker of spanish (N)
			if(spanish.indexOf(data['language_1']) != -1 && data['language_1_start'][0] == 'Nacimiento'){
				//Heritage speaker, simultaneous bilingual of Spanish/French
				if(french.indexOf(data['language_2']) != -1 && (data['language_2_start'][0] == 'Nacimiento' || data['language_2_age'] < 3)){
					group = "LHSIM";
				//Heritage speaker, sequential bilingual of Spanish/French
			}else if(french.indexOf(data['language_2']) != -1 && (data['language_2_start'][0] != 'Nacimiento' && data['language_2_age'] > 3)){
					group = "LHSEC";
				//Native speaker (we'll have to validate a few more things here)
			}else if((data['language_2_start'][0]) != 'Nacimiento' && data['language_2_age'] > 20){
					group = "N";
				}
			}
			//Search for spanish in other languages
			for(var i = 2; i < 6; i++){
				if(spanish.indexOf(data['language_' +i]) != -1 && data['language_'+i+'_start'][0] != 'Nacimiento'){
					console.log('Spanish as a ' +i+' language');
					group = 'L2';
				}
			}
			return group;
		}

		function isLanguageDisabled(i){
			if(languages[i])return false;
			else return true;
		}

		function validate_code(customCode){
				//This is the first node
				var data = jsPsych.data.getDataByTimelineNode("0.0-2.0").first().values()[0];
				var currentCode = data.code ? data.code.toUpperCase().trim() : '';
				var valid = false;
				//validate code
				if(customCode){
					if(currentCode && customCode.indexOf(currentCode) != -1){
						valid = true;
					}
				}else{
					var userCodes = ["L2AV01", "L2AV02","L2AV03", "L2AV04", "L2AV05", "L2AV06", "L2AV07", "L2AV08", "L2AV09", "L2AV10",
													 "L2INT01", "L2INT02", "L2INT03", "L2INT04", "L2INT05",
													 "LHSECAV01", "LHSECAV02", "LHSECAV03", "LHSECAV04", "LHSECAV05", "LHSECAV06",
													 "LHSECINT01", "LHSIMAV01", "LHSIMAV02", "LHSIMAV03", "LHSIMAV04", "LHSIMAV05",
													 "N01", "N02", "N03", "N04", "N05", "N06", "N07", "N08", "N09", "N10", "N11",
													 "N12", "N13", "N14", "N15", "N16", "N17", "N18", "N19", "N20", "N21", "N22", "N23", "N24", "N25", "N26", "N27", "N28", "N29", "N30",
											 		 "N31", "N32", "N33", "N34", "N35", "N36", "N37", "N38", "N39", "N40", "N41", "N42", "N43", "N44", "N45", "N46", "N47",
											 		 "SKIP_TO_END", "SKIP_PRACTICE"];
					if(!currentCode || userCodes.indexOf(currentCode) == -1){
						//invalid code
						valid = false;
					}else{
						valid = true;
					}
				}


				return !valid
		}

    /* create experiment timeline array */
    var timeline = [];

		timeline.push({
			type: "text",
			text: "<h3>TAM Audio</h3>\
				<div class=\"mdl-grid\">\
					<div class=\"mdl-cell mdl-cell--5-col\">\
						<p>Merci de vouloir participer à notre expérience. Avant de continuer, veuillez lire attentivement ce qui suit :</p>\
						<ul>\
					  <li>Avant de commencer l'expérience, vous devez donner votre consentement en cliquant sur « Je consens » au bas de la page suivante.</li>\
					  <li>Le formulaire de consentement est en français, mais le reste de l'expérience se déroulera en espagnol.</li>\
						<li>Vous devez effectuer cette expérience sur un <strong>ordinateur</strong> et non sur un téléphone portable, vous aurez à utiliser votre clavier.</li>\
						</ul>\
						<p>Maintenant, appuyez sur une touche pour continuer.</p>\
						</div>\
						<div class=\"mdl-cell mdl-cell--1-col\"></div>\
						<div class=\"mdl-cell mdl-cell--5-col\">\
						<p>Gracias por querer participar en nuestro experimento. Antes de continuar, por favor, lea atentamente lo siguiente:</p>\
						<ul>\
					  <li>Antes de comenzar el experimento, necesitamos su consentimiento. Para ello, tiene que hacer clic sobre el botón \"Je consens\" abajo de la página siguiente.</li>\
					  <li>El formulario de consentimiento está en francés, pero todo el resto de la prueba se hará en español.</li>\
						<li>Para hacer la prueba, se debe utilizar un <strong>ordenador</strong> y no un móvil.</li>\
						</ul>\
						<p>Ahora, presione cualquier tecla para continuar.</p>\
						</div>\
						</div>",
			mdl_layout: true,
		});


		timeline.push({
			type: "html",
			url: prefix + "../consentement.html",
			mdl_layout: true,
			cont_btn:"consent"
		});

		timeline.push({
			type: "form",
			schema: {
				form: {form_title : "TAM audio", layout_color: "grey-200", content_bg_color: "grey-100", ribbon_bg: "img/ribbon.jpg",	form_description: 'Si ya se te ha asignado un código, escríbelo aquí y continúa. Si no lo tienes, solo presiona continuar.', use_data_key: true},
				"code" :  {type: "text", label: "Código", needQuestion:false, floating:true, value:""},
				onSubmit: {label: "Continuar", onclick: function(){
					console.log(jsPsych.currentTimelineNodeID());
				}},
			}
		});

		//Linguistic background questionnaire
		// partially adapted from the Adult Multilingual Questionnaire (Blume,
		// Courtney, Urzúa, Yang & Lust, 2010), Unsworth’s (2012) Utrecht Bilingual Language
		// Exposure Calculator (UBiLEC) and Marian, Blumenfeld & Kaushanskaya’s (2007)
		// Language Experience and Proficiency Questionnaire (LEAP-Q).
		var background_questions = {
			timeline: []
		}



		background_questions.timeline.push({
			type: "form",
			schema: {
				form: {form_title : "Cuestionario", layout_color: "grey-200", content_bg_color: "grey-100", ribbon_bg: "img/ribbon.jpg",	form_description: ' '},
				"name" :  {type: "text", label: " ", question: "Nombre", required: true, errorInfo:"* Respuesta obligatoria"},
				"email" :  {type: "email", label: " ", question: "Correo electrónico", required: true, errorInfo:"* Correo electrónico válido obligatorio"},
				"sex" :  {type: "radio", labels: ["Hombre", "Mujer"], question:"Sexo", required: true, errorInfo:"* Respuesta obligatoria"},
				"birth_date" :  {type: "date", label:' ', question: "Fecha de nacimiento", required: true, errorInfo:"* Respuesta obligatoria"},
				"birth_place" :  {type: "text", label:" ", question: "Lugar de nacimiento", required: true, errorInfo:"* Respuesta obligatoria"},
				"arrival_canada" :  {type: "text", label: " ", question : "Fecha de llegada a Canadá", required: true, errorInfo:"* Respuesta obligatoria o <em>NA</em>", tooltip: "Si naciste en Canadá, escribe <em>NA</em>."},
				"years_montreal" :  {type: "text", label: " ", question:'¿Cuántos años hace que vives en Montreal?', required: true, errorInfo:"* Respuesta obligatoria", tooltip: "Si naciste en Montreal, escribe tu edad."},
				"otras_ciudades" :  {type: "radio", labels:["Sí", "No"], question: "¿Has vivido en otra ciudad de Canadá o del mundo?", required: true, errorInfo:"* Respuesta obligatoria"},
				"otras_ciudades_details" :  {type: "textarea", placeholder: "Ejemplo : Toronto, 2 años <br/>Beijing, 3 meses", question: "¿En cuáles y durante cuánto tiempo?", required: true, errorInfo:"* Respuesta obligatoria (puedes escribir <em>Ninguna</em>)", cols:60},
				"school_level" :  {type: "text", label: "Secundaria, licenciatura, máster, etc.", question: "Nivel de escolaridad", required: true, errorInfo:"* Respuesta obligatoria"},
				"school_language" :  {type: "text", label: "Lengua principal de enseñanza", question:"Lengua de escolaridad", required: true, errorInfo:"* Respuesta obligatoria"},
				"origin_mother" :  {type: "text", label: " ", question:"País de origen y lengua materna de tu madre", required: true, errorInfo:"* Respuesta obligatoria"},
				"origin_father" :  {type: "text", label: " ", question:"País de origen y lengua materna de tu padre", required: true, errorInfo:"* Respuesta obligatoria"},
				onSubmit: {label: "Continuar", onclick: function(){}}
			}
		});

		var language_tabs_form = {
			type: "form",
			schema: {
				form: {form_title : "Lenguas aprendidas", form_description:"¿Qué lenguas aprendiste cuando eras niño? ¿A qué edad? ¿Dónde y con quién las hablabas? <br />Puedes agregar hasta <strong>seis</strong> lenguas.", layout_color: "grey-200", content_bg_color: "grey-100", ribbon_bg: "img/ribbon.jpg", use_data_key:true},
				"languages": {type: 'tab', schema:[], add_tab : function(i){
					//Find next index
					var new_tab_schema = {
						tab: {tab_title: language_order_name[i-1], id: 'language_' + (i) + '_tab', use_data_key:true},
						["language_"+i] :  {type: "text", label: " ", question: language_order_name[i-1], required:true, errorInfo:"Por favor, entra un idioma", required: true, errorInfo:"* Respuesta obligatoria"},
						["language_"+(i)+"_start"] :  {type: "radio", labels:["Nacimiento", "Después"], question:"¿Desde cuándo?", required: true, errorInfo:"* Respuesta obligatoria"},
						["language_"+(i)+"_age"] :  {type: "text", label: "Escribir 0 si desde el 'nacimiento'", question:"¿Desde qué edad?", required: true, errorInfo:"* Respuesta obligatoria (puedes escribir 0)"},
						["language_"+(i)+"_where"] :  {type: "checkbox", labels:["Casa", "Guardería", "Otro lugar"], question:"¿Dónde la hablabas?", required: true, errorInfo:"* Respuesta obligatoria"},
						["language_"+(i)+"_who"] :  {type: "checkbox", labels:["Madre", "Padre", "Otra persona"], question:"¿Con quién la hablabas?", required: true, errorInfo:"* Respuesta obligatoria"},
					}
					return new_tab_schema;
				}, min_tabs:1, max_tabs:6, message_max_tabs: 'Has entrado el número máximo de lenguas.', remove_tab:{button_label:'Suprimir esta lengua'}},
				onSubmit: {label: "Continuar"}
			},on_finish: function(data) {
				var i = 1;
				while(data['language_' + i]){
					languages.push(data['language_' + i++]);
				}

				//Assign a group to this user
				currentGroup = assignGroup(data);
				// if(data['language_1'])languages.push(data['language_1']);
				// if(data['language_2'])languages.push(data['language_2']);
				// if(data['language_3'])languages.push(data['language_3']);
			}
		}

	  for(var i=1; i <= 2; i++){
	 		language_tabs_form.schema.languages.schema.push({
				tab: {tab_title: language_order_name[i-1], id: 'language_' + (i) + '_tab'},
				["language_"+i] :  {type: "text", label: " ", question:language_order_name[i-1], required:true, errorInfo:"Por favor, entra un idioma"},
				["language_"+(i)+"_start"] :  {type: "radio", labels:["Nacimiento", "Después"], question:"¿Desde cuándo?", required: true, errorInfo:"* Respuesta obligatoria"},
				["language_"+(i)+"_age"] :  {type: "text", label: "Escribir 0 si desde el 'nacimiento'", question:"¿Desde qué edad?", required: true, errorInfo:"* Respuesta obligatoria (puedes escribir 0)"},
				["language_"+(i)+"_where"] :  {type: "checkbox", labels:["Casa", "Guardería", "Otro lugar"], question:"¿Dónde la hablabas?", required: true, errorInfo:"* Respuesta obligatoria"},
				["language_"+(i)+"_who"] :  {type: "checkbox", labels:["Madre", "Padre", "Otra persona"], question:"¿Con quién la hablabas?", required: true, errorInfo:"* Respuesta obligatoria"},
			});
		}
		background_questions.timeline.push(language_tabs_form);

		background_questions.timeline.push({
			type: "form",
			schema: {
				form: {form_title : "Uso de la lengua", form_description:"Actualmente, en qué idioma prefieres ...", layout_color: "grey-200", content_bg_color: "grey-100", ribbon_bg: "img/ribbon.jpg"},
				"¿Leer?" :  {type: "dropdown", options: getCurrentLanguages, choose_prompt: 'Elige un idioma', required: true, errorInfo:"* Respuesta obligatoria"},
				"¿Escribir?" :  {type: "dropdown", options: getCurrentLanguages, choose_prompt: 'Elige un idioma', required: true, errorInfo:"* Respuesta obligatoria"},
				"¿Contar (números)?" :  {type: "dropdown", options: getCurrentLanguages, choose_prompt: 'Elige un idioma', required: true, errorInfo:"* Respuesta obligatoria"},
				"¿Discutir sobre temas que te apasionan?" :  {type: "dropdown", options: getCurrentLanguages, choose_prompt: 'Elige un idioma', required: true, errorInfo:"* Respuesta obligatoria"},
				onSubmit: {label: "Continuar"},
			}
		});
		background_questions.timeline.push({
			type: "form",
			schema: {
				form: {form_title : "Nivel de español", form_description: '', layout_color: "grey-200", content_bg_color: "grey-100", ribbon_bg: "img/ribbon.jpg"},
				"¿Has recibido clases de o en español?" :  {type: "radio", labels:["Sí", "No"], required: true, errorInfo:"* Respuesta obligatoria"},
				"¿Dónde? " :  {type: "text", label: " "},
				"¿Durante qué años?" :  {type: "text", label: " "},
				"¿Con quién hablas español actualmente?" :  {type: "text", label: " ", errorInfo:" *Respuesta obligatoria"},
				onSubmit: {label: "Continuar"},
			}
		});
		//Dominio de los idiomas
		background_questions.timeline.push({
			type: "form",
			schema: {
				form: {form_title : "Dominio de los idiomas", form_description: 'En tu opinión, ¿cómo dominas los idiomas que has aprendido?', layout_color: "grey-200", content_bg_color: "grey-100", ribbon_bg: "img/ribbon.jpg"},
				"language_1_level" :  {type: "radio", labels: language_levels, question: function(){return getLanguage(0)}, errorInfo:" *Respuesta obligatoria"},
				"language_2_level" :  {type: "radio", labels: language_levels, question: function(){return getLanguage(1)}, disabled:function(){return isLanguageDisabled(1)}},
				"language_3_level" :  {type: "radio", labels: language_levels, question: function(){return getLanguage(2)}, disabled:function(){return isLanguageDisabled(2)}},
				"language_4_level" :  {type: "radio", labels: language_levels, question: function(){return getLanguage(3)}, disabled:function(){return isLanguageDisabled(3)}},
				"language_5_level" :  {type: "radio", labels: language_levels, question: function(){return getLanguage(4)}, disabled:function(){return isLanguageDisabled(4)}},
				"language_6_level" :  {type: "radio", labels: language_levels, question: function(){return getLanguage(5)}, disabled:function(){return isLanguageDisabled(5)}},
				onSubmit: {label: "Continuar"},
			}
		});
		//Idiomas en la actualidad

		//Comentario
		background_questions.timeline.push({
			type: "form",
			schema: {
				form: {form_title : "Comentarios", form_description: '¿Tienes algún comentario o información adicional que crees que podría ser útil para este estudio?', layout_color: "grey-300", content_bg_color: "grey-100"},
				"Comentarios" :  {type: "textarea", question: 'Comentarios', placeholder:"Escribe aquí tus comentarios"},
 				onSubmit: {label: "Continuar"},
			}
		});

		background_questions.conditional_function = validate_code;

		timeline.push(background_questions);

		//Placement test (part A)
		//Adapted from DELE (Montrul, 2008)
		var placement_test = {timeline: [
			{
				type: "survey-multi-choice",
				mdl_layout: true,
				preamble: "<h3>Prueba de selección múltiple</h3><p><em>Cada una de las oraciones siguientes contiene un espacio que indica que una palabra o una frase ha sido omitida. A partir de las cuatro posibilidades que se te ofrecen, elige la que mejor completa la oración.</em></p>",
				questions: [
					"1. Al oír del accidente de su buen amigo, Paco se puso __________ .", //1
					"2. No puedo comprarlo porque me __________ dinero.", //2
					"3. Tuvo que guardar cama por estar __________ .", //3
					"4.  Aquí está tu café, Juanito.  No te quemes, que está muy __________ .", //4
					"5.  Al romper los anteojos, Juan se asustó porque no podía __________ sin ellos.", //5
					"6.  ¡Pobrecita!  Está resfriada y no puede __________ . ", //6
					"7.  Era una noche oscura sin __________ .", //7
					"8.  Cuando don Carlos salió de su casa, saludó a un amigo suyo:  -Buenos días,	 __________ .", //8
					"9.  ¡Qué ruido había con los gritos de los niños y el __________ de los perros!", //9
					"10.  Para saber la hora, don Juan miró el __________ .", //10
					"11.  Yo, que comprendo poco de mecánica, sé que el auto no puede funcionar sin __________ .", //11
					"12.  Nos dijo mamá que era hora de comer y por eso __________ .", //12
					"13.  ¡Cuidado con ese cuchillo o vas a __________ el dedo!", //13
					"14.  Tuvo tanto miedo de caerse que se negó a __________ con nosotros.", //14
					"15.  Abrió la ventana y miró: en efecto, grandes lenguas de __________ salían llameando de las casas.", //15
					"16. Compró ejemplares de todos los diarios pero en vano.  No halló __________ .", //16
					"17.  Por varias semanas acudieron colegas del difunto profesor a __________ el dolor de la viuda.", //17
					"18.  Sus amigos pudieron haberlo salvado pero lo dejaron __________ .", //18
					"19.  Al salir de la misa me sentía tan caritativo que no pude menos que __________ a un pobre mendigo que había allí sentado.", //19
					"20.  Al lado de la Plaza de Armas había dos limosneros pidiendo __________ .", //20
					"21.  Siempre maltratado por los niños, el perro no podía acostumbrarse a __________ de sus nuevos amos.", //21
					"22.  ¿Dónde estará mi cartera?  La dejé aquí mismo hace poco y parece que el necio de mi hermano ha vuelto a __________ .", //22
					"23.  Permaneció un gran rato abstraído, los ojos clavados en el fogón y el pensamiento __________ .", //23
					"24.  En vez de dirigir el tráfico estabas charlando, así que tú mismo __________ del choque.", //24
					"25.  Posee esta tierra un clima tan propio para la agricultura como para __________ .", //25
					"26.  Aficionado leal de obras teatrales, Juan se entristeció al saber __________ del gran actor.", //26
					"27.  Se reunieron a menudo para efectuar un tratado pero no pudieron __________ .", //27
					"28.  Se negaron a embarcarse porque tenían miedo de __________ .", //28
					"29.  La mujer no aprobó el cambio de domicilio pues no le gustaba __________ .", //29
					"30.  Era el único que tenía algo que comer pero se negó a __________ .", //30
				],
				options: [
					["alegre","fatigado","hambriento","desconsolado"], //1
					["falta","dan","presta","regalan"], //2
					["enfermo","vestido","ocupado","parado"], //3
					["dulce","amargo","agrio","caliente"], //4
					["discurrir","oír","ver","entender"], //5
					["salir de casa","recibir cartas","respirar con pena","leer las noticias"], //6
					["estrellas","camas","lágrimas","nubes"], //7
					["¿Qué va?","¿Cómo es?","¿Quién es?","¿Qué tal?"], //8
					["olor","sueño","hambre","ladrar"], //9
					["calendario","bolsillo","estante","despertador"], //10
					["permiso","comer","aceite","bocina"], //11
					["fuimos a nadar","tomamos asiento","comenzamos a fumar","nos acostamos pronto"], //12
					["cortarte","torcerte","comerte","quemarte"], //13
					["almorzar","charlar","cantar","patinar"], //14
					["zorros","serpientes","cuero","fuego"], //15
					["los diez centavos","el periódico perdido ","la noticia que deseaba","los ejemplos "], //16
					["aliviar","dulcificar","embromar","estorbar"], //17
					["ganar","parecer","perecer","acabar"], //18
					["pegarle","darle una limosna","echar una mirada","maldecir"], //19
					["pedazos","paz","monedas","escopetas"], //20
					["las caricias","los engaños","las locuras","los golpes"], //21
					["dejármela","deshacérmela","escondérmela","acabármela"], //22
					["en el bolsillo","en el fuego	","lleno de alboroto","Dios sabe dónde"], //23
					["sabes la gravedad	","eres testigo   ","tuviste la culpa","conociste a las víctimas"], //24
					["la construcción de trampas   ","el fomento de motines","el costo de vida","la cría de reses"], //25
					["del fallecimiento","del éxito","de la buena suerte","de la alabanza"], //26
					["desavenirse   ","echarlo a un lado","rechazarlo","llevarlo a cabo"], //27
					["los peces","los naufragios","los faros","las playas"], //28
					["el callejeo","el puente","esa estación","aquel barrio"], //29
					["hojearlo","ponérselo","conservarlo","repartirlo"], //30

				],
				 data: {answers : ["desconsolado", //1
				  								 "falta", //2
													 "enfermo", //3
													 "caliente", //4
													 "ver", //5
													 "salir de casa", //6
													 "estrellas", //7
													 "¿Qué tal?", //8
													 "ladrar", //9
													 "despertador", //10
													 "aceite", //11
													 "tomamos asiento", //12
													 "cortarte", //13
													 "patinar", //14
													 "fuego", //15
													 "la noticia que deseaba", //16
													 "aliviar", //17
													 "perecer", //18
													 "darle una limosna", //19
													 "monedas", //20
													 "las caricias", //21
													 "escondérmela", //22
													 "Dios sabe dónde", //23
													 "tuviste la culpa", //24
													 "la cría de reses", //25
													 "del fallecimiento", //26
													 "llevarlo a cabo", //27
													 "los naufragios", //28
													 "aquel barrio", //29
													 "repartirlo", //30
												  ] },
				 horizontal: true,
				 button_label: "Enviar mis respuestas",
				 on_finish: function(data){
					 //correct the test,
					 var a_responses = jQuery.parseJSON( data.responses );
					 var numerical_index, response_key;
					 var a_correct = {};
					 var total_score = 0;
					 for(response_key in a_responses){
						 numerical_index = parseInt(response_key.match(/[0-9]+/)[0]);
						 if(data.answers[numerical_index] && data.answers[numerical_index] == a_responses[response_key]){
							 //console.log (response_key  + " is correct "  + data.answers[numerical_index]);
							 total_score++;
							 a_correct[response_key] = true;
						 }else{
							 //console.log (response_key  + " is incorrect");
							 a_correct[response_key] = false;
						 }
					 }
					 jsPsych.data.addDataToLastTrial({correct: a_correct});
					 jsPsych.data.addDataToLastTrial({score: total_score});
					//  .each(function(response){
					// 	 console.log(response);
					//  })
				 }
			}
		]}
		placement_test.conditional_function = validate_code;
		timeline.push(placement_test);

		//Placement test (part B) - cloze test
		//Adapted from DELE (Montrul, 2008)
		var cloze_test = {timeline: [
			{
				type: "cloze",
				text: "<p><em>En el siguiente texto, algunas palabras han sido sustituidas por listas de opciones. " +
								"Primero, lee el texto completo para poder entenderlo. Después, vuelve a leerlo y elige en las listas de opciones " +
								"la palabra que mejor corresponde a cada oración. Para confirmar tus respuestas al final del texto, pulsa el botón 'Enviar mis respuestas' </em></p>"+
								"<h4>El sueño de Joan Miro</h4>" +
							"<p>Hoy se inaugura en Palma de Mallorca la Fundación Pilar y Joan Miró, en el mismo lugar en donde el artista vivió sus últimos treinta y cinco años. " +
							"El sueño de Joan Miró se ha ${=cumplido~completado~terminado}.  " + //1
							"Los fondos donados a la ciudad por el pintor y su esposa en 1981 permitieron que el sueño se ${inició~=iniciara~iniciaba}; "+ //2
							"más tarde, en 1986, el Ayuntamiento de Palma de Mallorca decidió ${=encargar~pedir~mandar} "+//3
							"al arquitecto Rafael Moneo un edificio que ${hubiera servido~haya servido~=sirviera} "+ //4
							"a la vez como sede de la entidad y como museo moderno.  El proyecto ha tenido que ${=superar~enfrentarse~acabar} múltiples obstáculos de carácter administrativo. "+ //5
							"Miró, coincidiendo ${por~en~=con} los deseos de toda su familia, "+ //6
							"quiso que su obra no quedara expuesta en ampulosos panteones de arte o en ${voluntad~=poder~favor} de coleccionistas acaudalados; "+ //7
							"por ello, en 1981, creó la fundación mallorquina. Y cuando estaba ${al~en~=a} punto de morir, "+ //8
							"donó terrenos y edificios, así como las obras de arte que en ellos ${habría~=había~hubo}.</p>"+ //9
							"<p>El edificio que ha construido Rafael Moneo se enmarca en ${que~el que~=lo que} se denomina “Territorio Miró”, "+ //10
							"espacio en el que se han ${pretendido~=tratado~intentado} de situar los distintos edificios que constituyen la herencia del pintor.</p>" + //11
							"<p>El acceso a los mismos quedará ${disminuido~escaso~=restringido} para evitar el deterioro de las obras.  " + //12
							"Por otra parte, se ${darán~=enseñarán~dirán}, en los talleres de grabado y litografía, "+ //13
							"cursos ${=sobre~en~para} las distintas técnicas de estampación.  "+ //14
							"Estos talleres también se cederán periódicamente a distintos artistas contemporáneos, ${ya~=así~para} "+ //15
							"se busca que el “Territorio Miró” ${será~=sea~es} un centro vivo de creación "+ //16
							"y difusión del arte a todos ${casos~aspectos~=niveles}.</p>" + //17
							"<p>La entrada costará 500 pesetas y las previsiones dadas a conocer ayer aspiran ${a~de~=para} "+ //18
							"que el centro acoja a unos 150.000 visitantes al año. Los responsables esperan que la institución funcione a ${total~=pleno~entero} "+ //19
							"rendimiento a principios de la ${=siguiente~próxima~pasada} semana, "+ //20
							"si bien el catálogo completo de las obras de la Fundación Pilar y Joan Miró no estará listo hasta dentro de dos años.</p>",
				 button_label: "Enviar mis respuestas",
				 mdl_layout: true
				},
			]}

		cloze_test.conditional_function = validate_code;

		timeline.push(cloze_test);

		//PAUSA

		//Juicio de oraciones

    /* define welcome message block */
    var welcome_block = {timeline: [{
      type: "text",
			mdl_layout: true,
      text: "<h3>¿Listo?</h3>"+
						"<p>Estás a punto de empezar el experimento.</p>" +
						"<p>Necesitarás oír frases, asegúrate de que tienes audífonos o altavoces conectados.</p>" +
            "<p>Presiona cualquier tecla para continuar.</p>",
	    }], conditional_function: function(){return validate_code(['SKIP_TO_END', 'SKIP_PRACTICE'])}
		};
    timeline.push(welcome_block);

    /* define instructions block */
    var instructions_block = {timeline:[{
      type: "single-audio",
      stimulus: prefix + "instrucciones.mp3",
			mdl_layout:true,
      prompt: "<p>En esta prueba vas a oír varias frases. Escúchalas y decide en cada caso si pueden haber sido dichas por un hablante nativo del español.</p>" +
            "<p>Debes utilizar la escala que se te ofrece. Esta escala contiene cinco números de -2 a 2, los cuales corresponden a las siguientes respuestas: </p>" +
            "<ul style=''>" +
            "<li>-2: estoy seguro de que no podría ser dicha por un hablante nativo</li>" +
            "<li>-1: creo que no podría ser dicha por un hablante nativo</li>" +
            "<li>1: creo que podría ser dicha por un hablante nativo</li>" +
            "<li>2: estoy seguro de que podría ser dicha por un hablante nativo</li>" +
            "<li>0: no sé (por favor, evita esta respuesta dentro de lo posible)</li>" +
            "</ul>" +
						"<p>Cada vez que marques -2 o -1 en la escala, la frase aparecerá en pantalla. Por favor, corrígela para que parezca haber sido dicha por un hablante nativo.</p> " +
						"<p>Vas a oír cada frase dos veces antes de responder. Es importante que sigas tu primer impulso al contestar, entonces, responde rápidamente.  </p> " +
						"<p>Ahora presiona cualquier tecla para continuar.</p> " +
            "",
      timing_post_trial: 0,
			}], conditional_function: function(){return validate_code(['SKIP_TO_END', 'SKIP_PRACTICE'])}
    };

    timeline.push(instructions_block);

		// Here we define the stimuli for the GJT
		// From this list, we later build a timeline
		// Stimuli and timeline are defined separately to avoid repeating large amount of code.
		// Go and no-go are arbitraty value for "Good" or "Bad".

		var practice = [
			{ text: "Pedro y Elena estuvieron cansados durante cuatro años. Se divorciaron la semana pasada.",
				correct: ["Pedro y Elena estuvieron casados durante cuatro años. Se divorciaron la semana pasada."],
		    response: "no-go",
		    audio: "prac-01.mp3",
				feedback_negative: "Tenías que reemplazar la palabra 'cansados' por 'casados'",
				feedback_positive: "¡Muy bien!, continuamos con otro item de práctica."
		  },
			{ text: "Mis amigos tienen un examen muy difícil mañana, por eso han ido hoy a estudiar a la biblioteca.",
		    response: "go",
		    audio: "prac-02.mp3",
				feedback_negative: "En esta frase, no había nada que corregir.",
				feedback_positive: "¡Muy bien!, continuamos con otro item de práctica."
		  },
			{ text: "Los niños buscan una pelota que se les haya perdido. ¿No la has visto?",
				correct: ["Los niños buscan una pelota que se les ha perdido. ¿No la has visto?"],
		    response: "no-go",
		    audio: "prac-03.mp3",
				feedback_negative: "Tenías que reemplazar el verbo 'haya' por 'ha'",
				feedback_positive: "¡Muy bien, continuamos con otro item de práctica"
		  },
			{ text: "Me gustaría ir a visitar a mi hermano mañana, pero no voy a poder ir porque trabajo todo el día",
		    response: "go",
		    audio: "prac-04.mp3",
				feedback_negative: "En esta frase, no había nada que corregir.",
				feedback_positive: "¡Muy bien! La práctica ha terminado."
		  }];


			var practice_block;
	    for(var i = 0; i < practice.length; i++){
	      practice_block = {timeline: [
					{
	          type: "single-audio",
	          stimulus: '' + prefix + practice[i].audio + '',
	          prompt: "<h2 style='text-align:center'>Práctica {0}/{1}</h2>".format(i+1, practice.length),
	          trial_ends_after_audio : true,
						timing_post_trial_internal: 1000,
						mdl_layout: true,
	        },
					//Repeat stimuli twice with a one-second delay inbetween.
					{
	          type: "single-audio",
	          stimulus: '' + prefix + practice[i].audio + '',
	          prompt: "<h2 style='text-align:center'>Práctica {0}/{1} (bis)</h2>".format(i+1, practice.length),
	          trial_ends_after_audio : true,
						mdl_layout: true,
	        },
	        {
	          type: "survey-likert",
	          questions: ['¿Qué te ha parecido?'],
	          labels : [['-2 (no nativo)', '-1', '0 (no sé)', '1', '2 (nativo)']],
	          data: {"response" : practice[i].response, 'item_id':'pre_'+i, feedback_positive: practice[i].feedback_positive, feedback_negative: practice[i].feedback_negative},
	          button_label : "Confirmar",
						required: true,
						mdl_layout: true,
						oninvalid:"Tienes que elegir un valor en la escala, si no estás seguro, puedes seleccionar 0.",
	          on_finish: function(data){
	            var correct = false;
	            if(data.response == 'go' && data.rt > -1 && jQuery.parseJSON( data.responses ).Q0 > 2){
	              correct = true;
								alert(data.feedback_positive);
	            } else if(data.response == 'no-go' && data.rt > -1 && jQuery.parseJSON( data.responses ).Q0 < 2){
	              correct = true;
	            }else if(jQuery.parseJSON( data.responses ).Q0 > 2){
								alert(data.feedback_negative);
							}
	            jsPsych.data.addDataToLastTrial({correct: correct, likert: jQuery.parseJSON( data.responses ).Q0});
	          },
	        },
	        {
	          timeline : [
	            {
	              type: "survey-text",
	              preamble: '¿La frase no te parece correcta? Corrígela: ',
	              questions: [practice[i].text],
	              values: [practice[i].text],
	              rows: [2],
	              columns: [120],
	              button_label : "Confirmar",
								mdl_layout: true,
	              data: {'answer': practice[i].correct ? practice[i].correct : [], 'item_id':'pre' + i, feedback_positive: practice[i].feedback_positive, feedback_negative: practice[i].feedback_negative},
								on_finish: function(data){
									var data = jsPsych.data.getLastTrialData().first().values()[0]
									var answer =  jQuery.parseJSON(data.responses).Q0;
									var correct = false;
									for(i in data.answer){
										if(answer.trim() == data.answer[i].trim()){
											correct = true;
											alert(data.feedback_positive);
										}
									}
									if(!correct)alert(data.feedback_negative);
			            jsPsych.data.addDataToLastTrial({correct: correct, response: answer});
			          },
	            }],
	          conditional_function: function(){
	            var data = jsPsych.data.getLastTrialData().first().values()[0];
	            if(jQuery.parseJSON( data.responses ).Q0 < 2)
	              return true;
	            else
	              return false;
	          }
	        }],
	        choices: [13],
					conditional_function: function(){return validate_code(['SKIP_TO_END', 'SKIP_PRACTICE'])}
				};

	      timeline.push(practice_block);
	    }

		var get_ready_block = {timeline:[{
      type: "text",
			mdl_layout: true,
      text: "<h3>La práctica ha terminado</h3>" +
            "<p>Ahora, la prueba va a empezar.</p>" +
            "<p>Por favor, hazla de una vez, sin interrupción.</p>" +
						"<p>Presiona cualquier tecla para continuar.</p>",

		    }],
				conditional_function: function(){return validate_code(['SKIP_TO_END', 'SKIP_PRACTICE'])}
			};

		timeline.push(get_ready_block);

    var stimuli = [
			{ text: "Contrataremos una persona que hable holandés, si logramos encontrar alguna.",
		    response: "go",
		    audio: "stim-01.mp3"
		  },
		  { text: "Luis y Pedro quieren amueblar la casa porque les gusta más vacía.",
		    correct: ["Luis y Pedro no quieren amueblar la casa porque les gusta más vacía.", "Luis y Pedro quieren amueblar la casa porque ya no les gusta vacía.", "Luis y Pedro no quieren amueblar la casa porque les gusta más vacía."],
		    response: "no-go",
		    audio: "stim-02.mp3"
		  },
		  { text: "Quiero una lavadora que indica la temperatura. La venden en Amazon y está barata.",
		    response: "go",
		    audio: "stim-03.mp3"
		  },
		  { text: "Esteban y su hermano se parecen mucho. Siempre los confundo.",
		    response: "go",
		    audio: "stim-04.mp3"
		  },
		  { text: "Compraré una casa que queda en el centro, si hay alguna a buen precio.",
		    correct: ["Compraré una casa que quede en el centro, si hay alguna a buen precio."],
		    response: "no-go",
		    audio: "stim-05.mp3"
		  },
		  { text: "Necesitamos un director que le conviene a la empresa, pero creo que ninguno de los candidatos es bueno para dirigir.",
		    correct: ["Necesitamos un director que le convenga a la empresa, pero creo que ninguno de los candidatos es bueno para dirigir."],
		    response: "no-go",
		    audio: "stim-06.mp3"
		  },
		  { text: "Tengo que alquilar una camioneta para la mudanza. Nos mudamos este sábado.",
		    response: "go",
		    audio: "stim-07.mp3"
		  },
		  { text: "Quiero un motor que no haga ruido, pero no hay ninguno en esta tienda.",
		    response: "go",
		    audio: "stim-08.mp3"
		  },
		  { text: "Tengo que resolver un problema difícil, por eso necesito tu ayuda.",
		    response: "go",
		    audio: "stim-09.mp3"
		  },
		  { text: "Quiero un libro que contenga muchos personajes fantásticos. Se titula \"La historia sin fin\". ",
		    correct: ["Quiero un libro que contiene muchos personajes fantásticos. Se titula \"La historia sin fin\". "],
		    response: "no-go",
		    audio: "stim-10.mp3"
		  },
		  { text: "Viajaremos a Canadá en el verano porque queremos conocer la nieve. ",
		    correct: ["Viajaremos a Canadá en el verano porque no queremos conocer la nieve. ", "No viajaremos a Canadá en el verano porque queremos conocer la nieve. "],
		    response: "no-go",
		    audio: "stim-11.mp3"
		  },
		  { text: "Compraré un traje que va bien con el tuyo, si encuentro alguno en esta tienda. ",
		    correct: ["Compraré un traje que vaya bien con el tuyo, si encuentro alguno en esta tienda. "],
		    response: "no-go",
		    audio: "stim-12.mp3"
		  },
		  { text: "Tenemos que encontrar una enciclopedia que muestra todos los cuadros de Picasso. No recuerdo en qué estante la puse. ",
		    response: "go",
		    audio: "stim-13.mp3"
		  },
		  { text: "Me gusta mucho la pera, pero prefiero la manzana. ",
		    response: "go",
		    audio: "stim-14.mp3"
		  },
		  { text: "Podemos navegar en un barco que tenga cuatro cabinas. Es aquel que pertenece a la compañía \"Caribe sol\".  ",
		    correct: ["Podemos navegar en un barco que tiene cuatro cabinas. Es aquel que pertenece a la compañía \"Caribe sol\".  "],
		    response: "no-go",
		    audio: "stim-15.mp3"
		  },
		  { text: "Necesitamos un autobús que tiene asientos vacíos, pero están todos llenos.  ",
		    correct: ["Necesitamos un autobús que tenga asientos vacíos, pero están todos llenos.  "],
		    response: "no-go",
		    audio: "stim-16.mp3"
		  },
		  { text: "Busco a mi perro porque no quiero encontrarlo.  ",
		    correct: ["Busco a mi perro porque quiero encontrarlo.  "],
		    response: "no-go",
		    audio: "stim-17.mp3"
		  },
		  { text: "Debo comprar una corbata que va bien con mi camisa azul. ¿Cuál me recomiendas?  ",
		    correct: ["Debo comprar una corbata que vaya bien con mi camisa azul. ¿Cuál me recomiendas?   "],
		    response: "no-go",
		    audio: "stim-18.mp3"
		  },
		  { text: "María debe comprar un perro porque tiene ratones en la casa.   ",
		    correct: ["María debe comprar un gato porque tiene ratones en la casa.   "],
		    response: "no-go",
		    audio: "stim-19.mp3"
		  },
		  { text: "Buscamos un perro que tenga una sola oreja. Se llama Fido.  ",
		    correct: ["Buscamos un perro que tiene una sola oreja. Se llama Fido.   "],
		    response: "no-go",
		    audio: "stim-20.mp3"
		  },
		  { text: "Con tu experiencia como curador artístico, puedes trabajar en una tienda que vende obras de arte. Busca en Internet, seguro hay alguna en esta ciudad.  ",
		    correct: ["Con tu experiencia como curador artístico, puedes trabajar en una tienda que venda obras de arte. Busca en Internet, seguro hay alguna en esta ciudad."],
		    response: "no-go",
		    audio: "stim-21.mp3"
		  },
		  { text: "Prefiero un museo que tenga dinosaurios, pero si tiene dinosaurios no me gusta.  ",
		    correct: ["Prefiero un museo que no tenga dinosaurios, porque si tiene dinosaurios no me gusta.   "],
		    response: "no-go",
		    audio: "stim-22.mp3"
		  },
		  { text: "Debes utilizar un ordenador que esté conectado a la red. Es el que está al lado de la puerta de entrada.  ",
		    correct: ["Debes utilizar un ordenador que está conectado a la red. Es el que está al lado de la puerta de entrada.   "],
		    response: "no-go",
		    audio: "stim-23.mp3"
		  },
		  { text: "Contrataremos un músico que toca el bajo, pero por el momento solo encontramos pianistas.  ",
		    correct: ["Contrataremos un músico que toque el bajo, pero por el momento solo encontramos pianistas.   "],
		    response: "no-go",
		    audio: "stim-24.mp3"
		  },
		  { text: "Necesitamos un gato porque hay ratones en casa.   ",
		    response: "go",
		    audio: "stim-25.mp3"
		  },
		  { text: "Buscamos un restaurante que no cuesta muy caro, me han dicho que se llama \"El Marino\".  ",
		    response: "go",
		    audio: "stim-26.mp3"
		  },
		  { text: "Mis abuelos visitarán un lugar en el que hace buen tiempo. Se van para Cuba.  ",
		    response: "go",
		    audio: "stim-27.mp3"
		  },
		  { text: "Iremos al cine a ver una película sobre los dinosaurios. Comienza a las 4:00.  ",
		    response: "go",
		    audio: "stim-28.mp3"
		  },
		  { text: "Leeré un libro que habla de Beethoven. Me lo regaló mi hermano.  ",
		    response: "go",
		    audio: "stim-29.mp3"
		  },
		  { text: "Tengo que organizar una cena para vegetarianos, por eso he comprado carne de res y de cerdo.  ",
		    correct: ["Tengo que organizar una cena para vegetarianos, por eso no he comprado carne de res ni de cerdo.   ", "Tengo que organizar una cena para vegetarianos, por eso no he comprado carne.   "],
		    response: "no-go",
		    audio: "stim-30.mp3"
		  },
		  { text: "Necesito un lápiz que escriba oscuro. Es ese rojo que está sobre la mesa, ¿me lo pasas?  ",
		    correct: ["Necesito un lápiz que escribe oscuro. Es ese rojo que está sobre la mesa, ¿me lo pasas?   "],
		    response: "no-go",
		    audio: "stim-31.mp3"
		  },
		  { text: "Veremos una película que esté nominada a un Oscar. Se titula \"Boyhood\".  ",
		    correct: ["Veremos una película que está nominada a un Oscar. Se titula \"Boyhood\".   "],
		    response: "no-go",
		    audio: "stim-32.mp3"
		  },
		  { text: "Busco un hotel barato, pero todos son caros.  ",
		    response: "go",
		    audio: "stim-33.mp3"
		  },
		  { text: "Tenemos que encontrar un mapa que muestre los lugares turísticos de Roma. Creo que lo puse en la maleta verde.  ",
		    correct: ["Tenemos que encontrar un mapa que muestra los lugares turísticos de Roma. Creo que lo puse en la maleta verde.   "],
		    response: "no-go",
		    audio: "stim-34.mp3"
		  },
		  { text: "Comeremos una manzana que está barata esta semana. La cultivan aquí en Quebec. ",
		    response: "go",
		    audio: "stim-35.mp3"
		  },
		  { text: "Quiero una habitación que tiene mucha luz, pero solo hay habitaciones oscuras en este edificio.  ",
		    correct: ["Quiero una habitación que tenga mucha luz, pero solo hay habitaciones oscuras en este edificio.   "],
		    response: "no-go",
		    audio: "stim-36.mp3"
		  },
		  { text: "Debo vender una casa que tiene piscina y jardín. Creo que será difícil venderla porque es muy cara.  ",
		    response: "go",
		    audio: "stim-37.mp3"
		  },
		   { text: "Quiero comprar unos zapatos para la carrera del domingo.  ",
		    response: "go",
		    audio: "stim-38.mp3"
		  },
		   { text: "En esta biblioteca puedes leer un libro que esté escrito en alemán. Hay muchos en el segundo piso.   ",
		    response: "go",
		    audio: "stim-39.mp3"
		  },
		  { text: "Busco un libro que tiene reproducciones de pinturas de Leonardo da Vinci. Es azul y verde, ¿no lo has visto?     ",
		    response: "go",
		    audio: "stim-40.mp3"
		  },
		  { text: "Necesito un libro para leer, pero no sé leer. ",
		    correct: ["No necesito un libro para leer porque no sé leer.  "],
		    response: "no-go",
		    audio: "stim-41.mp3"
		  },
		   { text: "Te cantaré una canción que te haga feliz. ¿Tienes alguna sugerencia?  ",
		    response: "go",
		    audio: "stim-42.mp3"
		  },
		  { text: "Tengo que cocinar un plato que le guste mucho. Dime qué le gusta comer.  ",
		    response: "go",
		    audio: "stim-43.mp3"
		  },
		  { text: "Es suficiente con dos litros de leche pero cuatro litros no alcanzan. ",
		    correct: ["No es suficiente con dos litros de leche, por tanto, cuatro litros no alcanzan.  "],
		    response: "no-go",
		    audio: "stim-44.mp3"
		  },
		  { text: "Necesito un libro que ayude a comprender la física de manera fácil, pero creo que nadie ha escrito todavía un libro así.  ",
		    response: "go",
		    audio: "stim-45.mp3"
		  },
		  { text: "Pediremos una comida que contenga poca grasa. ¿Me recomienda algún plato en particular?  ",
		    response: "go",
		    audio: "stim-46.mp3"
		  },
		  { text: "Esta noche podemos ver un programa que critica el sistema de salud. Comienza a las 10:00.  ",
		    response: "go",
		    audio: "stim-47.mp3"
		  },
		  { text: "Miguel prefiere jugar al fútbol que al tenis. Es que el fútbol es un deporte más divertido. ",
		    response: "go",
		    audio: "stim-48.mp3"
		  },
		  { text: "Tengo que alquilar una camioneta que carga hasta 1000 kilogramos, pero no existe ninguna así.   ",
		    correct: ["Tengo que alquilar una camioneta que cargue hasta 1000 kilogramos, pero no existe ninguna así.  "],
		    response: "no-go",
		    audio: "stim-49.mp3"
		  },
		  { text: "Miguel busca un negocio que venda muebles antiguos. Le han dicho que en la capital podrá encontrar alguno.   ",
		    response: "go",
		    audio: "stim-50.mp3"
		  },
		  { text: "Laura verá en el cine una película que la haga llorar. La ha visto más de diez veces.   ",
		    correct: ["Laura verá en el cine una película que la hace llorar. La ha visto más de diez veces.  "],
		    response: "no-go",
		    audio: "stim-51.mp3"
		  },
		  { text: "Juan tiene que ir al trabajo en bicicleta porque está desempleado.    ",
		    correct: ["Juan no tiene que ir al trabajo en bicicleta porque está desempleado.   "],
		    response: "no-go",
		    audio: "stim-52.mp3"
		  },
		  { text: "Debes leer un libro que te permita comprender el subjuntivo. En esta biblioteca seguro encontrarás alguno.  ",
		    response: "go",
		    audio: "stim-53.mp3"
		  },
		  { text: "En el próximo concierto tocaremos una guitarra que tenga doce cuerdas. La acabo de comprar en la tienda.  ",
		    correct: ["En el próximo concierto tocaremos una guitarra que tiene doce cuerdas. La acabo de comprar en la tienda.  "],
		    response: "no-go",
		    audio: "stim-54.mp3"
		  },
		]

    var test_block;
    for(var i = 0; i < stimuli.length; i++){
      test_block = {timeline: [
				{
          type: "single-audio",
          stimulus: '' + prefix + stimuli[i].audio + '',
          prompt: "<h2 style='text-align:center'>{0}/{1}</h2>".format(i+1, stimuli.length),
          trial_ends_after_audio : true,
					timing_post_trial_internal: 1000,
					mdl_layout: true,
        },
				//Repeat stimuli twice with a one-second delay inbetween.
				{
          type: "single-audio",
          stimulus: '' + prefix + stimuli[i].audio + '',
          prompt: "<h2 style='text-align:center'>{0}/{1} (bis)</h2>".format(i+1, stimuli.length),
          trial_ends_after_audio : true,
					mdl_layout: true,
        },
        {
          type: "survey-likert",
          questions: ['¿Qué te ha parecido?'],
          labels : [['-2 (no nativo)', '-1', '0', '1', '2 (nativo)']],
          data: {"response" : stimuli[i].response, 'item_id':i},
          button_label : "Confirmar",
					mdl_layout: true,
					required: true,
					oninvalid:"Tienes que elegir un valor en la escala, si no estás seguro, puedes seleccionar 0.",
          on_finish: function(data){
            var correct = false;
            if(data.response == 'go' && data.rt > -1 && jQuery.parseJSON( data.responses ).Q0 > 2){
              correct = true;
            } else if(data.response == 'no-go' && data.rt > -1 && jQuery.parseJSON( data.responses ).Q0 < 2){
              correct = true;
            }
            jsPsych.data.addDataToLastTrial({correct: correct, likert: jQuery.parseJSON( data.responses ).Q0});
          },
        },
        {
          timeline : [
            {
              type: "survey-text",
              preamble: '¿La frase no te parece correcta? Corrígela: ',
              questions: [stimuli[i].text],
              values: [stimuli[i].text],
              rows: [2],
              columns: [120],
              button_label : "Confirmar",
							mdl_layout: true,
              data: {'answer': stimuli[i].correct ? stimuli[i].correct : [], 'item_id':i},
							on_finish: function(data){
								var data = jsPsych.data.getLastTrialData().first().values()[0]
								var answer =  jQuery.parseJSON(data.responses).Q0;
								var correct = false;
								for(i in data.answer){
									if(answer.trim() == data.answer[i].trim()){
										correct = true;
									}
								}
		            jsPsych.data.addDataToLastTrial({correct: correct, response: answer});
		          },
            }],
          conditional_function: function(){
            var data = jsPsych.data.getLastTrialData().first().values()[0];
            if(jQuery.parseJSON( data.responses ).Q0 < 2)
              return true;
            else
              return false;
          }
        }],
        choices: [13],
				conditional_function: function(){return validate_code(['SKIP_TO_END'])}
			};

      timeline.push(test_block);
    }


		//Create timeline here.
		jsPsych.init({
			//pass timeline var here.
			timeline: timeline,
			on_finish:function(data){
        //jsPsych.data.displayData('');
				//jsPsych.data.get().localSave('CSV', 'mydata.csv');
				//data = data.getDataAsCSV([{trial_type: 'form'}, {trial_type: 'survey-multi-choice'}, {trial_type: 'cloze'}, {trial_type: 'survey-likert'}, {trial_type: 'survey-text'}]);
				var display_element = jsPsych.getDisplayElement();

				display_element.innerHTML = jsPsych.pluginAPI.getMDLLayout('<h3>{0}</h3><p>{1}</p><p>{2}</p>'.format('Fin del experimento', 'Ya has terminado. ¡Muchas gracias por tu participación!', "No dudes en contactarnos si tienes preguntas o si algo te ha parecido extraño en la prueba."));

				Percept.save({
					data:data,
					group:currentGroup
				})
			},
			display_element: 'jsPsychTarget',
			on_trial_start:function(){
				if($("#loading").length) $("#loading").remove();
				$("#jsPsychTarget")[0].scrollIntoView();
			}
		});
	});
}
