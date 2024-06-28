
const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

//import functions
import { introduction } from "./intro.js";
import { generateWorks } from "./portfolio.js";
import { contact } from "./contact.js";

//call the function
introduction();
generateWorks();
contact();

