import statusCheck from './statusCheck.js';
import bookCtrl from "./bookCtrl.js";
import repository from "../repository/index.js";

export default (repository) => ({
  statusCheck,
  bookCtrl: bookCtrl(repository.bookRepo)
});
