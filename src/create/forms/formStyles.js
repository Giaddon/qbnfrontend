import styled from "styled-components";

import { forbidden, green, informative } from '../../style/colors';

const CreateFormDiv = styled.div`
  flex: 0 1 600px;
  border: 2px solid ${props => props.changed ? `${forbidden};` : `${informative};` };
  padding: 10px;
  background-color: white;
  text-align: center;
  transition: border .3s ease;
  
  form {
    position: relative;
  }
  
  label {
    display: block;
    font-family: "Title", sans-serif;
    margin: 8px 0px 4px 0px;
  }

  input {
    padding: 5px;
    max-width: 230px;
    font-family: "Standard", serif
  }
  input[type=number] {
    width: 70px;
  }

  textarea{ 
    padding: 5px;
    width: 300px;
    height: 100px;
    font-family: "Standard", serif
  }

  select {
    padding: 5px;
    max-width: 230px;
    font-family: "Standard", serif
  }

  button {
    display: block;
    font-family: "Alata", sans-serif;
    font-size: 1.0em;
    margin: 10px auto;
    background-color: white;
    padding: 5px 25px;
    border: 1px solid #000;
    border-radius:3px;
    cursor: pointer;
    transition: background .2s ease;
  }
  button:hover {
    background-color: ${green};
    color: white;
  }
`;

const FormDividerDiv = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 5px;
  margin: 10px 0px;
  button {
    font-size: 0.8em;
  }
`
const FormArrayDiv = styled.div` 
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const FormArrayElementDiv = styled.div` 
  flex: 0 1 auto;
  padding: 5px;
  margin: 5px;
  border: 1px dashed grey;
  select {
    max-width: 150px;
    font-size: 0.8em;
  }
`;


const FormDeleteButton = styled.div`
  position: relative;
  height: 30px;
  color: white;
  margin: auto;
  max-width: 200px;
  background-color: tomato;
  margin-top:10px;
  cursor:pointer;
  border-radius: 3px;
  p {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`

const FormSectionTitle = styled.label`
  margin-top: 20px;
  font-size: 1.4em;
`

const SubmitButtonDiv = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
`

export {
  CreateFormDiv,
  FormDividerDiv,
  FormDeleteButton,
  FormSectionTitle,
  FormArrayDiv,
  FormArrayElementDiv,
  SubmitButtonDiv
 };