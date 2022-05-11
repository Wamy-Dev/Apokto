import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs} from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Center, Anchor, Grid, Button } from '@mantine/core';
import "@fontsource/mukta"
const firebaseConfig = {
    apiKey: "AIzaSyAQJh4IP4DRbkFENg6LRSqClKatveFKwTI",
    authDomain: "apokto-986c4.firebaseapp.com",
    databaseURL: "https://apokto-986c4-default-rtdb.firebaseio.com",
    projectId: "apokto-986c4",
    storageBucket: "apokto-986c4.appspot.com",
    messagingSenderId: "87513490387",
    appId: "1:87513490387:web:ae5e58232073924dc50526"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const useStyles = createStyles((theme) => ({
}));
export default function RepoTable() {
  const [data,setData] = useState([]);
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([]);
  const toggleRow = (id) =>
  {
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }
  const toggleAll = () =>{
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));
  }  
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "repos"));
    let tempData = [];
    querySnapshot.forEach((doc) => {
      tempData.push({repo_name:doc.id, ...doc.data()})
    });
    setData(()=>tempData);
  }
  const rows = data.map(item=>{
    const selected = selection.includes(item.id);
    return <tr key={item.id}  className={cx({ [classes.rowSelected]: selected })}>
              <td>
          <Checkbox
            color="mainred"
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
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
      <Grid.Col span={6}>
        <Button style={{backgroundColor: "#C1272D"}}>
          Submit
          </Button>
      </Grid.Col>
      <Grid.Col span={18}>
        <Center>
          <ScrollArea>
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
 
</Grid>
  )
}