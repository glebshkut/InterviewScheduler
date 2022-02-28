import "components/Appointment/styles.scss"
import useVisualMode from "hooks/useVisualMode";
import React from "react"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);



  const interviewers = props.interviewers;

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={console.log("onSave")}
          onCancel={back}
        />
      )}
    </article>

  );
}