import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Skeleton from "@material-ui/lab/Skeleton";

export type RobotsFilterProps = {
  options: {
    [robotMaterial: string]: boolean;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

const renderLoadingPlaceholders = (num = 1) =>
  new Array(num)
    .fill(undefined)
    .map((item: undefined, index) => (
      <FormControlLabel
        disabled
        control={<Checkbox name={`palceholder-option-${index}`} />}
        label={<Skeleton width={100} />}
        key={index}
      />
    ));

export default function RobotsFilter({
  options,
  onChange,
  loading,
}: RobotsFilterProps) {
  return (
    <FormGroup row>
      {loading
        ? renderLoadingPlaceholders(5)
        : Object.keys(options).map((material) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={options[material]}
                  onChange={onChange}
                  name={material}
                  color="primary"
                />
              }
              label={material}
              key={material}
            />
          ))}
    </FormGroup>
  );
}
