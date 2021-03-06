require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3002,
  DATABASE: {
    protocol: process.env.MONGODB_PROTOCOL,
    url:
      process.env.NODE_ENV === "test"
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI,
    username: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
  pagination: {
    limit: 20,
    skip: 0,
    page: 1,
  },
  sort: {
    sortBy: {
      fields: ["createdAt", "updatedAt"],
      default: "createdAt",
    },
    direction: {
      options: ["asc", "desc"],
      default: "desc",
    },
  },
  // TODO: add more filter options
  filter: { options: ["ubication", "category", "published"] },
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = config;
