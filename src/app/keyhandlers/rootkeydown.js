import * as PageViews from "../constants/viewconstants";
import { intropageKeyhandler } from "./intropagekeyhandler";
import { screenpageKeyhandler } from "./screenskeyhandler";

export const RootKeyDown = (e,dependencies={})=>{
    const {PageData:{view}} = dependencies;
    switch(view){
        case PageViews.INTRO_VIEW:
            intropageKeyhandler(e,dependencies);
            break;
        case PageViews.SCREENS_VIEW:
            screenpageKeyhandler(e,dependencies);
            break;
        default:
            break;
    }
}