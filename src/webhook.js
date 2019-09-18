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
    let user = api.query("SELECT user.profile FROM slack_away.get_users_info WHERE user=@user", {user: body.event.user})[0];
    let team = api.run('slack_away.get_team_info')[0].team;
    let title = `Message from *${user.real_name}* in workspace *${team.name}*:`;
    // Set the home channel id you want the messages to send to in environment variables
    api.run('this.post_home', {channel: env.get('home'), body: body.event.text, title: title, workspace: team.id, user: body.event.user});
  }
  return { status_code: 200 };
}
