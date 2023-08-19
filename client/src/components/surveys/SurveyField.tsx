interface SurveyFieldProps {
  input: any;
  label: any;
  meta: any;
}

// When a custom component is rendered for the "Field" component of Final Form (Redux Form), the input, label and meta props are automatically
// sent to the custom component. The "input" prop contains all the event handlers needed for when the field is interacted with in any way, enabling
// management of redux data for the form. Additionaly, it contains the "type" of the input, so all of the event handlers (e.g. onChange) and the type
// are assigned to our custom input. The "meta" prop contains many field-related properties, out of which we only need the "error" and "touched" properties.
// The "error" property will contain any errors returned from the form validation function, while the "touched" property indicates whether or not the field
// has been interacted with in any way (e.g. clicked on).
const SurveyField = ({
  input,
  label,
  meta: { error, touched },
}: SurveyFieldProps) => {
  return (
    <div>
      <label
        className="block text-md font-medium text-gray-900"
        style={{ marginBottom: "10px" }}
      >
        {label}
      </label>
      <input
        {...input}
        style={{ marginBottom: "5px" }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      />
      <div
        className="text-red-600 font-medium"
        style={{ marginBottom: "25px" }}
      >
        {touched && error}
      </div>
    </div>
  );
};

export default SurveyField;
