import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import RepoTable from './components/table.js';
import { MantineProvider } from '@mantine/core';
import Repo from './pages/home';
import AboutPage from './pages/about';
import Error from './pages/404'
import "@fontsource/cabin"
export default function App() {
    return (
        <Router>
            <div>
                <MantineProvider
                     theme={{
                        colors: {
                            colorScheme: "dark",
                            'mainorange': ["#F8F4F3","#E8DBD6","#DEC2B8","#D8A999","#D99076","#E17650","#F15A24","#D45325","#AF5231","#924F37","#7C4B3A","#69473A","#5B4239"],
                            'mainred': ["#D6C5C6","#CAACAD","#C19394","#BD787B","#BD5C5F","#C33C41","#C1272D","#A03135","#863639","#71383A","#613739","#533637","#483334"],
                            'background': ["#404040","#3A3A3A","#353535","#303030","#2C2C2C","#282828","#242424","#202020","#1D1D1D","#1A1A1A","#181818","#151515","#131313"]
                        },
                        fontFamily: 'Cabin, sans-serif;',
                        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 }
                        }}>
                {/*A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL.*/}
                    <Routes>
                        <Route path="/about"  element={<AboutPage />} />
                        <Route path="/build"  element={<RepoTable />} />
                        <Route path="/"  element={<Repo />} />
                        <Route path="*"  element={<Error />} />
                    </Routes>
                </MantineProvider>
            </div>
        </Router>
    );
}