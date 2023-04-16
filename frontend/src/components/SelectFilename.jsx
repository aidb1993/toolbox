import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { setSelection } from '../features/files/filesSlice';
export default function SelectFilename() {
    const selection = useSelector(state => state.files.selection);
    const options = useSelector(state => state.files.options);
    const dispatch = useDispatch();
    const handleSelection = (e) => {
        dispatch(setSelection(e.target.value));
    }
    if (!options) {
        return <div>Loading...</div>;
    }
  return (
    <Form.Select onChange={(e)=>{handleSelection(e)}} value={selection} >
      <option value="all">All Files</option>
      {options && options.map((option) => (
        <option key={option} value={option}>{option}</option>
        ))
    }
    </Form.Select>
  )
}
