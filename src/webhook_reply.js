({ http_event }) => {
  setImmediate(() => {
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
    if (body.event.thread_ts) {
      // Look for the parent message by thread timestamp
      let message = api.query("SELECT * FROM slack.get_channels_history WHERE channel=@channel AND ts=@ts", {channel: env.get('home'), ts: body.event.thread_ts})[0];
      /* If you would like to see the workspace id, it is stored below
      let workspace = message.blocks[1].block_id; */
      api.run('this.post_away', {channel: message.blocks[0].block_id, text: body.event.text});
    }
  });
  return { status_code: 200 };
}
