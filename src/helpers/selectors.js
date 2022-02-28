export function getAppointmentsForDay(state, day) {
  const result = [];
  for (const dayInfo of state.days) {
    if (dayInfo.name === day) {
      for (const appointment of dayInfo.appointments) {
        result.push(state.appointments[appointment]);
      }
    }
  }
  return result;
};

export function getInterviewersForDay(state, day) {
  const result = [];
  for (const dayInfo of state.days) {
    if (dayInfo.name === day) {
      for (const appointment of dayInfo.appointments) {
        result.push(state.interviewers[appointment]);
      }
    }
  }
  return result;
};

export function getInterview(state, interview) {
  if (interview) {
    return { ...interview, interviewer: state.interviewers[interview.interviewer] };
  } else {
    return null;
  }
}