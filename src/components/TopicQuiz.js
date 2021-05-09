import { AppBar, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Toolbar, Typography } from "@material-ui/core";
import React, { useState } from "react"
import useStyles from "../useStyles";

import ChatMessage from "../components/ChatMessage";
import { Button, ChatButtons } from "../components/Button"
import { ButtonsWrapper, ButtonWrapper, HeaderWrapper, NextBtnWrapper, QuizWrapper, SliderWrapper } from "./TopicQuiz.styled";
import { EaseUp } from "./EaseUp";

export default function TopicQuiz({ topic, goNextTopic, onFinish }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [optionEnabled, setOptionEnabled] = useState(false)
  const [ConfidenceEnabled, setConfidenceEnabled] = useState(false)
  const classes = useStyles()

  const [state, setState] = React.useState({})

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.checked });
  }

  const showOptions = () => {
    setOptionEnabled(true)
  }

  const skipQuestion = () => {
    setOptionEnabled(false)
    setConfidenceEnabled(false)
    if (questionIndex + 1 < topic.length && questionIndex + 1 < topic.length) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setQuestionIndex(0)
      onFinish()
    }
  }

  const showConfidence = () => {
    setConfidenceEnabled(true)
  }

  const submitQuestion = () => {
    if (Object.keys(state).length) {
      // submit question to back
      setState({})
      skipQuestion()
    }
  }

  const marks = [
    {
      value: 0,
      label: "Super pas confiant",
    },
    {
      value: 25,
      label: "Pas confiant",
    },
    {
      value: 50,
      label: 'Neutre',
    },
    {
      value: 75,
      label: 'Confiant',
    },
    {
      value: 100,
      label: 'Super confiant',
    },
  ];
  function valuetext(value) {
    return marks.filter(e => e.value === value).label
  }

  return <div>
    <AppBar position="fixed" color="default">
      <Toolbar>
        <HeaderWrapper>
          <Typography variant="h5" className={classes.title}>
            Thème: {topic[questionIndex].topic}
          </Typography>
          <Typography variant="h5" className={classes.title}>
            Question {questionIndex + 1}
          </Typography>
        </HeaderWrapper>
      </Toolbar>
    </AppBar>

    <QuizWrapper>
      <ChatMessage text={topic[questionIndex].question}>
          <ChatButtons>
            <ButtonsWrapper>
              <ButtonWrapper>
                <Button variant="contained" onClick={showOptions} >Je veux essayer de répondre à cette question</Button>
              </ButtonWrapper>
              <ButtonWrapper>
                <Button primary variant="contained" onClick={skipQuestion}>Je ne sais pas, je veux passer cette question</Button>
              </ButtonWrapper>
            </ButtonsWrapper>
          </ChatButtons>
         
      </ChatMessage>

      {
        optionEnabled &&
        <ChatMessage text="Super! Tu peux choisir la proposition qui te semble correcte depuis les propositions suivantes:">
          <Card variant="outlined">
            <CardContent>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  {
                    topic[questionIndex].options.map(op => {
                      return <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            onChange={handleChange}
                            checked={!!state[op]}
                            name={op} />
                        }
                        label={op}
                      />
                    })
                  }
                </FormGroup>
              </FormControl>

            </CardContent>
          </Card>

          <ButtonsWrapper style={{ marginTop: '30px' }}>
            <ButtonWrapper>
              <Button variant="contained" onClick={showConfidence} disabled={Object.keys(state).length === 0}>Soumettre</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button primary variant="contained" onClick={skipQuestion}>Je ne sais pas</Button>
            </ButtonWrapper>
          </ButtonsWrapper>
        </ChatMessage>
      }

      {
        ConfidenceEnabled &&
        <div>
          <ChatMessage text="Maintenant dis moi à quel point tu es confiant que tu as donné la bonne réponse">
            <SliderWrapper>
              <Slider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="off"
                step={25}
                marks={marks}
                min={0}
                max={100}
              />
            </SliderWrapper>
          </ChatMessage>
          <EaseUp>
            <NextBtnWrapper>
              <Button onClick={submitQuestion} variant="contained">Suivant</Button>
            </NextBtnWrapper>
          </EaseUp>
        </div>
      }
    </QuizWrapper>
  </div>
}