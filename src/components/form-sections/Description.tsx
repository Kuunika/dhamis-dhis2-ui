import React from "react";
import { TextField } from "@material-ui/core";
import { useStoreState, useStoreActions } from "../../state/hooks";

const Description = () => {
  let description = useStoreState(state => state.description);
  const setDescription = useStoreActions(
    actions => actions.description.setDescription
  );
  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription({ text: event.target.value });
  };

  return (
    <div id="descriptionTextField">
      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows="4"
        variant="outlined"
        value={description.text}
        required
        onChange={e => handleTextChange(e)}
        data-testid="description-field"
      />
    </div>
  );
};

export default Description;
