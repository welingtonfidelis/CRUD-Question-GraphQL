import React, { useEffect, useState } from 'react';
import fetchGraphQl from './fetchGraphQl';
import graphql from 'babel-plugin-relay/macro';

import RelayEnvironment from './RelayEnvironment';
import { fetchQuery, commitMutation } from 'react-relay';

import './App.css';

function App() {
  const [listQuestions, setListQuestions] = useState([]);
  const [questionID, setQuestionID] = useState('');

  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [answerID, setAnswerID] = useState('1');

  const [reload, setReload] = useState(0);

  //Requisição ao servidor com graphql SEM RELAY
  useEffect(() => {
    async function getQuestions() {
      try {
        const query = graphql`
          query AppquestionsQuery {
            questions {
              id
              question
              options
              answerID
            }
          }
        `

        const response = await fetchQuery(RelayEnvironment, query, {});

        const { questions } = response;

        if (questions) setListQuestions(questions);

      } catch (error) {
        console.log(error);
        alert('Houve um erro ao trazer a lista de questões. Tente novamente.');
      }
    }

    getQuestions();

  }, [fetchGraphQl, reload]);

  async function getQuestion(id) {
    setQuestionID(id);

    try {
      const query = graphql`
        query AppquestionQuery($id: ID!) {
          question (id: $id) {
            id
            question
            options
            answerID
          }
        }
      `

      const response = await fetchQuery(RelayEnvironment, query, { id });

      const { question } = response;

      if (question) {
        setQuestion(question.question);
        setAnswerID(question.answerID);
        setOption1(question.options[0]);
        setOption2(question.options[1]);
        setOption3(question.options[2]);
        setOption4(question.options[3]);
      }

    } catch (error) {
      console.log(error);
      alert('Houve um erro ao trazer as informações desta questão. Tente novamente.');
    }
  }

  async function createQuestion(event) {
    event.preventDefault();

    const opt = [option1, option2, option3, option4];

    try {
      const mutation = graphql`
      mutation AppcreateQuestionMutation($question: String, $options: [String], $answerID: String) {
        createQuestion (
          question: $question
          options: $options
          answerID: $answerID
        ){
          id
          question
          options
          answerID
        }
      }
    `
      const variables = { "question": question, "options": opt, "answerID": answerID + '' };

      commitMutation(RelayEnvironment, {
        mutation, variables,
        onCompleted: (response, errors) => {
          console.log('CAD', response);
          const { createQuestion } = response;

          if (createQuestion) {
            success('Nova questão cadastrada com sucesso.');
          }
        },
        onError: error => {
          console.log(error);
          alert('Houve um erro ao salvar questão. Tente novamente.');
        }
      })
    } catch (error) {
      console.log(error);
      alert('Houve um erro ao salvar questão. Tente novamente.');
    }
  };

  async function updateQuestion(event) {
    event.preventDefault();

    const opt = [option1, option2, option3, option4];
    const query = await fetchGraphQl(`
    mutation updateQuestion($id: ID, $question: String, $options: [String], $answerID: String) {
      updateQuestion (
        id: $id
        question: $question
        options: $options
        answerID: $answerID
      ){
        id
        question
        options
        answerID
      }
    }
  `, { "id": questionID, "question": question, "options": opt, "answerID": answerID + '' });

    if (query.data) {
      success('Questão atualizada com sucesso.');
    }
  };

  async function deleteQuestion(id) {
    console.log('deletar');

    const query = await fetchGraphQl(`
    mutation deleteQuestion($id: ID) {
      deleteQuestion (
        id: $id
      ){
        id
      }
    }
  `, { "id": id });

    if (query.data) {
      const { deleteQuestion } = query.data;

      if (deleteQuestion === null) {
        success('Questão excluída com sucesso.');
      }
    }
  }

  function success(text, ctrl = true) {
    //chamadas do botão cancelar não devem recarregar lista (ctrl = false)
    if (ctrl) {
      alert(text);
      setReload(reload + 1);
      setQuestionID('');
    }

    setQuestion('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setAnswerID('');
  }

  function answerOpt(event) {
    setAnswerID(event.target.value);
  }

  // const data = usePreloadedQuery(GetQuestions, props.preloadedQuery);
  // const { questions } = data;
  // console.log(questions);

  return (
    <div className="App">
      <div id="list-question" className="box-div">
        <h2>Perguntas Cadastradas</h2>
        <ul id="question-ul">
          {listQuestions.map((quest, index) => (
            <li key={quest.id} className={index % 2 == 0 ? 'separator' : ''}>
              <div> <span className="question-ul-number">{index + 1}</span> <span>{(quest.question).substring(0, 25)}</span> </div>
              <div>
                <button className="btn-edit" onClick={() => getQuestion(quest.id)} >EDITAR</button>
                <button className="btn-del" onClick={() => deleteQuestion(quest.id)} >EXCLUIR</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        id="form-question"
        className="box-div"
        onSubmit={questionID === '' ? createQuestion : updateQuestion}
      >
        <h2>{questionID === '' ? 'Nova Pergunta' : 'Editar Pergunta'}</h2>

        <div id="question-input">
          <label htmlFor="questionInput">Pergunta</label>
          <input
            required
            id="questionInput"
            type="text"
            value={question}
            onChange={event => setQuestion(event.target.value)}
          />
        </div>

        <ul id="question-ul">
          <li><label htmlFor="questionOption_1">Resposta 1</label>
            <input
              required
              id="questionOption_1"
              type="text"
              value={option1}
              onChange={event => setOption1(event.target.value)}
            />
          </li>

          <li><label htmlFor="questionOption_2">Resposta 2</label>
            <input
              required
              id="questionOption_2"
              type="text"
              value={option2}
              onChange={event => setOption2(event.target.value)}
            />
          </li>

          <li><label htmlFor="questionOption_3">Resposta 3</label>
            <input
              required
              id="questionOption_3"
              type="text"
              value={option3}
              onChange={event => setOption3(event.target.value)}
            />
          </li>

          <li><label htmlFor="questionOption_4">Resposta 4</label>
            <input
              required
              id="questionOption_4"
              type="text"
              value={option4}
              onChange={event => setOption4(event.target.value)}
            />
          </li>
        </ul>

        <div>
          <label htmlFor="">Resposta correta: {answerID}</label>
          <div id="question-answer" onChange={(event) => answerOpt(event)}>
            <div><input type="radio" value="1" name="gender" checked={answerID === '1'} /> 1</div>
            <div><input type="radio" value="2" name="gender" checked={answerID === '2'} /> 2</div>
            <div><input type="radio" value="3" name="gender" checked={answerID === '3'} /> 3</div>
            <div><input type="radio" value="4" name="gender" checked={answerID === '4'} /> 4</div>
          </div>
        </div>

        <div id="question-footer">
          <button
            type="button"
            onClick={() => success('', false)}
            className="btn-del"
          >
            CANCELAR
        </button>

          <button
            type="submit"
            className="btn-edit"
          >
            SALVAR
        </button>
        </div>

      </form>

    </div>
  );
}

// function AppRoot(props) {
//   return (
//     <RelayEnvironmentProvider environment={RelayEnvironment}>
//       <Suspense fallback={'Loading...'}>
//         <App preloadedQuery={preloadedQuery} />
//       </Suspense>
//     </RelayEnvironmentProvider>
//   );
// }

export default App;
