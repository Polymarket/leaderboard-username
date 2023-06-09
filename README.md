# Polymarket Leaderboard Bot Usernames

Example repo showing how to update Polymarket leaderboard usernames, for programmatic(EOA) traders.

### Usage

- Install dependencies with [yarn](https://yarnpkg.com/): yarn install

- Create a .env file with a private key(PK env variable) and the leaderboard API URL(see .env.example)

- Run `yarn signAndSend --name YOUR_USERNAME` to create and sign a username update payload and send it to the leaderboard API

- Run `yarn sign --name YOUR_USERNAME` to create and sign a username update payload



See [signAndSend](./src/signAndSend.ts) or [sign](./src/sign.ts) for more details
