// function to return true or false based on the visibleIf
//true means display component and false means dont display component
function skipLogic(question, answers) {
  if (Object.keys(question).indexOf("visibleIf") > -1) {
    let conditions = question["visibleIf"];
    //get the field via regex
    let field = conditions.match(/{\w+}/gm)[0];
    let field_strip = field.replace(/[{,}]/g, "");
    //get value of question using the question name
    let value_to_question = answers[field_strip];
    //lets check if there is a < or > sign then we leave the answer as it is else we conver it to strings
    if (conditions.indexOf("=")) {
      //split the condition by = and check type of right hand value
      let split = conditions.split("=");
      if (typeof split[1] == "string") {
        value_to_question = value_to_question && `'${value_to_question}'`;
      }
    }

    //now replace the strings in conditions  with values
    let replaced = conditions.replace(/{\w+}/g, value_to_question);
    //replace all single = to ==
    let replace_equal = replaced.replace(/[=]/g, "==");
    //convert condition into javascript executable
    let out = eval(replace_equal);
    return out;
  } else {
    return true;
  }
}

export { skipLogic };
