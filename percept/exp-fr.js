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
			    data : {data:  data.data.csv(), uuid:data.uuid, group:data.group, level:data.level},
			    type: 'POST'
			  });
			},
			saveTemp: function(data){
				filename = jsPsych.data.getDataByTimelineNode("0.0-2.0").first().values()[0]? jsPsych.data.getDataByTimelineNode("0.0-2.0").first().values()[0].code : '';
				$.ajax({
					url: 'server/save.php',
					data : {data: jsPsych.data.get().csv(), uuid:data.uuid, mode:'tmp', group:data.group, level:data.level, overwrite:true},
					type: 'POST'
				})
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
		var currentGroup = "L1";
		var currentLevel = "FR";
		var uuid = guid();
		var userCodes = [];

		//Load user codes
		$.getJSON( 'data/codes.json', function(data){
			userCodes = data.codes;
		})

		function guid() {
		  function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
		      .toString(16)
		      .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		    s4() + '-' + s4() + s4() + s4();
		}




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



    /* create experiment timeline array */
    var timeline = [];

		timeline.push({
			type: "text",
			text: "<h3>TAM en français</h3>\
				<div class=\"mdl-grid\">\
					<div class=\"mdl-cell mdl-cell--12-col\">\
						<p>Merci de vouloir participer à notre expérience. Avant de continuer, veuillez lire attentivement ce qui suit :</p>\
						<ul>\
					  <li>Avant de commencer l'expérience, vous devez donner votre consentement en cliquant sur « Je consens » au bas de la page suivante.</li>\
					  <li>Afin de faire cette tâche, vous ne devez avoir aucune connaissance de l'espagnol.</li>\
						<li>Vous devez effectuer cette expérience sur un <strong>ordinateur</strong> et non sur un téléphone portable, vous aurez à utiliser votre clavier.</li>\
						</ul>\
						<p>Maintenant, appuyez sur une touche pour continuer.</p>\
					</div>\
				</div>",
			mdl_layout: true
		});


		// timeline.push({
		// 	type: "html",
		// 	url: prefix + "../consentement.html",
		// 	mdl_layout: true,
		// 	cont_btn:"consent",
		// 	on_finish:function(){
		// 		Percept.saveTemp({uuid:uuid, group:currentGroup, level:currentLevel});
		// 	}
		// });


		timeline.push({
			type: "survey-text",
			preamble: "<h3>1/3</h3><p>Dans ce test, vous trouverez des paires de phrases dont la première contient un espace qui indique qu'un verbe a été supprimé. Premièrement, lisez la paire de phrases en entier afin de bien la comprendre. Ensuite, veuillez remplir chaque espace en conjuguant le verbe entre parenthèses dans la forme qui correspond le mieux à chaque espace.</p>\
								 ",
			questions: ["Laura verra au cinéma un film qui la _________ (faire ) pleurer. Elle l'a vu plus de dix fois.",
									"Je veux un livre qui ___________ (contenir) de nombreux personnages fantastiques. Il s'intitule  \"The Neverending Story\".",
									"Nous devons trouver une encyclopédie qui __________ (contenir) tous les tableaux de Picasso. J'ai oublié dans quelle étagère je l’ai mise.",
									"Je vais chanter une chanson qui te __________ (rendre ) heureux. J'espère être capable de la composer.",
									"Nous avons besoin d'un directeur qui __________ (convenir) le mieux à l'entreprise, mais je pense qu' aucun des candidats n'est bon pour diriger.",
									"Mes grands-parents iront visiter un endroit où il  ___________ (faire) beau. Ils iront à Cuba.",
									"Avec ton expérience en tant que commissaire artistique, tu peux travailler dans un magasin qui ____________ (vendre) des œuvres d'art. Recherche sur Internet, je suis sûre qu'il y en a certains dans cette ville.",
									"J'ai besoin d'un crayon qui __________ (écrire) sur le verre.  C'est celui qui est sur la table, peux-tu me le passer?",
									"Je dois vendre une maison qui _________ (avoir) une piscine et un jardin. Je pense qu'elle sera difficile à vendre, car elle est très chère.",
									"Nous allons commander un repas qui __________ (contenir) peu de graisse. Recommandez-vous un plat en particulier?",
									"Je cherche un livre qui __________ (contenir) des reproductions des tableaux de Léonard de Vinci. Il est bleu et vert, l'as-tu vu?",
									"Nous pouvons naviguer dans un bateau qui _____________ (avoir) quatre cabines. Il appartient à l'entreprise \"Les Caraïbes.\"",
								],
			button_label : "Continuer",
			mdl_layout: true,
			on_finish:function(){
				Percept.saveTemp({uuid:uuid, group:currentGroup, level:currentLevel});
			}
		});

		timeline.push({
			type: "survey-text",
			preamble: "<h3>2/3</h3><p>Dans ce test, vous trouverez des paires de phrases dont la première contient un espace qui indique qu'un verbe a été supprimé. Premièrement, lisez la paire de phrases en entier afin de bien la comprendre. Ensuite, veuillez remplir chaque espace en conjuguant le verbe entre parenthèses dans la forme qui correspond le mieux à chaque espace.</p>\
								 ",
			questions: [
									"Je veux une laveuse qui _______________ (dire) la température. On la vend sur Amazon à bon prix. ",
									"Miguel cherche un magasin qui ____________ (vendre) des meubles anciens. On lui a dit qu'au centre-ville il pourra en trouver un. ",
									"Je dois louer un camion qui __________ (pouvoir)  charger  jusqu'à 1000 kg, mais il n'y en a aucun.",
									"Nous allons embaucher un musicien qui ___________ (être) bassiste, mais jusqu'à présent, nous n'avons trouvé que des pianistes.",
									"Je veux un moteur qui ne __________ (faire) pas de bruit, mais il n'y en a aucun dans ce magasin.",
									"Je vais lire un livre qui __________ (contenir) la biographie de Beethoven. Mon frère me l'a donné en cadeau.",
									"Ce soir, nous pouvons regarder une émission qui _____________ (faire) une critique du système de santé. Elle commence à 10h00.",
									"J'achèterai un habit qui _________ (allez) bien avec le tien, si j'en trouve un dans ce magasin.",
									"Tu dois lire un livre qui te ____________ (permettre) de comprendre le subjonctif. Dans cette bibliothèque tu en trouveras sûrement un.",
									"Je dois acheter une cravate qui ___________ (aller) bien avec ma chemise bleue. Laquelle me recommanderiez-vous?",
									"Je veux une chambre qui ___________ (être) bien éclairée, mais il n'y a que des pièces sombres dans ce bâtiment.",
									"Ce soir au concert, nous allons rencontrer un chanteur qui ___________ (être) aussi un guitariste très doué. Il s'appelle Antonio."
									],
			button_label : "Continuer",
			mdl_layout: true,
			on_finish:function(){
				Percept.saveTemp({uuid:uuid, group:currentGroup, level:currentLevel});
			}
		});

		timeline.push({
			type: "survey-text",
			preamble: "<h3>3/3</h3><p>Dans ce test, vous trouverez des paires de phrases dont la première contient un espace qui indique qu'un verbe a été supprimé. Premièrement, lisez la paire de phrases en entier afin de bien la comprendre. Ensuite, veuillez remplir chaque espace en conjuguant le verbe entre parenthèses dans la forme qui correspond le mieux à chaque espace.</p>\
								 ",
			questions: [
									"Nous cherchons un restaurant qui  __________ (être) pas très cher. On m'a dit qu'ils'appelle \"El Marino\".",
									"Nous devons trouver une carte qui __________ (contenir) les sites touristiques de Rome. Je pense que je l'ai mise dans la valise verte.",
									"Nous allons voir un film qui _________ (être) nominé pour un Oscar. Il s'intitule \"Boyhood\".",
									"Nous avons besoin de monter à bord d’un autobus qui _________________ (avoir) des sièges libres, mais tous les autobus sont pleins.",
									"Je dois préparer un plat qui __________ (être) à son goût. Dites-moi ce qu'il préfère manger.",
									"Je vais acheter une maison qui __________ (être) au centre-ville, si j'en trouve une pas trop cher.",
									"Tu dois utiliser un ordinateur qui __________ (être) connecté au réseau. C'est celui qui est sur la table à l'entrée du laboratoire.",
									"Nous cherchons un chien qui n’______________ (avoir) qu’une seule oreille; il s’appelle Fido.",
									"Nous mangerons une sorte de pomme qui __________ (être) en rabais cette semaine. On la cultive ici au Québec.",
									"Dans cette bibliothèque tu peux lire un livre qui _________ (être) écrit en allemand. Il y en a beaucoup au deuxième étage.",
									"Nous allons embaucher quelqu'un qui _____________ (comprendre)  le néerlandais, si nous pouvons trouver quelqu'un.",
									"J'ai besoin d’un livre qui _______________ (décrire) de manière facile la physique, mais je crois qu'aucun auteur ne serait capable d’expliquer la physique de manière facile."
									],
			button_label : "Continuer",
			mdl_layout: true,
			on_finish:function(){
				Percept.saveTemp({uuid:uuid, group:currentGroup, level:currentLevel});
			}
		});

		//Create timeline here.
		jsPsych.init({
			//pass timeline var here.
			timeline: timeline,
			on_finish:function(data){
        //jsPsych.data.displayData('');
				//jsPsych.data.get().localSave('CSV', 'mydata.csv');
				//data = data.getDataAsCSV([{trial_type: 'form'}, {trial_type: 'survey-multi-choice'}, {trial_type: 'cloze'}, {trial_type: 'survey-likert'}, {trial_type: 'survey-text'}]);
				var display_element = jsPsych.getDisplayElement();

				display_element.innerHTML = jsPsych.pluginAPI.getMDLLayout('<h3>{0}</h3><p>{1}</p>'.format('Fin du test', 'C\'est déjà terminé!. Merci beaucoup pour votre participation!'));

				Percept.save({
					uuid:uuid,
					data:data,
					group:currentGroup,
					level:currentLevel
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