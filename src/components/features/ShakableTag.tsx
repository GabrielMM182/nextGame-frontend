import React, { useState } from 'react';
import { Shake } from 'reshake';

interface ShakableTagProps {
  id: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const ShakableTag: React.FC<ShakableTagProps> = ({ id, disabled = false, children }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  if (disabled) {
    return <>{children}</>;
  }
  
  return (
    <div 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Shake
        h={3}
        v={2}
        r={6}
        dur={80}
        int={50}
        max={100}
        active={isHovering}
        fixed={false}
        fixedStop={false}
        freez={false}
      >
        {children}
      </Shake>
    </div>
  );
};

export default ShakableTag;