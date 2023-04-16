import {Table} from 'react-bootstrap' 
import { useSelector } from 'react-redux';
import CustomAlert from './CustomAlert';

export default function Datatable() {
  const fileData = useSelector(state => state.files.fileData);
  if (fileData.loading) {
    return <div>Loading...</div>;
  }
  if (fileData.error) {
    return <CustomAlert variant="danger" message={fileData.error} />;
  }
  
  return (
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {fileData.data && fileData.data.map((file) => (
            file.lines.map((line, index) => (
              <tr key={index}>
                <td>{file.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
              </tr>
            )
          )))}
        </tbody>
      </Table>
  )
}
