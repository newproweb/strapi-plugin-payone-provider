import { useEffect, useRef } from "react";
import pluginId from "../../pluginId";

const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);

  useEffect(() => {
    if (ref.current) {
      ref.current(pluginId);
    }
  }, []);

  return null;
};

export default Initializer;
