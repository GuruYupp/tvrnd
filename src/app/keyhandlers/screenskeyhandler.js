// import * as PageViews from "../constants/viewconstants";

export const screenpageKeyhandler = (e, dependencies) => {
  const { Utilites,Main } = dependencies;
  console.log(e);
  switch (e.key) {
    case "Enter":
      break;
    case "ArrowLeft": {
        let screenId = $(".imageFocus").attr("id");
        screenId = Number(screenId.split("-")[1]);
        const beforeScreen = $(`#screen-${screenId - 1}`);
        if (beforeScreen.length > 0) {
          Utilites.addFocus(`#${beforeScreen.attr("id")}`);
        }
      break;
    }
    case "ArrowRight": {
      let screenId = $(".imageFocus").attr("id");
      screenId = Number(screenId.split("-")[1]);
      const nextScreen = $(`#screen-${screenId + 1}`);
      if (nextScreen.length > 0) {
        Utilites.addFocus(`#${nextScreen.attr("id")}`);
      }
      break;
    }
    case "Backspace":{
        Main.previousPage();
        break;
    }
    default:
      break;
  }
};
