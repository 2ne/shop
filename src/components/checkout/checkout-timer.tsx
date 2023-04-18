import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper";

interface CheckoutTimerProps {
  timer: number; // minutes
}

const CheckoutTimer: React.FC<CheckoutTimerProps> = ({ timer }) => {
  const [timeLeft, setTimeLeft] = useState(timer * 60); // Convert timer to seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative z-10 bg-secondary text-secondary_text">
      <Wrapper>
        <div className="flex items-center justify-center h-10 text-sm tracking-normal">
          <div>
            Items will be reserved for {""}
            <span className="tabular-nums">
              {minutes}:{seconds < 10 ? "0" : ""}
              {seconds}
            </span>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default CheckoutTimer;
