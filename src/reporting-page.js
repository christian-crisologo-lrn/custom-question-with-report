import { runReporting } from './reporting';

// Extract parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('sessionId');
const userId = urlParams.get('userId');

if (sessionId && userId) {
  // Run reporting with the passed parameters
  runReporting(sessionId, userId);
} else {
  console.error('Missing required parameters: sessionId and userId');
  document.body.innerHTML = '<h1>Error: Missing session or user information</h1>';
}