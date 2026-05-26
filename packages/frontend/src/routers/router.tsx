import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Table } from "../components/table";

export const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Table />} />),
);
