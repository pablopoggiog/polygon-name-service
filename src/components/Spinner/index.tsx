import { FunctionComponent } from "react";
import { Loader } from "./styles";

export const Spinner: FunctionComponent = () => (
  <Loader>
    <Loader inner>
      <Loader innest />
    </Loader>
  </Loader>
);
