import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Homepage/Homepage';
import Login from "./components/Login/Login";
import Signup from './components/Signup/Signup' 
import NavBar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import Budget from "./components/Budget/Budget";
import Chart from "./components/Chart/Chart";
import styled from 'styled-components';
import './App.css'
import Dashboard from "./components/Dashboard/Dashboard";
import ExpenseForm from "./components/Expense/Expense";
import DeleteBudget from "./components/DeleteBudget/DeleteBudget";
import Background from "./components/Background/Background";
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 95vh;
`;

const MainContent = styled.div`
  flex: 1;
`;

function App() {
  return (

    <Router>
     <PageContainer>  
      <NavBar />
      <MainContent>
      
        <Routes>
        <Route path="/" element={( <Background> <Home /> </Background> )} />
        <Route path="/home" element={( <Background> <Home /> </Background> )} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/charts" element={<Chart />} />
          <Route path="/expense" element={<ExpenseForm />}/>
          <Route path="/deleteBudget" element={<DeleteBudget />}/>   
        </Routes>
        </MainContent>
         <Footer />
        </PageContainer>     
    </Router>
  );
}

export default App;
