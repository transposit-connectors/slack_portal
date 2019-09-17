({ http_event }) => {
  let body = http_event.parsed_body;
  if (body.challenge) {
    // https://api.slack.com/events/url_verification
	return {
      status_code: 200,
      headers: { "Content-Type": "text/plain" },
      body: body.challenge
    };
  }
  // Check for thread events only
  if (body.event.thread_ts && !http_event.headers['X-Slack-Retry-Num']) {
	api.run('this.post_away', {channel: stash.get(body.event.thread_ts), text: body.event.text});
  }
  return { status_code: 200 };
}
