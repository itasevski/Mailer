import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";
import Container from "./Container";

const Dashboard = () => {
  return (
    <Container>
      <div className="text-3xl md:text-5xl font-bold text-center">
        Dashboard
      </div>
      <div className="text-base md:text-2xl mt-3 text-center">
        Welcome to Mailer dashboard!
      </div>
      <div className="w-[75%]">
        <SurveyList />
      </div>
      <Link
        to="/surveys/new"
        className="btn btn-danger rounded-full fixed z-90 bottom-8 right-4 sm:bottom-10 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center"
      >
        <div className="w-4 h-4">
          <GoPlus />
        </div>
      </Link>
    </Container>
  );
};

export default Dashboard;
