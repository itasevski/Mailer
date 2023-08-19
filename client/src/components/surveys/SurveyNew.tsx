import SurveyForm from "./SurveyForm";
import { useState } from "react";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";

const SurveyNew = () => {
  const [surveyFormReview, setSurveyFormReview] = useState(false);

  const renderContent = () => {
    if (surveyFormReview)
      return <SurveyFormReview onCancel={() => setSurveyFormReview(false)} />;

    return <SurveyForm onSurveySubmit={() => setSurveyFormReview(true)} />;
  };

  return <div>{renderContent()}</div>;
};

// Here, we leave the destroyOnUnmount property to be "true", meaning that if the SurveyNew component is unmounted (e.g. user returns to Dashboard),
// then the data would be cleared out from the store. However, if the user proceeds to the review component, the SurveyNew component would still be mounted
// since it is the component that renders either the form or review components, meaning that form data wouldn't be cleared (SurveyNew component is still mounted).
export default reduxForm({ form: "surveyForm" })(SurveyNew);
