import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Datatable from '../components/Datatable';
import SelectFilename from '../components/SelectFilename';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setFileData, setOptions } from '../features/files/filesSlice';

export default function Home() {
  const selection = useSelector(state => state.files.selection);
  const dispatch = useDispatch();
  const url = 'http://localhost:3000/files/data'
  
  
    useEffect(() => {
      const fetchData = async () => {
        dispatch(setFileData({data: null, loading: true, error: null}));
          const res = await fetch(selection === 'all' ? url : `${url}?filename=${selection}`);
          if (!res.ok) {
            dispatch(setFileData({data: null, loading: false, error: res.statusText}));
            return;
          }
          const json = await res.json();
          dispatch(setFileData({data: json, loading: false, error: null}));
      };
      fetchData();
    }, [selection]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`${url}/list`);
          const json = await res.json();
          dispatch(setOptions(json));
        } catch (error) {
        }
      };
      fetchData();
    }, []);

  return (
    <>
      <Navbar style={{backgroundColor:'#F25141'}} expand="lg">
        <Container>
          <Navbar.Brand style={{color:'white'}} href="#home">React Test App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{marginTop:'20px'}}>
        <SelectFilename/>
        <br/>
        <Datatable/>
      </Container>
    </>
  )
}
