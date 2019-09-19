# Slack Portal

A Slack App that allows you to communicate to other workspaces through the use of connected Slack bots. Read the [blog post](https://www.transposit.com/blog/2019.09.17-slack-shared-channels/) for more information on how it was built!

## How it works

This app works off of two separate Slack apps, one for your home organization, and one for the away organizations. Two separate Slack data connections are made to do this, where we have a webhook for the home app and a webhook for the away app. From there, we check for proper parameters set. To send a message from an away organization, simply send a direct message to the application as you would a user. To reply to the message in the home organization, start or comment on a thread with the parent comment. To fork this into your own app, you will need to edit all of the credentials to those of your own. [Learn more about creating Slackbots in Transposit to get started.](https://www.transposit.com/docs/guides/slack/chatbots/)

## Operations

`post_away`: The Slack API call to send the return message to the user in the away organization.

`post_home`: The Slack API call to relay the message from the away organization to a designated channel in the home organization.

`webhook_away`: The webhook function that is called when an away user messages the Application User in their workspace.

`webhook_home`: The webhook operation that is called when a reply to a message in the home channel is called for relay.

[Click here to find more examples using Transposit!](https://www.transposit.com/apps/)
