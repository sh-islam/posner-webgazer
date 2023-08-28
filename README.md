# Posner Cueing Task using Stroop Webgazer
This app allows you to create valid/invalid trials for the Posner task and measures response time of gaze collision.

## Experiment Procedure:
1. Each trial begins with a fixation point '+' for a duration of 3 seconds. Fixate on this point until you see an arrow cue.
2. After the fixation point, an arrow cue will appear for 5 seconds signaling which side to orient your eyes. Orient your eyes as the cue directs.
3. After 5 seconds, a target will appear either on the left or right side for 10 seconds.
4. The next trial starts immediately after the target is looked at, or after 10 seconds even if not looked at (no responses are recorded with a response time of 10,000ms).
5. Repeat until all trials are complete.

## Dependencies
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-scripts": "^5.0.1",
- "recharts": "^2.7.3",
- "tabulator-tables": "^5.5.1",
- "web-vitals": "^2.1.4"
