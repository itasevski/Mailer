import { useEffect } from "react";
import { useThunk } from "../../hooks/useThunk";
import { fetchSurveys } from "../../store";
import { useSelector } from "react-redux";

const SurveyList = () => {
  const { surveys } = useSelector((state: any) => state.surveys);
  const [doFetchSurveys, loading, finished, error] = useThunk(fetchSurveys);

  useEffect(() => {
    doFetchSurveys(undefined);
  }, [doFetchSurveys]);

  const renderSurveys = () => {
    return surveys.map((survey: any) => (
      <div className="border border-4 p-6 w-full">
        <div className="mb-2 flex flex-col sm:flex-row md:justify-between">
          <span className="text-2xl font-semibold">{survey.title}</span>
          <span className=" text-[12px]">
            Sent on: {new Date(survey.dateSent).toString()}
          </span>
        </div>
        <hr />
        <div className="mt-6 mb-6 text-[18px]">{survey.body}</div>
        <hr />
        <div className="mt-1 flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col sm:flex-row">
            <span className="mr-6">Yes: {survey.yes}</span>
            <span>No: {survey.no}</span>
          </div>
          <div className="text-[14px]">
            Last responded: &nbsp;
            {survey.lastResponded
              ? new Date(survey.lastResponded).toString()
              : "Never"}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-4 mt-12">
      <div className="text-[14px] md:text-[18px]">Your active campaigns:</div>
      {renderSurveys()}
    </div>
  );
};

export default SurveyList;
