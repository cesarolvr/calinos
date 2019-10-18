import React, { useState } from "react";
import * as R from "ramda";

import "./Post.scss";

// Steps
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";

const Post = () => {
  const [step, setStep] = useState(0);

  // TODO: transferir essa model para outro canto
  const [formValue, setFormValue] = useState({
    animal: {
      name: "",
      breed: "",
      color: "",
      size: ""
    },
    local: {
      street: "",
      reference: "",
      comment: "",
      pin: {
        lat: 0,
        lng: 0
      }
    },
    photos: []
  });

  const nextStep = () => {
    return setStep(step <= 4 ? step + 1 : 4);
  };
  const prevStep = () => {
    return setStep(step >= 0 ? step - 1 : 0);
  };

  return (
    <>
    {
      R.cond([
        [R.equals(0), R.always(<Step0 nextStep={nextStep} />)],
        [
          R.equals(1),
          R.always(
            <Step1
              step={step}
              prevStep={prevStep}
              nextStep={nextStep}
              formValue={formValue}
              setFormValue={setFormValue}
            />
          )
        ],
        [
          R.equals(2),
          R.always(
            <Step2
              step={step}
              nextStep={nextStep}
              prevStep={prevStep}
              setFormValue={setFormValue}
              formValue={formValue}
            />
          )
        ],
        [
          R.equals(3),
          R.always(
            <Step3
              step={step}
              nextStep={nextStep}
              prevStep={prevStep}
              setFormValue={setFormValue}
              formValue={formValue}
            />
          )
        ],
        [R.equals(4), R.always(<Step4 />)],
        [R.T, R.always(null)]
      ])(step)
    }
    </>
  )
};

export default Post;
