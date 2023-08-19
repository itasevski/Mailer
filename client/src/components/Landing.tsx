import Container from "./Container";

const Landing = () => {
  return (
    <Container>
      <div className="text-3xl md:text-5xl font-bold text-center">
        Welcome to Mailer!
      </div>
      <div className="text-base md:text-2xl mt-3 text-center">
        Please log in to continue.
      </div>
    </Container>
  );
};

export default Landing;
