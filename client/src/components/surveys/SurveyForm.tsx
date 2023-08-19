import { Field, InjectedFormProps, reduxForm } from "redux-form";
import surveyFormFields from "../../util/surveyFormFields";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { Component } from "react";
import validateEmails from "../../util/validateEmails";
import Container from "../Container";

interface SurveyFormProps {
  onSurveySubmit: any;
}

// We need to make our Form component a class component in order to correctly receive custom props and props from Redux Form. It must accept
// the InjectedFormProps and our custom props interface as generic properties to the React Component class.
class SurveyForm extends Component<
  SurveyFormProps & InjectedFormProps<{}, SurveyFormProps>
> {
  renderFields() {
    return surveyFormFields.map(({ label, name }) => (
      <Field
        key={name}
        name={name}
        type="text"
        label={label}
        component={SurveyField}
      />
    ));
  }

  render() {
    // handleSubmit is a function sent as a prop by the Redux Form wrapper and it accepts a callback that is going to be invoked upon submitting
    // the form.
    const { handleSubmit, onSurveySubmit } = this.props;

    return (
      <Container>
        <form className="w-1/2" onSubmit={handleSubmit(onSurveySubmit)}>
          {this.renderFields()}
          <div className="flex justify-between">
            <Link to="/dashboard" className="btn btn-danger">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-success flex items-center gap-2"
            >
              Next <GoArrowRight />
            </button>
          </div>
        </form>
      </Container>
    );
  }
}

// this is a custom validation function passed to Redux Form (can be named however we like), which sends a single prop to it, that being the
// values of the form fields stored in the piece of state managed by Redux Form. It must return an object, which should be empty if no errors
// are detected and with key value pairs if errors are detected. The keys of the object (if there are errors) MUST be the same as the name properties
// set to the Redux Fields. This is done so that Redux Form can wire the error related to the field which the error corresponds to.
// Example: we have an error in the title field (errors: { title: "Error" }). This error will be sent as a prop to the SurveyField component, contained in
// the "meta" object send by Redux Form under the key "error".
// Note: this validation function is executed on every interaction with the fields. The errors (if there are any) are shown after the submit button
// is clicked, or if the fields have been interacted with previously.
function validate(values: any) {
  type Error = { [key: string]: string | undefined };
  const errors: Error = {};

  surveyFormFields.forEach(({ label, name }) => {
    if (!values[name]) errors[name] = `You must provide a value for ${name}`;
  });

  errors.recipients = validateEmails(values.recipients || "");

  return errors;
}

// The reduxForm wrapper contains multiple configuration parameters.
// validate - the validation function
// form - the name of the piece of state managed by Redux Form that correlates to this specific form in the SurveyForm component
// destroyOnUnmount - clears form state data when component/form is unmounted (removed from screen). Default is "true". This is very important
// because we set this property to "false" here since if we go back from the review screen to the form, we wouldn't want our data to be cleared.
// (go to SurveyNew to see why we don't set this property to "false").
export default reduxForm<{}, SurveyFormProps>({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
