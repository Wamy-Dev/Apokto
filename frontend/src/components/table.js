import { collection, getDocs} from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Center, Anchor, Grid, Button, Input } from '@mantine/core';
import "@fontsource/mukta"
<<<<<<< HEAD
import {db} from "../config/firebase";
import { render } from "@testing-library/react";
=======
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
>>>>>>> fee9633094a4dddf34aa84b70eb8d7413708b658
const useStyles = createStyles((theme) => ({
}));
export default function RepoTable() {
  var pagelength = 10;
  const [data,setData] = useState([]);
  const [page,setPage] = useState(1);
  const [filtData,setFiltData] = useState([]);
  const [renderData, setRenderData] = useState(data.slice(0, pagelength));
  const [search, setSearch] = useState('');
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([]);


  const toggleRow = (id) =>{
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  const toggleAll = () =>{
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => data.indexOf(item))));
  }




  const pagination = () => {
    setRenderData(filtData.slice((page-1)*pagelength, page*pagelength))
  }


  useEffect(() => {
    pagination()
  }, [page,filtData]);

  useEffect(() => {
    Sort()
  }, [search]);

  useEffect(() => {
    getData();
  }, []);



  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "repos"));
    let tempData = [];
    querySnapshot.forEach((doc) => {
      tempData.push({repo_name:doc.id, ...doc.data()})
    });
    console.log('bruh')
    setData(()=>tempData);
    setRenderData(tempData.slice(0, pagelength));
    setFiltData(tempData);
    
  }


  const Sort = () => {
    var filtered = []
    data.map((repo, index) => {
      if (repo['repo_name'].toUpperCase().includes(search.toUpperCase())){
        filtered.push(repo)
  }})
  setPage(1)
  setFiltData(filtered)
  
  }


  const rows = renderData.map(item=>{
    const selected = selection.includes(data.indexOf(item));
    return <tr key={data.indexOf(item)}  className={cx({ [classes.rowSelected]: selected })}>
              <td>
          <Checkbox
            color="mainred"
            checked={selection.includes(data.indexOf(item))}
            onChange={() => toggleRow(data.indexOf(item))}
            transitionDuration={1}
          />
        </td>
      <td>
        <Anchor href={item.repo}>
          <img src={item.icon} alt={item.repo_name} width={70} loading="lazy" />
        </Anchor>
      </td>
      <td
      style={{fontSize: "18px"}}>
        {item.repo_name}
      </td>
      <td
      style={{fontSize: "18px"}}>{item.desc}</td>
      <td
      ><Anchor href={item.repo} color="mainorange" style={{fontSize: "18px"}}>{item.repo}</Anchor></td>
    </tr>
  })
  return (
    
    <Grid columns={24}>
      <Grid.Col md={4} span={24}>
      <Center>
          <Button 
          onClick={()=> selection.forEach((item) => {
            console.log(data[item])})}
          style={{backgroundColor: "#C1272D"}}>
            Submit
            </Button>
            <p style={{color:'white',paddingLeft:'3%'}}>Repos Selected: {selection.length}</p>
        </Center>
      </Grid.Col>
      <Grid.Col md={18} span={24}>
        <Center>
          <ScrollArea>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            radius="xs"
            size="md"
          />
            <Table verticalSpacing="xs">
              <thead>
                <tr>
                <th>
              <Checkbox
                color="mainred"
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              />
            </th>
              <th></th>
              <th
              style={{ fontSize: "25px", fontFamily: 'Mukta, sans-serif', color:"white"}}
              >Repo Name</th>
              <th
              style={{ fontSize: "25px", fontFamily: 'Mukta, sans-serif', color:"white" }}
              >Description</th>
              <th
              style={{ fontSize: "25px", fontFamily: 'Mukta, sans-serif', color:"white"}}
              >Repo URL</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        



  </ScrollArea>
</Center>
</Grid.Col>
<Grid.Col span={24}>
  <Center>    
    <div style={{paddingTop:'3%'}}>
      <Button onClick={() => {if(page!=1){setPage(page-1)}}}>{'<'}</Button>
        
        {((filtData.length/pagelength)>0)? <Button onClick={() => {setPage(1)}}>1</Button> :null}
        {((filtData.length/pagelength)>1)? <Button onClick={() => {setPage(2)}}>2</Button> :null}
        {((filtData.length/pagelength)>2)? <Button onClick={() => {setPage(3)}}>3</Button> :null}
        {((filtData.length/pagelength)>3)? <Button onClick={() => {setPage(4)}}>4</Button> :null}
        
      <Button onClick={() => {if (page*pagelength<filtData.length){setPage(page+1)}}}>{'>'}</Button>
    
    </div>
  </Center>
</Grid.Col>
</Grid>
  )
}
