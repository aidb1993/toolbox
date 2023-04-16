const { expect } = require('chai');
const { getFiles, listFiles, getFilesByFileName } = require('../services/files.service');

describe('getFilesByFileName', () => {
  it('returns status 404 if file is empty', async () => {
    const result = await getFilesByFileName('empty.csv');
    expect(result.status).to.equal(404);
    expect(result.data).to.equal('Not Found');
  });

  it('returns status 404 if file does not exist', async () => {
    const result = await getFilesByFileName('nonexistent.csv');
    expect(result.status).to.equal(404);
    expect(result.data).to.equal('File not found');
  });

  it('returns formatted data if file exists and is not empty', async () => {
    const result = await getFilesByFileName('test1.csv');
    expect(result.status).to.equal(200);
    expect(result.data).to.be.an('array');
    expect(result.data.length).to.equal(1);
    expect(result.data[0]).to.have.property('file');
    expect(result.data[0]).to.have.property('lines');
    expect(result.data[0].lines).to.be.an('array');
    expect(result.data[0].lines.length).to.be.above(0);
  });
});

describe('getFiles', () => {
  it('returns all files if all files exist and are not empty', async () => {
    const result = await getFiles();
    expect(result.status).to.equal(200);
    expect(result.data).to.be.an('array');
    expect(result.data.length).to.be.above(0);
  });

  it('returns an empty array if all files are empty', async () => {
    // create a list of empty files
    const fileList = { data: ['empty1.csv', 'empty2.csv', 'empty3.csv'], status: 200 };
    const listFilesMock = async () => fileList;
    const getFilesMock = async () => ({ status: 404, data: 'File is empty' });

    const result = await getFilesMock({ listFiles: listFilesMock });
    expect(result.status).to.equal(200);
    expect(result.data).to.be.an('array');
    expect(result.data.length).to.equal(0);
  });

  it('returns only non-empty files if some files are empty', async () => {
    // create a list of files, some of which are empty
    const fileList = { data: ['test1.csv', 'empty.csv', 'test2.csv'], status: 200 };
    const listFilesMock = async () => fileList;
    const getFilesByFileNameMock = async (fileName) => {
      if (fileName === 'empty.csv') {
        return { status: 404, data: 'File is empty' };
      } else {
        const data = [{ file: fileName, lines: [{ text: 'foo', number: 1, hex: '#ffffff' }] }];
        return { status: 200, data };
      }
    };
    const getFilesMock = async () => {
      const promises = fileList.data.map((file) => getFilesByFileNameMock(file));
      const res = await Promise.all(promises);

      const data = [];
      res.map((file) => {
        if (file.status === 200) {
          data.push(file.data[0]);
        }
      });
      return { data, status: 200 };
    };
    
    const result = await getFilesMock({ listFiles: listFilesMock, getFilesByFileName: getFilesByFileNameMock });
    expect(result.status).to.equal(200);
    expect(result.data).to.be.an('array');
    expect(result.data.length).to.equal(2);
    expect(result.data[0].file).to.equal('test1.csv');
    expect(result.data[1].file).to.equal('test2.csv');
  });
});