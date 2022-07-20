import { collection, getDocs,startAt,endAt,limitToLast,endBefore,startAfter, query, orderBy, limit} from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Center, Anchor, Grid, Button, Input, LoadingOverlay, Modal, Tooltip } from '@mantine/core';
import { BrowserView, MobileView } from 'react-device-detect';
import FadeIn from 'react-fade-in'
import Logo from '../assets/lightlogoapokto.svg';
import { Link } from 'react-router-dom'
import "@fontsource/mukta"
import {db} from "../config/firebase";
const useStyles = createStyles((theme) => ({
}));
export default function RepoTable() {
  var pagelength = 10;
  const [page,setPage] = useState(1);
  const [renderData, setRenderData] = useState([]);
  const [search, setSearch] = useState('');
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([]);
  const [querySnapshot, setQuerySnap] = useState();
  const [lastVisible, setLastVisible] = useState();
  const [firstVisible, setPrevVisible] = useState();
  const [loadingvisible, setLoadingVisible] = useState(true);
  const [opened, setOpened] = useState(false);
  const [sopened, setSOpened] = useState(false);
  const [tooltipopen, setToolTipOpen] = useState(false);
  const [repolist, setRepoList] = useState("random10");
  useEffect(() => {
    const onPageLoad = () => {
      setLoadingVisible(false);
    };
    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);
  const toggleRow = (id) =>{
    setSelection((current) =>
      current.includes(id.repo) ? current.filter((item) => item !== id.repo) : [...current, id.repo]
    );
  }
  const toggleAll = () =>{
    setSelection((current) => ( selection.length === renderData.length ? [] : renderData.map((item) => item.repo)));
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (search !== ''){
    sort();}
    else {
      getData();
    }
  }, [search]);
  useEffect(() => {
    if (querySnapshot){
    handlequery()}
  }, [querySnapshot]);
  const sort = async () => {
    const queryySnapshot = await getDocs(query(collection(db, "repos"),orderBy('name', "asc"),startAt(search),endAt(search+"\uf8ff"), limit(pagelength)))
    setQuerySnap(queryySnapshot)
    setPage(1)
  }
  const handlequery = () => {
    let tempData = [];
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setPrevVisible(querySnapshot.docs[0]);
    querySnapshot.forEach((doc) => {
      tempData.push({repo_name:doc.id, ...doc.data()})
    });
    setRenderData(tempData);
  }
  const NextPage = async () => {
    if (search !== ''){
      const queryySnapshot = await getDocs(query(collection(db, "repos"),orderBy('name', "asc"),startAt(search),endAt(search+"\uf8ff"), startAfter(lastVisible), limit(pagelength)));
    setQuerySnap(queryySnapshot)}
    else{const queryySnapshot = await getDocs(query(collection(db, "repos"),orderBy('name', "asc"), startAfter(lastVisible), limit(pagelength)));
    setQuerySnap(queryySnapshot)}
    setPage(page+1)
  }
  const PrevPage = async () => {
    if(page>1){
    if (search !== ''){    
      const queryySnapshot = await getDocs(query(collection(db, "repos"),orderBy('name', "asc"),startAt(search),endAt(search+"\uf8ff"), endBefore(firstVisible), limitToLast(pagelength + 1)));
      setQuerySnap(queryySnapshot)}
    else{
      const queryySnapshot = await getDocs(query(collection(db, "repos"),orderBy('name', "asc"), endBefore(firstVisible), limitToLast(pagelength + 1)));
      setQuerySnap(queryySnapshot)}
      setPage(page-1)
    }
  }
  const getData = async () => {
    const queryySnapshot = await getDocs(query(collection(db, "repos"),orderBy('name', "asc"),limit(pagelength)));
    setQuerySnap(queryySnapshot)
    setPage(1)
  }
  const rows = renderData.map(item=>{
    const selected = selection.includes(item.repo);
    return <tr key={item.id}  className={cx({ [classes.rowSelected]: selected })}>
              <td>
          <Checkbox
            color="mainred"
            checked={selected}
            onChange={() => toggleRow(item)}
            transitionDuration={500}
          />
        </td>
      <td>
        <Anchor href={item.repo} target="_blank">
        <BrowserView>
        <img src={item.icon} alt={item.repo_name} width={70} loading="lazy" />
        </BrowserView>
        <MobileView>
        <img src={item.icon} alt={item.repo_name} width={35} loading="lazy" />
        </MobileView>
        </Anchor>
      </td>
      <td
      style={{fontSize: "md"}} className="reponame">
        {item.repo_name}
      </td>
      <td
      style={{fontSize: "md"}}>{item.desc}</td>
      <td
      ><Anchor href={item.repo} target="_blank" color="mainorange" style={{fontSize: "md"}}>{item.repo}</Anchor></td>
    </tr>
  })
  var list = []
  function sendList() {
    fetch('https://api.apokto.one/create', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        repos: list
      })
    }).then(response => response.json()).then((r) => {
      setRepoList(r.listname)
      setOpened(true)
    })
  }
  return (
    <Grid columns={24}>
      <Grid.Col md={4} span={24}>
      <BrowserView>
      <FadeIn delay="400" transitionDuration="800">
      <Center>
      <Link to="/">
        <img src={Logo} alt="logo" style={{width: "150px", paddingTop: "15px"}}/>
      </Link>
      </Center>
      <Center style={{paddingLeft: "30px"}}>
        <h1 style={{color:'white', fontFamily:"Mukta"}}>Apokto List Builder</h1>
      </Center>
      <Center style={{paddingLeft: "30px"}}>
        <p style={{color:'white', fontFamily:"Mukta"}}>This is where you build your perfect repo list using Apokto. Here are all of the over 500 repos that are available for you to add to your list. Along with adding your repo list to the Apokto repository, Apokto allows you to be able to download the cydia.list file to install onto your jailbroken idevice.</p>
      </Center>
      <Center style={{paddingLeft: "30px"}}>
        <p style={{color:'white', fontFamily:"Mukta"}}>If you found Apokto useful please consider donating. It helps cover the costs of servers and storage. Thank you. 🐎</p>
      </Center>
      </FadeIn>
      </BrowserView>
      <MobileView>
      <FadeIn delay="400" transitionDuration="800">
      <div style={{display: "flex", flexWrap: "wrap"}}>
      <Link to="/">
        <img src={Logo} alt="logo" style={{width: "75px"}}/>
      </Link>
      <h1 style={{color:'white', fontFamily:"Mukta"}}>Apokto List Builder</h1>
      <p style={{color:'white', fontFamily:"Mukta", fontSize: "15px"}}>This is where you build your perfect repo list using Apokto. <br></br> If you found Apokto useful please consider donating. It helps cover the costs of servers and storage. Thank you. 🐎</p>
      </div>
      </FadeIn>
      </MobileView>
      <Center>
      <Tooltip
      opened={tooltipopen}
      label="You didn't select any repos!"
      color="orange"
      placement="end"
      position="bottom"
      withArrow
      arrowSize={6}
      radius="md" transition="slide-up" transitionDuration={300} transitionTimingFunction="ease" 
    >
          <Button
          onMouseLeave={() => setToolTipOpen(false)} 
          onClick={()=> {selection.forEach((item) => {
            var link = item
            if (link !== undefined){
              list.push(link)
            }
          }) 
          if (list.length === 0) {
            setToolTipOpen(true)
          } else {
            sendList()
          }}}
          style={{backgroundColor: "#C1272D"}}>
            Submit
            </Button>
            </Tooltip>
            <p style={{color:'white', paddingLeft:'15px', fontFamily:"Mukta", paddingRight:'15px'}}>Repos Selected: {selection.length}</p>
        </Center>
      </Grid.Col>
      <Modal
      transition="slide-up"
      closeOnEscape="true"
      transitionDuration={600}
      transitionTimingFunction="ease"
      radius="md"
        opened={sopened}
        onClose={() => setSOpened(false)}
        withCloseButton={false}>
          <h3 style={{fontFamily:"Mukta"}}>Your list is now in the Apokto Repo! 🐎</h3>
          <p style={{fontFamily:"Mukta"}}>Saved as list: <strong>{repolist}</strong> in the Apokto Repo.</p>
          <p style={{fontSize: "sm", fontFamily:"Mukta"}}>If you found this service useful, please consider donating.</p>
      </Modal>
      <Modal
      transition="slide-up"
      closeOnEscape="true"
      transitionDuration={600}
      transitionTimingFunction="ease"
      radius="md"
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}>
          <h3 style={{fontFamily:"Mukta"}}>Apokto has generated your repo list! 🐎</h3>
          <p style={{fontFamily:"Mukta"}}>Please click the "Add to Repo" button to save your list: <strong>{repolist}</strong> in the Apokto Repo.</p>
          <p style={{fontFamily:"Mukta"}}>Please click the "Download" button if you prefer to manually install your repo.</p>
          <p style={{fontSize: "sm", fontFamily:"Mukta"}}>If you found this service useful, please consider donating.</p>
          <center>
          <Button component="a" href='https://api.apokto.one/download' color="mainred" style={{marginRight: "20px"}}>
            Download
          </Button>
          <Button onClick={() => {
            fetch('https://api.apokto.one/addtorepo', {
              method: 'get',
              credentials: 'include',
            }).then(response => response.status).then((r) => {
              if (r = 201){
                setOpened(false)
                setSOpened(true)
              } else {
                alert("Error adding to repo. Please try again later.")
              }
            })
          }} 
          marginleft="10px" 
          color="mainorange" 
          style={{marginLeft: "20px"}}
          >
            Add to Repo
          </Button>
          </center>
      </Modal>
      <Grid.Col md={18} span={24}>
        <Center>
          <ScrollArea>
          <Input
            value={search.toLowerCase()}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a repo name..."
            radius="md"
            size="md"
          />
          <LoadingOverlay visible={loadingvisible} transitionDuration={500} loaderProps={{ size: 'xl', color: 'mainorange', variant: 'bars' }} overlayOpacity={0.9} overlayColor="#333333"/>
            <Table verticalSpacing="xs">
              <thead>
                <tr>
                <th>
              <Checkbox
                color="mainred"
                onChange={toggleAll}
                checked={selection.length === renderData.length}
                indeterminate={selection.length > 0 && selection.length !== renderData.length}
                transitionDuration={0}
              />
            </th>
              <th></th>
              <th
              style={{ fontSize: "lg", fontFamily: 'Mukta, sans-serif', color:"white"}}
              >Repo Name</th>
              <th
              style={{ fontSize: "lg", fontFamily: 'Mukta, sans-serif', color:"white" }}
              >Description</th>
              <th
              style={{ fontSize: "lg", fontFamily: 'Mukta, sans-serif', color:"white"}}
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
    <div style={{paddingBottom: "10px"}}>
      <Button color="mainred" mr="xs" onClick={() => PrevPage()}>{'<'}</Button>
      <Button color="mainred" ml="xs" onClick={() => NextPage()}>{'>'}</Button>
    </div>
  </Center>
</Grid.Col>
</Grid>
  )
}