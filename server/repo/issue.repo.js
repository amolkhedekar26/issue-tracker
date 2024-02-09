const prisma = require("../db/prismaClient");
const IssueDTO = require("../dto/issue.dto");
const { toList, to } = require("../utils/convertToDto");
const createError = require("http-errors");

function main() {
  const model = {
    // Get all issues
    get: async () => {
      try {
        const issues = await prisma.issue.findMany();
        return toList(issues, IssueDTO);
      } catch (err) {
        throw new createError(400, "Error getting issues");
      }
    },

    // Get Issue By id
    getById: async (id) => {
      try {
        const issue = await prisma.issue.findFirst({
          where: {
            id: id,
          },
        });
        if (issue == null)
          throw new createError(
            404,
            "Error getting issues! No matching record Found"
          );
        return to(issue, IssueDTO);
      } catch (err) {
        throw new createError(err.status, err.message);
      }
    },
    create: async (issue) => {
      try {
        const newIssue = await prisma.issue.create({
          data: issue,
        });
        return to(newIssue, IssueDTO);
      } catch (err) {
        throw new createError(400, "Error creating issue");
      }
    },
    update: async (id, issue) => {
      try {
        const updatedIssue = await prisma.issue.update({
          where: {
            id: id,
          },
          data: issue,
        });
        return to(updatedIssue, IssueDTO);
      } catch (err) {
        throw new createError(400, "Error updating issue");
      }
    },
    delete: async (id) => {
      try {
        const issue = await prisma.issue.findFirst({
          where: {
            id: id,
          },
        });

        if (issue == null)
          throw new createError(
            410,
            "Error deleting issue! No matching record found"
          );
        const deletedIssue = await prisma.issue.delete({
          where: {
            id,
          },
        });
        return to(deletedIssue, IssueDTO);
      } catch (err) {
        throw new createError(err.status, err.message);
      }
    },
  };
  return model;
}

module.exports = main();
