# Server-Setup-Authentication-boilerplate

Sign up and sign in setup using node and express js and jwt tokens.

# Initial Setup

For Application to run, a keys file must be created to allow tokens to
be encoded and decoded

```
cd Server-Setup-Authentication-boilerplate

mkdir config && touch config/key.js
```

paste this code into the key file and change the key to your preferred one

```
module.exports = {
  secret: "your-own-secret-or-key"
};

```
