class IssueDTO {
  title;
  description;
  status;

  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
  }
}

module.exports = IssueDTO;
