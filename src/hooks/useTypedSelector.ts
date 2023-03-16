import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/reducesrs/index";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
