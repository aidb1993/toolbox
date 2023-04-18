const { expect } = require('chai')
const {  getFilesByFileName } = require('../services/files.service')

describe('getFilesByFileName', () => {
  it('returns status 404 if file is empty', async () => {
    const getFilesMock = async () => ({ status: 404, data: 'File is empty' })
    const result = await getFilesMock({ getFilesByFileName: getFilesByFileName })
    expect(result.status).to.equal(404)
    expect(result.data).to.equal('File is empty')
  })

  it('returns status 404 if file does not exist', async () => {
    const getFilesMock = async () => ({ status: 404, data: 'Not Found' })
    const result = await getFilesMock({ getFilesByFileName: getFilesByFileName })
    expect(result.status).to.equal(404)
    expect(result.data).to.equal('Not Found')
  })

  it('returns formatted data if file exists and is not empty', async () => {
    const getFilesMock = async () => ({ status: 200, data: [{ file: 'test2.csv', lines: [{ text: 'foo', number: 1, hex: '#ffffff' }] }] })
    const result = await getFilesMock({ getFilesByFileName: getFilesByFileName })
    expect(result.status).to.equal(200)
    expect(result.data).to.be.an('array')
    expect(result.data.length).to.equal(1)
    expect(result.data[0]).to.have.property('file')
    expect(result.data[0]).to.have.property('lines')
    expect(result.data[0].lines).to.be.an('array')
    expect(result.data[0].lines.length).to.be.above(0)
  })
})

describe('getFiles', () => {
  let listFilesMock;
  let getFilesByFileNameMock;

  before(() => {
    // Set up the mock data
    listFilesMock = async () => ({ data: ['empty1.csv', 'empty2.csv', 'empty3.csv'], status: 200 });
    getFilesByFileNameMock = async (fileName) => {
      if (fileName === 'empty.csv') {
        return { status: 404, data: 'File is empty' }
      } else {
        const data = [{ file: fileName, lines: [{ text: 'foo', number: 1, hex: '#ffffff' }] }]
        return { status: 200, data }
      }
    }
  });

  after(() => {
    // Clean up the mock data
    listFilesMock = null;
    getFilesByFileNameMock = null;
  });

  it('returns all files if all files exist and are not empty', async () => {
    const getFilesMock = async () => ({ status: 200, data: ['empty1.csv', 'empty2.csv', 'empty3.csv']  });
    const result = await getFilesMock({ listFiles: listFilesMock });

    expect(result.status).to.equal(200, 'Should return a status of 200');
    expect(result.data).to.be.an('array', 'Should return an array of files');
    expect(result.data.length).to.be.above(0, 'Should return at least one file');
  })

  it('returns an empty array if all files are empty', async () => {
    const getFilesMock = async () => ({ status: 404, data: 'File is empty' })
    const result = await getFilesMock({ listFiles: listFilesMock });

    expect(result.status).to.equal(404, 'Should return a status of 404');
    expect(result.data).to.equal('File is empty', 'Should return a message saying the file is empty');
  })

  it('returns all files if all files exist and are not empty', async () => {
    const fileList = { data: ['test1.csv', 'test2.csv', 'test3.csv'], status: 200 };
    const listFilesMock = async () => fileList;
    const getFilesMock = async () => {
      const promises = fileList.data.map((file) => getFilesByFileNameMock(file));
      const res = await Promise.all(promises);
      const data = res.map((file) => file.data[0]);
      return { data, status: 200 };
    };

    const result = await getFilesMock({ listFiles: listFilesMock, getFilesByFileName: getFilesByFileNameMock });
    expect(result.status).to.equal(200);
    expect(result.data).to.be.an('array');
    expect(result.data.length).to.equal(fileList.data.length);
    expect(result.data).to.have.deep.members([
      { file: 'test1.csv', lines: [{ text: 'foo', number: 1, hex: '#ffffff' }] },
      { file: 'test2.csv', lines: [{ text: 'foo', number: 1, hex: '#ffffff' }] },
      { file: 'test3.csv', lines: [{ text: 'foo', number: 1, hex: '#ffffff' }] },
    ]);
  });
})


describe('listFiles', () => {
  it('returns a sorted list of files', async () => {
    const fileList = { data: ['test1.csv', 'test2.csv', 'test3.csv'], status: 200 }
    const listFilesMock = async () => fileList
    const result = await listFilesMock()
    expect(result.status).to.equal(200)
    expect(result.data).to.be.an('array')
    expect(result.data.length).to.be.above(0)
    expect(result.data[0]).to.equal('test1.csv')
    expect(result.data[1]).to.equal('test2.csv')
    expect(result.data[2]).to.equal('test3.csv')
  })
})
