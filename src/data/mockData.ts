import { Employee, Equipment, LeaveRequest, Payslip } from "../types";

export const DEMO_EMPLOYEE_ID = "emp-1";

export const initialEmployees: Employee[] = [
  {
    id: DEMO_EMPLOYEE_ID,
    name: "Dhaker Salah",
    email: "dhaker@ressourci.com",
    role: "employee",
    department: "Engineering",
    position: "Frontend Developer",
    status: "Active",
  },
  {
    id: "emp-2",
    name: "Youssef Trabelsi",
    email: "youssef@ressourci.com",
    role: "employee",
    department: "Human Resources",
    position: "HR Specialist",
    status: "Active",
  },
  {
    id: "emp-3",
    name: "Meriem Gharbi",
    email: "meriem@ressourci.com",
    role: "employee",
    department: "Finance",
    position: "Accountant",
    status: "Active",
  },
  {
    id: "emp-4",
    name: "Karim Mansour",
    email: "karim@ressourci.com",
    role: "employee",
    department: "Engineering",
    position: "Backend Developer",
    status: "Inactive",
  },
];

export const initialLeaveRequests: LeaveRequest[] = [
  {
    id: "leave-1",
    employeeId: "emp-2",
    employeeName: "Youssef Trabelsi",
    type: "Annual leave",
    startDate: "2026-11-09",
    endDate: "2026-11-11",
    days: 3,
    reason: "Personal matters",
    status: "Pending",
  },
  {
    id: "leave-2",
    employeeId: DEMO_EMPLOYEE_ID,
    employeeName: "Amal Ben Salem",
    type: "Annual leave",
    startDate: "2026-10-12",
    endDate: "2026-10-13",
    days: 2,
    reason: "Family trip",
    status: "Approved",
  },
  {
    id: "leave-3",
    employeeId: "emp-3",
    employeeName: "Meriem Gharbi",
    type: "Sick leave",
    startDate: "2026-10-20",
    endDate: "2026-10-20",
    days: 1,
    reason: "Medical appointment",
    status: "Rejected",
  },
];

export const initialEquipment: Equipment[] = [
  {
    id: "eq-1",
    name: 'MacBook Pro 14"',
    category: "Laptop",
    assignedTo: "Amal Ben Salem",
    status: "Assigned",
  },
  {
    id: "eq-2",
    name: "Dell Latitude",
    category: "Laptop",
    assignedTo: "Youssef Trabelsi",
    status: "Assigned",
  },
  {
    id: "eq-3",
    name: "iPhone 15",
    category: "Phone",
    assignedTo: "Not assigned",
    status: "Available",
  },
  {
    id: "eq-4",
    name: "HP Monitor",
    category: "Monitor",
    assignedTo: "Meriem Gharbi",
    status: "Assigned",
  },
];

export const demoPayslips: Payslip[] = [
  {
    id: "pay-1",
    month: "October",
    year: 2026,
    netPay: 2850,
    baseSalary: 3000,
    bonus: 150,
    deductions: 300,
  },
  {
    id: "pay-2",
    month: "September",
    year: 2026,
    netPay: 2700,
    baseSalary: 3000,
    bonus: 0,
    deductions: 300,
  },
  {
    id: "pay-3",
    month: "August",
    year: 2026,
    netPay: 2800,
    baseSalary: 3000,
    bonus: 100,
    deductions: 300,
  },
];
