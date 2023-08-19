import { useSelector } from "react-redux";
import surveyFormFields from "../../util/surveyFormFields";
import { submitSurvey } from "../../store";
import { useNavigate } from "react-router-dom";
import { GoMail, GoSync } from "react-icons/go";
import { useThunk } from "../../hooks/useThunk";
import { useEffect } from "react";
import Alert from "../utilities/Alert";
import Container from "../Container";

interface SurveyFormReviewProps {
  onCancel: any;
}

const SurveyFormReview = ({ onCancel }: SurveyFormReviewProps) => {
  const { surveyForm } = useSelector((state: any) => state.form);
  const [doSubmitSurvey, loading, finished, error] = useThunk(submitSurvey);
  const navigate = useNavigate();

  const renderReviewFields = () => {
    return surveyFormFields.map(({ label, name }) => (
      <div className="mb-5" key={name}>
        <label className="block text-lg text-gray-600 font-medium">
          {label}
        </label>
        <div>{surveyForm.values[name]}</div>
      </div>
    ));
  };

  useEffect(() => {
    if (finished && !error) navigate("/dashboard");
  }, [finished, navigate, error]);

  const handleSurveySubmit = () => {
    doSubmitSurvey(surveyForm.values);
  };

  return (
    <Container>
      <div>
        {error && <Alert type="danger" message={error?.error} />}
        <h1 className="text-3xl mb-10">Survey review:</h1>
        {renderReviewFields()}
        <div className="flex justify-between gap-6">
          <button onClick={onCancel} className="btn btn-danger">
            Back
          </button>
          <button
            onClick={handleSurveySubmit}
            className="btn btn-success flex items-center gap-2"
          >
            {loading ? (
              <GoSync className="animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                Send survey <GoMail />
              </div>
            )}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SurveyFormReview;
