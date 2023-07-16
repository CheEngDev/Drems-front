import http from "./httpService";

const apiEndpoint = "/appointments";

export function getAppointments() {
  return http.get(apiEndpoint);
}

export function addAppointment(appointment) {
  return http.post(apiEndpoint, appointment);
}

export function deleteAppointment(appointment) {
  return http.delete(`${apiEndpoint}/${appointment._id}`);
}

export function editAppointment(appointment) {
  const appointid = appointment._id;
  delete appointment._id;
  return http.put(`${apiEndpoint}/${appointid}`, appointment);
}

export default {
  getAppointments,
  addAppointment,
  deleteAppointment,
  editAppointment,
};
