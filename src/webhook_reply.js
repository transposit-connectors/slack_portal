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
    let message = api.query("SELECT * FROM slack.get_channels_history WHERE channel=@channel AND ts=@ts", {channel: env.get('home'), ts: body.event.thread_ts});
    return message;
	api.run('this.post_away', {channel: stash.get(body.event.thread_ts), text: body.event.text});
  }
  return { status_code: 200 };
}
