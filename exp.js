function runExperiment(){
	var prefix;
	//This is for local testing purposes, we define an "empty" server and other variables used for local purposes.
	if(typeof serverPsych === "undefined"){
		serverPsych = {
			request: function(func){
				func();
			}
		}
		prefix = "percept/stimuli/";
	}else {
		//this is the prefix when testing on cogmtl server.
		prefix = "/media/tamaudio/stimuli/";
	}

	serverPsych.request(function (settings){

    /* create experiment timeline array */
    var timeline = [];

		//Linguistic background questionnaire
		// partially adapted from the Adult Multilingual Questionnaire (Blume,
		// Courtney, Urzúa, Yang & Lust, 2010), Unsworth’s (2012) Utrecht Bilingual Language
		// Exposure Calculator (UBiLEC) and Marian, Blumenfeld & Kaushanskaya’s (2007)
		// Language Experience and Proficiency Questionnaire (LEAP-Q).
		var background_questions = {timeline: [{
      type: "form",
			schema: {
				form: {form_title : "Cuestionario", layout_color: "grey-300", content_bg_color: "grey-100"},
				"Nombre" :  {type: "text", required: true},
				"Edad" :  {type: "text", required: true},
				"Sexo" :  {type: "radio", labels: ["Hombre", "Mujer"], required: true},
				"Fecha de nacimiento" :  {type: "date", required: true},
				"Lugar de nacimiento" :  {type: "text", required: true},
				"Fecha de llegada a Canadá (si naciste en otro país):" :  {type: "text", required: true},
				"¿Cuántos años hace que vives en Montreal?" :  {type: "text", required: true},
				"¿Has vivido en otra ciudad de Canadá o del mundo?" :  {type: "radio", labels:["Sí", "No"], required: true},
				"¿En cuáles y durante cuánto tiempo?" :  {type: "text"},
				"Nivel de escolaridad" :  {type: "text"},
				"Lengua de escolaridad" :  {type: "text", required: true},
				"País de origen y lengua materna de tu madre" :  {type: "text", required: true},
				"País de origen y lengua materna de tu padre" :  {type: "text", required: true},
				onSubmit: {label: "Continuar"},
			}
    }, {
			type: "form",
			schema: {
				form: {form_title : "1a lengua", layout_color: "grey-300", content_bg_color: "grey-100"},
				"Lengua" :  {type: "text", required: true},
				"Edad" :  {type: "text", required: true},
				onSubmit: {label: "Continuar"},
			}
		}, {
			type: "form",
			schema: {
				form: {form_title : "2a lengua", layout_color: "grey-300", content_bg_color: "grey-100"},
				"Lengua" :  {type: "text", required: true},
				"Edad" :  {type: "text", required: true},
				onSubmit: {label: "Continuar"}
			}
		}, {
			type: "form",
			schema: {
				form: {form_title : "3a lengua", layout_color: "grey-300", content_bg_color: "grey-100"},
				"Lengua" :  {type: "text", required: true},
				"Edad" :  {type: "text", required: true},
				onSubmit: {label: "Continuar"},
			}
		}]
	};
	//timeline.push(background_questions);

		//Placement test (part A)
		//Adapted from DELE (Montrul, 2008)
		var placement_test = {timeline: [
			{
				type: "survey-multi-choice",
				prompt: "Cada una de las oraciones siguientes contiene un espacio que indica que una palabra o una frase ha sido omitida. A partir de las cuatro posibilidades que se te ofrecen, elige la que mejor completa la oración.",
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
				 horizontal: true,
				 button_label: "Enviar mis respuestas"
			}
		]}
		timeline.push(placement_test);

		//Placement test (part B) - cloze test
		//Adapted from DELE (Montrul, 2008)
		var cloze_test = {timeline: [
			{
				type: "cloze",
				text: "<p><em>En el siguiente texto, algunas palabras han sido sustituidas por listas de opciones. " +
								"Primero, lee el texto completo para poder entenderlo. Después, vuelve a leerlo y elige en las listas de opciones " +
								"la palabra que mejor corresponde a cada oración. Para confirmar tus respuestas al final del texto, pulsa el botón 'Enviar mis resuestas' </em></p>"+
								"<h3>El sueño de Joan Miro</h3>" +
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
				 submit_text: "Enviar mis respuestas"
				},
			]}
		timeline.push(cloze_test);

		//PAUSA

		//Juicio de oraciones



    /* define welcome message block */
    var welcome_block = {
      type: "text",
      text: "<p>Bienvenidos al experimento 'TAM Audio'.</p>" +
            "<p>Gracias por participar.</p>" +
            "<p>Presione cualquier tecla para continuar.</p>",
    };
    //timeline.push(welcome_block);

    /* define instructions block */
    var instructions_block = {
      type: "single-audio",
      stimulus: prefix + "instrucciones.mp3",
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
    //timeline.push(instructions_block);

		// Here we define the stimuli for the GJT
		// From this list, we later build a timeline
		// Stimuli and timeline are defined separately to avoid repeating large amount of code.
		// Go and no-go are arbitraty value for "Good" or "Bad".
    var stimuli = [
			{ text: "Contrataremos una persona que hable holandés, si logramos encontrar alguna.",
		    response: "go",
		    audio: "stim-01.mp3"
		  },
		  { text: "Luis y Pedro quieren amueblar la casa porque les gusta más vacía.",
		    correct: ["Luis y Pedro no quieren amueblar la casa porque les gusta más vacía.", "Luis y Pedro no quieren amueblar la casa porque les gusta más vacía."],
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
          prompt: "",
          trial_ends_after_audio : true,
					timing_post_trial: 1000,
        },
				//Repeat stimuli twice with a one-second delay inbetween.
				{
          type: "single-audio",
          stimulus: '' + prefix + stimuli[i].audio + '',
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
              preamble: '¿La frase no te parece correcta? Corríjela: ',
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


		//Create timeline here.
		jsPsych.init({
			//pass timeline var here.
			timeline: timeline,
			on_finish:function(data){
        //jsPsych.data.displayData();

				Percept.save({
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
