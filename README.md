# tamaudio
a jsPsych experiment for spanish speakers

## Parts

So far, the experiment includes 3 main parts :
- Linguistic background questionnaire (`background_questions`, incomplete)
- Placement test (`placement_test` and `cloze_test`)
- Grammaticality judgment task (`test_block`)

The stimuli used in the text block are formated in the following way:

- For a correct answer (judgment should be positive on the likert scale), `response` is set to `'go'`:
```javascript
{ text: "Contrataremos una persona que hable holandés, si logramos encontrar alguna.",
  response: "go",
  audio: "stim-01.mp3"
}
```

- For an incorrect answer (`correct` is an array of possible correct answers), `response` is set to `'no-go'`:
```javascript
{ text: "Luis y Pedro quieren amueblar la casa porque les gusta más vacía.",
  correct: ["Luis y Pedro no quieren amueblar la casa porque les gusta más vacía.", "Luis y Pedro quieren amueblar la casa porque no les gusta vacía."],
  response: "no-go",
  audio: "stim-02.mp3"
}
```
