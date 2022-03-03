import axios from "axios";
const { useState, useEffect } = require("react");




export default function useApplicationData() {

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = getUpdatedDays(appointments);
        setState({ ...state, appointments, days });
      })
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const days = getUpdatedDays(appointments);
        setState({ ...state, appointments, days });
      })
  }

  function getUpdatedDays(appointments) {
    const newDays = [...state.days];
    return newDays.map((day) => {
      const newDay = { ...day };
      let spots = 0;
      for (const appointmentId of day.appointments) {
        if (!appointments[appointmentId].interview) {
          spots++;
        }
      }
      newDay.spots = spots;
      return newDay;
    })
  }


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
    });
  }, []);


  const setDay = (day) => {
    setState({ ...state, day })
  }





  return { state, setDay, bookInterview, cancelInterview };
}