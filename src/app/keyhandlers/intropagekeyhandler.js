import * as PageViews from "../constants/viewconstants";

export const intropageKeyhandler = (e, dependencies) => {
  const { Main } = dependencies;
  console.log(e);
  switch (e.key) {
    case "Enter":
      Main.changeView(true, {
        view: PageViews.SCREENS_VIEW,
        payload: {
          home: "home",
          details: "details",
          player: "player",
        },
      });
      break;
    default:
      break;
  }
};
