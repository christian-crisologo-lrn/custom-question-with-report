import { signLearnosityRequest } from "./signLearnosityRequest";
import { loadScript } from "./loadScript";

// const SCRIPT_URL = "https://reports-ie.learnosity.com/?latest-lts";
const SCRIPT_URL = "https://reports.dev.learnosity.com/?latest-lts";

function getLearnosityRequest(sessionId, userId = "labs-site") {
  return {
    reports: [
      {
        id: "session-detail",
        type: "session-detail-by-item",
        user_id: userId,
        session_id: sessionId,
        questions_api_init_options : {
            // ignore_question_attributes: ["valid_response"],
            showCorrectAnswers: true
        }
      },
    ],
  };
}

export async function runReporting(sessionId, userId = "labs-site") {
  await loadScript(SCRIPT_URL);

  const container = document.createElement("div");

  container.innerHTML = `
    <div>
      <div id="session-detail"></div>
    </div>
  `;

  document.body.appendChild(container);

  const data = await signLearnosityRequest(getLearnosityRequest(sessionId, userId));

  window.LearnosityReports.init(data, {
    readyListener() {
      console.log("learnosity reports ready");
    },
    errorListener(err) {
      console.log("learnosity reports error", err);
    },
  });
}
