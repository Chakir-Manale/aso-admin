import database from "./server.json"
import messages from "../../../../_metronic/i18n/messages/fr.json"
import validation from "./validation"

export default {...messages,...database, ...validation}