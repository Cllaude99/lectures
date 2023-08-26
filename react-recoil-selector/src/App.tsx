import React from "react";
import { hourSelector, minuteState } from "./atom";
import { useRecoilState } from "recoil";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const HoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        type="number"
        value={minutes}
        placeholder="Minutes"
        onChange={onMinutesChange}
      />
      <input
        type="number"
        value={hours}
        placeholder="Hours"
        onChange={HoursChange}
      />
    </div>
  );
}

export default App;
