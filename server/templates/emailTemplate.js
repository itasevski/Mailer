const keys = require("../config/keys");

// Survey Email HTML template
module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input!</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.nodemailerRedirectDomain}/api/surveys/submit/${survey._id}/yes">Yes</a>
          </div>
          <div>
            <a href="${keys.nodemailerRedirectDomain}/api/surveys/submit/${survey._id}/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
