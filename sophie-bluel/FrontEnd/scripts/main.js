
const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

//import functions
import { introduction } from "./intro.js";
import { generatePortfolio } from "./portfolio.js";
import { contact } from "./contact.js";
import { indexEdit } from "./edit_index.js";

//call the function
introduction();
generatePortfolio(works);
contact();
indexEdit();
