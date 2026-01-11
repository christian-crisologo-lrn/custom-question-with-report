import { signLearnosityRequest } from "./signLearnosityRequest";
import { loadScript } from "./loadScript";

// const SCRIPT_URL = "https://items-ie.learnosity.com/?latest-lts";
const SCRIPT_URL = "https://items.dev.learnosity.com/?latest-lts";
const USER_ID = "labs-site";

function getLearnosityRequest() {
  return {
    activity_id: "TestActivitySB",
    name: "Test Activity",
    rendering_type: "assess",
    type: "submit_practice",
    user_id: USER_ID,
    activity_template_id: "TestActivitySB",
    config: {
      ignore_question_attributes: ["valid_response"]
        // document.location.search === "?ignore=1" ? ["valid_response"] : [],
    }
  };
}

export async function runPlayer() {
  await loadScript(SCRIPT_URL);

  const container = document.createElement("div");

  container.innerHTML = `
    <div>
      <div id="learnosity_assess"></div>
    </div>
  `;

  document.body.appendChild(container);

  const data = await signLearnosityRequest(getLearnosityRequest());

  const itemsApp = window.LearnosityItems.init(data, {
    readyListener() {
      console.log("learnosity items ready");

      const sessionId = itemsApp.getActivity().session_id;
      const userId = data.user_id || USER_ID;

      itemsApp.on("test:submit:success", () => {
        // Open reporting page in a new tab with session and user parameters
        const reportingUrl = `reporting.html?sessionId=${encodeURIComponent(sessionId)}&userId=${encodeURIComponent(userId)}`;
        window.open(reportingUrl, '_blank');
      });
    },
    errorListener(err) {
      console.log("learnosity items error", err);
    },
  });
}
