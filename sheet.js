const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(
      "1T-MLcmUD8IKMcsTELLkFp0eMzKD4jGRlcb0XOjDCvks"
    );
  }

  async load() {
    await this.doc.useServiceAccountAuth(require("./credentials.json"));
    await this.doc.loadInfo(); // loads document properties and worksheets
  }

  async addRows(rows, index = 0) {
    const sheet = this.doc.sheetsByIndex[index];
    await sheet.addRows(rows);
  }

  async getRows(index = 0) {
    const sheet = this.doc.sheetsByIndex[index];
    const rows = await sheet.getRows();
    return rows;
  }
}
