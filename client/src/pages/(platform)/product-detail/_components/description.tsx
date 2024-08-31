import React, { useState } from "react";

interface Props {
  desc: string;
}

const Description: React.FC<Props> = ({ desc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative text-muted-foreground text-sm">
      <div
        className={`${
          isExpanded ? "" : "line-clamp-3"
        } transition-all duration-300 ease-in-out`}
      >
        {desc}
      </div>
      {desc.length > 150 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-primary focus:outline-none"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default Description;
