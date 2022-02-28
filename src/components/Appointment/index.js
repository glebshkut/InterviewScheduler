import "components/Appointment/styles.scss"
import useVisualMode from "hooks/useVisualMode";
import React from "react"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
    transition(SAVING);
  }

  function deleteConfirm () {
    transition(CONFIRM);
  }

  function onDelete(id) {
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      });
    transition(DELETING);
  }

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
          onDelete={deleteConfirm}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status 
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => transition(SHOW)}
          onConfirm={onDelete}
          id={props.id}
        />
      )}
    </article>

  );
}