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
  // Ignore bot users (mainly yourself)
  if (!body.event.bot_id && !http_event.headers['X-Slack-Retry-Num']) {
    let user = api.query("SELECT user.profile.real_name_normalized FROM slack_away.get_users_info WHERE user=@user", {user: body.event.user})[0].real_name_normalized;
    let team = api.run('slack_away.get_team_info')[0].team.name;
    let title = `Message from *${user}* in workspace *${team}*:`;
    // Grab the output of the API call for storage. Set the home in environment variables
    let thread = api.run('this.post_home', {channel: env.get('home'), body: body.event.text, title: title});
    // The stash is an imperfect solution to this, as it can get full and must be manually emptied.
    stash.put(thread[0].message.ts, body.event.user);
  }
  return { status_code: 200 };
}
