import React from "react";

interface StyledBoxProps {
  marginTop?: string;
  marginBottom?: string;
}

const styles = {
  width: "100%"
};

const StyledBox: React.FC<StyledBoxProps> = props => {
  const { marginTop = 0, marginBottom = 0 } = props;
  return (
    <div style={{ ...styles, marginTop, marginBottom }}>{props.children}</div>
  );
};

export default StyledBox;
