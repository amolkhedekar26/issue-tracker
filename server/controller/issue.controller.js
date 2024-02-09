const IssueModel = require("../repo/issue.repo");
const { isInteger } = require("../utils/validations");
const createError = require("http-errors");

/**
 * Controller for issue
 *
 * @class
 */
class IssueController {
  /**
   * create()
   *
   * Create a new issue
   *
   * @param  req: request object
   * @param  res: response object
   * @param  next: next function
   *
   * @return Object
   */
  static async create(req, res, next) {
    try {
      const newIssue = await IssueModel.create(req.body);
      res.send(newIssue);
    } catch (err) {
      next(err);
    }
  }

  /**
   * update()
   *
   * Update the issue
   *
   * @param  req: request object
   * @param  res: response object
   * @param  next: next function
   *
   * @return Object
   */
  static async update(req, res, next) {
    let { id } = req.params;
    try {
      if (!isInteger(id))
        throw new createError(422, "id param should be number");

      id = parseInt(id);
      const updatedIssue = await IssueModel.update(id, req.body);
      res.send(updatedIssue);
    } catch (err) {
      next(err);
    }
  }

  /**
   * destroy()
   *
   * Delete an issue
   *
   * @param  req: request object
   * @param  res: response object
   * @param  next: next function
   *
   * @return Object
   */
  static async delete(req, res, next) {
    let { id } = req.params;

    try {
      if (!isInteger(id))
        throw new createError(422, "id param should be number");

      id = parseInt(id);
      const deletedIssue = await IssueModel.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  /**
   * all()
   *
   * Get all issues
   *
   * @param  req: request object
   * @param  res: response object
   * @param  next: next function
   *
   * @return List of issues
   */
  static async all(req, res, next) {
    try {
      const issues = await IssueModel.get();
      res.send(issues);
    } catch (err) {
      next(err);
    }
  }

  /**
   * one()
   *
   * Get a issue by it's id
   *
   * @param  req: request object
   * @param  res: response object
   * @param  next: next function
   *
   * @return Single Issue
   */
  static async one(req, res, next) {
    let { id } = req.params;
    try {
      if (!isInteger(id))
        throw new createError(422, "id param should be number");
      id = parseInt(id);
      const issue = await IssueModel.getById(id);
      res.send(issue);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = IssueController;
